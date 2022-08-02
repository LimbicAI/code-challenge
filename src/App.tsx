import React from 'react';
import { Paper } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { SWRConfig } from 'swr';

import NavBar from './components/Navbar';
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
        <StyledPaper>
          <NavBar />
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/responses" element={<ResponsesView />} />
          </Routes>
        </StyledPaper>
      </BrowserRouter>
    </SWRConfig>
  );
}

export default App;
