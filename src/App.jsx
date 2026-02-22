import { useState } from 'react'
import { HomePage } from './HomePage';
import { GetDetailsPage } from './Details';
import { Route, Routes } from 'react-router'
import './App.css'

function App() {

    const [gameData, setGameData] = useState(null);

    return(
        <>
        <Routes>
            <Route index element={<HomePage onUpdate={setGameData}></HomePage>}/>
            <Route path="/detailed" element={<GetDetailsPage data={gameData}/>}/>
        </Routes>
        </>
    )
  
}

export default App
