/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useMemo, useState } from 'react'
import { ThemeContext } from 'styled-components'
import { Pair } from '@pancakeswap-libs/sdk'
import { Button, CardBody, Text } from '@canvaswap-libs/uikit'
import { Link } from 'react-router-dom'
// import CardNav from 'components/CardNav'
import Question from 'components/QuestionHelper'
import Row from 'react-bootstrap/Row'
import FullPositionCard from 'components/PositionCard'
import ShortPositionCard from 'components/ShortPositionCard'

import { useTokenBalancesWithLoadingIndicator } from 'state/wallet/hooks'
import { StyledInternalLink } from 'components/Shared'
import { LightCard } from 'components/Card'
import { RowBetween } from 'components/Row'
import { AutoColumn } from 'components/Column'

import { useActiveWeb3React } from 'hooks'
import { usePairs } from 'data/Reserves'
import { toV2LiquidityToken, useTrackedTokenPairs } from 'state/user/hooks'
import { Dots } from 'components/swap/styleds'
import useI18n from 'hooks/useI18n'
import PageHeader from 'components/PageHeader'
import Card from 'react-bootstrap/Card'
import styles from './styles.module.css'

export default function Pool() {
  const theme = useContext(ThemeContext)
  const { account } = useActiveWeb3React()
  const TranslateString = useI18n()

  // fetch the user's balances of all tracked V2 LP tokens
  const trackedTokenPairs = useTrackedTokenPairs()
  const tokenPairsWithLiquidityTokens = useMemo(
    () => trackedTokenPairs.map((tokens) => ({ liquidityToken: toV2LiquidityToken(tokens), tokens })),
    [trackedTokenPairs]
  )
  const liquidityTokens = useMemo(() => tokenPairsWithLiquidityTokens.map((tpwlt) => tpwlt.liquidityToken), [
    tokenPairsWithLiquidityTokens,
  ])
  const [v2PairsBalances, fetchingV2PairBalances] = useTokenBalancesWithLoadingIndicator(
    account ?? undefined,
    liquidityTokens
  )
  // const  b = new Pair(0,0);

  // fetch the reserves for all V2 pools in which the user has a balance
  const liquidityTokensWithBalances = useMemo(
    () =>
      tokenPairsWithLiquidityTokens.filter(({ liquidityToken }) =>
        v2PairsBalances[liquidityToken.address]?.greaterThan('0')
      ),
    [tokenPairsWithLiquidityTokens, v2PairsBalances]
  )

  const v2Pairs = usePairs(liquidityTokensWithBalances.map(({ tokens }) => tokens))
  const [pairindex, setpairindex] = useState(0)

  const v2IsLoading =
    fetchingV2PairBalances || v2Pairs?.length < liquidityTokensWithBalances.length || v2Pairs?.some((V2Pair) => !V2Pair)

  const allV2PairsWithLiquidity = v2Pairs.map(([, pair]) => pair).filter((v2Pair): v2Pair is Pair => Boolean(v2Pair))

  return (
    <>
      {/* <CardNav activeIndex={1} /> */}
      <Card className={styles.card}>
        <img className={`${styles.card_img_top} img-circle rounded-circle`} src="/icons/liquidity_grey.svg" />
        <br />
        <br />

        <PageHeader
          title={TranslateString(262, 'Liquidity')}
          description={TranslateString(1168, 'Add liquidity to receive LP tokens')}
        />
        <AutoColumn gap="lg" justify="center">
          <div />

          <Row className={styles.partb}>
            <div className={styles.partlb}>
              <AutoColumn gap="12px" style={{ width: '100%' }}>
                <RowBetween>
                  <Text color={theme.colors.text}>{TranslateString(107, 'Your Liquidity')}</Text>
                  <Question
                    text={TranslateString(
                      1170,
                      'When you add liquidity, you are given pool tokens that represent your share. If you dont see a pool you joined in this list, try importing a pool below.'
                    )}
                  />
                </RowBetween>

                {!account ? (
                  <LightCard padding="40px">
                    <Text color="textDisabled" textAlign="center">
                      {TranslateString(156, 'Connect to a wallet to view your liquidity.')}
                    </Text>
                  </LightCard>
                ) : v2IsLoading ? (
                  <LightCard padding="40px">
                    <Text color="textDisabled" textAlign="center">
                      <Dots>Loading</Dots>
                    </Text>
                  </LightCard>
                ) : allV2PairsWithLiquidity?.length > 0 ? (
                  <>
                    {allV2PairsWithLiquidity.map((v2Pair) => (
                      // <FullPositionCard key={v2Pair.liquidityToken.address} pair={v2Pair} />

                      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                      <div
                        onClick={() => setpairindex(allV2PairsWithLiquidity.indexOf(v2Pair))}
                        onKeyDown={() => setpairindex(allV2PairsWithLiquidity.indexOf(v2Pair))}
                      >
                        <ShortPositionCard key={v2Pair.liquidityToken.address} pair={v2Pair} />
                      </div>
                    ))}
                  </>
                ) : (
                  <LightCard padding="40px">
                    <Text color="textDisabled" textAlign="center">
                      {TranslateString(104, 'No liquidity found.')}
                    </Text>
                  </LightCard>
                )}
              </AutoColumn>
            </div>

            <div className={styles.partrb}>
              {Boolean(allV2PairsWithLiquidity[pairindex]) && (
                <FullPositionCard key={1} pair={allV2PairsWithLiquidity[pairindex]} />
              )}
            </div>
          </Row>

          <Button id="join-pool-button" as={Link} to="/add">
            {TranslateString(168, 'Add Liquidity')}
          </Button>

          <div>
            <Text fontSize="14px" style={{ padding: '.5rem 0 .5rem 0', textAlign: 'center' }}>
              {TranslateString(106, "Don't see a pool you joined?")}{' '}
              <StyledInternalLink id="import-pool-link" to="/find">
                {TranslateString(108, 'Import it.')}
              </StyledInternalLink>
            </Text>
            <Text fontSize="14px" style={{ padding: '.5rem 0 .5rem 0' }}>
              {TranslateString(1172, 'Or, if you staked your LP tokens in a farm, unstake them to see them here.')}
            </Text>
          </div>
        </AutoColumn>
      </Card>
    </>
  )
}
