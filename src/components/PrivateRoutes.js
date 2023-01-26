import React from 'react';

import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoutes = ({ children }) => {
	const location = useLocation();
	const [user, setUser] = React.useState(() => {
		const storedvalues = localStorage.getItem('profile');
		if (!storedvalues) return {};
		return JSON.parse(storedvalues);
	});

	if (!user?.result?._id) {
		return (
			<Navigate to="/login" state={{ from: location.pathname }} />
		);
	}
	return children;
};
export default PrivateRoutes;
