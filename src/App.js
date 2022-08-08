import React, { useEffect } from 'react';
import { ChakraProvider, Box, theme } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './views/HomePage';
import SurveyPage from './views/SurveyPage';
import AdminPage from './views/Admin/index';

import { defaultQuestions } from './configs/globalVariables';

function App() {
  useEffect(() => {
    questionsInit();
  }, []);

  const questionsInit = () => {
    let storedQuestions = localStorage.getItem('storedQuestions');
    if (!storedQuestions) {
      let defaultQuestionsStorage = defaultQuestions;
      localStorage.setItem(
        'storedQuestions',
        JSON.stringify(defaultQuestionsStorage)
      );
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Box p={5}>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="survey" element={<SurveyPage />} />
            <Route path="admin" element={<AdminPage />} />
          </Routes>
        </div>
      </Box>
    </ChakraProvider>
  );
}

export default App;
