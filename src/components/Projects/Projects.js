import React from "react";
import { Container } from "react-bootstrap";
import { Helmet } from "react-helmet";

function Projects() {
  return (
    <Container
      fluid
      className="project-section min-vh-100 d-flex align-items-center justify-content-center"
    >
      <Helmet>
        <title>My Portfolio | Brian Bernales</title>
        <meta name="description" content="Projects by Brian Bernales" />
      </Helmet>

      <h1 className="display-3 fw-semibold text-white m-0">
        Coming <span className="purple">Soon</span>
      </h1>
    </Container>
  );
}

export default Projects;
