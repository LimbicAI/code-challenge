import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppState';
import PropTypes from 'prop-types';
import Button from '../Button';
import styles from './styles.module.css';

const noop = () => {};

const QuestionModal = ({
	onClick = noop,
	toggleModal = noop,
	type = 'create',
	value
}) => {
	const [question, setQuestion] = useState(value || '');
	const [oldQuestion, setOldQuestion] = useState(value || '');
	const { addQuestion, editQuestion } = useContext(AppContext);

	const onSubmit = event => {
		event.preventDefault();
	};

	const createQuestion = () => {
		addQuestion(question.description);
		toggleModal(false);
		setQuestion('');
	};

	const updateQuestion = () => {
		editQuestion({
			description: question.description,
			oldDescription: oldQuestion.description,
			id: question.index
		});
		toggleModal(false);
		setQuestion('');
	};

	const onChange = event => {
		event.preventDefault();
		setQuestion({ ...value, description: event.target.value });
	};

	return (
		<>
			<div className={styles.modal}>
				<form
					className={styles.form}
					onSubmit={event => onSubmit(event)}
				>
					<label htmlFor="question">Question: </label>
					<input
						className={styles.input}
						onChange={onChange}
						type="text"
						id="question"
						name="question"
						value={question.description}
					/>
					<div className={styles.buttons}>
						<Button onClick={() => toggleModal(false)}>
							Cancel
						</Button>
						{type === 'create' ? (
							<Button
								disabled={!question.description}
								onClick={createQuestion}
							>
								Create
							</Button>
						) : (
							<Button
								disabled={!question.description}
								onClick={updateQuestion}
							>
								Update
							</Button>
						)}
					</div>
				</form>
			</div>
		</>
	);
};

QuestionModal.propTypes = {
	onClick: PropTypes.func,
	type: PropTypes.oneOf(['create', 'edit']),
	value: PropTypes.object
};

export default QuestionModal;
