import { addNewPlayer, fetchAllPlayers , fetchAllTeams} from "../API";
import React, { useEffect, useState } from "react";

export default function NewPlayerForm({setAllNewPlayers}) {
  const [username, setUsername] = useState('')
  const [breed, setBreed] = useState('')
  const [imgUrl, setImgUrl] = useState('')
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");

  useEffect(() => {
    async function fetchTeams() {
      try {
        const response = await fetchAllTeams();
        setTeams(response.teams);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    }
    fetchTeams();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (username.length) {
      try {
        let newPlayerObj = {}
        if (selectedTeam === '') {
          newPlayerObj = {
            name: username,
            breed: breed,
            imageUrl: imgUrl,
          }
        } else {
          newPlayerObj = {
            name: username,
            breed: breed,
            imageUrl: imgUrl,
            teamId: selectedTeam,
          }
        }
        console.log(selectedTeam);
        await addNewPlayer(newPlayerObj);
        console.log(newPlayerObj)
        const result = await fetchAllPlayers()
        // console.log("result is ", result)
        await setAllNewPlayers(result)

        // Reset fields after submission
        setUsername('')
        setBreed('')
        setImgUrl('')
        setSelectedTeam('');
      } catch (error) {
        console.error(error)
      }
    }

  }
  
  return (
    <>
      {
        
        <div>
          <form action="" onSubmit={handleSubmit}>
            <label>
              <b>Name:</b>
              <input type="text" value={username}
                onChange={(e) => {setUsername(e.target.value)}}
              />
            </label><br /><br />
            <label>
              <b>Breed:</b>
              <input type="text"  value={breed}
                onChange={(e) => {setBreed(e.target.value)}}
              />
            </label><br /><br />
            <label>
              <b>Image Url:</b>
              <input type="text" value={imgUrl}
                onChange={(e) => {setImgUrl(e.target.value)}}
              />
            </label><br /><br />
            <label>
              <b>Team:</b>
              <select value={selectedTeam} onChange={(e) => setSelectedTeam(e.target.value)}>
                <option value="none">None</option>
                  {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name} (ID: {team.id})
                </option>
            ))}
              </select>
            </label><br/><br/>
            <button type="submit">Add a new player</button>
          </form>
        </div>
      }
    </>
  );
}
