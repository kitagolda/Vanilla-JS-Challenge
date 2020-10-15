const API_URL = "https://api.github.com/users/";

const main = document.querySelector('main');
const searchForm = document.getElementById('serch-form');
const search = document.getElementById('search');

async function getUser(user){
    const userProfile = await(await (await fetch(API_URL + user)).json());

    console.log(userProfile);
    createUserCard(userProfile);
}

function createUserCard(user){
    main.innerHTML = '';

    const userEl = document.createElement('div');
    userEl.classList.add('profile-card');
    userEl.innerHTML = `
    <img src="${user.avatar_url}">
    <div class="profile-info">
        <h3>${user.name}</h3>
        <span>${user.login}</span>
        
        <p>${user.bio}</p>
        <ul>
            <li>${user.followers} Followers</li>
            <li>${user.following} Following</li>
            <li>${user.public_repos} Repos</li>
        </ul>
    </div>
    `;

    main.appendChild(userEl);
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchText = search.value;

    if(searchText){
        getUser(searchText);
    }
    
});
