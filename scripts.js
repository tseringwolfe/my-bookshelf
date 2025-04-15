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

// This is an array of book objects
let books = [
    {
        title: "The Picture of Dorian Gray",
        image: "https://m.media-amazon.com/images/I/71GdwPedEFL._AC_UF1000,1000_QL80_DpWeblab_.jpg",
        details: ["Oscar Wilde", "Classic", "1890"]
    },
    {
        title: "Pride and Prejudice",
        image: "https://m.media-amazon.com/images/I/712P0p5cXIL._AC_UF1000,1000_QL80_.jpg",
        details: ["Jane Austen", "Classic", "1813"]
    },
    {
        title: "To the Lighthouse",
        image: "https://m.media-amazon.com/images/I/51RKwb538NL._AC_UF1000,1000_QL80_.jpg",
        details: ["Virginia Woolf", "Classic", "1927"]
    },
    {
        title: "The Bell Jar",
        image: "https://m.media-amazon.com/images/I/81wUVpREPSL._AC_UF1000,1000_QL80_.jpg",
        details: ["Sylvia Plath", "Classic", "1963"]
    },    
    {
        title: "The Catcher in the Rye",
        image: "https://m.media-amazon.com/images/I/8125BDk3l9L.jpg",
        details: ["J.D. Salinger", "Classic", "1951"]
    },
    {
        title: "When Breath Becomes Air",
        image: "https://m.media-amazon.com/images/I/61gwba1pQnL.jpg",
        details: ["Paul Kalanithi", "Memoir", "2016"]
    },
    {
        title: "Educated",
        image: "https://m.media-amazon.com/images/I/81Om0n+pfyL.jpg",
        details: ["Tara Westover", "Memoir", "2018"]
    },
    {
        title: "Crying in H-Mart",
        image: "https://m.media-amazon.com/images/I/81aS9JndklL.jpg",
        details: ["Michelle Zauner", "Memoir", "2021"]
    },
    {
        title: "Foster",
        image: "https://groveatlantic.com/core/wp-content/uploads/2022/04/FosterHC.jpg",
        details: ["Claire Keegan", "Fiction", "2010"]
    },
    {
        title: "I Who Have Never Known Men",
        image: "https://m.media-amazon.com/images/I/71+lTVEy8lL.jpg",
        details: ["Jacqueline Harpman", "Fiction", "1995"]
    },
    {
        title: "The Seven Husbands of Evelyn Hugo",
        image: "https://i.redd.it/ga9po4pggwea1.jpg",
        details: ["Taylor Jenkins Reid", "Fiction", "2017"]
    },
    {
        title: "A Man Called Ove",
        image: "https://m.media-amazon.com/images/I/81JDmCKnv0L.jpg",
        details: ["Fredrik Backman", "Fiction", "2012"]
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
    book.details.forEach((detail) => {
        const li = document.createElement("li");
        li.textContent = detail;
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
    const input = document.createElement("input");
    input.placeholder = "Search by title...";
    input.className = "search-bar";

    //search filter logic
    input.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = books.filter((book) => book.title.toLowerCase().includes(query));
        showCards(filtered);
    });

    document.body.insertBefore(input, document.getElementById("card-container"));
}


//removes last book
function removeLastBook() {
  books.pop(); // Remove last item in books array
  showCards(); // Call showCards again to refresh
}

//adds new book
function addBook(title, image, details) {
    books.push({ title, image, details }); //add new book to array
    showCards();
}
