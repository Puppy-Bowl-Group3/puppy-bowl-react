import { fetchAllPlayers } from '../API/index.js'
import React, { useState, useEffect } from 'react'
import SinglePlayer from './SinglePlayer.jsx';
import NewPlayerForm from './NewPlayerForm.jsx';

export function AllPlayers({allNewPlayers, setAllNewPlayers}) {
const [players, setPlayers] = useState([])  

  useEffect(() => {
    const getPlayers = async () => {
      try {
        const data = await fetchAllPlayers();
        console.log('data => ', data);
        setPlayers(data.players);
      } catch (error) {
        console.error(error)
      }
    };
    getPlayers();
  }, [allNewPlayers]);

  const defaultImage = "https://imgur.com/Im9JnQI.png"; 

  // Use this to make sure we are calling the function correctly
  // console.log({fetchAllPlayers});

  return (
    <>
    <NewPlayerForm setAllNewPlayers={setAllNewPlayers}/>
    <div className='playersCard'>
        {players.map((player) => (
              //console.log('player card player = ', player)
              <div key={player.id} className="playersCard">
              <h4><b>Name:</b> {player.name}</h4>
              <h4><b>Breed:</b> {player.breed}</h4>

                        <img 
              className="playerImg" 
              src={player.imageUrl?.trim() ? player.imageUrl : defaultImage} 
              alt={player.name || "Default Puppy"}
              onError={(e) => (e.target.src = defaultImage)}
            />
            <SinglePlayer playerId={player.id} />
          </div>
        ))}
      </div>
    </>
  );
}