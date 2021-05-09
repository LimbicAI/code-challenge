const updateLocalStorage = questions => {
	localStorage.setItem('questions', JSON.stringify(questions));
};

const reducer = (state, action) => {
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
			const newQuestion = {
				description: action.payload
			};
			updatedQuestions = [newQuestion, ...state.questions];

			updateLocalStorage(updatedQuestions);

			return {
				...state,
				questions: updatedQuestions
			};
		case 'EDIT_QUESTION':
			const updatedQuestion = {
				id: action.payload.id,
				description: action.payload.description
			};

			updatedQuestions = state.questions.map((question, index) => {
				if (index === updatedQuestion.id) {
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

export default reducer;
