const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");


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

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  });
});




const scrollProgress = document.getElementById("scrollProgress");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;

  scrollProgress.style.width = scrollPercent + "%";
});


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


const fadeElements = document.querySelectorAll(".fade-in");

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        fadeObserver.unobserve(entry.target); 
      }
    });
  },
  { threshold: 0.15 }
);

fadeElements.forEach((el) => fadeObserver.observe(el));



const skillFills = document.querySelectorAll(".skill-fill");

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const level = fill.getAttribute("data-level"); 
        fill.style.width = level + "%";
        skillObserver.unobserve(fill);
      }
    });
  },
  { threshold: 0.4 }
);

skillFills.forEach((fill) => skillObserver.observe(fill));


const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});



const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault(); 

  formStatus.textContent = "Thanks! Your message has been noted — I'll get back to you soon.";
  contactForm.reset();

  setTimeout(() => {
    formStatus.textContent = "";
  }, 5000);
});


document.getElementById("year").textContent = new Date().getFullYear();

const themeToggle = document.getElementById("themeToggle");

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
