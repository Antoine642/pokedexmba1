import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import generations from "../components/generations";
import './Home.css';

const URL = "https://pokeapi.co/api/v2/generation/";

function Home(props) {
  const [generationsData, setGenerationsData] = useState([]);

  const [pokemon, setPokemon] = useState([]);

  async function getPokemon() {
    try {
      const dataPromises = generations.map(async (generations) =>{
        const res = await fetch(URL + generations.id);
        const data = await res.json();
        return data;
      });
      const data = await Promise.all(dataPromises);
      const generationsData = data.map((genData, index) => {
        return {
          generation: generations[index].name,
          generationId: generations[index].id,
          pokemons: genData.pokemon_species,
        };
      });
      setGenerationsData(generationsData);
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function getImageSrcFromIndex(index) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`;
  }
  function getIndexFromUrl(url) {
    const parsedUrl = url.split('/');
    return parsedUrl[parsedUrl.length - 2];
  }

  useEffect(() => {
    getPokemon();
  }, []);
  return (
    <div className="Home row mx-auto">
      {generationsData.map((genData) => (
        <div key={genData.generation}>
          <h2>{genData.generation}</h2>
          <div className="d-flex flex-row">
            <div className="my-3 d-flex mx-auto w-75 p-2 overflow-auto overhidden myBorder">
              {genData.pokemons.map((pokemon, index) => (
                <div key={index + 1} className="ms-2 mb-2 list-group-item">
                  <div className="card h-100" style={{ width: "10rem" }}>
                    <img src={getImageSrcFromIndex(getIndexFromUrl(pokemon.url))} className="card-img-top cardImg" alt="..."/>
                    <div className="card-body">
                      <Link to={'/' + pokemon.name} className="btn btn-primary w-100 text-capitalize fw-semibold">{pokemon.name}</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="h-100 text-center align-middle m-auto">
              <Link to={`/generation/${genData.generationId}`} className="btn btn-primary">
                Voir la liste
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
