const issuesApi = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

const issuesContainer = document.getElementById("issuesContainer");
const loadingSpinner = document.getElementById("loadingSpinner");

let allIssuesData = [];

async function loadAllIssues() {
  showLoading();

  try {
    const response = await fetch(issuesApi);
    const data = await response.json();

    allIssuesData = data.data;

    renderIssueCards(allIssuesData);
  } catch (error) {
    console.log("Error loading issues");
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

<h3 class="font-semibold text-lg mb-2">
${issue.title}
</h3>

<p class="text-sm text-gray-600 mb-3">
${issue.description}
</p>

<div class="text-sm space-y-1">

<p><strong>Author:</strong> ${issue.author}</p>

<p><strong>Priority:</strong> ${issue.priority}</p>

<p><strong>Label:</strong> ${issue.labels.join(", ")}</p>

<p class="text-gray-500 text-xs">
Created: ${issue.createdAt}
</p>

</div>

`;

  return card;
}

function showLoading() {
  loadingSpinner.classList.remove("hidden");
}

function hideLoading() {
  loadingSpinner.classList.add("hidden");
}

document.addEventListener("DOMContentLoaded", function () {
  loadAllIssues();
});
