import { BsPersonCircle, BsJustify } from 'react-icons/bs';
import PropTypes from 'prop-types';

const Navbar = ({ openSidebar }) => {
  return (
    <header className='header '>
        {/* sidebar stuff */}
        <div className='menu-icon'> 
            <BsJustify className='icon' onClick={openSidebar}/>
        </div>
        <div className="header-right">
            <BsPersonCircle className='icon'/>
        </div>
    </header>
  )
}

Navbar.propTypes = {
    openSidebar: PropTypes.any.isRequired,
}

export default Navbar