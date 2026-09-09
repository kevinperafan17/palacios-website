(function () {
  "use strict";
  document.documentElement.dataset.runtimeReady = "true";

  function init() {

  const header = document.querySelector("[data-header]");
  const nav = document.querySelector("[data-nav]");
  const navToggle = document.querySelector("[data-nav-toggle]");
  const conversionDock = document.querySelector(".conversion-dock");
  const progressBar = document.querySelector("[data-scroll-progress]");
  let headerFrame = null;

  function updatePageProgress() {
    if (!progressBar) return;
    const distance = document.documentElement.scrollHeight - window.innerHeight;
    const progress = distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0;
    progressBar.style.transform = `scaleX(${progress})`;
  }

  function updateHeader() {
    if (!header || header.classList.contains("site-header--solid")) return;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  }

  function scheduleHeaderUpdate() {
    if (headerFrame !== null) return;
    headerFrame = window.requestAnimationFrame(function () {
      updateHeader();
      updateConversionDock();
      updatePageProgress();
      headerFrame = null;
    });
  }

  function updateConversionDock() {
    if (!conversionDock) return;
    const suppress = window.innerWidth <= 640 && window.scrollY < 320;
    conversionDock.classList.toggle("is-suppressed", suppress);
    conversionDock.toggleAttribute("inert", suppress);
    conversionDock.setAttribute("aria-hidden", String(suppress));
  }

  function closeNav(restoreFocus) {
    if (!nav || !navToggle) return;
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Abrir menú");
    navToggle.querySelector("i")?.classList.replace("bi-x-lg", "bi-list");
    document.body.classList.remove("nav-open");
    if (restoreFocus) navToggle.focus();
  }

  function openNav() {
    if (!nav || !navToggle) return;
    nav.classList.add("is-open");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Cerrar menú");
    navToggle.querySelector("i")?.classList.replace("bi-list", "bi-x-lg");
    document.body.classList.add("nav-open");
    nav.querySelector("a")?.focus();
  }

  if (nav && navToggle) {
    navToggle.addEventListener("click", function () {
      const open = !nav.classList.contains("is-open");
      if (open) openNav();
      else closeNav(true);
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        closeNav(false);
      });
    });

    document.addEventListener("keydown", function (event) {
      if (!nav.classList.contains("is-open")) return;
      if (event.key === "Escape") {
        closeNav(true);
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = [navToggle, ...nav.querySelectorAll("a")];
      const currentIndex = focusable.indexOf(document.activeElement);
      const nextIndex = event.shiftKey
        ? (currentIndex <= 0 ? focusable.length - 1 : currentIndex - 1)
        : (currentIndex === focusable.length - 1 ? 0 : currentIndex + 1);
      event.preventDefault();
      focusable[nextIndex].focus();
    });

    document.addEventListener("pointerdown", function (event) {
      if (!nav.classList.contains("is-open")) return;
      if (nav.contains(event.target) || navToggle.contains(event.target)) return;
      closeNav(false);
    });

    window.matchMedia("(min-width: 1101px)").addEventListener("change", function (event) {
      if (event.matches) closeNav(false);
    });
  }

  updateHeader();
  updateConversionDock();
  updatePageProgress();
  document.addEventListener("scroll", scheduleHeaderUpdate, { passive: true });
  window.addEventListener("resize", updateConversionDock, { passive: true });

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const lowEndDevice =
    (navigator.deviceMemory !== undefined && navigator.deviceMemory <= 2) ||
    (navigator.deviceMemory === undefined && navigator.hardwareConcurrency <= 4);

  document.querySelectorAll("[data-spotlight]").forEach(function (surface) {
    if (reduceMotion || lowEndDevice) return;
    let pointerFrame = null;
    let pointerX = 0;
    let pointerY = 0;
    surface.addEventListener(
      "pointermove",
      function (event) {
        pointerX = event.clientX;
        pointerY = event.clientY;
        if (pointerFrame !== null) return;
        pointerFrame = window.requestAnimationFrame(function () {
          const bounds = surface.getBoundingClientRect();
          surface.style.setProperty("--spot-x", `${pointerX - bounds.left}px`);
          surface.style.setProperty("--spot-y", `${pointerY - bounds.top}px`);
          pointerFrame = null;
        });
      },
      { passive: true }
    );
  });

  document.querySelectorAll("[data-tilt-surface]").forEach(function (surface) {
    if (reduceMotion || lowEndDevice || !window.matchMedia("(pointer: fine)").matches) return;
    let frame = null;
    surface.addEventListener("pointermove", function (event) {
      if (frame !== null) return;
      frame = window.requestAnimationFrame(function () {
        const bounds = surface.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        surface.style.setProperty("--tilt-y", `${(x * 2.4).toFixed(2)}deg`);
        surface.style.setProperty("--tilt-x", `${(-y * 2).toFixed(2)}deg`);
        frame = null;
      });
    }, { passive: true });
    surface.addEventListener("pointerleave", function () {
      surface.style.setProperty("--tilt-x", "0deg");
      surface.style.setProperty("--tilt-y", "0deg");
    }, { passive: true });
  });

  function trackEvent(name, params) {
    if (typeof window.gtag !== "function") return;
    window.gtag("event", name, params || {});
  }

  document.addEventListener("click", function (event) {
    const element = event.target.closest("[data-event]");
    if (!element) return;
    trackEvent(element.dataset.event, {
        service_name: element.dataset.service || "general",
        link_url: element.href || "",
        page_location: window.location.href,
    });
  });

  document.addEventListener("toggle", function (event) {
    const detail = event.target.closest(".faq-list details");
    if (!detail?.open) return;
    const question = detail.querySelector("summary")?.textContent.trim() || "";
    trackEvent("faq_open", {
      service_name: detail.closest("[data-service]")?.dataset.service || "general",
      faq_question: question,
    });
  }, true);

  function setFormStatus(form, message, state) {
    const status = form.querySelector("[data-form-status]");
    if (!status) return;
    status.textContent = message;
    status.classList.toggle("is-error", state === "error");
    status.classList.toggle("is-ready", state === "ready");
  }

  document.querySelectorAll("[data-lead-form]").forEach(function (form) {
    form.addEventListener("input", function (event) {
      if (event.target.matches("input, select, textarea") && event.target.validity.valid) {
        event.target.removeAttribute("aria-invalid");
      }
    });

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

    const searchParameters = new URLSearchParams(window.location.search);
    const initialQuery = searchParameters.get("q");
    const initialCategory = searchParameters.get("category");
    if (search && initialQuery) search.value = initialQuery;
    if (initialCategory && Array.from(filters).some((button) => button.dataset.blogFilter === initialCategory)) {
      currentFilter = initialCategory;
      filters.forEach(function (button) {
        const active = button.dataset.blogFilter === initialCategory;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", String(active));
      });
    }

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
  }

  let initialized = false;
  function initializeOnIntent() {
    if (initialized) return;
    initialized = true;
    init();
  }

  ["pointermove", "pointerdown", "keydown", "scroll"].forEach(function (eventName) {
    window.addEventListener(eventName, initializeOnIntent, { once: true, passive: true });
  });
  window.addEventListener("click", initializeOnIntent, { once: true, capture: true, passive: true });
  window.setTimeout(initializeOnIntent, 12000);
})();
