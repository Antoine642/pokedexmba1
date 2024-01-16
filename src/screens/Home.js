import React, { useState, useEffect } from "react";
import generations from "../components/generations";

const URL = "https://pokeapi.co/api/v2/generation/";

function Home(props) {
  const [generationsData, setGenerationsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const dataPromises = generations.map(async (gen) => {
        const response = await fetch(URL + gen.id);
        const data = await response.json();
        const limitedPokemons = data.pokemon_species.slice(0, 5).map(async (pokemon) => {
          const pokemonResponse = await fetch(pokemon.url);
          const pokemonData = await pokemonResponse.json();
          let pokemonIndex = pokemon.url.split('/');
          pokemonIndex = pokemonIndex[pokemonIndex.length - 2];
          return {
            pokemonName: pokemon.name,
            pokemonUrl: pokemon.url,
            pokemonDetails: pokemonData,
            pokemonImage: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`
          };
        });
        const pokemonsWithData = await Promise.all(limitedPokemons);
        return { generation: gen.name, pokemons: pokemonsWithData };
      });

      const allData = await Promise.all(dataPromises);
      setGenerationsData(allData);
    };

    fetchData();
  }, []);

  return (
    <div className="row mx-auto">
      {generationsData.map((genData) => (
        <div key={genData.generation}>
          <h2>{genData.generation}</h2>
          <ul className="my-3 d-flex flex-row mx-auto justify-content-around w-75 p-0">
            {genData.pokemons.map((pokemon, index) => (
              <li key={index + 1} className="ms-2 list-group-item">
                <div class="card">
                  <img src={pokemon.pokemonImage} class="card-img-top" alt="..." />
                  <div class="card-body">
                    <h5 class="card-title">{pokemon.pokemonName}</h5>
                    <a href={"/pokemon/" + pokemon.pokemonName} class="btn btn-primary">Fiche {pokemon.pokemonName}</a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Home;
