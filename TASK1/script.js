// ================================
// Typing Animation
// ================================

const typing = document.getElementById("typing");

if (typing) {
  const words = [
    "Aspiring Software Developer",
    "Frontend Web Developer",
    "Python Enthusiast",
    "Java Learner",
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentWord = words[wordIndex];

    if (!isDeleting) {
      typing.textContent = currentWord.substring(0, charIndex++);
    } else {
      typing.textContent = currentWord.substring(0, charIndex--);
    }

    let speed = 120;

    // Stop after full word is typed
    if (!isDeleting && charIndex === currentWord.length) {
      speed = 1800;
      isDeleting = true;
    }

    // Move to next word
    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }

    setTimeout(typeEffect, speed);
  }

  typeEffect();
}

// ================================
// Active Navbar Link
// ================================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("header nav a");

function setActiveSection() {
  const top = window.scrollY;

  sections.forEach((sec) => {
    const id = sec.getAttribute("id");
    if (!id) return;

    const offset = sec.offsetTop - 150;
    const height = sec.offsetHeight;

    if (top >= offset && top < offset + height) {
      navLinks.forEach((link) => link.classList.remove("active"));
      const match = document.querySelector(`header nav a[href="#${id}"]`);
      if (match) match.classList.add("active");
    }
  });
}

window.addEventListener("scroll", setActiveSection, { passive: true });
setActiveSection();

// ================================
// Back To Top Button
// ================================

const topBtn = document.getElementById("topBtn");

if (topBtn) {
  const onScroll = () => {
    topBtn.style.display = window.scrollY > 300 ? "block" : "none";
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ================================
// Smooth Scroll
// ================================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (!href || href === "#" || href === "#top") return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
  });
});

// ================================
// Fade In Animation (Reveal)
// ================================

const revealElements = document.querySelectorAll(
  ".about,.skills,.education,.projects,.contact"
);

function reveal() {
  const windowHeight = window.innerHeight;
  const triggerAt = windowHeight - 120;

  revealElements.forEach((element) => {
    const revealTop = element.getBoundingClientRect().top;
    if (revealTop < triggerAt) {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }
  });
}

// Initial style (only for existing elements)
revealElements.forEach((element) => {
  element.style.opacity = "0";
  element.style.transform = "translateY(50px)";
  element.style.transition = "all .8s ease";
});

// Run after load + on scroll
window.addEventListener("scroll", reveal, { passive: true });
window.addEventListener("load", reveal);
reveal();

// ================================
// Contact Form
// ================================

const form = document.querySelector("form");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Thank you for contacting me! I will get back to you soon.");
    form.reset();
  });
}