//profile info will appear here
const overview = document.querySelector (".overview");

const username = "steph-young";

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
};

