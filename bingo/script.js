document.addEventListener("DOMContentLoaded", () => {
    const table = document.getElementById("bingo-table");
    const generateBtn = document.getElementById("generate-btn");
    const exportBtn = document.getElementById("export-btn");
    let words = [];

    //Loads words from JSON file
    fetch('list.json')
        .then(response => response.json())
        .then(data => {
            words = data;
            initializeTable();
            fillGrid();
        })
        .catch(error => console.error("Error when loading JSON list:", error));

    // Create a 5x5 static table
    function initializeTable() {
        for (let i = 0; i < 5; i++) {
            const row = document.createElement("tr");
            for (let j = 0; j < 5; j++) {
                const cell = document.createElement("td");
                row.appendChild(cell);
            }
            table.appendChild(row);
        }
    }

    // Fill the grid with words selected randomly
    function fillGrid() {
        if (words.length < 25) {
            alert("Not enough words to fill a 5x5 grid.");
            return;
        }

        const shuffled = words.sort(() => Math.random() - 0.5);
        const gridWords = shuffled.slice(0, 25);

        const cells = table.querySelectorAll("td");
        cells.forEach((cell, index) => {
            cell.textContent = gridWords[index];
        });
    }

    // Export the grid in PNG format
    function exportGridAsPng() {
        html2canvas(document.getElementById("bingo-container")).then(canvas => {
            const link = document.createElement("a");
            link.download = "bingo.png";
            link.href = canvas.toDataURL("image/png");
            link.click();
        });
    }

    // Buttons events
    generateBtn.addEventListener("click", fillGrid);
    exportBtn.addEventListener("click", exportGridAsPng);
});
