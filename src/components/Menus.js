import React from "react";
import { NavLink } from "react-router-dom";
import { AddNoteForm } from "./Form";
import { NoteList } from "./NoteList";
import { AuthLinks } from "./Auth";

const PageTemplate = ({ children, history, location, name }) => (
  <section className="main-container">
    <AuthLinks />
    <h1 className="page-title">/{name}</h1>
    {children}
    <span className="back-button">
      {location.pathname === "/" ? null : (
        <>
          <button className="back-button">
            <BackBtn history={history} location={location} />
          </button>
        </>
      )}
    </span>
  </section>
);

export const BackBtn = ({ history, location }) => (
  <nav onClick={() => history.goBack()}>
    {location.pathname === "/" ? null : "<< Назад"}
  </nav>
);

export const Home = ({ history, location, name = "Home" }) => (
  <PageTemplate history={history} location={location} name={name}>
    <nav className="menu">
      <NavLink to="/spiritual/">
        <button>Spiritual</button>
      </NavLink>
      <br />
      <NavLink to="/material/">
        <button>Material</button>
      </NavLink>
      <br />
    </nav>
  </PageTemplate>
);

// /SPIRITUAL
export const Spiritual = ({ history, location, name = "Spiritual" }) => (
  <PageTemplate history={history} location={location} name={name}>
    <nav className="menu">
      <NavLink to="/spiritual/meditation">
        <button>Meditation</button>
      </NavLink>
      <br />
      <NavLink to="/spiritual/creativity">
        <button>Creativity</button>
      </NavLink>
      <br />
      <NavLink to="/spiritual/relationships">
        <button>Relationships</button>
      </NavLink>
    </nav>
  </PageTemplate>
);
export const Meditation = ({ history, location, name = "Meditation" }) => (
  <PageTemplate history={history} location={location} name={name}>
    <NoteList name={name} />
    <AddNoteForm location={location} name={name} />
  </PageTemplate>
);
export const Relationships = ({
  history,
  location,
  name = "Relationships"
}) => (
  <PageTemplate history={history} location={location} name={name}>
    <NoteList name={name} />
    <AddNoteForm location={location} name={name} />
  </PageTemplate>
);
export const Creativity = ({ history, location, name = "Creativity" }) => (
  <PageTemplate history={history} location={location} name={name}>
    <NoteList name={name} />
    <AddNoteForm location={location} name={name} />
  </PageTemplate>
);
// /MATERIAL
export const Material = ({ history, location, name = "Material" }) => (
  <PageTemplate history={history} location={location} name={name}>
    <nav className="menu">
      <NavLink to="/material/education">
        <button>Education</button>
      </NavLink>
      <br />
      <NavLink to="/material/work">
        <button>Work</button>
      </NavLink>
    </nav>
  </PageTemplate>
);
export const Education = ({ history, location, name = "Education" }) => (
  <PageTemplate history={history} location={location} name={name}>
    <NoteList name={name} />
    <AddNoteForm location={location} name={name} />
  </PageTemplate>
);
export const Work = ({ history, location, name = "Work" }) => (
  <PageTemplate history={history} location={location} name={name}>
    <NoteList name={name} />
    <AddNoteForm location={location} name={name} />
  </PageTemplate>
);

//OTHER
export const Woops404 = ({ history, location, name = "404 error" }) => (
  <PageTemplate history={history} location={location} name={name}>
    {" "}
    <h1>No such address 404!</h1> />
  </PageTemplate>
);
