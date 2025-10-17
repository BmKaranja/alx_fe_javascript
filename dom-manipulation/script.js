document.addEventListener('DOMContentLoaded', function() {
    const Display = document.getElementById('quoteDisplay');
    const btn = document.getElementById('newQuote');
    const n_quote= document.getElementById('new')

    btn.addEventListener('click', showRandomQuote)
    function showRandomQuote(){
        const quoteArray={
            q1: "My name is Bryan...",
            q2: "Practicing JavaScript!",
            q3: "Every bug is a lesson.",
            q4: "Code like poetry, debug like a detective.",
            q5: "Frontend finesse meets backend logic."
        }
        const q_values=Object.values(quoteArray)
        function getRandomQuote() {
            const index = Math.floor(Math.random() * q_values.length);
            return q_values[index];
        }
        
        const quote = getRandomQuote();
        Display.textContent = quote;
    }
})
