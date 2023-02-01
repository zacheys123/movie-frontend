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
		width: 70%;
		background: lightgrey;
		color: black;
		margin-top: 1rem;
		margin-bottom: -1rem;
		margin-left: 0.9rem;
		pointer-events: visible !important;
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
	margin-top: 2.5rem;
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
	top: 0.6rem;
	width: 100%;
	height: 110%;
	opacity: 0.99;
	z-index: 999;
	display: flex;
	justify-content: center;
	align-items: center;
	background: ${({ showValidate }) => (!showValidate ? '' : 'white')};
`;

export const Auth = styled.div`
	position: absolute;
	box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
		rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
		rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset !important;

	width: 50%;
	height: 54%;
	padding: 1rem;
	z-index: 999;
	button {
		width: 50%;
		background: lightblue;
		margin: 1.9rem auto 0.9rem 4.9rem;
		font-size: 0.7rem;
	}
	.add_button {
		width: 100% !important;

		button {
			display: flex;
			justify-content: space-evenly;
			margin: 2rem auto 0.5rem auto;
			width: 100%;
			&:hover {
				background: rgba(230, 237, 64, 0.35) !important;
			}
		}
	}
`;

export const Profile_Auth = styled.div`
	margin-top: 2.5rem;

	color: ${({ disabled }) =>
		!disabled ? 'yellow ' : 'black !important'};

	background: ${({ disabled }) => (!disabled ? 'white' : 'white')};

	input[type='text'] {
		border: none;
		width: 100%;
	}
`;
