import React from 'react';
import '../css/Footer.css';
import { useMainContext } from '../context/contexts_/MainContext';
const Footer = () => {
	const {
		main_state: { admin },
	} = useMainContext();
	return <div className="footer">&copy;{admin?.result?.company}</div>;
};
export default Footer;
