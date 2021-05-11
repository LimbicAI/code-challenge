import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { AppProvider } from '../../../context/AppState';
import ClientsList from '../ClientsList';
import CLIENTS from '../../../fixtures/clients';

let result;

describe('test', () => {
	beforeEach(() => {
		result = render(
			<AppProvider>
				<ClientsList />
			</AppProvider>
		);
	});
	it('matches the snapshot', () => {
		expect(result.asFragment()).toMatchSnapshot();
	});

	it('expands the question list on name click', () => {
		expect(
			screen.queryByText(CLIENTS[0].questions[0].q)
		).not.toBeInTheDocument();
		fireEvent.click(screen.getByText(CLIENTS[0].name));
		expect(
			screen.queryByText(CLIENTS[0].questions[0].q)
		).toBeInTheDocument();
	});
});
