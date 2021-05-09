import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppState';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

const noop = () => {};

const QuestionModal = ({
	onClick = noop,
	toggleModal = noop,
	type = 'create',
	value
}) => {
	const [question, setQuestion] = useState(value || null);
	const { addQuestion, editQuestion } = useContext(AppContext);

	const onSubmit = event => {
		event.preventDefault();
	};

	const createQuestion = () => {
		addQuestion(question.description);
		toggleModal(false);
		setQuestion(null);
	};

	const updateQuestion = () => {
		console.warn('!!!!! ', question);
		editQuestion({
			description: question.description,
			id: question.index
		});
		toggleModal(false);
		setQuestion(null);
	};

	const onChange = event => {
		event.preventDefault();
		setQuestion({ ...value, description: event.target.value });
	};

	return (
		<>
			<div className={styles.modal}>
				<form onSubmit={event => onSubmit(event)}>
					<label htmlFor="question">Question:</label>
					<input
						onChange={onChange}
						type="text"
						id="question"
						name="question"
						value={question.description}
					/>
					<button onClick={() => toggleModal(false)}>Cancel</button>
					{type === 'create' ? (
						<button disabled={!question} onClick={createQuestion}>
							Create
						</button>
					) : (
						<button disabled={!question} onClick={updateQuestion}>
							Update
						</button>
					)}
				</form>
			</div>
		</>
	);
};

QuestionModal.propTypes = {
	onClick: PropTypes.func,
	type: PropTypes.oneOf(['create', 'edit']),
	value: PropTypes.string
};

export default QuestionModal;
