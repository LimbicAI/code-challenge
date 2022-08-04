import React from 'react';
import classNames from 'classnames';
import styles from './avatar.module.scss';

type Props = {
    name: string,
}

const index = ({name}: Props) => {
  return (
    <span className={styles.avatar}>
        <span className={classNames(styles.avatar__profile)}>
              {name.split(' ')[0]?.charAt(0)?.toUpperCase()}
              {name.split(' ')[1]?.charAt(0)?.toUpperCase()}
        </span>

    </span>
  )
}

export default index