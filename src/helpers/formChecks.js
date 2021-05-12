const checkIfDisabled = (question, answerType) => {
	if (!question.description) {
		return true;
	}
	if (answerType !== 'text' && !question.choices) {
		return true;
	}
	if (
		answerType !== 'text' &&
		question.choices.length > 1 &&
		question.choices.split(',').length > 1
	) {
		const choices = question.choices
			.split(',')
			.map(choice => choice.length > 2);
		return choices.includes(false);
	}
};

export default checkIfDisabled;
