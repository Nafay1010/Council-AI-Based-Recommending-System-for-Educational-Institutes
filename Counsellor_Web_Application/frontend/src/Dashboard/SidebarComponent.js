import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useLogout } from '../hooks/useLogout';
import {useState} from 'react'


const SidebarComponent = () => {
    const { collapseSidebar } = useProSidebar();
    const [check, setCheck] = useState(true)
    const {logout} = useLogout()
    
    const handleClick = ()=>{
    collapseSidebar()
    setCheck(prevCheck => !prevCheck)
    }

    const handlelogout = () =>{
        logout()
    }
    return ( 
        <div style={{display: 'flex', height: '100%', marginTop: '-70px'}}>
             <Sidebar>
                <div className="navbar-logo">
                {check ? <h1 onClick={handleClick}>Counsellor</h1> : <button className='logobtn' onClick={handleClick}><FontAwesomeIcon icon={faBars} /></button>}
                </div>
                <br /><br /><br /><br /><br /><br />
                <Menu className='menu-items'>  
                    <Link to={'/home'}><MenuItem><FontAwesomeIcon className='icon' icon={faHouse}/>Home</MenuItem></Link>
                    <br /><br /><br /><br />
                    <Link to={'/search'}><MenuItem><FontAwesomeIcon className='icon' icon={faMagnifyingGlass} />Explore</MenuItem></Link>
                    <br /><br /><br /><br />
                    <Link to={'/counsil'}><MenuItem><FontAwesomeIcon className='icon' icon={faCheck} />Counselling</MenuItem></Link>
                    <br /><br /><br /><br /><br /><br /><br />
                    <Link to={'/login'}><MenuItem onClick={handlelogout}><FontAwesomeIcon className='icon' icon={faRightFromBracket} />Logout</MenuItem></Link>
                </Menu>
            </Sidebar>
        </div>
     );
}
 
export default SidebarComponent;