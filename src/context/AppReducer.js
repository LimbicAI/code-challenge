const updateLocalStorage = questions => {
	localStorage.setItem('questions', JSON.stringify(questions));
};

export default (state, action) => {
	let updatedQuestions;
	switch (action.type) {
		case 'REMOVE_QUESTION':
			updatedQuestions = state.questions.filter((question, index) => {
				return index !== action.payload;
			});

			updateLocalStorage(updatedQuestions);

			return {
				...state,
				questions: updatedQuestions
			};
		case 'ADD_QUESTION':
			updatedQuestions = [action.payload, ...state.questions];

			updateLocalStorage(updatedQuestions);

			return {
				...state,
				questions: [action.payload, ...state.questions]
			};
		case 'EDIT_QUESTION':
			const updatedQuestion = action.payload;

			updatedQuestions = state.questions.map(question => {
				if (question.id === updatedQuestion.id) {
					return updatedQuestion;
				}
				return question;
			});

			updateLocalStorage(updatedQuestions);

			return {
				...state,
				questions: updatedQuestions
			};

		default:
			return state;
	}
};
