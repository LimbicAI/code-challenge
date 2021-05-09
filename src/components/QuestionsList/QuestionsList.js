import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppState';
import QuestionModal from '../QuestionModal';
import styles from './styles.module.css';

const QuestionsList = () => {
	const { questions, removeQuestion } = useContext(AppContext);
	const [showModal, setShowModal] = useState(false);
	const [modalType, setModalType] = useState('create');
	const [question, setQuestion] = useState({});

	const openCreateQuestion = () => {
		setQuestion({ description: null, index: null });
		setShowModal(true);
		setModalType('create');
	};

	const openEditQuestion = (event, description, index) => {
		event.preventDefault();
		setQuestion({ description, index });
		setShowModal(true);
		setModalType('edit');
	};

	const toggleModal = value => {
		setShowModal(value);
	};

	return (
		<div className={styles.questions}>
			{questions.map((question, index) => (
				<span>
					{question.description}{' '}
					<button onClick={() => removeQuestion(index)}>
						Delete
					</button>
					<button
						onClick={event =>
							openEditQuestion(event, question.description, index)
						}
					>
						Edit
					</button>
				</span>
			))}
			<button onClick={openCreateQuestion}>Add a Question</button>
			{showModal && (
				<QuestionModal
					type={modalType}
					toggleModal={toggleModal}
					value={question}
				/>
			)}
		</div>
	);
};

export default QuestionsList;
