import { useState } from 'react';
import './Pokemon.css';

function Pokemon({ pokemon, pokeCreate, pokeDelete, pokeUpdate }) {
    const [formData, setFormData] = useState({ pokeId: '', ownerId: '', catId: '', name: '' });
    const [editingId, setEditingId] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        if(editingId){
            pokeUpdate(formData)
            setEditingId(null);
        } else {
            pokeCreate(formData);
        }
        setFormData({pokeId: '', ownerId: '', catId: '', name: ''});

    };

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleEdit = (item) => {
        setEditingId(item.id);
        setFormData({
            pokeId: item.id,
            ownerId: item.owners[0].id,
            catId: item.categories[0].id,
            name: item.name,
        });
    };

    const handleCancelEdit = () =>{
        setEditingId(null);
        setFormData({pokeId: '', ownerId: '', catId: '', name: ''});
    };


    if (!pokemon || pokemon.length === 0) {
        return <div>No Pokémon found.</div>;
    }

    return (
        <div className="container">
            <h2 className="heading">New Pokémon</h2>
            <form onSubmit={handleSubmit} className="form">
                <input
                    type="number"
                    name="ownerId"
                    placeholder="Owner ID"
                    value={formData.ownerId}
                    onChange={handleFormChange}
                    className="input"
                    required
                />
                <input
                    type="number"
                    name="catId"
                    placeholder="Category ID"
                    value={formData.catId}
                    onChange={handleFormChange}
                    className="input"
                    required
                />
                <input
                    type="text"
                    name="name"
                    placeholder="Pokémon Name"
                    value={formData.name}
                    onChange={handleFormChange}
                    className="input"
                    required
                />
                <button type="submit" className="button">{editingId ? 'Update' : 'Create'}</button>
                {editingId && <button type="button" onClick={handleCancelEdit}>Cancel</button>}

            </form>

            <h1 className="heading">Pokémon List</h1>
            <ul className="list">
                {pokemon.map(item => (
                    <li key={item.id} className="list-item">
                        <div className="list-item-content">
                            <div>
                                <strong>{item.name}</strong>
                                <br/>
                            </div>
                            <div>
                                <button onClick={() => handleEdit(item)}>Edit</button>
                                <button onClick={() => pokeDelete(item.id)} className="delete-button">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Pokemon;
