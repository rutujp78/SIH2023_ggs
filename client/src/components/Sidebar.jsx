import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';


const Sidebar = ({ sidebarToggle, openSidebar, setUsername, setToken, setUserId }) => {
  const naviagte = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("username")
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    setUsername(null);
    setToken(null);
    setUserId(null);

    naviagte("/login");
  }

  return (
    <aside id="sidebar" className={ sidebarToggle ? "sidebar-responsive" : "" } >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          {/* <BsCart3 className='icon_header'/>  */}
          SIH2023
        </div>
        <span className='icon close_icon' onClick={openSidebar}>X</span>
      </div>

      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <Link to='/'>
            {/* <BsGrid1X2Fill className='icon'/>  */}
            Dashboard
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <a href=''>
            {/* <BsPersonCircle className='icon'/>  */}
            Account
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href='' onClick={() => handleLogout()}>
            {/* <BsCart3 className='icon'/>  */}
            Logout
          </a>
        </li>
      </ul>

    </aside>
  )
}

Sidebar.propTypes = {
  sidebarToggle: PropTypes.any.isRequired,
  openSidebar: PropTypes.any.isRequired,
  setUsername: PropTypes.func.isRequired,
  setToken: PropTypes.func.isRequired,
  setUserId: PropTypes.any.isRequired,
}

export default Sidebar