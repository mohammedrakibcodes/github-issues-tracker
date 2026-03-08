const allTab = document.getElementById("allTab");
const openTab = document.getElementById("openTab");
const closedTab = document.getElementById("closedTab");

function setActiveTab(activeTab) {
  allTab.classList.remove("bg-purple-600", "text-white");
  openTab.classList.remove("bg-purple-600", "text-white");
  closedTab.classList.remove("bg-purple-600", "text-white");

  allTab.classList.add("border");
  openTab.classList.add("border");
  closedTab.classList.add("border");

  activeTab.classList.add("bg-purple-600", "text-white");
}

allTab.addEventListener("click", function () {
  setActiveTab(allTab);
});

openTab.addEventListener("click", function () {
  setActiveTab(openTab);
});

closedTab.addEventListener("click", function () {
  setActiveTab(closedTab);
});
