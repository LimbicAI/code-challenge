import { NavLink } from 'react-router-dom';
import { navLinks } from 'config/navlink';
import styles from './index.module.scss';

const Sidebar = () => {
  return (
    <div className={styles.sidebar__wrapper}>
      <div className={styles.menu}>
        {navLinks.map((link, index) => {
          return (
            <div key={index}>
              <div className={styles.sidebar__divider}></div>
              <NavLink
                to={link.url}
                key={link.title}
                className={({ isActive }) => (isActive ? styles.active : '')}
                >
                <li className={styles.menu__link}>
                  <span>{link.title}</span>
                </li>
              </NavLink>
            </div>
          );

        })}
      </div>
    </div>
  )
}

export default Sidebar
