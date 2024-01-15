import { useState } from "react";
function Generation(props) {
    const [pokemons, setPokemons] = useState([]);
    const [Generation, setGeneration] = useState("");
    const url = "https://pokeapi.co/api/v2/generation/"+props.match.params.id;
    return (
        <div className="m-3">
            <h1>{Generation} !</h1>
            <p>Choisissez un pokémon</p>
            <ul>
                {pokemons.map((pokemon) => (
                    <li key={pokemon.id}>
                        <a href={"/pokemon/" + pokemon.id}>{pokemon.name}</a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Generation;