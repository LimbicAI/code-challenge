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
			const { description, choices, type } = action.payload;
			const newQuestion = {
				description,
				choices,
				type
			};
			updatedQuestions = [newQuestion, ...state.questions];
			updatedClients = state.clients.map(client => client);
			updatedClients.forEach(client => {
				client.questions.push({ q: description, a: '-' });
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
				description: action.payload.description,
				type: action.payload.type,
				choices: action.payload.choices
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

		case 'UPDATE_ANSWERS':
			const clientName = action.payload.client.name;
			const updatedClient = {
				name: clientName
			};
			updatedClient.questions = Object.values(action.payload.answers).map(
				(answer, index) => {
					return {
						q: action.payload.client.questions[index].q,
						a: answer
					};
				}
			);

			const position = state.clients.findIndex(
				client => client.name === clientName
			);
			updatedClients = [...state.clients];
			updatedClients[position] = updatedClient;
			updateLocalStorage('clients', updatedClients);

			return {
				...state,
				clients: updatedClients
			};

		default:
			return state;
	}
};

export default reducer;
