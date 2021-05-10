import React, { useContext, useState } from 'react';
import clsx from 'clsx';
import { AppContext } from '../../context/AppState';
import styles from './styles.module.css';

const QuestionsList = () => {
	const { clients } = useContext(AppContext);
	const [showQuestions, setShowQuestions] = useState(
		clients.map(() => false)
	);

	return (
		<div className={styles.questions}>
			{clients.map((client, index) => (
				<React.Fragment key={`${client.name}_${index}`}>
					<button
						className={styles.client}
						onClick={() => {
							const updatedShowQuestions = clients.map(
								() => false
							);
							updatedShowQuestions[index] = !showQuestions[index];
							setShowQuestions(updatedShowQuestions);
						}}
					>
						{client.name}
					</button>
					<div
						className={clsx(styles.clientQuestions, {
							[styles.showQuestions]: showQuestions[index]
						})}
					>
						{client.questions.map(question => (
							<div
								className={styles.questionsAnswers}
								key={client.name + question.q}
							>
								<p>
									<span className={styles.label}>Q: </span>
									{question.q}
								</p>
								<p>
									<span className={styles.label}>A: </span>
									{question.a}
								</p>
							</div>
						))}
					</div>
				</React.Fragment>
			))}
		</div>
	);
};

export default QuestionsList;
