(function () {
  "use strict";

  let initialized = false;

  function initMotion() {
    if (initialized) return;
    initialized = true;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowEndDevice =
      (navigator.deviceMemory !== undefined && navigator.deviceMemory <= 2) ||
      (navigator.deviceMemory === undefined && navigator.hardwareConcurrency <= 4);
    const scrollNarratives = [];
    let motionFrame = null;

    function trackEvent(name, params) {
      if (typeof window.gtag !== "function") return;
      window.gtag("event", name, params || {});
    }

    function updateScrollNarratives() {
      scrollNarratives.forEach(function (updateNarrative) {
        updateNarrative();
      });
    }

    function scheduleMotionUpdate() {
      if (motionFrame !== null) return;
      motionFrame = window.requestAnimationFrame(function () {
        updateScrollNarratives();
        motionFrame = null;
      });
    }

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    document.documentElement.dataset.motionReady = "true";
    document.documentElement.dataset.motionTier = reduceMotion ? "reduced" : lowEndDevice ? "low" : "full";
  
    function observeVisibility(element, callback, options) {
      if (!("IntersectionObserver" in window)) {
        callback(true);
        return null;
      }
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.target === element) callback(entry.isIntersecting, entry);
        });
      }, options || { threshold: 0.18 });
      observer.observe(element);
      return observer;
    }
  
    function observeOnce(element, callback, options) {
      if (!("IntersectionObserver" in window) || reduceMotion) {
        callback();
        return null;
      }
      const observer = new IntersectionObserver(function (entries) {
        if (!entries.some(function (entry) { return entry.isIntersecting; })) return;
        observer.disconnect();
        callback();
      }, options || { threshold: 0.18 });
      observer.observe(element);
      return observer;
    }
  
    function setupDecisionSystem() {
      const system = document.querySelector("[data-system-demo]");
      if (!system) return;
  
      const nodes = Array.from(system.querySelectorAll("[data-system-step]"));
      const status = system.querySelector("[data-system-status]");
      const stageLabel = system.querySelector("[data-system-stage-label]");
      const announcement = system.querySelector("[data-system-announcement]");
      const playback = system.querySelector("[data-system-playback]");
      const playbackIcon = playback?.querySelector("i");
      const playbackText = playback?.querySelector("span");
      const stages = [
        { key: "signal", label: "Señal detectada", rank: -1 },
        { key: "risk", label: "Riesgo priorizado", rank: 0 },
        { key: "control", label: "Control vinculado", rank: 1 },
        { key: "process", label: "Proceso conectado", rank: 2 },
        { key: "data", label: "Dato interpretado", rank: 2.5 },
        { key: "decision", label: "Decisión informada", rank: 3 },
      ];
      let stageIndex = reduceMotion ? stages.length - 1 : 0;
      let timer = null;
      let resumeTimer = null;
      let visible = true;
      let paused = reduceMotion;
      let hovering = false;
  
      function clearTimers() {
        window.clearTimeout(timer);
        window.clearTimeout(resumeTimer);
        timer = null;
        resumeTimer = null;
      }
  
      function render(nextIndex, announce) {
        stageIndex = Math.max(0, Math.min(stages.length - 1, nextIndex));
        const stage = stages[stageIndex];
        system.dataset.systemStage = stage.key;
        nodes.forEach(function (node) {
          const nodeIndex = Number(node.dataset.systemIndex);
          const active = node.dataset.systemStep === stage.key;
          const complete = nodeIndex <= stage.rank;
          node.classList.toggle("is-active", active);
          node.classList.toggle("is-complete", complete);
          node.setAttribute("aria-pressed", String(active));
        });
        if (status) status.textContent = stage.label;
        if (stageLabel) stageLabel.lastChild.textContent = stage.label;
        if (announce && announcement) announcement.textContent = `${stage.label}. Etapa conceptual seleccionada.`;
      }
  
      function schedule(delay) {
        window.clearTimeout(timer);
        if (paused || hovering || reduceMotion || !visible || document.hidden) return;
        timer = window.setTimeout(function () {
          render((stageIndex + 1) % stages.length, false);
          schedule(stageIndex === stages.length - 1 ? 1750 : 1180);
        }, delay || 1180);
      }
  
      function pauseTemporarily(duration) {
        window.clearTimeout(timer);
        window.clearTimeout(resumeTimer);
        if (paused || reduceMotion) return;
        resumeTimer = window.setTimeout(function () {
          schedule(500);
        }, duration);
      }
  
      function updatePlayback() {
        if (!playback) return;
        if (reduceMotion) {
          playback.disabled = true;
          playback.setAttribute("aria-label", "Secuencia estática por preferencia de movimiento reducido");
          if (playbackText) playbackText.textContent = "Estático";
          playbackIcon?.classList.replace("bi-pause-fill", "bi-pause-circle");
          return;
        }
        playback.setAttribute("aria-label", paused ? "Reproducir secuencia" : "Pausar secuencia");
        if (playbackText) playbackText.textContent = paused ? "Reproducir" : "Pausar";
        playbackIcon?.classList.toggle("bi-play-fill", paused);
        playbackIcon?.classList.toggle("bi-pause-fill", !paused);
      }
  
      nodes.forEach(function (node) {
        const targetIndex = stages.findIndex(function (stage) {
          return stage.key === node.dataset.systemStep;
        });
        node.addEventListener("click", function () {
          render(targetIndex, true);
          pauseTemporarily(6000);
          trackEvent("concept_system_interaction", {
            service_name: "home",
            system_stage: node.dataset.systemStep,
          });
        });
        if (finePointer && !reduceMotion) {
          node.addEventListener("pointerenter", function () {
            hovering = true;
            window.clearTimeout(timer);
            render(targetIndex, false);
          });
          node.addEventListener("pointerleave", function () {
            hovering = false;
            schedule(750);
          });
        }
      });
  
      playback?.addEventListener("click", function () {
        paused = !paused;
        clearTimers();
        updatePlayback();
        if (!paused) schedule(300);
      });
  
      observeVisibility(system, function (isVisible) {
        visible = isVisible;
        system.classList.toggle("is-system-visible", visible);
        system.closest(".hero")?.classList.toggle("is-motion-visible", visible);
        if (!visible) window.clearTimeout(timer);
        else schedule(450);
      }, { threshold: 0.2 });
  
      document.addEventListener("visibilitychange", function () {
        if (document.hidden) window.clearTimeout(timer);
        else schedule(450);
      });
  
      render(stageIndex, false);
      updatePlayback();
    }
  
    function setupServiceStory() {
      const story = document.querySelector("[data-service-story]");
      if (!story) return;
      const steps = Array.from(story.querySelectorAll("[data-story-step]"));
      const controls = Array.from(story.querySelectorAll("[data-story-control]"));
      const from = story.querySelector("[data-story-from]");
      const to = story.querySelector("[data-story-to]");
      const labels = {
        auditoria: ["Riesgo", "Evidencia"],
        "propiedad-horizontal": ["Gestión", "Control"],
        innovacion: ["Dato", "Decisión"],
      };
  
      function setActive(slug) {
        const index = Math.max(0, steps.findIndex(function (step) {
          return step.dataset.storyStep === slug;
        }));
        steps.forEach(function (step) {
          step.classList.toggle("is-story-active", step.dataset.storyStep === slug);
        });
        controls.forEach(function (control) {
          const active = control.dataset.storyControl === slug;
          control.classList.toggle("is-active", active);
          if (active) control.setAttribute("aria-current", "location");
          else control.removeAttribute("aria-current");
        });
        story.style.setProperty("--story-progress", String((index + 1) / steps.length));
        if (from) from.textContent = labels[slug]?.[0] || "Señal";
        if (to) to.textContent = labels[slug]?.[1] || "Decisión";
      }
  
      controls.forEach(function (control) {
        control.addEventListener("click", function () {
          setActive(control.dataset.storyControl);
        });
      });
  
      if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(function (entries) {
          const visibleEntries = entries
            .filter(function (entry) { return entry.isIntersecting; })
            .sort(function (a, b) {
              return Math.abs(a.boundingClientRect.top - window.innerHeight * 0.36)
                - Math.abs(b.boundingClientRect.top - window.innerHeight * 0.36);
            });
          if (visibleEntries[0]) setActive(visibleEntries[0].target.dataset.storyStep);
        }, { rootMargin: "-20% 0px -48%", threshold: [0.08, 0.35, 0.7] });
        steps.forEach(function (step) { observer.observe(step); });
      }
  
      setActive(steps[0]?.dataset.storyStep || "auditoria");
    }
  
    function setupProcessLine() {
      const line = document.querySelector("[data-process-line]");
      if (!line) return;
      const steps = Array.from(line.querySelectorAll("[data-process-step]"));
      const controls = Array.from(line.querySelectorAll("[data-process-control]"));
      let manualUntil = 0;
  
      function render(index, progress) {
        const activeIndex = Math.max(0, Math.min(steps.length - 1, index));
        line.style.setProperty("--process-progress", String(Math.max(0, Math.min(1, progress))));
        steps.forEach(function (step, stepIndex) {
          step.classList.toggle("is-active", stepIndex === activeIndex);
          step.classList.toggle("is-complete", stepIndex < activeIndex);
        });
        controls.forEach(function (control, controlIndex) {
          control.setAttribute("aria-pressed", String(controlIndex === activeIndex));
        });
      }
  
      function updateFromScroll() {
        if (Date.now() < manualUntil) return;
        const bounds = line.getBoundingClientRect();
        const travel = Math.max(1, bounds.height + window.innerHeight * 0.48);
        const raw = (window.innerHeight * 0.78 - bounds.top) / travel;
        const progress = Math.max(0, Math.min(1, raw));
        const index = Math.min(steps.length - 1, Math.floor(progress * steps.length));
        render(index, progress);
      }
  
      controls.forEach(function (control, index) {
        control.addEventListener("click", function () {
          manualUntil = Date.now() + 3500;
          render(index, (index + 1) / steps.length);
          trackEvent("method_step_interaction", {
            service_name: "home",
            method_step: control.textContent.trim(),
          });
        });
      });
  
      scrollNarratives.push(updateFromScroll);
      updateFromScroll();
    }
  
    function setupRiskLab() {
      const lab = document.querySelector("[data-risk-lab]");
      if (!lab) return;
      const points = Array.from(lab.querySelectorAll(".risk-point"));
      const trace = Array.from(lab.querySelectorAll(".risk-trace li"));
      let traceTimers = [];
  
      function clearTraceTimers() {
        traceTimers.forEach(function (timerId) { window.clearTimeout(timerId); });
        traceTimers = [];
      }
  
      function render(point, announce) {
        points.forEach(function (item) {
          const active = item === point;
          item.classList.toggle("is-active", active);
          item.setAttribute("aria-pressed", String(active));
        });
        ["probability", "impact", "responsible", "title", "risk", "control", "evidence", "result"].forEach(function (key) {
          const output = lab.querySelector(`[data-risk-output="${key}"]`);
          if (output) output.textContent = point.dataset[`risk${key.charAt(0).toUpperCase()}${key.slice(1)}`] || "";
        });
        const code = lab.querySelector('[data-risk-output="code"]');
        if (code) code.textContent = `${point.dataset.riskCode} · ${point.dataset.riskCategory}`;
        const inherent = lab.querySelector('[data-risk-bar="inherent"]');
        const residual = lab.querySelector('[data-risk-bar="residual"]');
        inherent?.style.setProperty("--chart-value", point.dataset.riskInherent);
        residual?.style.setProperty("--chart-value", point.dataset.riskResidual);
  
        clearTraceTimers();
        trace.forEach(function (item) { item.classList.remove("is-active"); });
        trace.forEach(function (item, index) {
          if (reduceMotion) item.classList.add("is-active");
          else traceTimers.push(window.setTimeout(function () { item.classList.add("is-active"); }, index * 130));
        });
        lab.classList.remove("is-chart-ready");
        window.requestAnimationFrame(function () {
          window.requestAnimationFrame(function () { lab.classList.add("is-chart-ready"); });
        });
        if (announce) {
          trackEvent("risk_matrix_interaction", {
            service_name: "auditoria",
            risk_code: point.dataset.riskCode,
          });
        }
      }
  
      points.forEach(function (point, index) {
        point.addEventListener("click", function () { render(point, true); });
        point.addEventListener("keydown", function (event) {
          if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"].includes(event.key)) return;
          event.preventDefault();
          let nextIndex = index;
          if (event.key === "Home") nextIndex = 0;
          else if (event.key === "End") nextIndex = points.length - 1;
          else if (["ArrowRight", "ArrowDown"].includes(event.key)) nextIndex = (index + 1) % points.length;
          else nextIndex = (index - 1 + points.length) % points.length;
          points[nextIndex].focus();
          render(points[nextIndex], true);
        });
      });
  
      observeOnce(lab, function () {
        lab.classList.add("is-in-view", "is-chart-ready");
        points.forEach(function (point, index) {
          if (reduceMotion) point.classList.add("is-revealed");
          else window.setTimeout(function () { point.classList.add("is-revealed"); }, index * 90);
        });
      }, { threshold: 0.2 });
      render(points[0], false);
    }
  
    function setupPropertyEcosystem() {
      const lab = document.querySelector("[data-ph-ecosystem]");
      if (!lab) return;
      const nodes = Array.from(lab.querySelectorAll("[data-ecosystem-node]"));
      const paths = Array.from(lab.querySelectorAll("[data-ecosystem-path]"));
      const responseCards = Array.from(lab.querySelectorAll(".ecosystem-response article"));
      const chain = Array.from(lab.querySelectorAll("[data-chain-index]"));
      const chainOrder = ["cartera", "finanzas", "contabilidad", "reportes", "consejo"];
      let responseTimers = [];
  
      function render(node, announce) {
        const slug = node.dataset.ecosystemNode;
        nodes.forEach(function (item) {
          const active = item === node;
          item.classList.toggle("is-active", active);
          item.setAttribute("aria-pressed", String(active));
        });
        paths.forEach(function (path) {
          path.classList.toggle("is-active", path.dataset.ecosystemPath === slug);
        });
        ["label", "problem", "intervention", "result"].forEach(function (key) {
          const output = lab.querySelector(`[data-ecosystem-output="${key}"]`);
          if (output) output.textContent = node.dataset[`ecosystem${key.charAt(0).toUpperCase()}${key.slice(1)}`] || "";
        });
        responseTimers.forEach(function (timerId) { window.clearTimeout(timerId); });
        responseTimers = [];
        responseCards.forEach(function (card) { card.classList.remove("is-active"); });
        responseCards.forEach(function (card, index) {
          if (reduceMotion) card.classList.add("is-active");
          else responseTimers.push(window.setTimeout(function () { card.classList.add("is-active"); }, index * 140));
        });
        const chainIndex = chainOrder.indexOf(slug);
        chain.forEach(function (item, index) {
          item.classList.toggle("is-active", chainIndex >= 0 && index <= chainIndex);
        });
        if (announce) {
          trackEvent("ecosystem_layer_interaction", {
            service_name: "propiedad-horizontal",
            ecosystem_layer: slug,
          });
        }
      }
  
      nodes.forEach(function (node, index) {
        node.addEventListener("click", function () { render(node, true); });
        if (finePointer) node.addEventListener("pointerenter", function () { render(node, false); });
        node.addEventListener("keydown", function (event) {
          if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"].includes(event.key)) return;
          event.preventDefault();
          let nextIndex = index;
          if (event.key === "Home") nextIndex = 0;
          else if (event.key === "End") nextIndex = nodes.length - 1;
          else if (["ArrowRight", "ArrowDown"].includes(event.key)) nextIndex = (index + 1) % nodes.length;
          else nextIndex = (index - 1 + nodes.length) % nodes.length;
          nodes[nextIndex].focus();
          render(nodes[nextIndex], true);
        });
      });
  
      observeOnce(lab, function () {
        lab.classList.add("is-in-view");
        nodes.forEach(function (node, index) {
          const revealNode = function () {
            node.classList.add("is-discovered");
            paths[index]?.classList.add("is-discovered");
          };
          if (reduceMotion) revealNode();
          else window.setTimeout(revealNode, index * 85);
        });
      }, { threshold: 0.15 });
      render(nodes[0], false);
    }
  
    function setupProcessComparator() {
      const comparator = document.querySelector("[data-process-comparator]");
      if (!comparator) return;
      const tabs = Array.from(comparator.querySelectorAll("[data-process-tab]"));
      const panels = Array.from(comparator.querySelectorAll("[data-process-panel]"));
      let userSelected = false;
      let automaticTimer = null;
      comparator.classList.add("is-enhanced");
  
      function setMode(mode, announce) {
        comparator.dataset.processMode = mode;
        tabs.forEach(function (tab) {
          const active = tab.dataset.processTab === mode;
          tab.setAttribute("aria-selected", String(active));
          tab.tabIndex = active ? 0 : -1;
        });
        panels.forEach(function (panel) {
          const active = panel.dataset.processPanel === mode;
          panel.hidden = !active;
          panel.classList.toggle("is-active", active);
          panel.classList.remove("is-entering");
          if (active) {
            window.requestAnimationFrame(function () {
              panel.classList.add("is-entering");
              panel.querySelectorAll("[data-chart]").forEach(function (chart) {
                chart.classList.add("is-chart-ready");
              });
            });
          }
        });
        if (announce) {
          trackEvent("process_comparator_interaction", {
            service_name: "innovacion",
            process_mode: mode,
          });
        }
      }
  
      tabs.forEach(function (tab, index) {
        tab.addEventListener("click", function () {
          userSelected = true;
          window.clearTimeout(automaticTimer);
          setMode(tab.dataset.processTab, true);
        });
        tab.addEventListener("keydown", function (event) {
          if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
          event.preventDefault();
          let nextIndex = index;
          if (event.key === "Home") nextIndex = 0;
          else if (event.key === "End") nextIndex = tabs.length - 1;
          else if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
          else nextIndex = (index - 1 + tabs.length) % tabs.length;
          tabs[nextIndex].focus();
          userSelected = true;
          window.clearTimeout(automaticTimer);
          setMode(tabs[nextIndex].dataset.processTab, true);
        });
      });
  
      observeOnce(comparator, function () {
        if (reduceMotion || userSelected) return;
        automaticTimer = window.setTimeout(function () {
          if (!userSelected && !document.hidden) setMode("automated", false);
        }, 1800);
      }, { threshold: 0.35 });
      setMode("manual", false);
    }
  
    function setupMethodSequences() {
      document.querySelectorAll("[data-method-sequence]").forEach(function (grid) {
        const cards = Array.from(grid.querySelectorAll("[data-method-card]"));
        observeOnce(grid, function () {
          if (reduceMotion) return;
          cards.forEach(function (card, index) {
            window.setTimeout(function () {
              cards.forEach(function (item) { item.classList.remove("is-active"); });
              card.classList.add("is-active");
              if (index === cards.length - 1) {
                window.setTimeout(function () { card.classList.remove("is-active"); }, 650);
              }
            }, index * 180);
          });
        }, { threshold: 0.25 });
      });
    }
  
    function setupCharts() {
      document.querySelectorAll("[data-chart]").forEach(function (chart) {
        observeOnce(chart, function () { chart.classList.add("is-chart-ready"); }, { threshold: 0.22 });
      });
    }
  
    function setupAmbientMotion() {
      document.querySelectorAll(".signal-rail").forEach(function (rail) {
        observeVisibility(rail, function (isVisible) {
          rail.classList.toggle("is-motion-visible", isVisible);
        }, { threshold: 0.01 });
      });
    }
  
    function setupSectionNavigation() {
      if (document.body.dataset.page !== "home" || !("IntersectionObserver" in window)) return;
      const links = Array.from(document.querySelectorAll('.site-nav a[href^="/#"]'));
      const targets = links.map(function (link) {
        return document.querySelector(new URL(link.href).hash);
      }).filter(Boolean);
      if (!targets.length) return;
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          const link = links.find(function (item) { return new URL(item.href).hash === `#${entry.target.id}`; });
          if (!link) return;
          link.classList.toggle("is-section-active", entry.isIntersecting);
          if (entry.isIntersecting) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      }, { rootMargin: "-28% 0px -58%", threshold: 0 });
      targets.forEach(function (target) { observer.observe(target); });
    }
  
    setupDecisionSystem();
    setupServiceStory();
    setupProcessLine();
    setupRiskLab();
    setupPropertyEcosystem();
    setupProcessComparator();
    setupMethodSequences();
    setupCharts();
    setupAmbientMotion();
    setupSectionNavigation();

    document.addEventListener("scroll", scheduleMotionUpdate, { passive: true });
    window.addEventListener("resize", scheduleMotionUpdate, { passive: true });
    updateScrollNarratives();
  }

  function initializeOnIntent() {
    initMotion();
  }

  ["pointerdown", "keydown", "scroll", "touchstart"].forEach(function (eventName) {
    window.addEventListener(eventName, initializeOnIntent, { once: true, passive: true });
  });
  if ("requestIdleCallback" in window) window.requestIdleCallback(initializeOnIntent, { timeout: 600 });
  else window.setTimeout(initializeOnIntent, 120);
})();
