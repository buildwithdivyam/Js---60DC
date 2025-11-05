const menu = document.querySelector('.menu');
const navItems = document.querySelector('.nav-items');
const jokeContainer = document.querySelector('.ul-container');

const category = ["any", "programming", "misc", "dark", "pun", "spooky", "christmas"];
const flags = ['nsfw', 'sexist', 'racist', 'political', 'religious', 'explicit'];
const amount = 10;
const jokePart = ['single', 'twopart'];

menu.addEventListener('click', () => navItems.classList.toggle('active'));

function getApi(categoryIndex = 1, typeIndex = 0) {
    return `https://v2.jokeapi.dev/joke/${category[categoryIndex]}?blacklistFlags=${flags.join(',')}&format=json&type=${jokePart[typeIndex]}&amount=${amount}`;
}

async function fetchJokes() {
    try {
        const res = await fetch(getApi());
        const data = await res.json();

        if (data.error) throw new Error(data.message || "API error");
        const jokesArray = data.jokes || [data];

        return jokesArray.map(joke => ({
            joke: joke.joke || `${joke.setup}\n${joke.delivery}`,
            jokeCategory: joke.category
        }));
    } catch (error) {
        console.error("Error fetching jokes:", error);
        return [];
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const jokes = await fetchJokes();
    const fragment = document.createDocumentFragment();

    jokes.forEach(joke => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="copy-btn" title="Copy">
                <i class="ri-clipboard-line"></i>
            </span>
            <p class="joke-text">${joke.joke}</p>
            <p class="li-category">
                <span>${joke.jokeCategory}</span>
            </p>`;
        fragment.appendChild(li);
    });

    jokeContainer.appendChild(fragment);
});

jokeContainer.addEventListener('click', (e) => {
    if (e.target.closest('.copy-btn')) {
        const jokeText = e.target.closest('li').querySelector('.joke-text').textContent;
        navigator.clipboard.writeText(jokeText);
        e.target.closest('.copy-btn').innerHTML = '<i class="ri-check-line"></i>';
        setTimeout(() => {
            e.target.closest('.copy-btn').innerHTML = '<i class="ri-clipboard-line"></i>';
        }, 1500);
    }
});
