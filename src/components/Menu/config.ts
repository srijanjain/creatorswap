import { MenuEntry } from '@pancakeswap-libs/uikit'

const config: MenuEntry[] = [
  {
    label: 'Exchange',
    icon: 'TradeIcon',
    href: '/swap',
  },
  {
    label: 'Liquidity',
    icon: 'TradeIcon',
    href: '/pool',
  },
  {
    label: 'Create Token',
    icon: 'HomeIcon',
    href: '/create',
  },
  {
    label: 'View Token',
    icon: 'HomeIcon',
    href: '/view',
  },
]

export default config
