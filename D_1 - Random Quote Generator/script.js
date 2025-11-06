const quoteText = document.querySelector("#quote-text");
const authorName = document.querySelector("#author");
const categoryText = document.querySelector("#category");
const generateQuote = document.querySelector("#gen-btn");

async function getQuote() {
    try {
        const res = await fetch("https://api.api-ninjas.com/v1/quotes", {
            headers: {
                "X-Api-Key": "vZtiryFMwoJS7/y4IKEwiQ==TMhQvrc7l2xOsmIk",
            },
        });
        const data = await res.json();
        return data[0];
    } catch (err) {
        console.log(err);
    }
}

generateQuote.addEventListener("click", async () => {
    const { quote, author, category } = await getQuote();

    quoteText.textContent = quote;
    authorName.textContent = author;
    categoryText.textContent = category;

    console.log(quote, author, category);
});
