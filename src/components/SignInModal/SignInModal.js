import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import styles from './styles.module.scss';

const noop = () => {};

const SignInModal = ({ onSelect = noop }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.card}>
        <h2>Please Sign In to Continue</h2>
        <div className={styles.buttons}>
          <Button onClick={onSelect('patient')}>Patient</Button>
          <Button onClick={onSelect('therapist')}>Therapist</Button>
        </div>
      </div>
    </div>
  );
};

SignInModal.propTypes = {
  onSelect: PropTypes.func
};

export default SignInModal;
