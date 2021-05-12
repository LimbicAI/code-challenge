import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { AppContext, AppProvider } from '../../../context/AppState';
import QuestionsList from '../QuestionsList';
import QUESTIONS from '../../../fixtures/questions';

let result;

const setup = data => {
	result = render(
		<AppProvider>
			<QuestionsList />
		</AppProvider>
	);
};

describe('QuestionList tests', () => {
	it('matches the snapshot', () => {
		setup();
		expect(result.asFragment()).toMatchSnapshot();
	});

	it('has no questions copy when no questions', () => {
		setup([]);
		render(
			<AppContext.Provider value={{ questions: [] }}>
				<QuestionsList />
			</AppContext.Provider>
		);
		screen.debug();
		expect(
			screen.queryByText(/no questions available/i)
		).toBeInTheDocument();
	});

	it('opens the modal on Add a Question click', () => {
		setup();
		expect(screen.queryByText(/create/i)).not.toBeInTheDocument();
		expect(screen.queryByText(/cancel/i)).not.toBeInTheDocument();
		fireEvent.click(screen.getByText(/add a question/i));
		expect(screen.queryByText(/create/i)).toBeInTheDocument();
		expect(screen.queryByText(/cancel/i)).toBeInTheDocument();
	});

	it('creates a Question on Create click and form submission', () => {
		setup();
		const newQuestion = 'Is this a test question?';
		expect(screen.queryByText(newQuestion)).not.toBeInTheDocument();
		fireEvent.click(screen.getByText(/add a question/i));
		fireEvent.change(screen.getByLabelText(/question/i), {
			target: { value: newQuestion }
		});
		fireEvent.click(screen.getByText(/create/i));
		expect(screen.queryByText(newQuestion)).toBeInTheDocument();
	});

	it('opens the modal on Edit click', () => {
		setup();
		expect(screen.queryByText(/update/i)).not.toBeInTheDocument();
		expect(screen.queryByText(/cancel/i)).not.toBeInTheDocument();
		fireEvent.click(screen.queryAllByTestId('pencil-icon')[0]);
		expect(screen.queryByText(/update/i)).toBeInTheDocument();
		expect(screen.queryByText(/cancel/i)).toBeInTheDocument();
	});

	it('updates a Question on Create click and form submission', () => {
		setup();
		const updatedQuestion = 'Is this a test question?';
		expect(
			screen.queryByText(QUESTIONS[0].description)
		).toBeInTheDocument();
		expect(screen.queryByText(updatedQuestion)).not.toBeInTheDocument();
		fireEvent.click(screen.queryAllByTestId('pencil-icon')[0]);
		fireEvent.change(screen.getByLabelText(/question/i), {
			target: { value: updatedQuestion }
		});
		fireEvent.click(screen.getByText(/update/i));
		expect(
			screen.queryByText(QUESTIONS[0].description)
		).not.toBeInTheDocument();
		expect(screen.queryByText(updatedQuestion)).toBeInTheDocument();
	});

	it('deletes a question on Delete click', () => {
		setup();
		expect(
			screen.queryByText(QUESTIONS[0].description)
		).toBeInTheDocument();
		fireEvent.click(screen.queryAllByTestId('trash-can-icon')[0]);
		expect(
			screen.queryByText(QUESTIONS[0].description)
		).not.toBeInTheDocument();
	});
});
