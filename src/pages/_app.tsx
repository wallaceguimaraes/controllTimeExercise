import '../styles/global.css'
import {ChallengesProvider} from '../contexts/ChallengesContext'
//Quando temos componentes ou que quer q seja dentro de outro componentes chama-se children
//component e um children de challengeprovider

//challenges provider foi tirado daqui pois colocamos na index para passar os dados do cookie para o componente

function MyApp({ Component, pageProps }) {
  return(
    <Component {...pageProps} />

  )
}

export default MyApp
