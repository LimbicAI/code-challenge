const updateLocalStorage = (type, questions) => {
	localStorage.setItem(type, JSON.stringify(questions));
};

const reducer = (state, action) => {
	let updatedQuestions;
	let updatedClients = [];
	switch (action.type) {
		case 'REMOVE_QUESTION':
			updatedQuestions = state.questions.filter((question, index) => {
				return index !== action.payload.index;
			});

			updatedClients = [];
			state.clients.forEach(client => {
				updatedClients.push({
					name: client.name,
					questions: client.questions.filter(
						question => question.q !== action.payload.description
					)
				});
			});

			updateLocalStorage('questions', updatedQuestions);
			updateLocalStorage('clients', updatedClients);

			return {
				...state,
				questions: updatedQuestions,
				clients: updatedClients
			};
		case 'ADD_QUESTION':
			const newQuestion = {
				description: action.payload
			};
			updatedQuestions = [newQuestion, ...state.questions];
			updatedClients = state.clients.map(client => client);
			updatedClients.forEach(client => {
				client.questions.push({ q: action.payload, a: '-' });
			});

			updateLocalStorage('questions', updatedQuestions);
			updateLocalStorage('clients', updatedClients);

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

			updatedClients = [];
			state.clients.forEach(client => {
				updatedClients.push({
					name: client.name,
					questions: client.questions.map((question, index) => {
						if (action.payload.oldDescription === question.q) {
							console.warn('here!!!');
							return {
								...question,
								q: action.payload.description
							};
						}
						return question;
					})
				});
			});

			updateLocalStorage('questions', updatedQuestions);
			updateLocalStorage('clients', updatedClients);

			return {
				...state,
				questions: updatedQuestions,
				clients: updatedClients
			};

		default:
			return state;
	}
};

export default reducer;
