import React, { useState, useEffect } from 'react';
import PokemonList from '../components/PokemonList';
import Searching from '../components//Searching';

function Search() {
    const [pokemonList, setPokemonList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
                const data = await res.json();
                setPokemonList(data.results);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleSearchResult = (result) => {
        setPokemonList(result);
    };

    return (
        <div>
            <PokemonList pokemonList={pokemonList} />
        </div>
    );
}

export default Search;
