import Header from '../Header';
import Footer from '../Footer';
import { Box } from '@mui/material';

import './Layout.scss';
function Layout({ children }) {
	return (
		<div className="layout">
			<Header />
			<Box className="children">{children}</Box>

			<Footer />
		</div>
	);
}
export default Layout;
