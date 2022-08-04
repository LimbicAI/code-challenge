import React from 'react';
import { Link as MuiLink } from '@mui/material';
import { Link as RouterLink, LinkProps } from 'react-router-dom';
import styled from 'styled-components';

interface Props extends LinkProps {
  text: string;
}

const StyledLink = styled(MuiLink)`
  display: flex;
  flex-shrink: 1;

  a {
    text-decoration: none;
    color: #fff;
  }
`;

const Link = ({ to, text, ...rest }: Props) => {
  return (
    <StyledLink {...rest} as="span">
      <RouterLink to={to}>{text}</RouterLink>
    </StyledLink>
  );
};

export default React.memo(Link);
