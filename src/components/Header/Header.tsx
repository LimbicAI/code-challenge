import { useLocation } from 'react-router-dom'
import Avatar from 'components/Avatar/index'
import styles from './index.module.scss'

const Header = () => {
  const location = useLocation()

  const headerTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Clients'
      case '/question':
        return 'Questions'
      case '/client':
        return `Hello`
      default:
        return ""
    }
  }

  return (
    <header className={styles.header}>
      <div>
        <h2 className={styles.header__title}>{headerTitle()}</h2>
        {location.pathname !== '/client' && (
          <div className={styles.user}>
            <p className={styles.user__name}>Janet Michael</p>
            <p className={styles.user__role}>Therapist</p>
            <div>
              <Avatar name='Jane Michael' />
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
