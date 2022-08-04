import React from 'react';
import { AppBar, Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AuthKey } from 'types/auth';
import { getAuthType } from 'utils';
import { authKey } from 'utils/constants';

import Link from '../Link';

const Wrapper = styled(AppBar)`
  padding: 8px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  > * {
    margin: auto 8px;
  }
`;

const LogOutButton = styled(Button)`
  color: #fff;
  border-color: #fff;
`;

const NavBar = () => {
  const navigate = useNavigate();
  const authType = getAuthType();
  const isTherapist = authType === AuthKey.Doctor;

  return (
    <Wrapper position="sticky">
      {authType ? (
        <>
          <Stack direction="row" spacing={2}>
            {isTherapist ? (
              <>
                <Link to="/questions" text="Questions" />
                <Link to="/responses" text="Responses" />
              </>
            ) : (
              <Link to="/questionnaire" text="Questionnaire" />
            )}
          </Stack>
          <Stack>
            <LogOutButton
              variant="outlined"
              onClick={() => {
                localStorage.removeItem(authKey);
                navigate('/');
              }}
            >
              Log out
            </LogOutButton>
          </Stack>
        </>
      ) : (
        <Typography>Header for not authorized users</Typography>
      )}
    </Wrapper>
  );
};

export default NavBar;
