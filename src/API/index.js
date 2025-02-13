const cohortName = "2410-ftb-et-web-am";
const PLAYERS_API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players`;

// Initialize empty players & teams arrays
const state = {
  players:[],
  teams:[],
}

/**
 * Fetches all players from the API.
 * @returns {Object[]} the array of player objects
 */
export const fetchAllPlayers = async () => {
  try {
    const response = await fetch(PLAYERS_API_URL);
    const data = await response.json();
    state.players = data.data;
    return state.players;
  } catch (err) {
    console.error("Uh oh, trouble fetching players!", err);
  }
};