import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppState';
import QuestionModal from '../QuestionModal';
import Button from '../Button';
import styles from './styles.module.css';

const QuestionsList = () => {
	const { questions, removeQuestion } = useContext(AppContext);
	const [showModal, setShowModal] = useState(false);
	const [modalType, setModalType] = useState('create');
	const [question, setQuestion] = useState({});

	const openCreateQuestion = () => {
		setQuestion({ description: '', index: null });
		setShowModal(true);
		setModalType('create');
	};

	const openEditQuestion = (event, question, index) => {
		event.preventDefault();
		setQuestion({ ...question, id: index });
		setShowModal(true);
		setModalType('edit');
	};

	const toggleModal = value => {
		setShowModal(value);
	};

	return (
		<div className={styles.questions}>
			{questions.map((question, index) => (
				<div
					className={styles.question}
					key={`${question.description}_${index}`}
				>
					<span className={styles.questionText}>
						{question.description}
					</span>
					<div className={styles.buttonGroup}>
						<Button
							onClick={() =>
								removeQuestion({
									index,
									description: question.description
								})
							}
							variation="alert"
						>
							Delete
						</Button>
						<Button
							onClick={event =>
								openEditQuestion(event, question, index)
							}
							variation="small"
						>
							Edit
						</Button>
					</div>
				</div>
			))}
			<Button onClick={openCreateQuestion}>Add a Question</Button>
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
