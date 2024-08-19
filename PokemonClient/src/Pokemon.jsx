import { useState, useEffect } from 'react';
import PokemonList from './PokemonList';

function Pokemon() {
    const [pokemon, setPokemon] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPokemonData();
    }, []);

    const fetchPokemonData = () => {
        fetch("http://localhost/api/Pokemon")
            .then(res => res.json())
            .then(data => setPokemon(data))
            .catch(err => {
                console.error(err);
            });
    };

    return (
        <div>
            <h1>Pokémon List</h1>
            <PokemonList pokemon={pokemon} />
        </div>
    );
}

export default Pokemon;
