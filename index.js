const listE1 = document.querySelector(".extensions-list ul");
const allBtn = document.querySelector(".allBtn");
const activeBtn = document.querySelector(".activeBtn");
const inactiveBtn = document.querySelector(".inactiveBtn");
const themeToggleLight = document.querySelector(".theme-toggle-light");
const themeToggleDark = document.querySelector(".theme-toggle-dark");
const backgroundBody = document.querySelector("body");
const topbar = document.querySelector(".top-bar");
const topbarLightLogo = document.querySelector(".top-bar-logo");
const topbarDarkLogo = document.querySelector(".top-bar-dark-logo");

let extensions = [];
// let activeExtensionsBox = [];
// let inactiveExtensionsBox = [];

fetch("./data.json") // use fetch to get the file
  .then(function (response) {
    // when the file is found and downloaded, run this function with the "response" object
    return response.json(); // convert the response into real js (array or object)
    // response.json return another promise
  })
  .then(function (data) {
    extensions = data;

    renderList(extensions);
  });

function renderList(items) {
  listE1.innerHTML = "";
  items.forEach((post) => {
    listE1.insertAdjacentHTML(
      "beforeend",
      `<li class="extension-item dark-theme">
          <div class="extension-item-info">
            <img src="${post.logo}" alt="${post.name}" class="extension-logo" />
            <div class="extension-content">
              <h2>${post.name}</h2>
              <p>${post.description}</p>
            </div>
          </div>
          <div class="extension-actions">
            <button type="button" class="removeBtn">Remove</button>
            <div class="status-indicator ${
              post.isActive ? "status-indicator-active" : ""
            }">
              <div class="circle"></div>
            </div>
          </div>
        </li>`
    );
  });

  const statusIndicator = document.querySelectorAll(".status-indicator");
  const removeBtn = document.querySelectorAll(".removeBtn");

  statusIndicator.forEach((indicator, index) => {
    indicator.addEventListener("click", function () {
      if (indicator.classList.contains("status-indicator-active")) {
        indicator.classList.remove("status-indicator-active");
        extensions[index].isActive = false;
      } else {
        indicator.classList.add("status-indicator-active");
        extensions[index].isActive = true;
      }
    });
  });

  removeBtn.forEach((removeItem) => {
    removeItem.addEventListener("click", function () {
      const item = removeItem.closest(".extension-item");
      const itemName = item.querySelector("h2").textContent;
      extensions = extensions.filter((ext) => ext.name !== itemName);
      item.remove();
    });
  });

  applySavedTheme();
}

// let currentFilter = "all";

function showAllExtensions() {
  // currentFilter = "all";
  renderList(extensions);
  // allBtn.style.backgroundColor = "hsl(3, 86%, 64%)";
  // activeBtn.style.backgroundColor = "hsl(225, 23%, 24%)";
  // inactiveBtn.style.backgroundColor = "hsl(225, 23%, 24%)";
  // allBtn.classList.add("active");
  // activeBtn.classList.remove("active");
  // inactiveBtn.classList.remove("active");
}

// allBtn.addEventListener("click", function () {
//   renderList(extensions);
//   allBtn.style.backgroundColor = "hsl(3, 86%, 64%)";
//   activeBtn.style.backgroundColor = "hsl(225, 23%, 24%)";
//   inactiveBtn.style.backgroundColor = "hsl(225, 23%, 24%)";
// });

function showActiveExtensions() {
  // currentFilter = "active";
  var activeExtensions = extensions.filter(function (ext) {
    return ext.isActive === true;
  });
  // activeBtn.classList.add("active");
  // allBtn.classList.remove("active");
  // inactiveBtn.classList.remove("active");

  renderList(activeExtensions);
}

// activeBtn.addEventListener("click", function () {
//   var activeExtensions = extensions.filter(function (ext) {
//     return ext.isActive === true;
//   });
//   activeBtn.style.backgroundColor = "hsl(3, 86%, 64%)";
//   allBtn.style.backgroundColor = "hsl(225, 23%, 24%)";
//   inactiveBtn.style.backgroundColor = "hsl(225, 23%, 24%)";

