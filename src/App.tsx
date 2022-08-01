import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import SignIn from './views/Auth/SignIn';
import TemplatesView from './views/Templates';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/templates" element={<TemplatesView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
