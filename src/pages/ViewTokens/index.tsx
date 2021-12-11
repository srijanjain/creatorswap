import React from 'react'
import { Card, Button, Container, Row, Col } from 'react-bootstrap'
import CARDS from './cards.json'
import './style.css'

export default function index() {
  return (
    <Container>
      <Row>
        {CARDS.map((card, ind) => (
          <Col xs={4}>
            <div className="card_custom">
              <div className="face face1">
                <div className="content">
                  <div className="icon">
                    <img src={card.icon} alt="profile" className="rounded-circle" />
                  </div>
                </div>
              </div>
              <div className="face face2">
                <div className="content">
                  <h3>
                    <a href={card.link} target="_blank" rel="noreferrer">
                      {card.title}
                    </a>
                  </h3>
                  <p>{card.content}</p>
                </div>
                {/* <div className="content"></div> */}
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  )
}
