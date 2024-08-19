import { useState } from 'react';

function PokemonList({ pokemon }){
    if (!pokemon || pokemon.length === 0) {
        return <div>No Pokémon found.</div>;
    }
    return (
        <ul> {pokemon} </ul>
    )
}
export default PokemonList;