
import { useState } from 'react'
import './App.css'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom'
import Aqi from './pages/Aqi'

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
          <Route exact path='/aqi' element={<Aqi />} />

        </Routes>
        {/* <Home /> */}

    </div>
    </BrowserRouter>
  )
}

export default App
