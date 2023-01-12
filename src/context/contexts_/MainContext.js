import { useContext, useReducer } from 'react';
import { MainProvider } from '../config';
import { main_reducer } from '../reducers/main';
function MainContext({ children }) {
	const initialState = {
		istheme: false,
		ismodal: false,
		modalcontent: '',
		loading: false,
		disable: false,
		success: false,
		error: false,
		admin: {},
		logged: false,
		isgenre: false,
	};
	const [main_state, main_dispatch] = useReducer(
		main_reducer,
		initialState,
	);
	let value = { main_state, main_dispatch };
	return (
		<MainProvider.Provider value={value}>
			{children}
		</MainProvider.Provider>
	);
}

export default MainContext;
export const useMainContext = () => {
	const context = useContext(MainProvider);
	if (!context) {
		throw new Error('UseMainContext can only be used in children');
	}
	return context;
};
