import { BsPersonCircle, BsJustify } from 'react-icons/bs';
import PropTypes from 'prop-types';

const Navbar = ({ openSidebar, username }) => {

  // const getRandomColor = () => {
  //   const letters = '0123456789ABCDEF';
  //   let color = '#';
  //   for (let i = 0; i < 6; i++) {
  //     color += letters[Math.floor(Math.random() * 16)];
  //   }
  //   return color;
  // }

  return (
    <header className='header '>
        {/* sidebar stuff */}
        <div className='menu-icon'> 
            <BsJustify className='icon' onClick={openSidebar}/>
        </div>
        <div className="header-right">
            <BsPersonCircle className='icon'/>
            {/* <div className="account-name" style={{ display: 'flex', height: '35px', width: '35px', backgroundColor: `${getRandomColor()}`, borderRadius: '50%',  justifyContent: 'center', alignContent: 'center' }}>{username.charAt(0).toUpperCase()}</div> */}
        </div>
    </header>
  )
}

Navbar.propTypes = {
    openSidebar: PropTypes.any.isRequired,
    username: PropTypes.string.isRequired,
}

export default Navbar