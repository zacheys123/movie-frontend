import styled from 'styled-components';
//
const size = {
	mobileS: '320px',
	mobileM: '375px',
	mobileL: '480px',
	tablet: '768px',
	laptop: '1024px',
	laptopL: '1440px',
	desktop: '2560px',
};

//
export const device = {
	mobileS: `(max-width: ${size.mobileS})`,
	mobileM: `(max-width: ${size.mobileM})`,
	mobileL: `(max-width: ${size.mobileL})`,
	tablet: `(max-width: ${size.tablet})`,
	laptop: `(max-width: ${size.laptop})`,
	laptopL: `(max-width: ${size.laptopL})`,
	desktop: `(max-width: ${size.desktop})`,
	desktopL: `(max-width: ${size.desktop})`,
};

//

export const MainStack = styled.div`
	display: flex;

	flex-direction: row;
	@media ${device.mobileL} and (max-width: ${device.mobileS}) {
		flex-direction: column;
	}
`;
export const Main = styled.div`
	position: relative;

	height: 87.5vh !important;
	flex: 8;
	background: ${({ istheme }) => (istheme ? 'white' : 'black')};
	input {
		margin-top: 0.1rem;
	}
	select {
		width: 50%;
		background: rgb(107, 37, 38);
		color: white;
		margin-top: 1rem;
		margin-bottom: -1rem;
		outline-width: 0 !important;
		padding: 0.7rem;
		margin-left: 0.9rem;
		cursor: pointer;
	}

	/* media query */
	@media ${device.tablet} {
		flex: 7;
	}
`;
export const Left_Bar = styled.div`
	height: 87.5vh;
	flex: 2;
	background: ${({ istheme }) => (istheme ? 'black' : 'black')};
	h4 {
		color: white;
		margin-top: 0.5rem;
	}
	h6 {
		color: white;
		margin-top: 0.5rem !important;
	}
	button {
		margin-top: 1rem;
	}
	/* media query */
	@media ${device.tablet} {
		flex: 3;
	}
`;
export const Image_Data = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;

	margin-bottom: 1rem;
	img {
		height: 20rem;
		width: 20rem;
		border-radius: 100%;
	}
	label {
		position: absolute;
		top: 18rem;
		right: 1rem;
	}
`;

export const Profile_Data = styled.div`
	margin-top: 1.7rem;
	color: ${({ istheme }) =>
		istheme ? 'white !important' : 'black !important'};

	background: ${({ disabled }) => (!disabled ? 'white' : 'black')};

	input[type='text'] {
		border: none;
		width: 100%;
	}
`;
export const Validate = styled.div`
	position: absolute;
	top: 6.6rem;
	width: 100%;
	height: 87%;
	opacity: 0.98;
	z-index: ${({ showValidate }) => (!showValidate ? -999 : 999)};
	display: flex;
	justify-content: center;
	align-items: center;
	background: ${({ showValidate }) => (!showValidate ? '' : 'white')};
	box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
		rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
		rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset !important;
`;

export const Auth = styled.div`
	position: absolute;
	box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
		rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
		rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset !important;
	display: flex;

	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 45% !important;
	height: 65%;
	padding: 1rem;

	z-index: 999;
	button {
		width: 100%;
		background: lightblue;
		margin-top: 2rem;
		padding: 0.6rem;
		font-family: georgia;
		font-size: 0.8rem;
		&:hover {
			background: aqua !important;
		}
	}
	.add_button {
		display: flex;
		justify-content: space-between;
		align-items: center;
		button {
			margin-top: 2rem !important;
			width: 100% !important;
			&:hover {
				background: rgba(230, 237, 64, 0.35) !important;
			}
		}
	}
	.account {
		margin-top: 0rem;
		h6 {
			color: lightgrey;
			font-size: 1.1rem !important;
		}
	}
	.top {
		.close_icon {
			position: absolute;

			z-index: 999 !important;
			cursor: pointer;
			top: 0.5rem;
			right: 1.3rem;
			color: grey;
			font-size: 1.9rem !important;
			font-weight: bold !important;
			&:hover {
				color: red;
			}
		}
		.back_icon {
			position: absolute;
			top: 0.5rem;
			z-index: 999 !important;
			cursor: pointer;
			left: 1.3rem;
			color: grey;
			font-size: 1.9rem !important;
			font-weight: bold !important;
			&:hover {
				color: orange;
			}
		}
	}
`;

export const Profile_Auth = styled.div`
	margin-top: 2.5rem;

	color: ${({ disabled }) =>
		!disabled ? 'yellow ' : 'black !important'};
	border: ${({ success, error }) => success && '1px solid green '};
	border-bottom: none !important;
	background: ${({ disabled }) => (!disabled ? 'white' : 'white')};

	input[type='text'] {
		border: none;
		width: 100%;
	}
`;
