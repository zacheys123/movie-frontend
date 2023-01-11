import { useEffect } from 'react';

const Modal = ({ closemodal, modalcontent, success, error }) => {
	useEffect(() => {
		setTimeout(() => {
			closemodal();
		}, 5000);
	}, []);
	return (
		<>
			{success && (
				<div className="alert alert-success text-center">
					{modalcontent}
				</div>
			)}
			{error && (
				<div className="alert alert-danger text-center">
					{modalcontent}
				</div>
			)}
		</>
	);
};

export default Modal;
