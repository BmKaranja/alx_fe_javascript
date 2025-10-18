document.addEventListener('DOMContentLoaded', function () {
  const Display = document.getElementById('quoteDisplay');
  const n_quote = document.getElementById('newQuoteText');
  const nQC = document.getElementById('newQuoteCategory');
  const addBtn = document.getElementById('addQuote');
  const showBtn = document.getElementById('newQuote');
  const exportBtn = document.getElementById('exportQuotes');

  // Load quotes from localStorage or use default
  let quotes = JSON.parse(localStorage.getItem("quotes")) || [
    { text: "Frontend finesse meets backend logic.", category: "Tech" },
    { text: "Every bug is a lesson.", category: "Wisdom" },
    { text: "Code like poetry, debug like a detective.", category: "Creative" }
  ];

  // Save quotes to localStorage
  function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
  }

  // Display a random quote
  showBtn.addEventListener('click', function () {
    const index = Math.floor(Math.random() * quotes.length);
    const quote = quotes[index];
    Display.textContent = `"${quote.text}" — ${quote.category}`;

    // Save to sessionStorage
    sessionStorage.setItem("lastViewedQuote", JSON.stringify(quote));
  });

  // Add a new quote
  addBtn.addEventListener('click', function () {
    const newText = n_quote.value.trim();
    const newCategory = nQC.value.trim();

    if (newText && newCategory) {
      quotes.push({ text: newText, category: newCategory });
      saveQuotes();

      n_quote.value = "";
      nQC.value = "";

      Display.textContent = `"${newText}" — ${newCategory}`;
    } else {
      alert("Please enter both a quote and a category.");
    }
  });

  // Export quotes to JSON file
  exportBtn.addEventListener('click', function () {
    const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "quotes.json";
    link.click();

    URL.revokeObjectURL(url);
  });

  // Import quotes from JSON file
  window.importFromJsonFile = function (event) {
    const fileReader = new FileReader();
    fileReader.onload = function (e) {
      try {
        const importedQuotes = JSON.parse(e.target.result);
        if (Array.isArray(importedQuotes)) {
          quotes.push(...importedQuotes);
          saveQuotes();
          alert('Quotes imported successfully!');
        } else {
          alert('Invalid JSON format.');
        }
      } catch (err) {
        alert('Error parsing JSON file.');
      }
    };
    fileReader.readAsText(event.target.files[0]);
  };

  // Optional: Show last viewed quote from sessionStorage
  const lastQuote = sessionStorage.getItem("lastViewedQuote");
  if (lastQuote) {
    const quote = JSON.parse(lastQuote);
    Display.textContent = `"${quote.text}" — ${quote.category}`;
  }
});