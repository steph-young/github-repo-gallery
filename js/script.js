//profile info will appear here
const overview = document.querySelector (".overview");

const username = "steph-young";
const repoList = document.querySelector (".repo-list");
const repoClass = document.querySelector (".repos");
const repoDataClass = document.querySelector (".repo-data");
const backButton = document.querySelector (".view-repos");
const filterInput = document.querySelector (".filter-repos");

//fetches info from GitHub profile
const profileInfo = async function () {
    const userInfo = await fetch (`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    displayInfo(data);
};

profileInfo();

//shows profile info from my profile
const displayInfo = function (data) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("user-info");
    newDiv.innerHTML = `    
    <figure>
    <img alt="user avatar" src=${data.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  </div>
`;
overview.append(newDiv);
myRepos();
};

//fetches my repos
const myRepos = async function () {
  const fetchRepos = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&limit=100`);
  const repoData = await fetchRepos.json();
  displayRepos(repoData);
};

const displayRepos = function (repos) {
  filterInput.classList.remove("hide");
  for (const eachRepo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${eachRepo.name}</h3>`;
    repoList.append(repoItem);
  }
};

repoList.addEventListener ("click", function(e) {
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    getRepoInfo(repoName);
  }
});

const getRepoInfo = async function (repoName) {
  const fetchRepoInfo = await fetch (`https://api.github.com/repos/${username}/${repoName}`);
  const repoInfo = await fetchRepoInfo.json();
  console.log(repoInfo);  

  const fetchLanguages = await fetch (repoInfo.languages_url);
  const languageData = await fetchLanguages.json();
  console.log(languageData);

  const languages = [];
  for (const lang in languageData) {
    languages.push(lang);
  }
  displayRepoInfo(repoInfo, languages);
};

//display individual repo info
const displayRepoInfo = function (repoInfo, languages) {
  backButton.classList.remove("hide");
  repoDataClass.innerHTML = "";
  repoDataClass.classList.remove("hide");
  repoClass.classList.add("hide");
  const newDiv = document.createElement("div");
  newDiv.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
      <p>Description: ${repoInfo.description}</p>
      <p>Default Branch: ${repoInfo.default_branch}</p>
      <p>Languages: ${languages.join(", ")}</p>
      <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;
    repoDataClass.append(newDiv);
};

backButton.addEventListener("click", function () {
  repoClass.classList.remove("hide");
  repoDataClass.classList.add("hide");
  backButton.classList.add("hide");
});

filterInput.addEventListener("input", function (e) {
  const searchText = e.target.value;
  const repos = document.querySelectorAll(".repo");
  const lowercase = searchText.toLowerCase();

    for (const eachRepo of repos) {
      const repoLower = eachRepo.innerText.toLowerCase();
      if (repoLower.includes(lowercase)) {
        eachRepo.classList.remove ("hide");
      } else {
        eachRepo.classList.add ("hide");
      }
    }
});