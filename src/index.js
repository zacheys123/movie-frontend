import React from 'react';
import ReactDOM from 'react-dom/client';
import MainContext from './context/contexts_/MainContext';
import MovieContext from './context/contexts_/MovieContext';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<MainContext>
				<MovieContext>
					<App />
				</MovieContext>
			</MainContext>
		</BrowserRouter>
	</React.StrictMode>,
);
