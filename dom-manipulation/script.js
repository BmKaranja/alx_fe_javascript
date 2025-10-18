document.addEventListener('DOMContentLoaded', function () {
  const Display = document.getElementById('quoteDisplay');
  const n_quote = document.getElementById('newQuoteText');
  const nQC = document.getElementById('newQuoteCategory');
  const addBtn = document.getElementById('addQuote');
  const showBtn = document.getElementById('newQuote');
  const exportBtn = document.getElementById('exportQuotes');
  const categoryFilter = document.getElementById('categoryFilter');
  const resolveBtn = document.getElementById('resolveConflicts');
  const syncNotice = document.getElementById('syncNotice');

  const apiUrl = "https://jsonplaceholder.typicode.com/posts";

  let quotes = JSON.parse(localStorage.getItem("quotes")) || [
    { text: "Frontend finesse meets backend logic.", category: "Tech" },
    { text: "Every bug is a lesson.", category: "Wisdom" },
    { text: "Code like poetry, debug like a detective.", category: "Creative" }
  ];

  function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
  }

  function populateCategories() {
    const categories = [...new Set(quotes.map(q => q.category))];
    categoryFilter.innerHTML = '<option value="All">All</option>';
    categories.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat;
      option.textContent = cat;
      categoryFilter.appendChild(option);
    });

    const lastFilter = localStorage.getItem("lastSelectedCategory");
    if (lastFilter && categories.includes(lastFilter)) {
      categoryFilter.value = lastFilter;
      filterQuotes(lastFilter);
    } else {
      filterQuotes("All");
    }
  }

  function filterQuotes(selectedCategory) {
    const filtered = selectedCategory === "All"
      ? quotes
      : quotes.filter(q => q.category === selectedCategory);

    Display.innerHTML = "";
    if (filtered.length === 0) {
      Display.textContent = "No quotes found for this category.";
    } else {
      filtered.forEach(q => {
        const p = document.createElement("p");
        p.textContent = `"${q.text}" — ${q.category}`;
        Display.appendChild(p);
      });
    }

    localStorage.setItem("lastSelectedCategory", selectedCategory);
  }

  showBtn.addEventListener('click', function () {
    const index = Math.floor(Math.random() * quotes.length);
    const quote = quotes[index];
    Display.textContent = `"${quote.text}" — ${quote.category}`;
    sessionStorage.setItem("lastViewedQuote", JSON.stringify(quote));
  });

  addBtn.addEventListener('click', function () {
    const newText = n_quote.value.trim();
    const newCategory = nQC.value.trim();

    if (newText && newCategory) {
      quotes.push({ text: newText, category: newCategory });
      saveQuotes();

      n_quote.value = "";
      nQC.value = "";

      populateCategories();
      filterQuotes(categoryFilter.value);
    } else {
      alert("Please enter both a quote and a category.");
    }
  });

  exportBtn.addEventListener('click', function () {
    const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "quotes.json";
    link.click();
    URL.revokeObjectURL(url);
  });

  window.importFromJsonFile = function (event) {
    const fileReader = new FileReader();
    fileReader.onload = function (e) {
      try {
        const importedQuotes = JSON.parse(e.target.result);
        if (Array.isArray(importedQuotes)) {
          quotes.push(...importedQuotes);
          saveQuotes();
          populateCategories();
          filterQuotes(categoryFilter.value);
          showSyncNotification('Quotes imported successfully!');
        } else {
          alert('Invalid JSON format.');
        }
      } catch (err) {
        alert('Error parsing JSON file.');
      }
    };
    fileReader.readAsText(event.target.files[0]);
  };

  categoryFilter.addEventListener('change', function () {
    filterQuotes(this.value);
  });

  resolveBtn.addEventListener('click', function () {
    fetchQuotesFromServer();
    showSyncNotification("Manual sync triggered.");
  });

  function showSyncNotification(message) {
    syncNotice.textContent = message;
    setTimeout(() => {
      syncNotice.textContent = "";
    }, 5000);
  }

  function fetchQuotesFromServer() {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const serverQuotes = data.slice(0, 5).map(post => ({
          text: post.title,
          category: "Server"
        }));
        syncWithServer(serverQuotes);
      })
      .catch(err => console.error("Server fetch failed:", err));
  }

  function syncWithServer(serverQuotes) {
    let localQuotes = JSON.parse(localStorage.getItem("quotes")) || [];
    let updated = false;

    serverQuotes.forEach(sq => {
      const exists = localQuotes.some(lq => lq.text === sq.text);
      if (!exists) {
        localQuotes.push(sq);
        updated = true;
      }
    });

    if (updated) {
      localStorage.setItem("quotes", JSON.stringify(localQuotes));
      quotes = localQuotes;
      populateCategories();
      filterQuotes(categoryFilter.value);
      showSyncNotification("New quotes synced from server.");
    }
  }

  populateCategories();

  const lastQuote = sessionStorage.getItem("lastViewedQuote");
  if (lastQuote) {
    const quote = JSON.parse(lastQuote);
    Display.textContent = `"${quote.text}" — ${quote.category}`;
  }

  setInterval(fetchQuotesFromServer, 30000);
});