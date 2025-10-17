document.addEventListener('DOMContentLoaded', function() {
    const Display = document.getElementById('quoteDisplay');
    const btn = document.getElementById('newQuote');
    const n_quote= document.getElementById('new')

    btn.addEventListener('click', showRandomQuote)
    function showRandomQuote(){
        const quoteArray=[
            { text: "Frontend finesse meets backend logic.", category: "Tech" },
            { text: "Every bug is a lesson.", category: "Wisdom" },
            { text: "Code like poetry, debug like a detective.", category: "Creative" }
        ];

        const q_values=Object.values(quoteArray)
        function getRandomQuote() {
            const index = Math.floor(Math.random() * q_values.length);
            return q_values[index];
        }
        
        const quote = getRandomQuote();
        Display.textContent = quote;
    }
})
