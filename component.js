import { getURL, pokemon } from "./api.js";

// Function to create and return a container div
const createContainer = () => {
  const container = document.createElement("div");
  container.className = "container";
  document.body.append(container);
  return container;
};

// Function to create and return a select element
const createSelectElement = () => {
  const select = document.createElement("select");
  select.className = "pokemon-select";
  return select;
};

// Function to create and return a div for the Pokémon image
const createImageContainer = () => {
  const pokemonImgDiv = document.createElement("div");
  pokemonImgDiv.className = "pokemon-img-div";
  const pokemonImg = document.createElement("img");
  pokemonImgDiv.append(pokemonImg);
  return { pokemonImgDiv, pokemonImg };
};

// Function to populate the select dropdown with Pokémon options
const populateSelect = (select, pokemons) => {
  pokemons.forEach(({ name }) => {
    const option = document.createElement("option");
    option.textContent = name;
    select.append(option);
  });
};

// Function to load and display a Pokémon's image
const loadPokemonImage = async (pokemonName, pokemonImg) => {
  const sprite = await pokemon(pokemonName);
  pokemonImg.src = sprite.sprites.front_default;
};

// Main function to build the page content
const divBuilder = async () => {
  const container = createContainer(); // Create and append the container

  const select = createSelectElement(); // Create the select element
  const { pokemonImgDiv, pokemonImg } = createImageContainer(); // Create the image container and image element

  container.append(select, pokemonImgDiv); // Append select and image div to the container

  // Fetch the list of Pokémon and populate the select dropdown
  const { results: pokemons } = await getURL();
  populateSelect(select, pokemons);

  // Load the image for the first Pokémon initially
  await loadPokemonImage(select.options[0].value, pokemonImg);

  // Event listener to update Pokémon image when selection changes
  select.addEventListener("change", async () => {
    await loadPokemonImage(select.value, pokemonImg);
    console.log(loadPokemonImage(select.value, pokemonImg));
  });
};

export { divBuilder };
