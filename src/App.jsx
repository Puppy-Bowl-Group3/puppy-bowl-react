import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { AllPlayers } from './components/AllPlayers'
import NavBar from './components/NavBar'
import NewPlayerForm from './components/NewPlayerForm'
import SinglePlayer from './components/SinglePlayer'
import {Routes, Route, Link} from 'react-router-dom'

function App() {
  const [allNewPlayers, setAllNewPlayers] = useState([])  
  return (
    <>
    <NavBar>
      
    </NavBar>
      <Routes>
        <Route path='/' element={<AllPlayers allNewPlayers={allNewPlayers} setAllNewPlayers={setAllNewPlayers} />} />
        <Route path='/players/:id' element={<SinglePlayer />} />
        <Route path='/newPlayerForm' element={<NewPlayerForm setAllNewPlayers={setAllNewPlayers} />} />
      </Routes>
    </>
  )
}

export default App