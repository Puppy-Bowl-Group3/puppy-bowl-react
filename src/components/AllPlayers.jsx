import {fetchAllPlayers} from '../API/index.js'
import { useState, useEffect } from 'react'

export function AllPlayers() {
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
  }, []);

  // Use this to make sure we are calling the function correctly
  // console.log({fetchAllPlayers});

  return (
    <>
    <div>
        {
            players.map((player)=>{
                return (
                    <div key={player.id}>
                        <h4>{player.name}</h4>
                        <h4>{player.breed}</h4>
                        <img className='playerImg' src={player.imageUrl} alt={player.name}/>
                    </div>
                )
            })
        }
    </div>
    </>
  );
}