const textSelector = document.querySelector("container > h3 > span");
const parentTextSelector = document.querySelector("container > h3");
const ageSelector = document.querySelectorAll("container > h3 > span")[1];

const texts = [
    "Web Development",
    "Web Design",
    "Games",
    "Java Development",
    "Javascript Delvelopment",
    "Python Development",
    "Backend Development",
    "Frontend Development",
    "Minecraft Plugins",
    "Too many projects"
]

function change() {
    const randomText = texts[Math.floor(Math.random() * texts.length)];
    parentTextSelector.classList.add("hide");

    setTimeout(() => {
        textSelector.innerText = randomText;
        parentTextSelector.classList.remove("hide");
    }, 500);
}

setInterval(change, 2000);

change();

const age = ((Date.now() - new Date("2007-12-29")) / (31557600000));
ageSelector.innerText = age.toFixed(7);

setInterval(() => {
    const age = ((Date.now() - new Date("2007-12-29")) / (31557600000));
    ageSelector.innerText = age.toFixed(7);
}, 5000);

// Modals

const modalTriggers = document.querySelectorAll(".modal-trigger");
const liveModalTrigger = modalTriggers[0];
const socialModalTrigger = modalTriggers[1];
const modals = document.querySelectorAll("modal");
const liveModal = modals[0];
const socialModal = modals[1];
const closeBtn = document.querySelectorAll(".closebtn");

liveModalTrigger.addEventListener("click", () => {
    liveModal.classList.add("open");
});

closeBtn.forEach(btn => btn.addEventListener("click", () => {
    liveModal.classList.remove("open");
    socialModal.classList.remove("open");
}));

socialModalTrigger.addEventListener("click", () => {
    socialModal.classList.add("open");
});

// color picker

if (localStorage.getItem("color-theme")) {
    document.documentElement.style.setProperty("--color-theme", localStorage.getItem("color-theme"));
}

const colorPicker = new iro.ColorPicker("colorpicker", {
    width: 350,
    color: getComputedStyle(document.documentElement).getPropertyValue("--color-theme").replace(/ /g, ""),
});

colorPicker.on(['color:init', 'color:change'], function (color) {
    // log the current color as a HEX string
    document.documentElement.style.setProperty("--color-theme", color.hexString);
    localStorage.setItem("color-theme", color.hexString);
});
let factor = 150;
const originalFactor = factor;
// animate section
let x = 0;
let nextCard = 0;
function step() {
    const section = document.querySelector("section");
    // return if section is hovered
    if (section.matches(":hover")) {
        // slow down and then stop
        factor *= 1.02;
        if (factor > originalFactor * 15) {
            factor = originalFactor * 15;
            return window.requestAnimationFrame(step);
        }
    } else {
        factor /= 1.02;
        if (factor < originalFactor) {
            factor = originalFactor;
        }
    }
    x += section.children[nextCard].offsetWidth * (1 / factor);
    // transform translate the section
    section.style.transform = `translateX(-${x}px)`;
    window.requestAnimationFrame(step);
    if (isHidden(section.children[nextCard])) {
        // delete the card and clone it
        const card = section.children[nextCard];
        card.remove();
        section.appendChild(card.cloneNode(true));
        // reset x without jittery effect
        x = 0;
        section.style.transform = `translateX(-${x}px)`;
    }
}

// execute step on loaded-cards event
window.addEventListener("loaded-cards", function () {
    window.requestAnimationFrame(step);
    const cards = document.querySelectorAll("section > *");
    cards.forEach(card => {
        card.style.width = `${document.querySelector("main").offsetWidth / 2}px`;
    });
});

// check if an element is visible 
function isHidden(el) {
    // main element
    const main = document.querySelector("main");
    // check if x pos is outside of the main element
    // get width of el
    const width = el.offsetWidth;
    // get x pos of el
    const x = el.getBoundingClientRect().x;

    // check if x pos + width is outside of the main element
    if (x + width < main.getBoundingClientRect().x) {
        return true;
    }
    if (x > main.getBoundingClientRect().x + main.offsetWidth) {
        return true;
    }
    return false;
}