let currentLanguage = "en";
let quotes = [];
let currentIndex = null;

document.getElementById("new-quote").addEventListener("click", updateQuote);
document
  .getElementById("language-select")
  .addEventListener("change", changeLanguage);
document.getElementById("theme-toggle").addEventListener("click", toggleTheme);
const quoteTextField = document.getElementById("quote");
const quoteAuthorField = document.getElementById("author");
window.onload = () => {
  loadQuotes(currentLanguage);
};
async function loadQuotes(language) {
  const response = await fetch(`./assets/quotes_${language}.json`);
  const data = await response.json();
  quotes = data;
  if(!currentIndex) {
    updateQuote();
  } else {
    translateQuote();
  }
}

function updateQuote() {
  if (quotes.length > 0) {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    currentIndex = randomIndex;
    const quote = quotes[currentIndex];
    quoteTextField.textContent = `"${quote.text}"`;
    quoteAuthorField.textContent = `— ${quote.author}`;
  } else {
    quoteTextField.textContent = "Цитаты не загружены";
  }
}
function translateQuote() {
  const quote = quotes[currentIndex];
  quoteTextField.textContent = `"${quote.text}"`;
  quoteAuthorField.textContent = `— ${quote.author}`;
}

function changeLanguage() {
  currentLanguage = document.getElementById("language-select").value;
  loadQuotes(currentLanguage);
}

function toggleTheme() {
  document.body.classList.toggle("dark-theme");
}
