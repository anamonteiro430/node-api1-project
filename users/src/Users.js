import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Users = () => {
	const [users, setUsers] = useState();

	useEffect(() => {
		axios
			.get('/api/users')
			.then(res => {
				console.log('res', res);
				setUsers(res);
			})
			.catch(err => console.log(err));
	}, []);

	return (
		<>
			<h1>Users</h1>
			<p>{users}</p>
		</>
	);
};
