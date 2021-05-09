import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import CLIENTS from '../fixtures/clients';

const savedQuestions = localStorage.getItem('questions');

const initialState = savedQuestions
	? { questions: JSON.parse(savedQuestions), clients: CLIENTS }
	: {
			questions: [
				{
					type: 'text',
					description: 'Sample Question?'
				},
				{
					type: 'multiple',
					description: 'Sample Question?',
					options: ['one', 'two', 'three']
				},
				{
					type: 'single',
					description: 'Sample Question?',
					options: ['one', 'two', 'three']
				}
			],
			clients: CLIENTS
	  };

export const AppContext = createContext(initialState);

export const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);

	const removeQuestion = id => {
		dispatch({
			type: 'REMOVE_QUESTION',
			payload: id
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
