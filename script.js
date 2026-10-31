
document.addEventListener("DOMContentLoaded", () => {

  // ========================================
  // SAGORA MOBILE NAVIGATION MENU
  // ========================================

  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  function openMenu() {
    if (!menuToggle || !nav) return;

    nav.classList.add("open");
    menuToggle.classList.add("active");

    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation");
  }

  function closeMenu() {
    if (!menuToggle || !nav) return;

    nav.classList.remove("open");
    menuToggle.classList.remove("active");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  }

  if (menuToggle && nav) {

    menuToggle.addEventListener("click", (event) => {
      event.stopPropagation();

      const isOpen = nav.classList.contains("open");

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close menu after clicking a navigation link
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        closeMenu();
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (event) => {
      if (
        !nav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });

    // Close menu with Escape key
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    // Close menu when switching to desktop size
    window.addEventListener("resize", () => {
      if (window.innerWidth > 700) {
        closeMenu();
      }
    });
  }


  // ========================================
  // AUTOMATIC FOOTER YEAR
  // ========================================

  document.querySelectorAll(".year").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });


  // ========================================
  // SCROLL REVEAL ANIMATION
  // ========================================

  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);
          }

        });

      },
      {
        threshold: 0.12
      }
    );

    revealItems.forEach((item) => {
      revealObserver.observe(item);
    });

  } else {

    revealItems.forEach((item) => {
      item.classList.add("visible");
    });

  }


  // ========================================
  // PORTFOLIO CARD HOVER SUPPORT
  // ========================================

  document.querySelectorAll(".portfolio-card").forEach((card) => {

    card.addEventListener("mouseenter", () => {
      card.classList.add("is-hovered");
    });

    card.addEventListener("mouseleave", () => {
      card.classList.remove("is-hovered");
    });

  });


  // ========================================
  // PREVENT EMPTY LINK JUMPS
  // ========================================

  document.querySelectorAll('a[href="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {
      event.preventDefault();
    });

  });

});
