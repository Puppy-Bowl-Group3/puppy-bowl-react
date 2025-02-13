import { useState, useEffect } from "react";
import { fetchSinglePlayer } from "../API";
import { useNavigate, useParams } from "react-router-dom";

export default function SinglePlayer({playerId}) {
  const [player, setPlayer] = useState([])
  let { id: playerIdFromParams } = useParams();
  const isOnSinglePlayerPage = !!playerIdFromParams
  const navigate = useNavigate()
  console.log('SinglePlayer playerId = ', playerId || playerIdFromParams)

  useEffect(() => {
    const getPlayer = async () => {
      try {
        const selectedPlayer = await fetchSinglePlayer(playerId || playerIdFromParams);
        console.log('selectedPlayer = ', selectedPlayer)
        setPlayer(selectedPlayer)
      } catch (error) {
        console.error(error)
      }
    }
    getPlayer();
  },[])

  console.log("player => ", player)
  return (
    <>
      <div>
        {
          isOnSinglePlayerPage ? (
            <>
              <ul>
                <li><b>breed:</b> {player?.breed}</li>
                <li><b>cohortId:</b> {player?.cohortId}</li>
                <li><b>createdAt:</b> {player?.createdAt}</li>
                <li><b>id:</b> {player?.id}</li>
                <li><b>imageUrl:</b> {player?.imageUrl}</li>
                <li><b>name:</b> {player?.name}</li>
                <li><b>status:</b> {player?.status}</li>
                <li><b>Team Cohort ID:</b> {player?.team?.cohortId}</li>
                <li><b>player team createdAt: </b> {player?.team?.createdAt}</li>
                <li><b>player team id: </b> {player?.team?.id}</li>
                <li><b>player team name: </b> {player?.team?.name}</li>
                {
                  player?.team?.players?.forEach((teamPlayer, index) => {
                    return <li>Team Player #{index}: {teamPlayer?.name}</li>
                  })
                }
                <li><b>player team score: </b> {player?.team?.score}</li>
                <li><b>player team updatedAt: </b> {player?.team?.updatedAt}</li>
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