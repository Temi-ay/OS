function updateTime() {
  const el = document.getElementById("timeElement");
  if (el) el.textContent = new Date().toLocaleString();
}
updateTime();
setInterval(updateTime, 1000);
const taskbar = document.getElementById("taskbar");
var biggestIndex = 1;
function bringToFront(element) {
  biggestIndex++;
  element.style.zIndex = biggestIndex;
  if (taskbar) taskbar.style.zIndex = biggestIndex + 1;
}
function dragElement(element) {
  if (!element) return;
  const header = document.getElementById(element.id + "header");
  const dragHandle = header || element;
  let initialX = 0, initialY = 0;
  dragHandle.onmousedown = function (e) {
    e = e || window.event;
    e.preventDefault();

    // Convert from transform-based centering to absolute pixel position
    // so drag math works correctly, without losing the current visual spot.
    const rect = element.getBoundingClientRect();
    element.style.transform = "none";
    element.style.top  = rect.top  + "px";
    element.style.left = rect.left + "px";

    initialX = e.clientX;
    initialY = e.clientY;
    element.style.cursor = "grabbing";
    bringToFront(element);

    document.onmousemove = function (e) {
      e = e || window.event;
      e.preventDefault();
      const dx = e.clientX - initialX;
      const dy = e.clientY - initialY;
      initialX = e.clientX;
      initialY = e.clientY;
      element.style.top  = (element.offsetTop  + dy) + "px";
      element.style.left = (element.offsetLeft + dx) + "px";
    };

    document.onmouseup = function () {
      document.onmousemove = null;
      document.onmouseup   = null;
      element.style.cursor = "default";
    };
  };
}
function closeWindow(element) {
  if (!element) return;
  element.style.display   = "none";
  element.style.top       = "50%";
  element.style.left      = "50%";
  element.style.transform = "translate(-50%, -50%)";
}
function openWindow(element) {
  if (!element) return;
  element.style.display = "flex";
  bringToFront(element);
}
function initializeWindow(element) {
  if (!element) return;
  dragElement(element);
  element.addEventListener("mousedown", () => bringToFront(element));
}
var selectedIcon = null;
function selectIcon(iconEl) {
  if (selectedIcon) selectedIcon.classList.remove("selected");
  iconEl.classList.add("selected");
  selectedIcon = iconEl;
}
function deselectIcon() {
  if (selectedIcon) selectedIcon.classList.remove("selected");
  selectedIcon = null;
}
function handleIconTap(iconEl, windowId) {
  const win = document.getElementById(windowId);
  if (iconEl.classList.contains("selected")) {
    deselectIcon();
    openWindow(win);
  } else {
    selectIcon(iconEl);
  }
}
function buildApp(items, sidebarId, displayId) {
  const sidebar = document.getElementById(sidebarId);
  const display = document.getElementById(displayId);
  if (!sidebar || !display) return;
  function showItem(index) {
    display.innerHTML = items[index].content;
    // Update active highlight
    const entries = sidebar.querySelectorAll(".sidebarEntry");
    entries.forEach((e, i) => e.classList.toggle("active", i === index));
  }
  items.forEach(function (item, index) {
    const entry = document.createElement("div");
    entry.className = "sidebarEntry";
    entry.innerHTML = `<p>${item.title}</p>`;
    entry.addEventListener("click", function () { showItem(index); });
    sidebar.appendChild(entry);
  });
  showItem(0);
}

var graceContent = [
  {
    title: "Building Things",
    content: `<p>My favorite thing is following manuals to build stuff like furniture or equipment.</p>`
  },
  {
    title: "Movies & TV",
    content: `<p>Watching movies and TV shows.</p>`
  },
  {
    title: "Music",
    content: `<p>Listening to music.</p>`
  }
];
var moonContent = [
  {
    title: "Distance",
    content: `<p>The Moon is about 384,400 km away from Earth on average — so far that all the planets in the solar system could fit in the gap between them.</p>`
  },
  {
    title: "Phases",
    content: `<p>The Moon goes through eight phases in roughly 29.5 days: New Moon, Waxing Crescent, First Quarter, Waxing Gibbous, Full Moon, Waning Gibbous, Last Quarter, and Waning Crescent.</p>`
  },
  {
    title: "Gravity",
    content: `<p>Gravity on the Moon is about 1/6th of Earth's. That means a 60 kg person would weigh only 10 kg there!</p>`
  },
  {
    title: "Far Side",
    content: `<p>The same side of the Moon always faces Earth. We never see the far side from the ground because the Moon rotates once for every orbit it completes.</p>`
  }
];
const welcomeScreen  = document.getElementById("Welcome");
const graceAppWindow = document.getElementById("GraceApp");
const moonAppWindow  = document.getElementById("MoonApp");
initializeWindow(welcomeScreen);
initializeWindow(graceAppWindow);
initializeWindow(moonAppWindow);
document.getElementById("welcomeclose").addEventListener("click", () => closeWindow(welcomeScreen));
document.getElementById("welcomeopen").addEventListener("click",  () => openWindow(welcomeScreen));
document.getElementById("GraceAppclose").addEventListener("click", () => closeWindow(graceAppWindow));
document.getElementById("MoonAppclose").addEventListener("click", () => closeWindow(moonAppWindow));
buildApp(graceContent, "graceSidebar", "graceDisplay");
buildApp(moonContent,  "moonSidebar",  "moonDisplay");
function handleWindowTap(element) {
  biggestIndex++; // Increment biggestIndex by 1
  element.style.zIndex = biggestIndex;
  if (topBar) {
    topBar.style.zIndex = biggestIndex + 1;
  }
  deselectIcon(selectedIcon);
}
function addWindowTapHandling(element) {
  if (!element) return;
  element.addEventListener("mousedown", () => handleWindowTap(element));
}
function initializeWindow(element) {
  if (!element) return;
  dragElement(element);
  addWindowTapHandling(element);
}
initializeWindow(welcomeScreen);
initializeWindow(graceAppWindow);
initializeWindow(moonAppWindow);
var content = [
  {
    title: "Building Things",
    content: `
      <p>My favorite thing is following manuals to build stuff like furniture or equipment.</p>
    `
  },
  {
    title: "Movies & TV",
    content: `
      <p>Watching movies and TV shows.</p>
    `
  },
  {
    title: "Music",
    content: `
      <p>Listening to music.</p>
    `
  }
];
function setContentDisplay(index) {
  const contentDisplay = document.getElementById("contentDisplay");
  if (!contentDisplay) return;
  const item = content[index];
  contentDisplay.innerHTML = item.content;
}
function addToSideBar(index) {
  const sidebar = document.getElementById("sidebar");
  if (!sidebar) return;
  const item = content[index];
  const newDiv = document.createElement("div");
  newDiv.style.padding = "8px";
  newDiv.style.cursor = "pointer";
  newDiv.style.borderRadius = "6px";
  newDiv.innerHTML = `<p style="margin: 0;">${item.title}</p>`;
  newDiv.addEventListener("click", function () {
    setContentDisplay(index);
  });
  sidebar.appendChild(newDiv);
}
for (let i = 0; i < content.length; i++) {
  addToSideBar(i);
}
setContentDisplay(0);
