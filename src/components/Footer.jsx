import React from 'react';
import '../css/Footer.css';
import { useMainContext } from '../context/contexts_/MainContext';
const Footer = () => {
	const {
		main_state: { admin },
	} = useMainContext();
	const [user, setUser] = React.useState(() => {
		const storedvalues = localStorage.getItem('profile');
		if (!storedvalues) return {};
		return JSON.parse(storedvalues);
	});

	return <div className="footer">&copy;{user?.result?.company}</div>;
};
export default Footer;
