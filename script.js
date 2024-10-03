import { pokemon, getAllPokemon } from './api.js';

const limit = 20;
let currentOffset = 0;

const pokemonMainContainer = document.querySelector('.pokemon-container');
const lefttArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
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

  pokemonImgDiv.className = 'pokemon-card';
  pokemonImg.src = imageUrl;
  pokemonName.innerHTML = name;

  pokemonImgDiv.append(pokemonImg, pokemonName);
  pokemonMainContainer.append(pokemonImgDiv);
};

// Render Name and Img
const renderPokemon = async () => {
  try {
    const data = await getAllPokemon(limit, currentOffset);
    clearContainer(pokemonMainContainer);
    console.log(data);
    data.results.forEach(async (pokemonItem) => {
      try {
        const pokemonData = await pokemon(pokemonItem.name);
        displayPokemon(pokemonData.name, pokemonData.sprites.front_default);
      } catch (error) {
        console.error(`Error fetching data for ${pokemonItem.name}`, error);
        pokemonMainContainer.innerHTML = `The server is down. Please try again later`;
      }
    });
  } catch (error) {
    pokemonMainContainer.innerHTML = `The server is down. Please try again later`;
  }
};

// Pagination

const paginationCounter = () => {
  lefttArrow.innerHTML = `${currentOffset}-${currentOffset + limit} &#x21e6;`;

  rightArrow.innerHTML = `&#x21e8; ${currentOffset + limit}-${
    currentOffset + limit + limit
  }`;
};

rightArrow.addEventListener('click', async () => {
  currentOffset += limit;
  if (currentOffset > 1302 - limit) currentOffset = 1302 - limit;
  paginationCounter();
  await renderPokemon();
});

lefttArrow.addEventListener('click', async () => {
  if (currentOffset > 0) {
    currentOffset -= limit;
    paginationCounter();
    await renderPokemon();
  }
});

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
  paginationCounter();
});
