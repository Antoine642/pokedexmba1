import React, { useState, useEffect } from 'react';

function Searching({ pokemonList, onSearchResult }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    useEffect(() => {
        const filteredPokemon = pokemonList.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        onSearchResult(filteredPokemon);
    }, [searchTerm, pokemonList, onSearchResult]);

    return (
        <div>
            <h2>Search</h2>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    id="searchInput"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
        </div>
    );
}

export default Searching;
