import React from 'react';
import { AppBar } from '@mui/material';
import styled from 'styled-components';

import Link from '../Link';

const Wrapper = styled(AppBar)`
  padding: 8px;
  display: flex;
  flex-direction: row;

  > * {
    margin: auto 8px;
  }
`;

const NavBar = () => {
  return (
    <Wrapper position="sticky">
      <Link to="/" text="Auth" />
      <Link to="/questions" text="Questions" />
      <Link to="/responses" text="Responses" />
      <Link to="/questionnaire" text="Questionnaire" />
    </Wrapper>
  );
};

export default NavBar;
