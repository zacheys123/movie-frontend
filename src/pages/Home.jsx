import React from 'react';
import '../css/Feed.scss';
import { Input, Form, Label } from 'react-bootstrap';
import { Box } from '@mui/material';
const Feed = () => {
	return (
		<div className="feed">
			<Box className="feed__movies">
				<Form action="" className="form">
					<div className="row">
						<div className="col-md-12">
							<Form.Select>
								<option>Choose User</option>
								<option value=""></option>
								<option value=""></option>
							</Form.Select>
						</div>
						<Form.Group className="row">
							<div className="col-md-12">
								<Form.Control type="text" placeholder="Enter movie" />
							</div>
						</Form.Group>
					</div>
				</Form>
			</Box>
		</div>
	);
};
export default Feed;
