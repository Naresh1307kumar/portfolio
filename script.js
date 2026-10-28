(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 1. Footer Year
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Mobile Navigation Toggle
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    function closeNav() {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }

    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        closeNav();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        closeNav();
      }
    });

    window.matchMedia("(min-width: 961px)").addEventListener("change", function () {
      closeNav();
    });
  }

  // 3. Hero Pipeline: Highlight each stage cyclically
  var steps = document.querySelectorAll("#heroPipeline li");
  if (steps.length > 0) {
    var currentStep = 0;
    steps[0].classList.add("active");

    if (!reduceMotion) {
      setInterval(function () {
        steps[currentStep].classList.remove("active");
        currentStep = (currentStep + 1) % steps.length;
        steps[currentStep].classList.add("active");
      }, 1400);
    }
  }

  // 4. Interactive Architecture Inspector
  var archData = [
    {
      title: "Structure & Layout",
      text: "Structuring semantic HTML5 markup, responsive CSS layouts, and clear content hierarchies before writing application logic."
    },
    {
      title: "Frontend Architecture",
      text: "Building responsive, semantic, and high-performance interfaces using modern HTML5, CSS Grid/Flexbox, JavaScript ES6+, and React."
    },
    {
      title: "Application Logic & APIs",
      text: "Writing robust backend logic using Java (OOP, multithreading, collections) and Python RESTful endpoints for efficient business processing."
    },
    {
      title: "Database Engineering",
      text: "Structuring relational schemas, ACID-compliant transactions, and optimized SQL queries in PostgreSQL to secure application state."
    },
    {
      title: "Quality Assurance & Testing",
      text: "Cross-device responsiveness audits, cross-browser compatibility checks, and rigorous bug minimization before staging."
    },
    {
      title: "Cloud & CI/CD Delivery",
      text: "Automated Git version control, deployment pipelines on Vercel, and public domain hosting for instantaneous access."
    }
  ];

  var archButtons = document.querySelectorAll("#archNodes button");
  var archTitle = document.getElementById("archTitle");
  var archText = document.getElementById("archText");

  if (archButtons.length && archTitle && archText) {
    archButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var stepIndex = Number(btn.getAttribute("data-step"));
        if (!isNaN(stepIndex) && archData[stepIndex]) {
          var item = archData[stepIndex];
          archButtons.forEach(function (b) {
            b.setAttribute("aria-pressed", "false");
          });
          btn.setAttribute("aria-pressed", "true");
          archTitle.textContent = item.title;
          archText.textContent = item.text;
        }
      });
    });
  }

  // 5. Image error fallback
  document.querySelectorAll(".project-shot img, .brand-avatar, .contact-media img").forEach(function (img) {
    img.addEventListener("error", function () {
      console.warn("Could not load image:", img.src);
    });
  });

})();
