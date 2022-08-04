import React from 'react';
import { Button } from '@mui/material';
import Title from 'components/Title';
import useTitle from 'hooks/useTitle';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PageWrapper } from 'styles/common';
import { AuthKey } from 'types/auth';
import { authKey } from 'utils/constants';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 32px;

  > button {
    align-self: center;
    min-width: 250px;

    :not(:first-child) {
      margin-top: 16px;
    }
  }
`;

const SignIn = () => {
  const navigate = useNavigate();
  useTitle('Auth');

  return (
    <PageWrapper>
      <Title>Sign In</Title>
      <Card>
        <Button
          variant="outlined"
          onClick={() => {
            localStorage.setItem(authKey, AuthKey.Client);
            navigate('/questionnaire');
          }}
        >
          Sign in as a client
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            localStorage.setItem(authKey, AuthKey.Doctor);
            navigate('/responses');
          }}
        >
          Sign in as a therapist
        </Button>
      </Card>
    </PageWrapper>
  );
};

export default SignIn;
