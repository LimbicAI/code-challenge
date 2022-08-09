import React, { ReactNode } from 'react'
import Sidebar from 'components/Sidebar/Sidebar'
import Header from 'components/Header/Header'
import styles from './index.module.scss';

type Props = {
  children: ReactNode
}

const DashboardLayout = ({ children }: Props) => {
  return (
    <div className={styles.main__layout}>
      <Sidebar />

      <section className={styles.main__page}>
        <Header />
        <div>{children}</div>
      </section>
    </div>
  )
}

export default DashboardLayout
