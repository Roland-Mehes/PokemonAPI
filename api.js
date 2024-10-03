let api = 'https://pokeapi.co/api/v2';

async function getAllPokemon(limit, offset) {
  const res = await fetch(`${api}/pokemon?limit=${limit}&offset=${offset}`);
  const data = await res.json();
  return data;
}

const mainURL = async (content, dataType) => {
  const res = await fetch(`${api}/${content}/${dataType}`);
  const data = await res.json();
  return data;
};

async function pokemon(pokemon) {
  const res = await fetch(`${api}/pokemon/${pokemon}`);
  const data = await res.json();
  return data;
}

export { getAllPokemon, pokemon, mainURL };
