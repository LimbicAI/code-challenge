import React, { useContext, useState } from 'react';
import clsx from 'clsx';
import { AppContext } from '../../context/AppState';
import PropTypes from 'prop-types';
import Button from '../Button';
import styles from './styles.module.css';

const noop = () => {};

const QuestionModal = ({
	onClick = noop, // TODO - REMOVE
	toggleModal = noop,
	type = 'create',
	value
}) => {
	const [question, setQuestion] = useState(value || '');
	const [answerType, setAnswerType] = useState(value.type || 'text');
	const [oldQuestion, setOldQuestion] = useState(value || '');
	const { addQuestion, editQuestion } = useContext(AppContext);

	const onSubmit = event => {
		event.preventDefault();
	};

	const createQuestion = () => {
		addQuestion({ ...question, type: answerType });
		toggleModal(false);
		setQuestion('');
	};

	const updateQuestion = () => {
		editQuestion({
			description: question.description,
			oldDescription: oldQuestion.description,
			type: answerType,
			id: question.id,
			choices: question.choices
		});
		toggleModal(false);
		setQuestion('');
	};

	const handleSelect = event => {
		event.preventDefault();
		setAnswerType(event.target.value);
	};

	const onChange = event => {
		event.preventDefault();
		const { id } = event.target;
		setQuestion({ ...question, [id]: event.target.value });
	};

	const isDisabled = () => {
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

	return (
		<div className={styles.modal}>
			<form className={styles.form} onSubmit={event => onSubmit(event)}>
				<div className={styles.inputGroup}>
					<label className={styles.label} htmlFor="description">
						Question:
					</label>
					<input
						autoFocus
						className={styles.input}
						id="description"
						name="description"
						onChange={onChange}
						type="text"
						value={question.description}
					/>
				</div>
				<div className={styles.inputGroup}>
					<label className={styles.label} htmlFor="answerType">
						Answer Type:
					</label>
					<select
						className={styles.input}
						name="answerType"
						id="answerType"
						onChange={handleSelect}
						value={answerType}
					>
						<option value="text">Text</option>
						<option value="singleChoice">Single Choice</option>
						<option value="multipleChoice">Multiple Choice</option>
					</select>
				</div>
				<label className={styles.label} htmlFor="choices">
					Choices (separated by commas):
				</label>
				<input
					className={clsx(styles.input, styles.choices)}
					disabled={answerType === 'text'}
					id="choices"
					name="choices"
					onChange={onChange}
					placeholder="Example: Agree, Somewhat Agree, Disagree"
					type="text"
					value={question.choices}
				/>
				<div className={styles.buttons}>
					<Button onClick={() => toggleModal(false)}>Cancel</Button>
					{type === 'create' ? (
						<Button
							disabled={isDisabled()}
							onClick={createQuestion}
							type="submit"
						>
							Create
						</Button>
					) : (
						<Button
							disabled={isDisabled()}
							onClick={updateQuestion}
							type="submit"
						>
							Update
						</Button>
					)}
				</div>
			</form>
		</div>
	);
};

QuestionModal.propTypes = {
	onClick: PropTypes.func,
	type: PropTypes.oneOf(['create', 'edit']),
	value: PropTypes.object
};

export default QuestionModal;
