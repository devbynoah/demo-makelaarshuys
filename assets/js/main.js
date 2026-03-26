const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const navbar = document.querySelector(".navbar");

if (navbar) {
  const setNavbarState = () => {
    if (window.scrollY > 60) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  setNavbarState();
  window.addEventListener("scroll", setNavbarState, { passive: true });
}

const navToggle = document.querySelector(".nav-toggle");
const mobileNav = document.querySelector(".mobile-nav");

if (navToggle && mobileNav) {
  const icon = navToggle.querySelector("i");
  const navLinks = mobileNav.querySelectorAll("a");
  const backdrop = document.createElement("button");

  backdrop.className = "mobile-nav-backdrop";
  backdrop.type = "button";
  backdrop.setAttribute("aria-label", "Sluit menu");
  document.body.appendChild(backdrop);

  const closeMenu = () => {
    mobileNav.classList.remove("is-open");
    backdrop.classList.remove("is-visible");
    document.body.classList.remove("menu-open");
    navToggle.setAttribute("aria-expanded", "false");
    if (icon) {
      icon.classList.add("fa-bars");
      icon.classList.remove("fa-xmark");
    }
  };

  const openMenu = () => {
    mobileNav.classList.add("is-open");
    backdrop.classList.add("is-visible");
    document.body.classList.add("menu-open");
    navToggle.setAttribute("aria-expanded", "true");
    if (icon) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-xmark");
    }
  };

  const setActiveMobileLink = () => {
    const current = window.location.pathname.split("/").pop() || "index.html";

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      const isMatch = href === current || (current === "" && href === "index.html");
      link.classList.toggle("active", isMatch);
    });
  };

  const syncMobileNavTop = () => {
    const fallbackTop = 116;
    const navBottom = navbar ? Math.round(navbar.getBoundingClientRect().bottom) : fallbackTop;
    document.documentElement.style.setProperty("--mobile-nav-top", `${Math.max(navBottom - 1, 0)}px`);
  };

  syncMobileNavTop();
  setActiveMobileLink();

  navToggle.addEventListener("click", () => {
    const isOpen = mobileNav.classList.contains("is-open");
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  backdrop.addEventListener("click", closeMenu);

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mobileNav.classList.contains("is-open")) {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    syncMobileNavTop();
    if (window.innerWidth > 900 && mobileNav.classList.contains("is-open")) {
      closeMenu();
    }
  });

  window.addEventListener("scroll", syncMobileNavTop, { passive: true });
}
