import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppState';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

const noop = () => {};

const CreateQuestion = ({ onClick = noop }) => {
	const [showModal, setShowModal] = useState(false);
	const [question, setQuestion] = useState(null);
	const { addQuestion } = useContext(AppContext);

	const onSubmit = event => {
		event.preventDefault();
	};

	const createQuestion = () => {
		addQuestion(question);
		setShowModal(false);
		setQuestion(null);
	};

	const onChange = event => {
		event.preventDefault();
		setQuestion(event.target.value);
	};

	return (
		<>
			<button onClick={() => setShowModal(true)}>Add a Question</button>
			{showModal && (
				<div className={styles.modal}>
					<form onSubmit={event => onSubmit(event)}>
						<label htmlFor="question">Question:</label>
						<input
							onChange={onChange}
							type="text"
							id="question"
							name="question"
						/>
						<button onClick={() => setShowModal(false)}>
							Cancel
						</button>
						<button disabled={!question} onClick={createQuestion}>
							Create
						</button>
					</form>
				</div>
			)}
		</>
	);
};

CreateQuestion.propTypes = {
	onClick: PropTypes.func
};

export default CreateQuestion;
