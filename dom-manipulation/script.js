document.addEventListener('DOMContentLoaded', function () {
  const Display = document.getElementById('quoteDisplay');
  const btn = document.getElementById('newQuote');
  const n_quote = document.getElementById('newQuoteText');
  const nQC = document.getElementById('newQuoteCategory');

  // Global quote array
  const quoteArray = [
    { text: "Frontend finesse meets backend logic.", category: "Tech" },
    { text: "Every bug is a lesson.", category: "Wisdom" },
    { text: "Code like poetry, debug like a detective.", category: "Creative" }
  ];

  // Show a random quote
  btn.addEventListener('click', showRandomQuote);
  function showRandomQuote() {
    const index = Math.floor(Math.random() * quoteArray.length);
    const quote = quoteArray[index];
    Display.innerHTML = `"${quote.text}" — ${quote.category}`;
  }

  // Add a new quote
  const addBtn = document.getElementById('addQuote'); // Make sure this button exists in your HTML
  addBtn.addEventListener('click', addQuote);

  function addQuote() {
    const newText = n_quote.value.trim();
    const newCategory = nQC.value.trim();

    if (newText && newCategory) {
      quoteArray.push({ text: newText, category: newCategory });

      // Clear inputs
      n_quote.value = "";
      nQC.value = "";

      // Optional: show the newly added quote
      Display.textContent = `"${newText}" — ${newCategory}`;
    } else {
      alert("Please enter both a quote and a category.");
    }
  }
});