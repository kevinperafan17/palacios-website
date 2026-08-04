(function () {
  "use strict";

  const header = document.querySelector("[data-header]");
  const nav = document.querySelector("[data-nav]");
  const navToggle = document.querySelector("[data-nav-toggle]");

  function updateHeader() {
    if (!header || header.classList.contains("site-header--solid")) return;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  }

  function closeNav() {
    if (!nav || !navToggle) return;
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Abrir menú");
    navToggle.querySelector("i")?.classList.replace("bi-x-lg", "bi-list");
    document.body.classList.remove("nav-open");
  }

  if (nav && navToggle) {
    navToggle.addEventListener("click", function () {
      const open = !nav.classList.contains("is-open");
      nav.classList.toggle("is-open", open);
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
      navToggle.querySelector("i")?.classList.toggle("bi-list", !open);
      navToggle.querySelector("i")?.classList.toggle("bi-x-lg", open);
      document.body.classList.toggle("nav-open", open);
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeNav();
    });
  }

  updateHeader();
  document.addEventListener("scroll", updateHeader, { passive: true });

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const lowEndDevice =
    (navigator.deviceMemory !== undefined && navigator.deviceMemory <= 2) ||
    (navigator.deviceMemory === undefined && navigator.hardwareConcurrency <= 4);

  const revealElements = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach(function (element) {
      element.classList.add("is-visible");
    });
  } else {
    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.08 }
    );

    revealElements.forEach(function (element) {
      revealObserver.observe(element);
    });
  }

  document.querySelectorAll("[data-spotlight]").forEach(function (surface) {
    if (reduceMotion || lowEndDevice) return;
    surface.addEventListener(
      "pointermove",
      function (event) {
        const bounds = surface.getBoundingClientRect();
        surface.style.setProperty("--spot-x", `${event.clientX - bounds.left}px`);
        surface.style.setProperty("--spot-y", `${event.clientY - bounds.top}px`);
      },
      { passive: true }
    );
  });

  function trackEvent(name, params) {
    if (typeof window.gtag !== "function") return;
    window.gtag("event", name, params || {});
  }

  document.querySelectorAll("[data-event]").forEach(function (element) {
    element.addEventListener("click", function () {
      trackEvent(element.dataset.event, {
        service_name: element.dataset.service || "general",
        link_url: element.href || "",
        page_location: window.location.href,
      });
    });
  });

  document.querySelectorAll(".faq-list details").forEach(function (detail) {
    detail.addEventListener("toggle", function () {
      if (!detail.open) return;
      const question = detail.querySelector("summary")?.textContent.trim() || "";
      trackEvent("faq_open", {
        service_name: detail.closest("[data-service]")?.dataset.service || "general",
        faq_question: question,
      });
    });
  });

  function setFormStatus(form, message, state) {
    const status = form.querySelector("[data-form-status]");
    if (!status) return;
    status.textContent = message;
    status.classList.toggle("is-error", state === "error");
    status.classList.toggle("is-ready", state === "ready");
  }

  document.querySelectorAll("[data-lead-form]").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      setFormStatus(form, "", "");

      if (form.elements.website?.value) {
        setFormStatus(form, "No fue posible procesar la solicitud.", "error");
        return;
      }

      if (!form.checkValidity()) {
        form.querySelectorAll(":invalid").forEach(function (field) {
          field.setAttribute("aria-invalid", "true");
        });
        form.reportValidity();
        setFormStatus(form, "Revise los campos requeridos antes de continuar.", "error");
        trackEvent("lead_form_validation_error", {
          service_name: form.dataset.service || "general",
        });
        return;
      }

      form.querySelectorAll("[aria-invalid]").forEach(function (field) {
        field.removeAttribute("aria-invalid");
      });

      const data = new FormData(form);
      const service = data.get("servicio") || form.dataset.serviceLabel || "Asesoría general";
      const lines = [
        `Hola, quiero solicitar una asesoría sobre ${service}.`,
        "",
        `Nombre: ${data.get("nombre")}`,
        `Organización: ${data.get("organizacion")}`,
        `Contacto: ${data.get("contacto")}`,
        `Necesidad: ${data.get("mensaje")}`,
      ];
      const phone = form.dataset.phone || "573151816494";
      const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(lines.join("\n"))}`;

      setFormStatus(form, "Abriremos WhatsApp para que revise y envíe su solicitud.", "ready");
      trackEvent("lead_form_whatsapp", {
        service_name: form.dataset.service || "general",
        form_destination: "whatsapp",
      });

      const popup = window.open(whatsappUrl, "_blank");
      if (popup) popup.opener = null;
      else window.location.href = whatsappUrl;
    });
  });

  const blogGrid = document.querySelector("[data-blog-grid]");
  if (blogGrid) {
    const articles = Array.from(blogGrid.querySelectorAll("[data-blog-card]"));
    const filters = document.querySelectorAll("[data-blog-filter]");
    const search = document.querySelector("[data-blog-search]");
    const empty = document.querySelector("[data-blog-empty]");
    let currentFilter = "all";

    const initialQuery = new URLSearchParams(window.location.search).get("q");
    if (search && initialQuery) search.value = initialQuery;

    function filterArticles() {
      const term = (search?.value || "").trim().toLocaleLowerCase("es");
      let visible = 0;

      articles.forEach(function (article) {
        const categoryMatch = currentFilter === "all" || article.dataset.category === currentFilter;
        const searchMatch = !term || article.textContent.toLocaleLowerCase("es").includes(term);
        const show = categoryMatch && searchMatch;
        article.hidden = !show;
        if (show) visible += 1;
      });

      empty?.classList.toggle("is-visible", visible === 0);
    }

    filters.forEach(function (button) {
      button.addEventListener("click", function () {
        currentFilter = button.dataset.blogFilter;
        filters.forEach(function (item) {
          item.classList.toggle("is-active", item === button);
          item.setAttribute("aria-pressed", String(item === button));
        });
        filterArticles();
      });
    });

    search?.addEventListener("input", filterArticles);
    filterArticles();
  }

  document.querySelectorAll("[data-current-year]").forEach(function (element) {
    element.textContent = String(new Date().getFullYear());
  });
})();
