
import { useState } from 'react'
import './App.css'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

function App() {

  const [sidebarToggle, setSidebarToggle] = useState(false);

  const openSidebar = () => {
    setSidebarToggle(!sidebarToggle);
  }

  return (
    <div className="grid-container">
      <Navbar openSidebar={openSidebar}/>
      <Sidebar sidebarToggle={sidebarToggle} openSidebar={openSidebar}/>
      <Home />
    </div>
  )
}

export default App
