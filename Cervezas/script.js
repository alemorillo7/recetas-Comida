const beerList = document.getElementById("beerList");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
let currentPage = 1;

function fetchBeers(page) {
  fetch(`https://api.punkapi.com/v2/beers?page=${page}&per_page=10`)
    .then(response => response.json())
    .then(data => {
      beerList.innerHTML = "";

      data.forEach(beer => {
        const beerDiv = document.createElement("div");
        beerDiv.classList.add("beer");

        beerDiv.innerHTML = `
          <h2>${beer.name}</h2>
          <p><strong>Tagline:</strong> ${beer.tagline}</p>
          <p><strong>Descripción:</strong> ${beer.description}</p>
          <p><strong>ABV:</strong> ${beer.abv}%</p>
        `;

        beerList.appendChild(beerDiv);
      });

      updatePagination();
    })
    .catch(error => {
      console.error("Hubo un error al obtener las cervezas:", error);
    });
}

function updatePagination() {
  prevButton.disabled = currentPage === 1;
  nextButton.disabled = false; // Habilitar el botón "Siguiente" por defecto

  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      fetchBeers(currentPage);
    }
  });

  nextButton.addEventListener("click", () => {
    currentPage++;
    fetchBeers(currentPage);
  });
}

fetchBeers(currentPage);
