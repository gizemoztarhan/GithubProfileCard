const API_URL = "https://api.github.com/users/"


const form = document.getElementById('form');
const searchInput = document.getElementById('search');
const main = document.getElementById('main');





form.addEventListener('submit', (e) => {
  e.preventDefault();
  const user = searchInput.value.trim();

  if (user) { 
    getUser(user);
    searchInput.value = '';
  }

})



async function getUser(username) {
   main.innerHTML = `<p style="text-align:center;">Yükleniyor...</p>`;
  try {
    const { data } = await axios(API_URL + username)
    createUserCard(data)
    getRepos(username)
  } catch (err) {
     createErrorCard('Kullanıcı bulunamadı.');
    // main.innerHTML = `<div class="card">
    // <h2 style="color:#3b7fd6;; text-align:center;">Kullanıcı bulunamadı.</h2>
    // </div>`;
  }

}




function createUserCard(user) {

  const userName = user.name || user.login
  const userBio = user.bio ? `<p>${user.bio}</p>` : "";
  const cardHTML = `    
    <section class="card" aria-label="GitHub user profile">
      <img class="user-image" src=${user.avatar_url} alt="profile-photo" />

      <div class="user-info">
        <h2>${userName}</h2>
        <small>@${user.login}</small>
      </div>

      <article>
        <p>${userBio}</p>
      </article>

      <ul>
        <li>
          <i class="fa-solid fa-user-group" aria-hidden="true"></i>
          <strong>${user.followers}</strong> Followers
        </li>
        <li>
          <strong>${user.following}</strong> Following
        </li>
        <li>
          <i class="fa-solid fa-bookmark" aria-hidden="true"></i>
          <strong> ${user.public_repos}</strong> Repository
        </li>
      </ul>

      <div class="repos" id="repos" aria-label="User repositories">
        <a href="#">
          <i class="fa-solid fa-book-bookmark" aria-hidden="true"></i> Repo 1
        </a>
        <a href="#">
          <i class="fa-solid fa-book-bookmark" aria-hidden="true"></i> Repo 2
        </a>
        <a href="#">
          <i class="fa-solid fa-book-bookmark" aria-hidden="true"></i> Repo 3
        </a>
      </div>
    </section>`

  main.innerHTML = cardHTML;

}





async function getRepos(username) {
  try {
    const { data } = await axios (API_URL + username + '/repos')

    addReposToCard(data)
  } catch (err) {

    createErrorCard('Repoları çekerken hata oluştu.')
  }
}


function  createErrorCard(msg){

    const cardErrorHTML = `
    <div class="card">
    <h2 style="color:#3b7fd6; text-align:center;"> ${msg}</h2>
    </div>`;
    main.innerHTML = cardErrorHTML
}




function addReposToCard(repos) {

  const reposEl = document.getElementById("repos");
  reposEl.innerHTML = ""; // TEMİZLEMEZSE, birikir!

  repos.slice(0, 3).forEach(repo => {
    const repoLink = document.createElement("a");
    repoLink.href = repo.html_url;
    repoLink.target = "_blank";
    repoLink.innerHTML = `<i class="fa-solid fa-book-bookmark"></i> ${repo.name}`;
    reposEl.appendChild(repoLink);
  });
}

