import './Navbar.css';

import {logo} from '../../contents/images';

function Navbar() {
    return (
        <nav className='navbar'>
            <img className='nav-logo' src={logo} alt="Spotify" />
        </nav>
    );
}

export default Navbar;