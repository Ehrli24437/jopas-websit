const header = document.getElementById("siteHeader");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.getElementById("primaryNav");
const whatsappNumber = "233547794253";

function updateHeader() {
  if (!header) return;
  header.classList.toggle("scrolled", window.scrollY > 24);
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    header.classList.toggle("menu-open", isOpen);
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      header.classList.remove("menu-open");
    });
  });
}

document.querySelectorAll(".whatsapp-form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const formType = form.dataset.formType || "JOPAS Website Inquiry";
    const lines = [`Hello JOPAS, I want to make a ${formType}.`];

    for (const [key, value] of formData.entries()) {
      if (String(value).trim()) {
        lines.push(`${key}: ${value}`);
      }
    }

    const message = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank", "noopener");
  });
});

const revealItems = document.querySelectorAll(".fade-up");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

document.querySelectorAll(".fleet-category").forEach((category) => {
  const slider = category.querySelector("[data-slider]");
  const previous = category.querySelector("[data-slide-prev]");
  const next = category.querySelector("[data-slide-next]");

  if (!slider || !previous || !next) return;

  const move = (direction) => {
    const card = slider.querySelector(".vehicle-card");
    const gap = 16;
    const distance = card ? card.getBoundingClientRect().width + gap : slider.clientWidth * 0.85;
    slider.scrollBy({ left: direction * distance, behavior: "smooth" });
  };

  previous.addEventListener("click", () => move(-1));
  next.addEventListener("click", () => move(1));
});
