import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.colors.background};

    img {
      height: auto;
      max-width: 100%;
    }
    .coin_icon{
      height:100px;
      width:100px;
    }
  }
`

export default GlobalStyle
