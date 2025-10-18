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
 function createAddQuoteForm() {
  const formContainer = document.createElement('div');

  const quoteInput = document.createElement('input');
  quoteInput.id = 'newQuoteText';
  quoteInput.type = 'text';
  quoteInput.placeholder = 'Enter a new quote';

  const categoryInput = document.createElement('input');
  categoryInput.id = 'newQuoteCategory';
  categoryInput.type = 'text';
  categoryInput.placeholder = 'Enter quote category';

  const addButton = document.createElement('button');
  addButton.id = 'addQuote';
  addButton.textContent = 'Add Quote';
  addButton.addEventListener('click', addQuote); // assumes addQuote() is defined

  formContainer.appendChild(quoteInput);
  formContainer.appendChild(categoryInput);
  formContainer.appendChild(addButton);

  document.body.appendChild(formContainer);
}
});