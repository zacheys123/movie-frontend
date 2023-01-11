import React from 'react';
import ReactDOM from 'react-dom/client';
import MainContext from './context/contexts_/MainContext';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<MainContext>
				<App />
			</MainContext>
		</BrowserRouter>
	</React.StrictMode>,
);
