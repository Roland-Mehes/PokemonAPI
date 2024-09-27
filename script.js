import { pokemon } from './api.js'; // Import only the needed function

// Getting elements from the DOM
const pokemonMainContainer = document.querySelector('.pokemon-container');
const pagination = document.querySelector('.pagination-container');
const pokemonImgDiv = document.createElement('div');
const pokemonImg = document.createElement('img');

// Setup for the right container
pokemonImgDiv.className = 'pokemon-img-container';

pokemonMainContainer.append(pokemonImgDiv);

// Getting elements for the search functionality
const search = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-button');

const renderPokemonOutOfSearch = async () => {
  const pokemonName = document.createElement('p');
  const searchValue = search.value.toLowerCase();
  if (searchValue) {
    try {
      const img = await pokemon(searchValue);
      pokemonImg.src = img.sprites.front_default;
      pokemonImgDiv.innerHTML = ''; // Clear previous image
      pokemonName.innerText = img.name;
      pokemonImgDiv.append(pokemonImg, pokemonName);
    } catch (error) {
      pokemonImgDiv.innerHTML = `${searchValue} Pokémon is not in our database!`; // Clear previous image if error
    }
  }
};

searchBtn.addEventListener('click', (event) => {
  event.preventDefault(); // Prevent default form submission behavior
  renderPokemonOutOfSearch();
});

search.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    renderPokemonOutOfSearch();
  }
});
