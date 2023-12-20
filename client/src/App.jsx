
import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom'
import Aqi from './pages/Aqi'
import Energy from './pages/Energy'
import Plastic from './pages/Plastic'
import Health from './pages/Health'
import Ewaste from './pages/Ewaste'

// const BrowserRouter = createBrowserRouter();

function App() {

  const [sidebarToggle, setSidebarToggle] = useState(false);

  const openSidebar = () => {
    setSidebarToggle(!sidebarToggle);
  }

  return (
    <BrowserRouter>
      <div className="grid-container">
      <Navbar openSidebar={openSidebar}/>
      <Sidebar sidebarToggle={sidebarToggle} openSidebar={openSidebar}/>
        <Routes>
          <Route exact path='/home' element={<Home />}/>
          <Route exact path='/' element={<Home />}/>
          <Route exact path='/energy' element={<Energy />} />
          <Route exact path='/plastic' element={<Plastic />} />
          <Route exact path='/health' element={<Health />} />
          <Route exact path='/ewaste' element={<Ewaste />} />

        </Routes>
        {/* <Home /> */}

    </div>
    </BrowserRouter>
  )
}

export default App
