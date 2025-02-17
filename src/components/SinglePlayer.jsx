import { useState, useEffect } from "react";
import { fetchSinglePlayer } from "../API";
import { useNavigate, useParams } from "react-router-dom";

export default function SinglePlayer({playerId}) {
  const [player, setPlayer] = useState([])
  let { id } = useParams();
  //const isOnSinglePlayerPage = !!id
  const navigate = useNavigate()
  //console.log('SinglePlayer playerId = ', playerId || id)

  useEffect(() => {
    const getPlayer = async () => {
      try {
        const selectedPlayer = await fetchSinglePlayer(playerId || id);
        // console.log('selectedPlayer = ', selectedPlayer)
        setPlayer(selectedPlayer)
      } catch (error) {
        console.error(error)
      }
    }
    getPlayer();
  },[])

  // console.log("player => ", player)

  return (
    <>
      <div>
        {
          id ? (
            <>
              <ul>
                <li><b>name:</b> {player?.name}</li>
                <li><b>breed:</b> {player?.breed}</li>
                <li><b>id:</b> {player?.id}</li>
                <li><img src={player?.imageUrl} alt={player?.name}></img></li>
                <li><b>status:</b> {player?.status}</li>
                <li><b>player team createdAt: </b> {player?.team?.createdAt}</li>
                <li><b>player team id: </b> {player?.team?.id}</li>
                <li><b>player team name: </b> {player?.team?.name}</li>
                {
                  player?.team?.players?.forEach((teamPlayer, index) => {
                    return <li>Team Player #{index}: {teamPlayer?.name}</li>
                  })
                }
                <li><b>player team score: </b> {player?.team?.score}</li>
                <li><button onClick={() => navigate('/')}> <b>Back</b></button></li>
              </ul>
            </>
          ) : (
            <button onClick={() => navigate(`/players/${playerId}`)}>See details</button>
          )
        }
      </div>
    </>
  );
}