import Home from './Home'
import { Routes,Route } from 'react-router-dom'
function App() {
 
  return (
    <Routes>
      <Route path='/:userEmail' element={<Home />} />
    </Routes>
  )
}

export default App
