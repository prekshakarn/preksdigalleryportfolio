document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const navLinks = document.querySelectorAll('.nav__links a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  const form = document.getElementById("contact-form");
  const confirmation = document.getElementById("form-confirmation");
  const successOverlay = document.getElementById("success-overlay");
  const successClose = document.getElementById("success-close");

  if (form && confirmation) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (!form.reportValidity()) return;

      const formData = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: form.method || "POST",
          body: formData,
          headers: { Accept: "application/json" },
        });

        if (!response.ok) {
          throw new Error("Form submission failed");
        }

        showSuccessOverlay();
        form.reset();
      } catch (err) {
        alert("There was an issue sending your message. Please try again.");
      }
    });
  }

  function showSuccessOverlay() {
    if (successOverlay) {
      successOverlay.classList.add("visible");
      burstEmojis();
      setTimeout(() => successOverlay.classList.remove("visible"), 3200);
    } else if (confirmation) {
      // fallback to original inline confirmation
      confirmation.textContent =
        "Thank you for reaching out — your message has been noted.";
      confirmation.classList.add("visible");
    }
  }

  if (successClose && successOverlay) {
    successClose.addEventListener("click", () => {
      successOverlay.classList.remove("visible");
    });
  }

  function burstEmojis() {
    if (!successOverlay) return;
    const emojis = ["✨", "💖", "🌸", "🤍", "🌟", "🎉", "🫧"];
    const count = 28;
    for (let i = 0; i < count; i++) {
      const el = document.createElement("span");
      el.className = "emoji-burst";
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      el.style.left = `${Math.random() * 100}%`;
      el.style.animationDuration = `${2 + Math.random() * 1.5}s`;
      el.style.fontSize = `${18 + Math.random() * 12}px`;
      successOverlay.appendChild(el);
      setTimeout(() => el.remove(), 2200);
    }
  }
});


