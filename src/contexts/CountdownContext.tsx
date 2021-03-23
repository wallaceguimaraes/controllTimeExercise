import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData{
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    resetCountdown: () => void;   //Nao recebe parametro e nem retorna algo
    startCountdown: () => void;

}

interface CountdownProviderProps{ //Defino a tipagem do filho do provider definido onde chamei ele, la no _app
    children: ReactNode;
  }




  
export const CountdownContext = createContext({} as CountdownContextData ) //o formato do contexto é um countcontextdata

let countdownTimeout: NodeJS.Timeout;   //tipagem global

export function CountdownProvider({children}:CountdownProviderProps){//Criando esse provider para retornar todos os dados do countdownContext

    const {startNewChallenge} = useContext(ChallengesContext)
    
    const [time, setTime] = useState(25 * 60); //equivale a 25 min
    const [isActive, setIsActive] = useState(false)

    const [hasFinished, setHasFinished] = useState(false)

    const minutes =Math.floor(time / 60); // arredonda valor
    const seconds = time % 60; //resto da divisao


    function startCountdown(){
        setIsActive(true)
    }
  

    function resetCountdown(){
        clearTimeout(countdownTimeout) //cancelando o settimeout
        setIsActive(false)
        setHasFinished(false)
        setTime(0.1 * 60) //volta aos 25 min iniciais

    }
  

    useEffect(() => { //1° o que quro executar, 2° parametro quando irei executar
     if(isActive && time > 0){
        countdownTimeout = setTimeout(() =>{
            setTime(time-1)     
         }, 1000)
     }else if(isActive && time == 0){
        setHasFinished(true)
        setIsActive(false)
        startNewChallenge()
    }

    }, [isActive, time])//irei executar quando o estado active e o time for alterado



    return(
        <CountdownContext.Provider 
        value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            resetCountdown,
            startCountdown

        }}
        >
            {children}
        </CountdownContext.Provider>
    )

}