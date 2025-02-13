import {fetchAllPlayers} from '../API/index.js'
import { useState, useEffect } from 'react'

export function AllPlayers() {
  const [players, setPlayers] = useState([])

  console.log({fetchAllPlayers});

  return (
    <>
      <div>
        <h1>All Players Component</h1>
      </div>
    </>
  );
}