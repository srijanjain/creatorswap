import React, { useState } from 'react'
import { CardBody, Button, Text, Input } from '@pancakeswap-libs/uikit'
import { BottomGrouping, Wrapper } from 'components/swap/styleds'
import { CustomPageHeader } from 'components/PageHeader'
import { AutoColumn } from 'components/Column'
import { AutoRow, RowBetween } from 'components/Row'
import AppBody from '../AppBody'

const TokenCreate = () => {
  const [state, setState] = useState({
    name: '',
    symbol: '',
    description: '',
    pool: 15,
    holding: 10,
    ico: 70,
    airdrop: 5,
  })
  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }
  return (
    <AppBody>
      <Wrapper id="swap-page">
        <CustomPageHeader
          title="Create Token"
          description="Mint a personal or a community token on a fixed supply. To learn more about how to mint the token and how to use it, read the Token Minting Guide"
        />
        <CardBody>
          <RowBetween>
            <AutoColumn gap="md">
              <AutoRow gap="lg" justify="space-between">
                <img src="images/pancakeswap.png" alt="coin" className="coin_icon" />
                <AutoColumn justify="space-between" gap="lg">
                  <RowBetween>
                    <h4>LP:</h4> <h4>{state.pool}</h4>
                  </RowBetween>
                  <RowBetween>
                    <h4>Holding:</h4> <h4>{state.holding}</h4>
                  </RowBetween>
                  <RowBetween>
                    <h4>Airdrop:</h4> <h4>{state.airdrop}</h4>
                  </RowBetween>
                  <RowBetween>
                    <h4>ICO:</h4> <h4>{state.ico}</h4>
                  </RowBetween>
                </AutoColumn>
              </AutoRow>
            </AutoColumn>
            <AutoColumn gap="md">
              <Text color="primary">Token Name</Text>
              <Input type="text" placeholder="Token Name" onChange={handleInput} name="name" value={state.name} />
              <Text color="primary">Symbol</Text>
              <Input type="text" placeholder="Symbol" onChange={handleInput} name="symbol" value={state.symbol} />
              <RowBetween>
                <AutoColumn gap="md">
                  <Text color="primary">AirDrop</Text>
                  <Input type="number" placeholder=" Airdrop" value={state.airdrop} disabled />
                </AutoColumn>
                <AutoColumn gap="md">
                  <Text color="primary"> Pool</Text>
                  <Input type="number" placeholder=" Pool" onChange={handleInput} name="pool" value={state.pool} />
                </AutoColumn>
                <AutoColumn gap="md">
                  <Text color="primary"> Holding</Text>
                  <Input
                    type="number"
                    placeholder=" Holding"
                    onChange={handleInput}
                    name="holding"
                    value={state.holding}
                  />
                </AutoColumn>
              </RowBetween>
              <Text color="primary">Description</Text>
              <Input
                type="textarea"
                placeholder="Description"
                onChange={handleInput}
                name="description"
                value={state.description}
              />
              <BottomGrouping>
                <Button width="100%">Create</Button>
              </BottomGrouping>
            </AutoColumn>
          </RowBetween>
        </CardBody>
      </Wrapper>
    </AppBody>
  )
}

export default TokenCreate
