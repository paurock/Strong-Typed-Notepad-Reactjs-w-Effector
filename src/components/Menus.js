import React from 'react';
import { NavLink } from 'react-router-dom';
import { AddNoteForm, NoteList } from './Notes';
import { Button } from 'antd';
import backButton from '../images/backButton.png';
 

const PageTemplate = ({ children, history, location, name }) => (
	<section className="main-container">
	<h1 className="page-title">/{name}</h1>
		{children}
		<span className="back-button"><Button className="back-button"><BackBtn  history={history} location={location} /></Button></span>
	</section>
);

export const BackBtn = ({ history, location }) => (
		<nav  onClick={() => history.goBack()}>
			{location.pathname === '/' ? null : <img alt="<<Назад" src={backButton}/>}
		</nav>
	
);

export const Home = ({ history, location, name = 'Home' }) => (
	<PageTemplate history={history} location={location} name={name}>
		<nav className="menu">
			<NavLink to="/spiritual/">
				<Button block type="primary" type="primary">Spiritual</Button>
			</NavLink>
			<br />
			<NavLink to="/material/">
				<Button block type="primary" type="primary">Material</Button>
			</NavLink>
			<br />
		</nav>
	</PageTemplate>
);

// /SPIRITUAL
export const Spiritual = ({ history, location, name = 'Spiritual' }) => (
	<PageTemplate history={history} location={location} name={name}>
		<nav className="menu">
			<NavLink to="/spiritual/meditation">
				<Button block type="primary">Meditation</Button>
			</NavLink>
			<br />
			<NavLink to="/spiritual/creativity">
				<Button block type="primary">Creativity</Button>
			</NavLink>
			<br />
			<NavLink to="/spiritual/relationships">
				<Button block type="primary">Relationships</Button>
			</NavLink>
		</nav>
	</PageTemplate>
);
export const Meditation = ({ history, location, name = 'Meditation' }) => (
	<PageTemplate history={history} location={location} name={name}>
		<NoteList name={name} />
		<AddNoteForm location={location} name={name} />
	</PageTemplate>
);
export const Relationships = ({ history, location, name = 'Relationships' }) => (
	<PageTemplate history={history} location={location} name={name}>
		<NoteList name={name} />
		<AddNoteForm location={location} name={name} />
	</PageTemplate>
);
export const Creativity = ({ history, location, name = 'Creativity' }) => (
	<PageTemplate history={history} location={location} name={name}>
		<NoteList name={name} />
		<AddNoteForm location={location} name={name} />
	</PageTemplate>
);
// /MATERIAL
export const Material = ({ history, location, name = 'Material' }) => (
	<PageTemplate history={history} location={location} name={name}>
		<nav className="menu">
			<NavLink to="/material/education">
				<Button block type="primary">Education</Button>
			</NavLink>
			<br />
			<NavLink to="/material/work">
				<Button block type="primary">Work</Button>
			</NavLink>
		</nav>
	</PageTemplate>
);
export const Education = ({ history, location, name = 'Education' }) => (
	<PageTemplate history={history} location={location} name={name}>
		<NoteList name={name} />
		<AddNoteForm location={location} name={name} />
	</PageTemplate>
);
export const Work = ({ history, location, name = 'Work' }) => (
	<PageTemplate history={history} location={location} name={name}>
		<NoteList name={name} />
		<AddNoteForm location={location} name={name} />
	</PageTemplate>
);

//OTHER
export const Woops404 = ({ history, location, name = '404 error' }) => (
	<PageTemplate history={history} location={location} name={name}>
		{' '}
		<h1>No such address 404!</h1> />
	</PageTemplate>
);
