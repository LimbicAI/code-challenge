import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import CLIENTS from '../fixtures/clients';
import QUESTIONS from '../fixtures/questions';

const savedQuestions = localStorage.getItem('questions');
const savedClients = localStorage.getItem('clients');

const initialState = savedQuestions
	? {
			questions: JSON.parse(savedQuestions),
			clients: JSON.parse(savedClients)
	  }
	: {
			questions: QUESTIONS,
			clients: CLIENTS
	  };

export const AppContext = createContext(initialState);

export const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);

	const removeQuestion = payload => {
		dispatch({
			type: 'REMOVE_QUESTION',
			payload
		});
	};

	const addQuestion = question => {
		dispatch({
			type: 'ADD_QUESTION',
			payload: question
		});
	};

	const editQuestion = question => {
		dispatch({
			type: 'EDIT_QUESTION',
			payload: question
		});
	};

	return (
		<AppContext.Provider
			value={{
				clients: state.clients,
				questions: state.questions,
				removeQuestion,
				addQuestion,
				editQuestion
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
