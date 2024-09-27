import { pokemon, getAllPokemon } from './api.js';

const pokemonMainContainer = document.querySelector('.pokemon-container');
const pagination = document.querySelector('.pagination-container');
const search = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-button');

const clearContainer = (container) => {
  container.innerHTML = '';
};

// Display Pokémon Data
const displayPokemon = (name, imageUrl) => {
  const pokemonImgDiv = document.createElement('div');
  const pokemonImg = document.createElement('img');
  const pokemonName = document.createElement('p');

  pokemonImgDiv.className = 'pokemon-img-container';
  pokemonImg.src = imageUrl;
  pokemonName.innerText = name;

  pokemonImgDiv.append(pokemonImg, pokemonName);
  pokemonMainContainer.append(pokemonImgDiv);
};

// Render Name and Img
const renderPokemon = async () => {
  try {
    const data = await getAllPokemon();
    clearContainer(pokemonMainContainer);

    data.results.forEach(async (pokemonItem) => {
      try {
        const pokemonData = await pokemon(pokemonItem.name);
        displayPokemon(pokemonData.name, pokemonData.sprites.front_default);
      } catch (error) {
        console.error(`Error fetching data for ${pokemonItem.name}`, error);
      }
    });
  } catch (error) {
    console.error('Error fetching Pokémon list', error);
  }
};

// Render Pokémon data out of Search bar
const renderPokemonOutOfSearch = async () => {
  const searchValue = search.value.toLowerCase().trim();
  if (searchValue) {
    try {
      const img = await pokemon(searchValue);
      clearContainer(pokemonMainContainer);
      displayPokemon(img.name, img.sprites.front_default);
    } catch (error) {
      clearContainer(pokemonMainContainer);
      pokemonMainContainer.innerHTML = `${searchValue} Pokémon is not in our database!`;
    }
  } else {
    renderPokemon();
  }
};

searchBtn.addEventListener('click', (event) => {
  event.preventDefault();
  renderPokemonOutOfSearch();
});

search.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    renderPokemonOutOfSearch();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  renderPokemon();
});
