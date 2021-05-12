import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import CLIENTS from '../fixtures/clients';
import QUESTIONS from '../fixtures/questions';

const savedQuestions = localStorage.getItem('questions');
const savedClients = localStorage.getItem('clients');

const initialState = {
	questions: savedQuestions ? JSON.parse(savedQuestions) : QUESTIONS,
	clients: savedClients ? JSON.parse(savedClients) : CLIENTS
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

	const updateAnswers = (client, answers, questions) => {
		dispatch({
			type: 'UPDATE_ANSWERS',
			payload: { client, answers, questions }
		});
	};

	return (
		<AppContext.Provider
			value={{
				clients: state.clients,
				questions: state.questions,
				removeQuestion,
				addQuestion,
				editQuestion,
				updateAnswers
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
