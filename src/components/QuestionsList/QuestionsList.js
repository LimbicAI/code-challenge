import React, { useContext } from 'react';
import { AppContext } from '../../context/AppState';
import styles from './styles.module.css';

const QuestionsList = () => {
	const { questions, removeQuestion } = useContext(AppContext);

	return (
		<div className={styles.questions}>
			{questions.map((question, index) => (
				<span>
					{question.description}{' '}
					<button onClick={() => removeQuestion(index)}>
						Delete
					</button>
					<button>Edit</button>
				</span>
			))}
		</div>
	);
};

export default QuestionsList;
