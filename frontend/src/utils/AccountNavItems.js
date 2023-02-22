import { Link } from 'react-router-dom';

function NavItem({ link, text, icon, active }) {
  return (
    <li className={`${active ? 'side - nav--active' : ''} `}>
      <Link to={`${link}`}>
        <svg>
          <use xlinkHref={`img/icons.svg#icon-${icon}`} />
        </svg>
        {text}
      </Link>
    </li>
  );
}

export default function AdminNavItem() {
  return (
    <div className="admin-nav">
      <h5 className="admin-nav__heading">Admin</h5>
      <ul className="side-nav">
        <NavItem link={'#'} text={'Manage tours'} icon={'map'} />
        <NavItem link={'#'} text={'Manage users'} icon={'users'} />
        <NavItem link={'#'} text={'Manage reviews'} icon={'star'} />
        <NavItem link={'#'} text={'Manage bookings'} icon={'briefcase'} />
      </ul>
    </div>
  );
}

export function MeNavItem() {
  return (
    <>
      <NavItem link={'#'} text={'Settings'} icon={'settings'} active={true} />
      <NavItem link={'/my-tours'} text={' My bookings'} icon={'briefcase'} />
      <NavItem link={'#'} text={'My reviews'} icon={'star'} />
      <NavItem link={'#'} text={'Billing'} icon={'credit-card'} />
    </>
  );
}
