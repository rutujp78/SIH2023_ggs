
import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Energy from './pages/Energy'
import Plastic from './pages/Plastic'
import Health from './pages/Health'
import Ewaste from './pages/Ewaste'
import Login from './pages/Login'

function App() {

  const myStorage = window.localStorage;
  
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [username, setUsername] = useState(myStorage.getItem("username"));
  const [token, setToken] = useState(myStorage.getItem("token"));

  const openSidebar = () => {
    setSidebarToggle(!sidebarToggle);
  }

  return (
    <BrowserRouter>
      <div className="App">
        {(username && token) && (
            <> 
              <Navbar openSidebar={openSidebar}/>
              <Sidebar sidebarToggle={sidebarToggle} openSidebar={openSidebar} setUsername={setUsername} setToken={setToken} />
            </>
        )}
        <Routes>

          {(username && token) ?
              <>
                <Route exact path='/' element={<Home />}/> 
                <Route exact path='/home' element={<Home />}/>
                <Route exact path='/energy' element={<Energy />} />
                <Route exact path='/plastic' element={<Plastic />} />
                <Route exact path='/health' element={<Health />} />
                <Route exact path='/ewaste' element={<Ewaste />} />
              </>
            :
            <>
              <Route exact path='/' element={<Login setUsername={setUsername} setToken={setToken} />} /> 
              <Route exact path='/login' element={<Login setUsername={setUsername} setToken={setToken} />} /> 
              <Route exact path='/home' element={<Login setUsername={setUsername} setToken={setToken} />} /> 
            </>
          }

        </Routes>

    </div>
    </BrowserRouter>
  )
}

export default App
