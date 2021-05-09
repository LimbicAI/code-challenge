import React, { useContext } from 'react';
import { AppContext } from '../../context/AppState';

const Clients = () => {
	const { clients } = useContext(AppContext);

	return (
		<div>
			{clients.map((client, index) => (
				<div key={`${client.name}_${index}`}>{client.name}</div>
			))}
		</div>
	);
};

export default Clients;
