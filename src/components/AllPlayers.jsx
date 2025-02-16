import React, { useState, useEffect } from 'react';
import { fetchAllPlayers } from '../API/index.js';
import SinglePlayer from './SinglePlayer.jsx';
import NewPlayerForm from './NewPlayerForm.jsx';
import SearchBar from './SearchBar';

export function AllPlayers({ allNewPlayers, setAllNewPlayers }) {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const defaultImage = 'https://imgur.com/Im9JnQI.png';

  useEffect(() => {
    const getPlayers = async () => {
      try {
        const data = await fetchAllPlayers();
        console.log('data => ', data);
        setPlayers(data.players);
        setFilteredPlayers(data.players);
      } catch (error) {
        console.error(error);
      }
    };
    getPlayers();
  }, [allNewPlayers]);

  const handleSearch = (query) => {
    const filtered = players.filter((player) =>
      player.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPlayers(filtered);
  };

  return (
    <>
      <NewPlayerForm setAllNewPlayers={setAllNewPlayers} />
      <SearchBar onSearch={handleSearch} />
      <div className='playersCard'>
        {filteredPlayers.map((player) => (
          <div key={player.id} className='playersCard'>
            <h4><b>Name:</b> {player.name}</h4>
            <h4><b>Breed:</b> {player.breed}</h4>
            <img 
              className='playerImg' 
              src={player.imageUrl?.trim() ? player.imageUrl : defaultImage} 
              alt={player.name || 'Default Puppy'}
              onError={(e) => (e.target.src = defaultImage)}
            />
            <SinglePlayer playerId={player.id} />
          </div>
        ))}
      </div>
    </>
  );
}
