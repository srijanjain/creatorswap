import { ChainId, JSBI, Percent, Token, WETH } from '@pancakeswap-libs/sdk'

export const ROUTER_ADDRESS = '0x5CF874C2f969a53b75d18e9e719c65120000dD5E'

// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[]
}

export const MEM = new Token(ChainId.BSCTESTNET, '0x4B556A2A032511718b1C569a1a53dDbCB3B703af', 18, 'MEM', 'Memboro Token')
export const WBNB = new Token(ChainId.BSCTESTNET, '0x0dE8FCAE8421fc79B29adE9ffF97854a424Cad09', 18, 'WBNB', 'Wrapped BNB')
export const ANJ = new Token(ChainId.BSCTESTNET, '0xe1662823d8044254409eB682fE34d35792677228', 18, 'ANJ', 'Anjaan Token')
export const SANDY = new Token(ChainId.BSCTESTNET, '0x6dbbFBF5e5A291d6397B3dc2410d4257947288fF', 18, 'SANDY', 'SAndy coin')
export const UTSI = new Token(ChainId.BSCTESTNET, '0x9e174afba0efe8E1a54212F823fCbebB88C88698', 18, 'UTSI', 'Utsav Token')
export const KSM = new Token(ChainId.BSCTESTNET, '0x93C5Fd28a4309b3505e037ec62123418246df165', 18, 'KSM', 'KABIR Token')
export const SHUBH = new Token(ChainId.BSCTESTNET, '0x4be160985F81942549C5e0A132E0e0ae7f64FEff', 18, 'SHUBH', 'Shubham coin')
export const CHHOTA = new Token(ChainId.BSCTESTNET, '0x8efE4395DeC7f5A10a88934d8DDB5f7A2D34169D', 18, 'CHHOTA', 'CHOTTA ANSHUL coin')
export const ETH = new Token(ChainId.BSCTESTNET, '0xE282a15DBad45e3131620C1b8AF85B7330Cb3b4B', 18, 'ETH', 'Binance-Peg Ethereum Token')

const WETH_ONLY: ChainTokenList = {
  [ChainId.MAINNET]: [WETH[ChainId.MAINNET]],
  [ChainId.BSCTESTNET]: [WETH[ChainId.BSCTESTNET]],
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.BSCTESTNET]: [...WETH_ONLY[ChainId.BSCTESTNET], ANJ, SANDY, UTSI, ETH, KSM, SHUBH, CHHOTA],
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
  [ChainId.BSCTESTNET]: [...WETH_ONLY[ChainId.BSCTESTNET], ANJ, SANDY, UTSI,KSM, SHUBH, CHHOTA],
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.BSCTESTNET]: [...WETH_ONLY[ChainId.BSCTESTNET], ANJ, SANDY, UTSI, KSM, SHUBH, CHHOTA],
}

export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
  [ChainId.BSCTESTNET]: [
    [MEM, WBNB],
    [SANDY, UTSI],
    [ANJ, UTSI],
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
