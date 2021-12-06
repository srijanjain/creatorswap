import React, { useState } from 'react'
import styled from 'styled-components'
import { CardBody, ArrowDownIcon, Button, IconButton, Text } from '@pancakeswap-libs/uikit'
import { ArrowWrapper, BottomGrouping, SwapCallbackError, Wrapper } from 'components/swap/styleds'
import PageHeader from 'components/PageHeader'
import { AutoColumn } from 'components/Column'
import AppBody from '../AppBody'

const Input = styled.input<{ error?: boolean }>`
  font-size: 1.25rem;
  outline: none;
  border: none;
  flex: 1 1 auto;
  width: 0;
  background-color: ${({ theme }) => theme.colors.invertedContrast};
  transition: color 300ms ${({ error }) => (error ? 'step-end' : 'step-start')};
  color: ${({ error, theme }) => (error ? theme.colors.failure : theme.colors.primary)};
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
  width: 100%;
  ::placeholder {
    color: ${({ theme }) => theme.colors.textDisabled};
  }
  padding: 0px;
  -webkit-appearance: textfield;

  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  ::placeholder {
    color: ${({ theme }) => theme.colors.textDisabled};
  }
`

const TokenCreate = () => {
  const [state, setState] = useState({ name: '', symbol: '', description: '', pool: 15, holding: 10 })
  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }
  return (
    <AppBody>
      <Wrapper id="swap-page">
        <PageHeader
          title="Create Token"
          description="Mint a personal or a community token on a fixed supply. To learn more about how to mint the token and how to use it, read the Token Minting Guide"
        />
        <CardBody>
          <AutoColumn gap="md">
            <Input type="text" placeholder="Token Name" onChange={handleInput} name="name" value={state.name} />
            <Input type="text" placeholder="Symbol" onChange={handleInput} name="symbol" value={state.symbol} />
            <Input type="number" placeholder="% in pool" onChange={handleInput} name="pool" value={state.pool} />
            <Input
              type="number"
              placeholder="% in Holding"
              onChange={handleInput}
              name="holding"
              value={state.holding}
            />
            <Input
              type="textarea"
              placeholder="Description"
              onChange={handleInput}
              name="description"
              value={state.description}
            />
          </AutoColumn>
          <BottomGrouping>
            <Button width="100%">Create</Button>
          </BottomGrouping>
        </CardBody>
      </Wrapper>
    </AppBody>
  )
}

export default TokenCreate
