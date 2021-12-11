import Modal from 'components/Modal'
import React from 'react'
import { Button, Text, Input } from '@pancakeswap-libs/uikit'

import { Col, Container, Row } from 'react-bootstrap'

function ConfirmModal({ isOpen, onDismiss, contract }) {
  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss}>
      <Container className="p-3">
        <Row>
          <Col>
            <Text color="secondary" fontSize="15px">
              Token Deployed Successfully{' '}
              <a href={`https://testnet.bscscan.com/address/${contract}`} target="_blank" rel="noreferrer">
                {contract}
              </a>
            </Text>
          </Col>
        </Row>
        <Row>
          <Col>
            <hr />
            Contact us on Twitter{' '}
            <a href="https://twitter.com/canvaswap" target="_blank" rel="noreferrer">
              @CanvaSwap
            </a>{' '}
            for more info
          </Col>
        </Row>
      </Container>
    </Modal>
  )
}

export default ConfirmModal
