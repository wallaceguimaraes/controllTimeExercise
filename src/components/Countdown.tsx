import { useContext } from 'react'
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css'

export function Countdown(){

const {minutes, seconds, hasFinished,isActive, startCountdown, resetCountdown} = useContext(CountdownContext)  

 
    
    const [minuteLeft, minuteRight] = String(minutes).padStart(2,'0').split('');//verifica se minutes possui 2 string caso nao tenha inclui no inicio, o split jjoga ambos as strings em array
    const [secondLeft, secondRight] = String(seconds).padStart(2,'0').split('');

    
    return(
     <div>
     <div className={styles.countdownContainer}>
       <div>
        <span>{minuteLeft}</span>
        <span>{minuteRight}</span>
       </div>
       <span>:</span>
       <div>
        <span>{secondLeft}</span>
        <span>{secondRight}</span>
       </div>    
     </div>
      {hasFinished ? 
       (<button 
       disabled
       type="button" 
       className={styles.countDownButton}
       >
       Ciclo encerrado
       </button>
       ) : (
    <> 
      {isActive ? (
        <button 
        type="button" 
        className={`${styles.countDownButton} ${styles.countDownButtonActive}`}
        onClick={resetCountdown}
        >
        Abandonar ciclo
        </button>
      ) : (
        <button 
        type="button" 
        className={styles.countDownButton}
        onClick={startCountdown}
        >
        Iniciar um ciclo
        </button> 
        )
       }
        </>
       )
      }  

     </div>   
    )
}