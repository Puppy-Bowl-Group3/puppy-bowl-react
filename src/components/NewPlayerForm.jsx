import { addNewPlayer, fetchAllPlayers } from "../API";
import React, { useState } from "react";

export default function NewPlayerForm({setAllNewPlayers}) {
  const [username, setUsername] = useState('')
  const [breed, setBreed] = useState('')
  const [imgUrl, setImgUrl] = useState('')
  const [isVisible, setIsVisible] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    
    if (username.trim()) {
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

       
        setIsVisible(false);
      } catch (error) {
        console.error("Oops! We are having trouble adding player:", error)
       }
      }
    }
  
    return (
      <div>
        <button onClick={() => setIsVisible(true)} id="show_form">
          Add New Player
        </button>
  
        {isVisible && (
          <div id="form_pop" className={`overlay ${isVisible ? "active" : ""}`}>

            <div className="popup">
              <span onClick={() => setIsVisible(false)} className="close">
                &times;
              </span>

          <form action="" onSubmit={handleSubmit}>
            <h2> Add Player</h2>

            <label>
            <b>Name:</b>
            <input 
            type="text"
            value={username}
              onChange={(e) => setUsername(e.target.value)}
                required
            />
        
            </label>


            <label>
              <b>Breed:</b>
              <input 
              type="text"  
              value={breed}
                onChange={(e) => setBreed(e.target.value)}
                  required
              />

            </label>

            <label>
              <b>Image Url:</b>
              <input type="text" 
              value={imgUrl}
                onChange={(e) => setImgUrl(e.target.value)}
              />

            </label>

            <button type="submit" id="submit_button">
                Add
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}