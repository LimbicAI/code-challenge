export default (state, action) => {
	switch (action.type) {
		case 'REMOVE_QUESTION':
			return {
				...state,
				questions: state.questions.filter((question, index) => {
					return index !== action.payload;
				})
			};
		case 'ADD_QUESTION':
			return {
				...state,
				questions: [action.payload, ...state.questions]
			};
		case 'EDIT_QUESTION':
			const updateQuestion = action.payload;

			const updateQuestions = state.questions.map(question => {
				if (question.id === updateQuestion.id) {
					return updateQuestion;
				}
				return question;
			});
			return {
				...state,
				questions: updateQuestions
			};

		default:
			return state;
	}
};
