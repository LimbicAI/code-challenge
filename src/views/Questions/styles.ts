import { IconButton as IButton, Paper } from '@mui/material';
import styled from 'styled-components';

export const QuestionsWrapper = styled(Paper)`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  flex: 1;

  > div {
    padding: 8px 8px 16px;

    :not(:last-child) {
      border-bottom: 1px solid #f7f7f7;
      margin-bottom: 8px;
    }
  }
`;

export const Line = styled.div`
  display: flex;
  justify-content: space-between;
  > div {
    flex: 1;

    :nth-child(2) {
      flex: 0.5;
      margin-left: 16px;
    }
  }
`;

export const IconButton = styled(IButton)`
  min-width: 50px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const Snackbar = styled.div`
  position: sticky;
  bottom: 0px;
  padding-bottom: 24px;
  z-index: 2;
  background-color: #fff;
`;
