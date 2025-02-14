import { addNewPlayer, fetchAllPlayers } from "../API";
import React, { useState } from "react";

export default function NewPlayerForm({setAllNewPlayers}) {
  const [username, setUsername] = useState('')
  const [breed, setBreed] = useState('')
  const [imgUrl, setImgUrl] = useState('')
  async function handleSubmit(e) {
    e.preventDefault();
    if (username.length) {
      try {
        const newPlayerObj = {
          name: username,
          breed: breed,
          imageUrl: imgUrl,
        }
        await addNewPlayer(newPlayerObj);
        console.log(newPlayerObj)
        const result = await fetchAllPlayers()
        console.log("result is ", result)
        await setAllNewPlayers(result)
        setUsername('')
        setBreed('')
        setImgUrl('')

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
            <button type="submit">Add a new player</button>
          </form>
        </div>
      }
    </>
  );
}