
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
import Login from './pages/Login'

function App() {

  const myStorage = window.localStorage;
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [userData, setUserData] = useState(JSON.parse(myStorage.getItem("userData")));
  console.log(userData);

  const openSidebar = () => {
    setSidebarToggle(!sidebarToggle);
  }

  return (
    <BrowserRouter>
      <div className="grid-container">
        {userData && (
            <>
              <Navbar openSidebar={openSidebar}/>
              <Sidebar sidebarToggle={sidebarToggle} openSidebar={openSidebar} setUserData={setUserData}/>
            </>
        )}
        <Routes>

          {userData ?
            <>
              <Route exact path='/' element={<Home />}/> 
            </>
            :
            <Route exact path='/' element={<Login />} />   
          }
          
          {/* <Navbar openSidebar={openSidebar}/>
          <Sidebar sidebarToggle={sidebarToggle} openSidebar={openSidebar}/> */}
          <Route exact path='/home' element={<Home />}/>
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
