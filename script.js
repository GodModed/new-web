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

setInterval(() => {
    const age = ((Date.now() - new Date("2007-12-29")) / (31557600000));
    ageSelector.innerText = age.toFixed(7);
}, 250);

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