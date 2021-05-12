import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Button from '../Button';
import styles from './styles.module.css';

const noop = () => {};

const ViewQuestionModal = ({ toggleModal = noop, question }) => {
	const renderChoices = (type, choices) => {
		const options = choices.split(',').map(choice => choice.trim());
		return options.map(option => (
			<span key={`${type}_${option}`}>
				<input
					disabled
					type={type === 'multipleChoice' ? 'checkbox' : 'radio'}
					id={option}
					name={option}
					value={option}
				/>
				<label htmlFor="male">{option}</label>
			</span>
		));
	};

	const isTextQuestion = question.type === 'text';

	return (
		<div className={styles.modal}>
			<form className={styles.form}>
				<p className={styles.title}>Sample Question</p>
				<div className={clsx(styles.inputGroup, styles.question)}>
					<label className={styles.label} htmlFor="description">
						Question:
					</label>
					<span className={styles.questionText}>
						{question.description}
					</span>
				</div>
				<div className={styles.inputGroup}>
					<label className={styles.label} htmlFor="description">
						{isTextQuestion ? 'Answer:' : 'Answers:'}
					</label>
					{isTextQuestion ? (
						<input className={styles.input} disabled value="text" />
					) : (
						<div className={styles.multiChoice}>
							{renderChoices(question.type, question.choices)}
						</div>
					)}
				</div>
				<div className={styles.buttons}>
					<Button onClick={() => toggleModal(false)}>Close</Button>
				</div>
			</form>
		</div>
	);
};

ViewQuestionModal.propTypes = {
	question: PropTypes.object,
	toggleModal: PropTypes.func
};

export default ViewQuestionModal;
