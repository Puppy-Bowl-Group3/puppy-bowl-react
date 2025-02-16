import React, { useState, useEffect } from 'react'
import {fetchAllPlayers, fetchSinglePlayer} from '../API/index.js'
import { Route, useNavigate } from 'react-router-dom';
import SinglePlayer from './SinglePlayer.jsx';
import SearchBar from "./SearchBar";


export function AllPlayers() {
  const [players, setPlayers] = useState([])
  const [filteredPlayers, setFilteredPlayers] = useState([]);

  useEffect((e) => {
    const getPlayers = async () => {
      try {
        const data = await fetchAllPlayers();
        console.log('data => ', data);
        setPlayers(data.players);
        setFilteredPlayers(data.players);
      } catch (error) {
        console.error(error)
      }
    };
    getPlayers();
  }, []);


  const handleSearch = (query) => {
    const filtered = players.filter((player) =>
      player.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPlayers(filtered);
  };

  // Use this to make sure we are calling the function correctly
  // console.log({fetchAllPlayers});

  return (
    <>
      <SearchBar onSearch={handleSearch} /> 
      <div className='playersCard'>
        {filteredPlayers.map((player) => ( 

          <div key={player.id}>
            <h4>{player.name}</h4>
            <h4>{player.breed}</h4>
            <img className='playerImg' src={player.imageUrl} alt={player.name} /><br />
            <SinglePlayer playerId={player.id} />
          </div>
          
        ))}
      </div>
    </>
  );
}