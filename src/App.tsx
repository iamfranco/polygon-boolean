import { useState } from 'react';
import './App.css'
import Instruction from './components/instruction/Instruction'
import PolygonsCanvas from './components/polygons-canvas/PolygonsCanvas'
import PolygonsList from './components/polygons-list/PolygonsList'

function App() {
  const [polygonsCount, setPolygonsCount] = useState<number>(0);
  const [selectedPolygonId, setSelectedPolygonId] = useState<number>(0);

  return (
    <>
      <Instruction />
      <PolygonsList polygonsCount={polygonsCount} selectedPolygonId={selectedPolygonId} />
      <PolygonsCanvas setPolygonsCount={setPolygonsCount} setSelectedPolygonId={setSelectedPolygonId}  />
    </>
  )
}

export default App
