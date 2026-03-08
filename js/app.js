const issuesApi = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

const issuesContainer = document.getElementById("issuesContainer");
const loadingSpinner = document.getElementById("loadingSpinner");

const allTab = document.getElementById("allTab");
const openTab = document.getElementById("openTab");
const closedTab = document.getElementById("closedTab");

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

function renderIssueCards(issues) {
  issuesContainer.innerHTML = "";

  issues.forEach((issue) => {
    const card = createIssueCard(issue);

    issuesContainer.appendChild(card);
  });
}

function createIssueCard(issue) {
  const card = document.createElement("div");

  const borderColor =
    issue.status === "open" ? "border-green-500" : "border-purple-500";

  card.className = `bg-white rounded-lg shadow p-4 border-t-4 ${borderColor} cursor-pointer`;

  card.innerHTML = `

<div class="flex justify-between items-center mb-2">

<h3 class="font-semibold text-lg">
${issue.title}
</h3>

<span class="text-xs px-2 py-1 bg-gray-100 rounded">
${issue.priority}
</span>

</div>

<p class="text-sm text-gray-600 mb-3">
${issue.description}
</p>

<div class="flex gap-2 mb-3 flex-wrap">

${issue.labels
  .map(
    (label) => `
<span class="text-xs bg-gray-100 px-2 py-1 rounded">
${label}
</span>
`,
  )
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
