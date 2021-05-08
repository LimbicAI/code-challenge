import React from 'react';
import CreateQuestion from '../../components/CreateQuestion';
import QuestionsList from '../../components/QuestionsList';

const Questions = () => {
	return (
		<>
			<QuestionsList />
			<CreateQuestion />
		</>
	);
};

export default Questions;
