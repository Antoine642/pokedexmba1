import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Generation() {
    const [generation, setGeneration] = useState({});
    const [pokemonList, setPokemonList] = useState([]);
    const { id } = useParams();
    const generationURL = `https://pokeapi.co/api/v2/generation/${id}`;

    async function getGeneration() {
        try {
            const res = await fetch(generationURL);
            const data = await res.json();
            setGeneration(data);

            const pokemonPromises = data.pokemon_species.map(async (pokemon) => {
                const pokemonRes = await fetch(pokemon.url);
                const pokemonData = await pokemonRes.json();
                return {
                    name: pokemonData.name,
                    url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`,
                };
            });

            const pokedata = await Promise.all(pokemonPromises);
            setPokemonList(pokedata);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        getGeneration();
    }, [id]);

    return (
        <div className="Generation">
            {generation ? (
                <>
                    <h1>{generation.name}</h1>
                    <div className="container text-center">
                        <div className="row ">
                            {pokemonList.map((pokemon, index) => (

                                <div className='col-2 my-3'>
                                    <div key={index} className="card">
                                        <img src={pokemon.url} alt={pokemon.name} />
                                        <div className="card-body">
                                            <a href={"/" + pokemon.name} className="btn btn-primary w-100 text-capitalize fw-semibold">{pokemon.name}</a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Link to="/" className="btn btn-primary">
                        Retour à la liste des générations
                    </Link>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Generation;
