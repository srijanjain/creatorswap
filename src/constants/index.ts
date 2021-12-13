import { ChainId, JSBI, Percent, Token, WETH } from '@pancakeswap-libs/sdk'

export const ROUTER_ADDRESS = '0xe1662823d8044254409eB682fE34d35792677228'

// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[]
}

export const Can = new Token(ChainId.BSCTESTNET, '0x76514486123bCdB30e324ED1a78b54b389Ea6769', 18, 'CAN', 'Canvas Token')
export const ETH = new Token(ChainId.BSCTESTNET, '0xD34C1b38D04880a4782a2008D9bCDFa4402e4dCA', 18, 'ETH', 'Wrapped ETH')
export const TANBH = new Token(ChainId.BSCTESTNET, '0x490351a9D88a56c9325bD360546FaeA17391dbbA', 18, 'TANBH', 'Tanmay Coin')
export const SMRA = new Token(ChainId.BSCTESTNET, '0x30aCdF58b8a5853E08Cf6265ED2C8627D247e5b9', 18, 'SMRA', 'Samay Coin')
export const MKBHD = new Token(ChainId.BSCTESTNET, '0xcB8ae9bFC3b597b5bF58335506599C3ac20Db25F', 18, 'MKBHD', 'MKBHD Coin')
export const SENT = new Token(ChainId.BSCTESTNET, '0xF713E8E7b7e2D91200b4BBb74De4FfE75CBF47dC', 18, 'SENT', 'SentDex Coin')
export const BEAST = new Token(ChainId.BSCTESTNET, '0x10C0F976762b65acF8f92B32A233968A23a45264', 18, 'BEAST', 'Beast Coin')
export const TVF  = new Token(ChainId.BSCTESTNET, '0x6Cf8391c733C25c5eb8F186DedE955171A34BD46', 18, 'TVF', 'TVF Coin')
// export const ETH = new Token(ChainId.BSCTESTNET, '0xE282a15DBad45e3131620C1b8AF85B7330Cb3b4B', 18, 'ETH', 'Binance-Peg Ethereum Token')

const WETH_ONLY: ChainTokenList = {
  [ChainId.MAINNET]: [WETH[ChainId.MAINNET]],
  [ChainId.BSCTESTNET]: [WETH[ChainId.BSCTESTNET]],
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.BSCTESTNET]: [...WETH_ONLY[ChainId.BSCTESTNET], SMRA, MKBHD, SENT, BEAST, TANBH, Can, TVF],
}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  [ChainId.BSCTESTNET]: {},
}

// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.BSCTESTNET]: [...WETH_ONLY[ChainId.BSCTESTNET], SMRA, MKBHD, SENT, BEAST, TANBH, Can, TVF],
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.BSCTESTNET]: [...WETH_ONLY[ChainId.BSCTESTNET], SMRA, MKBHD, SENT, BEAST, TANBH, Can, TVF],
}

export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
  [ChainId.BSCTESTNET]: [
    [Can, ETH],
    [SMRA, MKBHD],
  ],
}

export const NetworkContextName = 'NETWORK'

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 80
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
export const BIPS_BASE = JSBI.BigInt(10000)
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE) // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE) // 15%

// used to ensure the user doesn't send so much ETH so they end up with <.01
export const MIN_ETH: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)) // .01 ETH
