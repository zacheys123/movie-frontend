import { useRef, useState, useEffect } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { Box } from '@mui/material';

import './Layout.scss';
import { Login } from '../../pages';
function Layout({ children }) {
	const mydata = JSON.parse(localStorage.getItem('profile'));

	useEffect(() => {}, []);
	return (
		<>
			{mydata?.result?._id ? (
				<div className="layout">
					<Header />
					<Box className="children">{children}</Box>

					<Footer />
				</div>
			) : (
				<Login height="100vh" />
			)}
		</>
	);
}
export default Layout;
