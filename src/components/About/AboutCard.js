import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">Brian Bernales </span>
            from <span className="purple">Pulupandan, Philippines</span><br></br>
            Outside of coding, these are my favorite things to do.
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Playing Games
            </li>
            <li className="about-activity">
              <ImPointRight /> Travelling
            </li>
               <li className="about-activity">
              <ImPointRight /> Enjoying Life
            </li>
            <li className="about-activity">
              <ImPointRight /> Watching Movies
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Move fast, but build the right thing."{" "}
          </p>
          <footer className="blockquote-footer">Brian Bernales</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
