import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppState';
import QuestionModal from '../QuestionModal';
import Button from '../Button';
import TrashCan from '../../assets/delete.png';
import Pencil from '../../assets/pencil.png';
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
			{questions.length < 1 && (
				<span className={styles.noQuestions}>
					No questions available <br /> Add a new question below
				</span>
			)}
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
							<img
								className={styles.trashCanIcon}
								data-testid="trash-can-icon"
								src={TrashCan}
							/>
						</Button>
						<Button
							onClick={event =>
								openEditQuestion(event, question, index)
							}
							variation="small"
						>
							<img
								className={styles.trashCanIcon}
								data-testid="pencil-icon"
								src={Pencil}
							/>
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
