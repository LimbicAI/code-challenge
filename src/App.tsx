import React from 'react';
import { Paper } from '@mui/material';
import ProtectedRoute from 'components/ProtectedRoute';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { SWRConfig } from 'swr';
import Questionnaire from 'views/Questionnaire';
import UserResponses from 'views/UserResponses';

import NavBar from './components/Navbar';
import WithAlert from './components/WithAlert';
import SignIn from './views/Auth/SignIn';
import Questions from './views/Questions';
import ResponsesView from './views/Responses';

const StyledPaper = styled(Paper)`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 100vh;
`;

function App() {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(`http://localhost:8000/${resource}`, init).then((res) =>
            res.json()
          ),
      }}
    >
      <BrowserRouter>
        <WithAlert>
          <StyledPaper>
            <NavBar />
            <Routes>
              <Route path="/" element={<SignIn />} />
              <Route
                path="/questions"
                element={
                  <ProtectedRoute isProtected>
                    <Questions />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/responses"
                element={
                  <ProtectedRoute isProtected>
                    <ResponsesView />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/responses/:userName"
                element={
                  <ProtectedRoute isProtected>
                    <UserResponses />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/questionnaire"
                element={
                  <ProtectedRoute>
                    <Questionnaire />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </StyledPaper>
        </WithAlert>
      </BrowserRouter>
    </SWRConfig>
  );
}

export default App;
