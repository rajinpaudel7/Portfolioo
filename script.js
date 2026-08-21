// script.js — handles all the interactive bits of the page.
// Nothing fancy here, just plain DOM APIs so it's easy to follow.
// Grouped into sections below, roughly in the order things happen on the page.

// ---- Navbar: background on scroll + mobile menu ----

const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

// Give the navbar a solid background once you've scrolled past the hero a bit,
// otherwise it stays transparent and blends into the top of the page.
window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// If someone taps a link in the mobile menu, close the menu right after —
// otherwise it just sits open over the section they meant to read.
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  });
});


// ---- Scroll progress bar at the very top of the page ----

const scrollProgress = document.getElementById("scrollProgress");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;

  scrollProgress.style.width = scrollPercent + "%";
});


// ---- Typing effect in the hero heading ----

const typedTextEl = document.getElementById("typedText");

const typingWords = [
 
  "BCS Student",
  "Cybersecurity Learner",
  "Networking Enthusiast",
  "Frontend Developer",
  "Web Developer",
  "Tech Explorer"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

// Classic type-pause-delete-repeat loop. Nothing clever, it just calls
// itself again with setTimeout using whatever speed fits the current step.
function typeLoop() {
  const currentWord = typingWords[wordIndex];

  charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
  typedTextEl.textContent = currentWord.substring(0, charIndex);

  let typingSpeed = isDeleting ? 60 : 110;

  if (!isDeleting && charIndex === currentWord.length) {
    // Reached the end of the word — hold for a beat before deleting it
    typingSpeed = 1400;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    // Fully deleted — move on to the next word in the list
    isDeleting = false;
    wordIndex = (wordIndex + 1) % typingWords.length;
    typingSpeed = 400;
  }

  setTimeout(typeLoop, typingSpeed);
}

typeLoop();


// ---- Fade elements in as they scroll into view ----
// Using IntersectionObserver here instead of a scroll listener since it's
// cheaper on performance — the browser only notifies us when something
// actually crosses into view, rather than us checking on every scroll tick.

const fadeElements = document.querySelectorAll(".fade-in");

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        fadeObserver.unobserve(entry.target); // done with this one, stop watching it
      }
    });
  },
  { threshold: 0.15 }
);

fadeElements.forEach((el) => fadeObserver.observe(el));


// ---- Skill bars fill up once they're visible ----

const skillFills = document.querySelectorAll(".skill-fill");

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const level = fill.getAttribute("data-level"); // e.g. "90" from the HTML
        fill.style.width = level + "%";
        skillObserver.unobserve(fill);
      }
    });
  },
  { threshold: 0.4 }
);

skillFills.forEach((fill) => skillObserver.observe(fill));


// ---- Back to top button ----

const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  // Only show the button once you've scrolled far enough that it's actually useful
  if (window.scrollY > 500) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


// ---- Contact form ----
// Heads up: this is front-end only, so it won't actually send an email
// anywhere yet. Wire it up to something like Formspree, EmailJS, or your
// own backend endpoint when you're ready to go live with it.

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault(); // don't let the browser reload the page on submit

  formStatus.textContent = "Thanks! Your message has been noted — I'll get back to you soon.";
  contactForm.reset();

  setTimeout(() => {
    formStatus.textContent = "";
  }, 5000);
});


// ---- Footer year ----
// Small thing, but it means I never have to remember to update the copyright year by hand.

document.getElementById("year").textContent = new Date().getFullYear();
// ---- Dark / Light mode toggle ----

const themeToggle = document.getElementById("themeToggle");

// Load saved preference (defaults to dark, your original design)
const savedTheme = localStorage.getItem("theme") || "dark";
if (savedTheme === "light") {
  document.body.setAttribute("data-theme", "light");
}

themeToggle.addEventListener("click", () => {
  const isLight = document.body.getAttribute("data-theme") === "light";

  if (isLight) {
    document.body.removeAttribute("data-theme");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
});