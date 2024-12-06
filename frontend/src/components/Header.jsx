import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {logout, reset} from '../features/auth/authSlice'
import { Button } from 'reactstrap'
import { useState } from 'react';
import {
  Nav,
  NavItem,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  NavLink,
} from 'reactstrap';

function Header() {

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(!dropdownOpen);

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
  

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

    return (
    <header className='header'>
      <div className='logo'>
          <Link to ='/'> Home </Link>
      </div>
      <ul>

      <li>
          <Link to='/forum'>
              Forum
          </Link>
      </li>

      { /* IF USER.ROLE IS ADMIN SHOW HIS PAGES*/ }
        {user && user.role === 'admin' && (
          <>
            <li>
              <Link to='/addOwner'>
                  Add owner
              </Link>
            </li>
            <li>
              <Link to='/owners'>
                  Owners
              </Link>
            </li>
          </>
        )}


      { /* IF USER.ROLE IS CLIENT SHOW HIS PAGES*/ }
        {user && user.role === 'client' && (
          <>
          <li>
            <Link to='/allProperties'>
                Available properties
            </Link>
          </li>
          <li>
            <Link to='/myReservations'>
                My reservations
            </Link>
          </li>
          </>
        )}

{ /* IF USER.ROLE IS CLIENT SHOW HIS PAGES*/ }
        {user && user.role === 'owner' && (
          <>
          <li>
            <Link to='/ownersProperties'>
                My properties
            </Link>
          </li>
          <li>
            <Link to='/approveReservations'>
                Approve reservations
            </Link>
          </li>
          <li>
            <Link to='/reserved'>
                Reserved properties
            </Link>
          </li>
          </>
        )}

        { /* IF USER IS LOGGED IN SHOW LOGOUT BUTTON, IF NOT THEN SHOW REGISTER AND LOGIN BUTTONS*/ }
        {user ? ( 
          <>
            <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle nav caret>
             {user.name}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>
                <Link to='/myProfile'>
                  My profile
               </Link>
               </DropdownItem>
              <DropdownItem>
                <Link to='/changePassword'>
                  Change password
               </Link></DropdownItem>
              <DropdownItem onClick={onLogout}>Logout</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          </>
          ) : (
          <>
            <li>
              <Link to='/login'>
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to='/register'>
                <FaUser /> Register
              </Link>
            </li>
          </>
          )}

  </ul>    
  </header>
    )
}

export default Header