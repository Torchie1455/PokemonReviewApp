import { useState, useEffect } from 'react';
import PokemonList from './PokemonList.jsx';

const API_URL = 'http://localhost:5139/api'

function Pokemon() {
    const [pokemon, setPokemon] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPokemonData();
    }, []);

    const fetchPokemonData = () => {
        fetch(API_URL + "/Pokemon/")
            .then(res => res.json())
            .then(data => setPokemon(data))
            .catch(err => {
                console.error(err);
                setError("Failed to load Pokémon data.");
            });
    };

    const createPokemon = (item) => {
        const newPokemon = {
            name: item.name,
            ownerId: item.ownerId,
            catId: item.catId,
        };

        console.log(`add item: ${JSON.stringify(newPokemon)}`);

        fetch(`${API_URL}/Pokemon?ownerId=${item.ownerId}&catId=${item.catId}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPokemon)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(returnedItem => {
                setPokemon(prevPokemon => [...prevPokemon, returnedItem]);
            })
            .catch(error => {
                console.error('Failed to create Pokemon:', error);
                setError('Failed to create Pokemon.');
            });
    };

    const deletePokemon = (id) => {
        console.log(`Deleted Pokemon ${id}`);

        fetch(`${API_URL}/Pokemon/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(() => setPokemon(pokemon.filter(item => item.id !== id)))
            .catch(error => {
                console.log(error);
                setError('Failed to delete Pokemon.');
            });
    };

    const updatePokemon = (updatedItem) => {
        const updatePokemonData = {
            id: updatedItem.pokeId,
            name: updatedItem.name,
            ownerId: updatedItem.ownerId,
            catId: updatedItem.catId,
        };

        fetch(`${API_URL}/Pokemon/${updatedItem.pokeId}?ownerId=${updatedItem.ownerId}&catId=${updatedItem.catId}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatePokemonData)
        })
            .then(() => {
                setPokemon(pokemon.map(item =>
                    item.id === updatedItem.pokeId
                        ? { ...updatedItem, id: updatedItem.pokeId }
                        : item
                ));
            })
            .catch(error => {
                console.log(error);
                setError('Failed to update Pokemon.');
            });
    };



    return (
        <div>
            <PokemonList
                pokemon={pokemon}
                pokeCreate={createPokemon}
                pokeDelete={deletePokemon}
                pokeUpdate={updatePokemon}
            />
            {error && <div>{error}</div>}
        </div>
    );
}

export default Pokemon;
