import {Link} from 'react-router-dom'

export default function NavBar() {
  return (
    <nav className= "navbar">
      <ul className ="nav-list">
        <li><Link to="/">🐶 Home</Link></li>
      </ul>
    </nav>
  );
}