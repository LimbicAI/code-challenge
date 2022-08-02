import { Button, IconButton as IButton, Paper } from '@mui/material';
import styled from 'styled-components';

export const QuestionsWrapper = styled(Paper)`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  flex: 1;
  margin: 64px auto 0;

  > div {
    padding: 8px 8px 16px;

    :not(:last-child) {
      border-bottom: 1px solid #f7f7f7;
      margin-bottom: 8px;
    }
  }
`;

export const QuestionWrapper = styled.div``;

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

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

export const Submit = styled(Button)`
  display: flex;
  margin: 16px auto 0;
`;
