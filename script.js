const wrapper = document.querySelector(".horizontal-wrapper");

const navLinks = document.querySelectorAll(".nav-link");

const sections = document.querySelectorAll(".panel");

/* ========================= */
/* NAVIGATION CLICK */
/* ========================= */

navLinks.forEach((link) => {

  link.addEventListener("click", (e) => {

    e.preventDefault();

    const targetId = link.getAttribute("href");

    const targetSection = document.querySelector(targetId);

    const targetOffset = targetSection.offsetLeft;

    wrapper.style.transform = `translateX(-${targetOffset}px)`;

    updateActiveLink(targetId);

  });

});

/* ========================= */
/* ACTIVE LINK */
/* ========================= */

function updateActiveLink(activeId) {

  navLinks.forEach((link) => {

    link.classList.remove("active");

    if (link.getAttribute("href") === activeId) {
      link.classList.add("active");
    }

  });

}

/* ========================= */
/* WHEEL SCROLL SUPPORT */
/* ========================= */

let currentSection = 0;

window.addEventListener(
  "wheel",
  (e) => {

    if (window.innerWidth <= 768) return;

    if (e.deltaY > 0) {
      currentSection++;
    } else {
      currentSection--;
    }

    currentSection = Math.max(
      0,
      Math.min(currentSection, sections.length - 1)
    );

    const targetOffset =
      sections[currentSection].offsetLeft;

    wrapper.style.transform =
      `translateX(-${targetOffset}px)`;

    updateActiveLink(
      `#${sections[currentSection].id}`
    );

  },
  { passive: true }
);

/* ========================= */
/* RESIZE RESET */
/* ========================= */

window.addEventListener("resize", () => {

  if (window.innerWidth <= 768) {

    wrapper.style.transform = "translateX(0px)";

  }

});