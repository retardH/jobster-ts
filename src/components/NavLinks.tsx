import links from '../utils/links.tsx';
import { NavLink } from 'react-router-dom';

type NavLinksProps = {
  toggleSidebar: () => void;
};
const NavLinks = ({ toggleSidebar }: NavLinksProps) => {
  return (
    <div className="nav-links">
      {links.map((link) => (
        <NavLink
          key={link.id}
          onClick={toggleSidebar}
          to={link.path}
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
        >
          <span className="icon">{link.icon}</span>
          {link.text}
        </NavLink>
      ))}
    </div>
  );
};

export default NavLinks;
