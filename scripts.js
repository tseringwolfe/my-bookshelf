/**
 * Data Catalog Project Starter Code - SEA Stage 2
 *
 * This file is where you should be doing most of your work. You should
 * also make changes to the HTML and CSS files, but we want you to prioritize
 * demonstrating your understanding of data structures, and you'll do that
 * with the JavaScript code you write in this file.
 *
 * The comments in this file are only to help you learn how the starter code
 * works. The instructions for the project are in the README. That said, here
 * are the three things you should do first to learn about the starter code:
 * - 1 - Change something small in index.html or style.css, then reload your
 *    browser and make sure you can see that change.
 * - 2 - On your browser, right click anywhere on the page and select
 *    "Inspect" to open the browser developer tools. Then, go to the "console"
 *    tab in the new window that opened up. This console is where you will see
 *    JavaScript errors and logs, which is extremely helpful for debugging.
 *    (These instructions assume you're using Chrome, opening developer tools
 *    may be different on other browsers. We suggest using Chrome.)
 * - 3 - Add another string to the titles array a few lines down. Reload your
 *    browser and observe what happens. You should see a fourth "card" appear
 *    with the string you added to the array, but a broken image.
 *
 */

// This is an array of book objects, containing title, cover and details for each book
let books = [
    {
        title: "The Picture of Dorian Gray",
        image: "https://m.media-amazon.com/images/I/71GdwPedEFL._AC_UF1000,1000_QL80_DpWeblab_.jpg",
        details: ["Oscar Wilde", "Classic", "1890", "5"]
    },
    {
        title: "Pride and Prejudice",
        image: "https://m.media-amazon.com/images/I/712P0p5cXIL._AC_UF1000,1000_QL80_.jpg",
        details: ["Jane Austen", "Classic", "1813", "4.3"]
    },
    {
        title: "To the Lighthouse",
        image: "https://m.media-amazon.com/images/I/51RKwb538NL._AC_UF1000,1000_QL80_.jpg",
        details: ["Virginia Woolf", "Classic", "1927", "N/A"]
    },
    {
        title: "The Bell Jar",
        image: "https://m.media-amazon.com/images/I/81wUVpREPSL._AC_UF1000,1000_QL80_.jpg",
        details: ["Sylvia Plath", "Classic", "1963", "N/A"]
    },
    {
        title: "The Catcher in the Rye",
        image: "https://m.media-amazon.com/images/I/8125BDk3l9L.jpg",
        details: ["J.D. Salinger", "Classic", "1951", "3.9"]
    },
    {
        title: "When Breath Becomes Air",
        image: "https://m.media-amazon.com/images/I/61gwba1pQnL.jpg",
        details: ["Paul Kalanithi", "Memoir", "2016", "N/A"]
    },
    {
        title: "Educated",
        image: "https://m.media-amazon.com/images/I/81Om0n+pfyL.jpg",
        details: ["Tara Westover", "Memoir", "2018", "4.8"]
    },
    {
        title: "Crying in H-Mart",
        image: "https://m.media-amazon.com/images/I/81aS9JndklL.jpg",
        details: ["Michelle Zauner", "Memoir", "2021", "N/A"]
    },
    {
        title: "Foster",
        image: "https://groveatlantic.com/core/wp-content/uploads/2022/04/FosterHC.jpg",
        details: ["Claire Keegan", "Fiction", "2010", "4"]
    },
    {
        title: "I Who Have Never Known Men",
        image: "https://m.media-amazon.com/images/I/71+lTVEy8lL.jpg",
        details: ["Jacqueline Harpman", "Fiction", "1995", "3.9"]
    },
    {
        title: "The Seven Husbands of Evelyn Hugo",
        image: "https://i.redd.it/ga9po4pggwea1.jpg",
        details: ["Taylor Jenkins Reid", "Fiction", "2017", "5"]
    },
    {
        title: "A Man Called Ove",
        image: "https://m.media-amazon.com/images/I/81JDmCKnv0L.jpg",
        details: ["Fredrik Backman", "Fiction", "2012", "N/A"]
    }
];

// This function adds cards the page to display the data in the array
function showCards(filteredBooks = books) {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    const templateCard = document.querySelector(".card");

    filteredBooks.forEach((book) => {
        const nextCard = templateCard.cloneNode(true);
        editCardContent(nextCard, book);
        cardContainer.appendChild(nextCard);
    });
}

function editCardContent(card, book) {
    card.style.display = "flex";

    const cardHeader = card.querySelector("h2");
    cardHeader.textContent = book.title;

    const cardImage = card.querySelector("img");
    cardImage.src = book.image;
    cardImage.alt = book.title + " Cover";

    const bulletList = card.querySelector("ul");
    bulletList.innerHTML = "";

    const details = ["Author", "Genre", "Published", "Rating"];
    book.details.forEach((detail, index) => {
        const li = document.createElement("li");

        const labelSpan = document.createElement("span");
        labelSpan.className = "detail-label";
        labelSpan.textContent = details[index] + ": ";

        const valueSpan = document.createElement("span");
        valueSpan.className = "detail-value";
        valueSpan.textContent = "   " + detail;

        li.appendChild(labelSpan);
        li.appendChild(valueSpan);
        bulletList.appendChild(li);
    });

    console.log("new card:", book.title, "- html: ", card);

}

document.addEventListener("DOMContentLoaded", () => {
    showCards();
    setupSearch();
});

//search setup
function setupSearch() {
    const input = document.getElementById("searchInput");

    //search filter logic
    input.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = books.filter((book) => book.title.toLowerCase().includes(query));
        showCards(filtered);
    });
}

function filterByGenre(genre) {
    const filtered = books.filter(book =>
        book.details.some(detail => detail == genre)
    );
    showCards(filtered);
}

function addBookPrompt() {
    const title = prompt("Enter book title: ");
    if (!title) return;

    const image = prompt("Enter image URL: ");
    const author = prompt("Enter author: ");
    const genre = prompt("Enter genre: ");
    const year = prompt("Enter publication year: ");
    const rating = prompt("Enter your rating(out of 5 stars): ");

    if (title && image && author && genre && year && rating) {
        addBook(title, image, [author, genre, year, rating]);
    } else {
        alert("Please fill in all fields!");
    }
}

//removes last book
function removeLastBook() {
    if (books.length > 0) {
        books.pop();
        showCards();
    } else {
        alert("No more books to remove!");
    }
}

//adds new book
function addBook(title, image, details) {
    books.push({ title, image, details }); //add new book to array
    showCards();
}
