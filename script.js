/* ==========================================================
   AYUSH SILOIYA PORTFOLIO
========================================================== */

/* ==========================================================
   PRELOADER FADE OUT
========================================================== */
window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");

    setTimeout(() => {
        preloader.style.opacity = "0";
        setTimeout(() => (preloader.style.display = "none"), 600);
    }, 800);
});

/* ==========================================================
   SIDEMENU (MOBILE NAV)
========================================================== */
var sidemeu = document.getElementById("sidemenu");

function openmenu() {
    sidemeu.style.right = "0";
}

function closemenu() {
    sidemeu.style.right = "-250px";
}

/* ==========================================================
   TABS (ABOUT SECTION)
========================================================== */
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
    for (let link of tablinks) link.classList.remove("active-link");
    for (let content of tabcontents) content.classList.remove("active-tab");

    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

/* ==========================================================
   TYPED JS (HERO SECTION)
========================================================== */
var typed = new Typed(".auto-type", {
    strings: [
        "Data Engineer",
        "Analytics Engineer",
        "Cloud Data Specialist",
        "Real-Time Pipeline Expert",
        "GCP & BigQuery Engineer",
        "ETL/ELT Automation Expert"
    ],
    typeSpeed: 60,
    backSpeed: 40,
    loop: true
});

/* ==========================================================
   GSAP SCROLL REVEAL
========================================================== */
gsap.utils.toArray(".reveal").forEach((elem) => {
    gsap.fromTo(
        elem,
        { opacity: 0, y: 50 },
        {
            opacity: 1,
            y: 0,
            duration: 1.2,
            scrollTrigger: {
                trigger: elem,
                start: "top 80%",
            },
        }
    );
});

/* ==========================================================
   3D TILT EFFECT (Smooth Parallax)
========================================================== */
document.querySelectorAll(".tilt").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        card.style.transform = `
            perspective(900px)
            rotateX(${-(y / 25)}deg)
            rotateY(${x / 25}deg)
            scale(1.03)
        `;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = `
            perspective(900px)
            rotateX(0deg)
            rotateY(0deg)
            scale(1)
        `;
    });
});

/* ==========================================================
   PARTICLE ENGINE
========================================================== */

const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");

let particles = [];
let w, h;

function resizeCanvas() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.6;
        this.speedY = (Math.random() - 0.5) * 0.6;
        this.alpha = Math.random() * 0.8 + 0.2;
        this.color = `rgba(${100 + Math.random() * 155}, 
                           ${0 + Math.random() * 40}, 
                           255, ${this.alpha})`;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Respawn if out of bounds
        if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) {
            this.reset();
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    const count = Math.floor((w * h) / 8000); // Adjust density

    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach((p) => {
        p.update();
        p.draw();
    });

    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

/* ==========================================================
   CONTACT FORM (GOOGLE SHEETS)
========================================================== */

const scriptURL =
    "https://script.google.com/macros/s/AKfycbycdguVRKBjD-dvU6wd2mPG-tvj5a397gFfyDwzgKX4LLsxGoKZWmsm33_QBDfZ7_Mh/exec";

const form = document.forms["submit-to-google-sheet"];
const msg = document.getElementById("msg");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    fetch(scriptURL, { method: "POST", body: new FormData(form) })
        .then((response) => {
            msg.innerHTML = "Message sent! I will respond shortly.";
            setTimeout(() => {
                msg.innerHTML = "";
            }, 5000);
            form.reset();
        })
        .catch((error) => console.error("Error!", error.message));
});
