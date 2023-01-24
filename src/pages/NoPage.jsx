import React from 'react';
import { Box } from '@mui/material';
const NoPage = () => {
	return (
		<div
			className="d-flex justify-content-center align-items-center bg-dark"
			style={{ height: '100%', width: '100%' }}
		>
			<Box>
				<h2>This page can't be found</h2>
				<h3>
					Ooops something went wrong ,Page Not Found
					<span>
						Connection timed out,please check your internet connection
					</span>
					<p>Or restart your website to try to fix this problem</p>
				</h3>
			</Box>
		</div>
	);
};

export default NoPage;
