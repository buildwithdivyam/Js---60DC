const menu = document.querySelector('.menu')
const navItems = document.querySelector('.nav-items')
const jokeContainer = document.querySelector('.ul-container')

let category = ["any", "programming", "misc", "dark", "pun", "spooky", "christmas"];
let flags = ['nsfw', 'sexist', 'racist', 'political', 'religious', 'explicit'];
let amount = 10;
let jokePart = ['single', 'twopart']

api = `https://v2.jokeapi.dev/joke/${category[1]}?blacklistFlags=${flags}&format=json&type=${jokePart[0]}&amount=${amount}`

menu.addEventListener('click', () => {
    navItems.classList.toggle('active');
})

async function fetchJokes(count) {
    try {
        const res = await fetch(api)
        const data = await res.json()

        return data.jokes.map(joke => ({
            joke: joke.joke,
            jokeCategory: joke.category
        }))

    } catch (error) {
        console.log(error)
    }
}

document.addEventListener('DOMContentLoaded', async (e) => {
    const jokes = await fetchJokes()

    jokes.forEach(joke => {
        const li = document.createElement('li')
        li.innerHTML =
            `<span class="copy-btn" title="Copy">
                <i class="ri-clipboard-line"></i>
            </span>
            <p class="joke-text">${joke.joke}</p>
            <p class="li-category">
                <span>${joke.jokeCategory}</span>
            </p>`
        jokeContainer.appendChild(li)
    })
})
