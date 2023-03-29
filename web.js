// get necessery document elements

const searchBar = document.getElementById("searchBar");
const noResultsMessage = document.getElementById("no-results");

searchBar.addEventListener("input", filterCards);
function filterCards() {
  const searchValue = searchBar.value.toLowerCase();
  const Cards = document.querySelectorAll(".card");
  let removedCards = 0;

  Cards.forEach((card) => {
    const cardTitle = card.textContent.toLowerCase();
    // user's searched substring is found in card title
    if (cardTitle.indexOf(searchValue) !== -1) {
      card.style.display = "block";
    } 
    else {
      card.style.display = "none";
      removedCards++;
    }
  });

  if (removedCards == Cards.length) {
    noResultsMessage.style.display = "block";
  } else {
    noResultsMessage.style.display = "none";
  }
}
  