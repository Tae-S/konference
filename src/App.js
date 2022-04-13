import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// ADDED: componenet imports
import Chess from './Components/Chess'
import Home from './Components/Home'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/chess' element={<Chess />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
