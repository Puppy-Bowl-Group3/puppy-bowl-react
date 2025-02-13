import {fetchAllPlayers, fetchSinglePlayer} from '../API/index.js'
import React, { useState, useEffect } from 'react'
import { Route, useNavigate } from 'react-router-dom';
import SinglePlayer from './SinglePlayer.jsx';

export function AllPlayers() {
  const [players, setPlayers] = useState([])

  useEffect((e) => {
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
  }, []);

  // Use this to make sure we are calling the function correctly
  // console.log({fetchAllPlayers});

  return (
    <>
    <div className='playersCard'>
        {
            players.map((player)=>{
              console.log('player card player = ', player)
                return (
                    <div key={player.id}>
                        <h4>{player.name}</h4>
                        <h4>{player.breed}</h4>
                        <img className='playerImg' src={player.imageUrl} alt={player.name}/><br/>
                        <SinglePlayer playerId={player.id} />
                        
                    </div>
                )
            })
        }
    </div>
    </>
  );
}