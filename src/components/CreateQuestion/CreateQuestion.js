import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

const noop = () => {};

const CreateQuestion = ({ onClick = noop }) => {
	const [showModal, setShowModal] = useState(false);

	const onSubmit = event => {
		event.preventDefault();
	};

	return (
		<>
			<button onClick={() => setShowModal(true)}>Add a Question</button>
			{showModal && (
				<div className={styles.modal}>
					<form onSubmit={event => onSubmit(event)}>
						<label htmlFor="question">Question:</label>
						<input type="text" id="question" name="question" />
						<button onClick={() => setShowModal(false)}>
							Cancel
						</button>
						<button onClick={() => setShowModal(false)}>
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
