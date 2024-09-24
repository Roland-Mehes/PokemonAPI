import { divBuilder } from "./component.js";

let api = "https://pokeapi.co/api/v2/";

async function getURL() {
  const limit = 150;
  const offset = 0;
  const data = await fetch(`${api}pokemon?limit=${limit}&offset=${offset}`);
  const jsonData = await data.json();
  return jsonData;
}

async function pokemon(pokemon) {
  // pokemon = "";

  const data = await fetch(`${api}pokemon/${pokemon}`);
  const jsonData = await data.json();
  return jsonData;
}

export { getURL, pokemon };