//   renderList(activeExtensions);
// });

function showInactiveExtensions() {
  // currentFilter = "inactive";
  var inactiveExtensions = extensions.filter(function (ext) {
    return ext.isActive === false; // keep only inactive ones
  });
  // inactiveBtn.classList.add("active");
  // allBtn.classList.remove("active");
  // activeBtn.classList.remove("active");

  renderList(inactiveExtensions);
}

// inactiveBtn.addEventListener("click", function () {
//   var inactiveExtensions = extensions.filter(function (ext) {
//     return ext.isActive === false; // keep only inactive ones
//   });
//   inactiveBtn.style.backgroundColor = "hsl(3, 86%, 64%)";
//   allBtn.style.backgroundColor = "hsl(225, 23%, 24%)";
//   activeBtn.style.backgroundColor = "hsl(225, 23%, 24%)";

//   renderList(inactiveExtensions);
// });

allBtn.addEventListener("click", showAllExtensions);
activeBtn.addEventListener("click", showActiveExtensions);
inactiveBtn.addEventListener("click", showInactiveExtensions);

function setLightTheme() {
  localStorage.setItem("theme", "light");
  const removeBtn = document.querySelectorAll(".removeBtn");
  const extensionItems = document.querySelectorAll(".extension-item");
  backgroundBody.classList.remove("dark-theme");
  backgroundBody.classList.add("light-theme");

  themeToggleDark.style.display = "block"; // show moon
  themeToggleLight.style.display = "none"; // hide sun
  topbar.classList.remove("dark-theme");
  topbar.classList.add("light-theme");
  topbarDarkLogo.style.display = "block";
  topbarLightLogo.style.display = "none";

  allBtn.classList.remove("dark-theme");
  activeBtn.classList.remove("dark-theme");
  inactiveBtn.classList.remove("dark-theme");

  allBtn.classList.add("light-theme");
  activeBtn.classList.add("light-theme");
  inactiveBtn.classList.add("light-theme");

  removeBtn.forEach((btn) => {
    btn.style.color = "black";
    btn.style.backgroundColor = "white";
  });

  extensionItems.forEach((item) => {
    item.classList.remove("dark-theme");
    item.classList.add("light-theme");
  });
}

function setDarkTheme() {
  localStorage.setItem("theme", "dark");
  const extensionItems = document.querySelectorAll(".extension-item");
  backgroundBody.classList.remove("light-theme");
  backgroundBody.classList.add("dark-theme");

  topbar.classList.remove("light-theme");
  topbarDarkLogo.style.display = "none";
  topbarLightLogo.style.display = "block";
  themeToggleDark.style.display = "none"; // hide moon
  themeToggleLight.style.display = "block"; // show sun

  allBtn.classList.remove("light-theme");
  activeBtn.classList.remove("light-theme");
  inactiveBtn.classList.remove("light-theme");

  allBtn.classList.add("dark-theme");
  activeBtn.classList.add("dark-theme");
  inactiveBtn.classList.add("dark-theme");

  extensionItems.forEach((item) => {
    item.classList.remove("light-theme");
    item.classList.add("dark-theme");
  });
}

function setActiveButton(button) {
  [allBtn, activeBtn, inactiveBtn].forEach((btn) =>
    btn.classList.remove("active")
  );
  button.classList.add("active");
}

allBtn.addEventListener("click", function () {
  setActiveButton(allBtn);
});

activeBtn.addEventListener("click", function () {
  setActiveButton(activeBtn);
});

inactiveBtn.addEventListener("click", function () {
  setActiveButton(inactiveBtn);
});

function applySavedTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    setLightTheme();
  } else {
    setDarkTheme();
  }
}

// Attach functions to each icon
themeToggleLight.addEventListener("click", setLightTheme);
themeToggleDark.addEventListener("click", setDarkTheme);
