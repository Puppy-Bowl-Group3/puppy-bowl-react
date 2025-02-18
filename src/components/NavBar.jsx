import {Link} from 'react-router-dom'

export default function NavBar() {
  return (
    <>
      <div className="navbar">
        <ul className='navbar-ul'>
          <li className='navbar-li'><Link to='/'>Home</Link></li>
          <li className='navbar-li'><Link to='/newPlayerForm'>New Player Form</Link></li> 
        </ul>
      </div>
    </>
  );
}