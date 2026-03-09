const issuesApi = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

const issuesContainer = document.getElementById("issuesContainer");
const loadingSpinner = document.getElementById("loadingSpinner");

const allTab = document.getElementById("allTab");
const openTab = document.getElementById("openTab");
const closedTab = document.getElementById("closedTab");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const noResultsMessage = document.getElementById("noResultsMessage");

let allIssuesData = [];

async function loadAllIssues() {
  showLoading();

  try {
    const res = await fetch(issuesApi);
    const data = await res.json();

    allIssuesData = data.data;

    renderIssueCards(allIssuesData);
  } catch (error) {
    console.log("API error");
  }

  hideLoading();
}

async function searchIssues() {
  const query = searchInput.value.trim();

  if (query === "") {
    renderIssueCards(allIssuesData);
    return;
  }

  showLoading();

  try {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${query}`;

    const res = await fetch(url);
    const data = await res.json();

    renderIssueCards(data.data);
  } catch (error) {
    console.log("Search error");
  }

  hideLoading();
}

function renderIssueCards(issues) {
  issuesContainer.innerHTML = "";

  if (issues.length === 0) {
    noResultsMessage.classList.remove("hidden");
    return;
  }

  noResultsMessage.classList.add("hidden");

  issues.forEach((issue) => {
    const card = createIssueCard(issue);

    issuesContainer.appendChild(card);
  });
}

function createIssueCard(issue) {
  const card = document.createElement("div");

  card.addEventListener("click", function () {
    openIssueModal(issue.id);
  });

  const borderColor =
    issue.status === "open" ? "border-green-500" : "border-purple-500";

  let priorityColor = "bg-gray-200";

  if (issue.priority == "high") priorityColor = "bg-red-500 text-white";
  if (issue.priority == "medium") priorityColor = "bg-yellow-400 text-black";
  if (issue.priority == "low") priorityColor = "bg-green-500 text-white";

  card.className = `bg-white rounded-lg shadow p-4 border-t-4 ${borderColor} cursor-pointer hover:shadow-lg transition`;

  card.innerHTML = `

<div class="flex justify-between items-center mb-2">

<h3 class="font-semibold text-lg">
${issue.title}
</h3>

<span class="text-xs px-2 py-1 rounded ${priorityColor}">
${issue.priority}
</span>

</div>

<p class="text-sm text-gray-600 mb-3">
${issue.description}
</p>

<div class="flex gap-2 mb-3 flex-wrap">

${issue.labels
  .map((label) => {
    let labelStyle = "bg-gray-100 text-gray-700";

    if (label == "bug") labelStyle = "bg-red-100 text-red-700";
    if (label == "help wanted") labelStyle = "bg-yellow-100 text-yellow-700";
    if (label == "enhancement") labelStyle = "bg-green-100 text-green-700";

    return `
<span class="text-xs px-2 py-1 rounded ${labelStyle}">
${label}
</span>
`;
  })
  .join("")}

</div>

<div class="text-xs text-gray-500">

<p>#${issue.id} by ${issue.author}</p>
<p>${issue.createdAt}</p>

</div>

`;

  return card;
}

function setActiveTab(tab) {
  allTab.classList.remove("bg-purple-600", "text-white");
  openTab.classList.remove("bg-purple-600", "text-white");
  closedTab.classList.remove("bg-purple-600", "text-white");

  allTab.classList.add("border");
  openTab.classList.add("border");
  closedTab.classList.add("border");

  tab.classList.add("bg-purple-600", "text-white");
}

allTab.addEventListener("click", function () {
  setActiveTab(allTab);

  renderIssueCards(allIssuesData);
});

openTab.addEventListener("click", function () {
  setActiveTab(openTab);

  const openIssues = allIssuesData.filter((issue) => issue.status === "open");

  renderIssueCards(openIssues);
});

closedTab.addEventListener("click", function () {
  setActiveTab(closedTab);

  const closedIssues = allIssuesData.filter(
    (issue) => issue.status === "closed",
  );

  renderIssueCards(closedIssues);
});

function showLoading() {
  loadingSpinner.classList.remove("hidden");
}

function hideLoading() {
  loadingSpinner.classList.add("hidden");
}

document.addEventListener("DOMContentLoaded", function () {
  loadAllIssues();
});

const issueModal = document.getElementById("issueModal");
const modalTitle = document.getElementById("modalTitle");
const modalStatus = document.getElementById("modalStatus");
const modalAuthor = document.getElementById("modalAuthor");
const modalDate = document.getElementById("modalDate");
const modalLabels = document.getElementById("modalLabels");
const modalDescription = document.getElementById("modalDescription");
const modalAssignee = document.getElementById("modalAssignee");
const modalPriority = document.getElementById("modalPriority");
const closeModalBtn = document.getElementById("closeModalBtn");

async function openIssueModal(issueId) {
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`;

  const res = await fetch(url);
  const data = await res.json();

  const issue = data.data;

  modalTitle.textContent = issue.title;
  modalStatus.textContent = issue.status;
  modalAuthor.textContent = "Opened by " + issue.author;
  modalDate.textContent = issue.createdAt;
  modalDescription.textContent = issue.description;
  modalAssignee.textContent = issue.assignee;
  modalPriority.textContent = issue.priority;

  modalLabels.innerHTML = "";

  issue.labels.forEach((label) => {
    const labelTag = document.createElement("span");

    labelTag.className = "text-xs bg-gray-100 px-2 py-1 rounded";

    labelTag.textContent = label;

    modalLabels.appendChild(labelTag);
  });

  issueModal.classList.remove("hidden");

  issueModal.classList.add("flex");
}

closeModalBtn.addEventListener("click", function () {
  issueModal.classList.add("hidden");

  issueModal.classList.remove("flex");
});

searchBtn.addEventListener("click", function () {
  searchIssues();
});

searchInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    searchIssues();
  }
});
