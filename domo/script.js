(function () {
  "use strict";

  const dialog = document.querySelector("[data-domo-dialog]");
  const image = dialog?.querySelector("[data-domo-dialog-image]");
  const title = dialog?.querySelector("[data-domo-dialog-title]");
  const description = dialog?.querySelector("[data-domo-dialog-description]");
  const closeButton = dialog?.querySelector("[data-domo-dialog-close]");
  let trigger = null;

  if (!dialog || !image || !title || !description || !closeButton) return;

  function closeDialog() {
    dialog.close();
    trigger?.focus();
    trigger = null;
  }

  document.querySelectorAll("[data-domo-shot]").forEach(function (button) {
    button.addEventListener("click", function () {
      trigger = button;
      image.src = button.dataset.image || "";
      image.alt = button.dataset.title || "Vista de la plataforma DOMO";
      title.textContent = button.dataset.title || "Vista de DOMO";
      description.textContent = button.dataset.description || "";
      dialog.showModal();

      if (typeof window.gtag === "function") {
        window.gtag("event", "domo_gallery_open", {
          gallery_item: button.dataset.title || "",
          service_name: "domo",
        });
      }
    });
  });

  closeButton.addEventListener("click", closeDialog);

  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) closeDialog();
  });

  dialog.addEventListener("close", function () {
    if (trigger) {
      trigger.focus();
      trigger = null;
    }
  });
})();
