const usernameInput = document.querySelector("#username");
const searchBtn = document.querySelector("#search-btn");
const userCard = document.querySelector("#user-card");
const avatarImg = document.querySelector("#avatar");
const nameEl = document.querySelector("#name");
const loginEl = document.querySelector("#login");
const bioEl = document.querySelector("#bio");
const followersEl = document.querySelector("#followers");
const followingEl = document.querySelector("#following");
const reposEl = document.querySelector("#repos");
const joinedEl = document.querySelector("#joined");

usernameInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        usernameInput.blur();
        searchBtn.click();
    }
});

async function fetchUser(name) {
    api = `https://api.github.com/users/${name}`;
    try {
        const res = await fetch(api);
        if (!res.ok) userCard.innerHTML = `User not Found!`;
        return await res.json();
    } catch (error) {
        console.error(error);
    }
}

searchBtn.addEventListener("click", async () => {
    const username = usernameInput.value.trim();
    const res = await fetchUser(username);
    console.log(res);
    usernameInput.value = "";

    avatarImg.src = res.avatar_url;
    nameEl.innerHTML = res.name;
    loginEl.innerHTML = res.login;
    bioEl.textContent = res.bio;
    reposEl.textContent = res.public_repos;
    joinedEl.textContent = res.created_at;
    followersEl.textContent = res.followers;
    followingEl.textContent = res.following;

    userCard.classList.remove("hidden");
});

document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        usernameInput.focus()
        usernameInput.select()
    }
});
