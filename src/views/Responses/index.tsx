import React from 'react';
import { Delete } from '@mui/icons-material';
import {
  Button,
  CircularProgress,
  IconButton,
  Typography,
} from '@mui/material';
import EmptyPlaceholder from 'components/EmptyPlaceholder';
import Title from 'components/Title';
import useResponses from 'data/useResponses';
import useAlert from 'hooks/useAlert';
import useTitle from 'hooks/useTitle';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Card, Content, PageWrapper } from 'styles/common';
import { pluralize } from 'utils';
import { del } from 'utils/requests';

const DeleteButton = styled(IconButton)`
  position: absolute;
  top: 8px;
  right: 8px;
`;

const ResponsesView = () => {
  useTitle('User Responses');
  const { responses, usernames, isFetching, mutate } = useResponses();
  const navigate = useNavigate();
  const alert = useAlert();

  return (
    <PageWrapper>
      <Title>User Responses</Title>
      <Content>
        {isFetching ? (
          <CircularProgress />
        ) : (
          <>
            {usernames.map((userName) => (
              <Card key={userName}>
                <DeleteButton
                  onClick={async () => {
                    try {
                      const newResponses = { ...responses };
                      delete newResponses[userName];
                      mutate(newResponses, false);
                      await del(`responses/${userName}`);
                      mutate();
                      alert.onSuccess('Success');
                    } catch {
                      alert.onFailure('Something went wrong');
                    }
                  }}
                >
                  <Delete />
                </DeleteButton>
                <Typography>{userName}</Typography>
                <Typography>
                  {responses?.[userName].length}{' '}
                  {pluralize('response', responses?.[userName].length)}
                </Typography>
                {responses?.[userName].length > 0 && (
                  <Button onClick={() => navigate(userName)}>
                    View responses
                  </Button>
                )}
              </Card>
            ))}
            {!usernames.length && (
              <EmptyPlaceholder>
                <Typography>No responses were recorded</Typography>
              </EmptyPlaceholder>
            )}
          </>
        )}
      </Content>
    </PageWrapper>
  );
};

export default ResponsesView;
