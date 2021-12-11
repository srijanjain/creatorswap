import React, { useState } from 'react'
import { CardBody, Button, Text, Input } from '@pancakeswap-libs/uikit'
import { BottomGrouping, Wrapper } from 'components/swap/styleds'
import { useWeb3React } from '@web3-react/core'
import { CustomPageHeader } from 'components/PageHeader'
import { AutoColumn } from 'components/Column'
import { AutoRow, RowBetween } from 'components/Row'
import { ethers } from 'ethers'
import byteCode from 'constants/abis/byteCode'
import STANDARD_TOKEN from '../../constants/abis/standard_token.json'
import AppBody from '../AppBody'

const totalSupply = 500000
const LP_add = '0xBf8e4B7371441201Be0CEe545C8ac1B2746ff7C9'
const Airdrop_add = '0xE14702dE204FB82643AE90793A13Fe6e418ce18d'
const ICO_add = '0xb6aCD4972540D4d2BE5564c1E3329B5C29628161'

const TokenCreate = () => {
  const [state, setState] = useState({
    tokenName: '',
    symbol: '',
    description: '',
    pool: 15,
    holding: 10,
    ico: 70,
    airdrop: 5,
    contract: '',
  })
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
    console.log(contract)

    setState({ ...state, contract: contract.address })
    await contract.deployTransaction.wait()
  }

  return (
    <AppBody>
      <Wrapper id="swap-page">
        <CustomPageHeader
          title="Create Token"
          description="Mint a personal or a community token on a fixed supply. To learn more about how to mint the token and how to use it, read the Token Minting Guide"
        />
        <CardBody>
          {state.contract && (
            <Text color="secondary" fontSize="25px">
              Token Deployed Successfully @ {state.contract}
            </Text>
          )}
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
              <Input
                type="text"
                placeholder="Token Name"
                onChange={handleInput}
                name="tokenName"
                value={state.tokenName}
              />
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
                <Button width="100%" onClick={handleSubmit}>
                  Create
                </Button>
              </BottomGrouping>
            </AutoColumn>
          </RowBetween>
        </CardBody>
      </Wrapper>
    </AppBody>
  )
}

export default TokenCreate
