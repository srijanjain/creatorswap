import React, { useState } from 'react'
import { Button, Text, Input } from '@canvaswap-libs/uikit'
import { BottomGrouping } from 'components/swap/styleds'
import { useWeb3React } from '@web3-react/core'
import { CustomPageHeader } from 'components/PageHeader'
import { ethers } from 'ethers'
import { Col, Container, Row, Table, Card } from 'react-bootstrap'
import QuestionHelper from 'components/QuestionHelper'
import byteCode from 'constants/abis/byteCode'
import STANDARD_TOKEN from '../../constants/abis/standard_token.json'
import './style.css'
import Coin from '../../icons/coin.png'
import ConfirmModal from './ConfirmModal'

const totalSupply = 500000
const LP_add = '0xBf8e4B7371441201Be0CEe545C8ac1B2746ff7C9'
const Airdrop_add = '0xE14702dE204FB82643AE90793A13Fe6e418ce18d'
const ICO_add = '0xb6aCD4972540D4d2BE5564c1E3329B5C29628161'

const TokenCreate = () => {
  const [state, setState] = useState({
    tokenName: '',
    symbol: '',
    pool: 15,
    holding: 10,
    ico: 70,
    airdrop: 5,
    contract: '',
  })
  const [modal, setModal] = useState(false)
  const { library } = useWeb3React()

  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const poolAmount = (state.pool * totalSupply) / 100
    const holdingAmount = (state.holding * totalSupply) / 100
    const airdropAmount = (state.airdrop * totalSupply) / 100
    const icoAmount = totalSupply - poolAmount - holdingAmount - airdropAmount

    const signer = library?.getSigner()
    const factory = new ethers.ContractFactory(STANDARD_TOKEN, byteCode, signer)
    const contract = await factory.deploy(
      state.tokenName,
      state.symbol,
      LP_add,
      Airdrop_add,
      ICO_add,
      poolAmount,
      holdingAmount,
      airdropAmount,
      icoAmount
    )
    setState({ ...state, contract: contract.address })
    await contract.deployTransaction.wait()
    toggleModal()
  }

  const handleLiq = (e) => {
    const { name, value } = e.target
    const change = value - state[name]
    setState({ ...state, [name]: value, ico: state.ico - change })
  }
  const toggleModal = () => {
    setModal(!modal)
  }

  return (
    <>
      <ConfirmModal isOpen={modal} onDismiss={toggleModal} contract={state.contract} />

      <Card className="card bg-purple">
        <img
          className="card_img_top img-circle rounded-circle"
          src={`${process.env.PUBLIC_URL}/icons/swap_grey.svg`}
          alt="logo"
        />
        <Container>
          <Row>
            <CustomPageHeader
              title="Create Token"
              description="Minst a personal or a community token on a fixed supply. To learn more about how to mint the token and how to use it, read the Token Minting Guide"
            />
          </Row>

          <Row>
            <Col xs={4}>
              <Row className="h-100">
                <Col className="align-items-center text-center d-flex" xs={4}>
                  <img src={`${process.env.PUBLIC_URL}/icons/coin.png`} alt="coin" className="coin_icon" />
                </Col>
                <Col className="align-items-center  d-flex">
                  <Table bordered responsive hover>
                    <tbody>
                      <tr className="text-purple">
                        <td>Provide Liquidity</td>
                        <td>
                          {state.pool} %
                          <QuestionHelper text="Percentage of Token you want to provide for liquidity pool. This is done so more people can buy token and earn rewards" />
                        </td>
                      </tr>
                      <tr className="text-purple">
                        <td>Initial Coin Offering</td>
                        <td>
                          {state.ico} %
                          <QuestionHelper text="Percentage of Tokens you want to provide for Buying." />
                        </td>
                      </tr>
                      <tr className="text-purple">
                        <td>Holding</td>
                        <td>
                          {state.holding} %
                          <QuestionHelper text="Percentage of Tokens you'll keep for yourself for future liquidity." />
                        </td>
                      </tr>
                      <tr className="text-purple">
                        <td>Air Drop</td>
                        <td>
                          {state.airdrop} %
                          <QuestionHelper text="Percentage of Token distributed among community to spread the reach of coin." />
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Col>
            <Col className="p-3">
              <Text className="text-purple">Token Name</Text>
              <Input
                type="text"
                placeholder="Token Name"
                onChange={handleInput}
                name="tokenName"
                value={state.tokenName}
              />
              <Text className="text-purple mt-2">Symbol</Text>
              <Input type="text" placeholder="Symbol" onChange={handleInput} name="symbol" value={state.symbol} />
              <Row className="mt-2">
                <Col>
                  <Text className="text-purple">AirDrop</Text>
                  <Input type="number" placeholder=" Airdrop" value={state.airdrop} disabled />
                </Col>
                <Col>
                  <Text className="text-purple"> Pool</Text>
                  <Input type="number" placeholder=" Pool" onChange={handleLiq} name="pool" value={state.pool} />
                </Col>
                <Col>
                  <Text className="text-purple"> Holding</Text>
                  <Input
                    type="number"
                    placeholder=" Holding"
                    onChange={handleLiq}
                    name="holding"
                    value={state.holding}
                  />
                </Col>
              </Row>
              <BottomGrouping>
                <Button
                  width="100%"
                  // className="bg-purple"
                  onClick={handleSubmit}
                  disabled={state.pool < 15 || state.holding < 10 || state.ico < 0 || !state.tokenName || !state.symbol}
                >
                  Create
                </Button>
              </BottomGrouping>
            </Col>
          </Row>
        </Container>
      </Card>
    </>
  )
}

export default TokenCreate
