import {fetchAllPlayers} from '../API/index.js'
import { useState, useEffect } from 'react'

export function AllPlayers() {
  const [players, setPlayers] = useState([])

  useEffect(() => {
    const getPlayers = async () => {
      try {
        const data = await fetchAllPlayers();
        console.log('data => ', data);
        setPlayers(data);
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
        <h1>All Players Component</h1>
      </div>
    </>
  );
}