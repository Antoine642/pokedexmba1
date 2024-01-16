import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
function PokemonDetail(props) {
  const [pokemon, setPokemon] = useState({});
  const {name} = useParams();
  const URL = "https://pokeapi.co/api/v2/pokemon/";
  async function getPokemon() {
    try {
      const res = await fetch(URL + name);
      const data = await res.json();
      setPokemon(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    getPokemon();
  }, []);
  return (
      <div className="container PokemonDetail">
          <h1 className='text-capitalize'>{pokemon.name}</h1>
          <img src={pokemon.sprites?.front_default} alt={pokemon.name} />

          <div className="row mt-4 text-capitalize">
              <div className="col">
                  <h2>Types</h2>
                  <ul className="list-group">
                      {pokemon.types?.map((type) => (
                          <li key={type.type.name} className="list-group-item">
                              {type.type.name}
                          </li>
                      ))}
                  </ul>
              </div>

              <div className="col">
                  <h2>Stats</h2>
                  <ul className="list-group">
                      {pokemon.stats?.map((stat) => (
                          <li key={stat.stat.name} className="list-group-item">
                              {stat.stat.name}: {stat.base_stat}
                          </li>
                      ))}
                  </ul>
              </div>

              <div className="col">
                  <h2>Abilities</h2>
                  <ul className="list-group">
                      {pokemon.abilities?.map((ability) => (
                          <li key={ability.ability.name} className="list-group-item">
                              {ability.ability.name}
                          </li>
                      ))}
                  </ul>
              </div>
          </div>
      </div>
  );
}

export default PokemonDetail;