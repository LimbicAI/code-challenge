import React from 'react';
import { Delete } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import Title from 'components/Title';
import useResponses from 'data/useResponses';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import useAlert from 'hooks/useAlert';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Card, Content, PageWrapper } from 'styles/common';
import { del } from 'utils/requests';

import ResponseQuestion from './components/ResponseQuestion';

const ResponseWrapper = styled.div`
  margin: 8px 0;
`;

const DeleteButton = styled(IconButton)`
  position: absolute;
  top: 8px;
  right: 8px;
`;

const UserResponses = () => {
  const { responses, isFetching, mutate } = useResponses();
  const alert = useAlert();
  const params = useParams();
  const navigate = useNavigate();

  const userName = params.userName as string;

  React.useEffect(() => {
    if (responses && !isFetching && !responses[userName]?.length) {
      navigate('/responses');
    }
  }, [responses]);

  return (
    <PageWrapper>
      <Title>{`${userName}'s responses`}</Title>
      <Content>
        {(responses[userName] || []).map((response, i) => (
          <Card key={response.date}>
            <DeleteButton
              onClick={async () => {
                try {
                  const filtered = responses[userName].filter(
                    (r) => r.id !== response.id
                  );
                  mutate({ ...responses, [userName]: filtered }, false);
                  await del(`responses/${userName}/${response.id}`);
                  mutate();
                  alert.onSuccess('Success');
                } catch {
                  alert.onFailure('Something went wrong');
                }
              }}
            >
              <Delete />
            </DeleteButton>
            <Typography>
              Date: {format(parseISO(response.date), 'Pp')}
            </Typography>
            {response.responses.map((userResponse) => (
              <ResponseWrapper key={userResponse.id}>
                <ResponseQuestion userResponse={userResponse} />
              </ResponseWrapper>
            ))}
          </Card>
        ))}
      </Content>
    </PageWrapper>
  );
};

export default UserResponses;
