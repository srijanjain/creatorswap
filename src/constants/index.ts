import { ChainId, JSBI, Percent, Token, WETH } from '@pancakeswap-libs/sdk'

export const ROUTER_ADDRESS = '0xe1662823d8044254409eB682fE34d35792677228'

// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[]
}

export const Can = new Token(ChainId.BSCTESTNET, '0x76514486123bCdB30e324ED1a78b54b389Ea6769', 18, 'CAN', 'Canvas Token')
export const WBNB = new Token(ChainId.BSCTESTNET, '0xD34C1b38D04880a4782a2008D9bCDFa4402e4dCA', 18, 'WBNB', 'Wrapped BNB')
export const heemv = new Token(ChainId.BSCTESTNET, '0x31C6F857a19639f19A9460b6D6157A50CC77e77D', 18, 'HEEMV', 'Heemank Token')
export const SANDY = new Token(ChainId.BSCTESTNET, '0x51F6c7Ad98B1a644452ECf05eDDCa70FD5ec0A30', 18, 'SANDY', 'Sandy coin')
export const UTS = new Token(ChainId.BSCTESTNET, '0xb859980c32Da9b98FfF9B18CA04ee97D6bf10A8F', 18, 'UTS', 'Utsav Token')
export const KSM = new Token(ChainId.BSCTESTNET, '0x29fcDa8965D417d7CE981e941c90b87099504AE9', 18, 'KSM', 'KABIR Token')
export const CHHOTA = new Token(ChainId.BSCTESTNET, '0x40fe25d7a6fa36fb99f0316b293eBD4762408ff4', 18, 'CHHOTA', 'CHOTTA ANSHUL coin')
// export const ETH = new Token(ChainId.BSCTESTNET, '0xE282a15DBad45e3131620C1b8AF85B7330Cb3b4B', 18, 'ETH', 'Binance-Peg Ethereum Token')

const WETH_ONLY: ChainTokenList = {
  [ChainId.MAINNET]: [WETH[ChainId.MAINNET]],
  [ChainId.BSCTESTNET]: [WETH[ChainId.BSCTESTNET]],
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.BSCTESTNET]: [...WETH_ONLY[ChainId.BSCTESTNET], SANDY, UTS, KSM, CHHOTA, heemv, Can],
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
  [ChainId.BSCTESTNET]: [...WETH_ONLY[ChainId.BSCTESTNET], SANDY, UTS, KSM, CHHOTA, heemv, Can],
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.BSCTESTNET]: [...WETH_ONLY[ChainId.BSCTESTNET], SANDY, UTS, KSM, CHHOTA, heemv, Can],
}

export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
  [ChainId.BSCTESTNET]: [
    [Can, WBNB],
    [SANDY, UTS],
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
