// import { BsCart3, BsGrid1X2Fill, BsPersonCircle } from 'react-icons/bs'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const Sidebar = ({ sidebarToggle, openSidebar }) => {
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
          <a href=''>
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
}

export default Sidebar