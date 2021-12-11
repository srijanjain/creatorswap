import React from 'react'
import { Card, Button, Container, Row, Col } from 'react-bootstrap'
import CARDS from './cards.json'
import './style.css'

export default function index() {
  return (
    <Container>
      <Row>
        {CARDS.map((card, ind) => (
          <Col md={6} lg={4}>
            <div className="card_custom">
              <div className="face face1">
                <div className="content">
                  <div className="icon">
                    <a href="/" className="view_token" target="_blank" rel="noreferrer">
                      View Token <span className="fa fa-external-link" />
                    </a>
                    <img src={card.icon} alt="profile" className="rounded-circle" />
                    <p className=" w-100 text-center">
                      <span className="fa fa-dollar" /> {card.token}
                    </p>
                    <p className="price">{card.price}</p>
                  </div>
                </div>
              </div>
              <div className="face face2 d-flex justify-content-between flex-column">
                <div className="content ">
                  <ul>
                    <li>
                      <a href={card.instagram} target="_blank" rel="noreferrer">
                        <i className="fa fa-facebook" aria-hidden="true" />
                      </a>
                    </li>
                    <li>
                      <a href={card.instagram} target="_blank" rel="noreferrer">
                        <i className="fa fa-twitter" aria-hidden="true" />
                      </a>
                    </li>

                    <li>
                      <a href={card.instagram} target="_blank" rel="noreferrer">
                        <i className="fa fa-linkedin" aria-hidden="true" />
                      </a>
                    </li>
                    <li>
                      <a href={card.instagram} target="_blank" rel="noreferrer">
                        <i className="fa fa-instagram" aria-hidden="true" />
                      </a>
                    </li>
                  </ul>
                  <hr />
                  <div className="projectFactsWrap d-flex flex-row justify-content-around">
                    <div className="item">
                      <p id="number2" className="number">
                        {card.totsupply}
                      </p>

                      <p>Total Supply</p>
                    </div>
                    <div className="item">
                      <p id="number3" className="number">
                        {card.currsupply}
                      </p>

                      <p>Current Supply</p>
                    </div>
                    <div className="item">
                      <p id="number4" className="number">
                        {card.vol}
                      </p>

                      <p>Volume</p>
                    </div>
                  </div>
                </div>

                <div className="content">
                  <p>{card.content}</p>
                  <h3>
                    <a href={card.youtube} target="_blank" rel="noreferrer">
                      {card.title}
                    </a>
                  </h3>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  )
}
