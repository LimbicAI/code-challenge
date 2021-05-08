import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

const savedQuestions = localStorage.getItem('questions');
// Initial State
console.warn(JSON.parse(savedQuestions));
const initialState = savedQuestions
	? { questions: JSON.parse(savedQuestions) }
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
			]
	  };

export const AppContext = createContext(initialState);

export const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);

	// Actions
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
