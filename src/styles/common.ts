import { Card as MuiCard } from '@mui/material';
import styled from 'styled-components';

export const PageWrapper = styled.div`
  padding: 16px;
  position: relative;

  h1 {
    position: sticky;
    top: 32px;
    background-color: #fff;
    z-index: 2;
    padding-bottom: 24px;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 40px auto 0;
  flex: 1;
`;

export const Card = styled(MuiCard)`
  padding: 16px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;
