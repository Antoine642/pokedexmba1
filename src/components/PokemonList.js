import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Searching from './Searching';

function PokemonList() {
    const [pokemonList, setPokemonList] = useState([]);
    const [filteredPokemon, setFilteredPokemon] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1500');
                const data = await res.json();
                setPokemonList(data.results);
                setFilteredPokemon(data.results); // Initialiser la liste filtrée avec la liste complète
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleSearchResult = (result) => {
        // Mettre à jour la liste filtrée avec les résultats de la recherche
        setFilteredPokemon(result);
    };
    function getImageSrcFromIndex(index) {
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`;
    }
    function getIndexFromUrl(url) {
        const parsedUrl = url.split('/');
        return parsedUrl[parsedUrl.length - 2];
    }

    return (
        <div>
            <Searching pokemonList={pokemonList} onSearchResult={handleSearchResult} />
            <div className="container text-center">
                <div className="row ">
                {filteredPokemon.map((pokemon) => (
                <div className='col-2 my-3'>
                    <div className="card h-100" style={{ width: "10rem" }}>
                        <img src={getImageSrcFromIndex(getIndexFromUrl(pokemon.url))} className="card-img-top cardImg" alt="..."/>
                        <div className="card-body">
                            <Link to={'/' + pokemon.name} className="btn btn-primary w-100 text-capitalize fw-semibold">{pokemon.name}</Link>
                        </div>
                    </div>
                </div>
                ))}
                </div>
            </div>
        </div>
    );
}

export default PokemonList;
