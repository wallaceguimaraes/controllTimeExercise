import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { CompletedChallenges } from "../components/CompletedChallenges";
import styles from '../styles/pages/Home.module.css'
import { Countdown } from "../components/Countdown";
import Head from 'next/Head'
import { ChallengeBox } from "../components/ChallengeBox";
import { CountdownProvider } from "../contexts/CountdownContext";

import {GetServerSideProps} from 'next'
import { ChallengesProvider } from "../contexts/ChallengesContext";

interface HomeProps{
  level: number;
  currentExperience:number;
  challengesCompleted:number;
}


export default function Home(props: HomeProps ) {
  return (
    <ChallengesProvider
    level={props.level}//estava dando erro pois nao tinha
    currentExperience={props.currentExperience}
    challengesCompleted={props.challengesCompleted}
    >
<div className={styles.container} >
    <Head>
      <title>
        Início | move.it
      </title>
    </Head>

    <ExperienceBar/>
    <CountdownProvider>
     <section>
       <div>
        <Profile/>
        <CompletedChallenges/>
        <Countdown/>
       </div>
       <div>
        <ChallengeBox/>
       </div>
     </section>
     </CountdownProvider>

   </div>
</ChallengesProvider>
    )
}


export const getServerSideProps: GetServerSideProps = async(ctx) => {
  const user = {
    level:1,
    currentExperience:50,
    challengesCompleted:2
   }

const {level, currentExperience, challengesCompleted} = ctx.req.cookies //pega variaveis que armazenamos nos cookies em challengescontext


  return{
    props:{
      level:Number(level),
      currentExperience:Number(currentExperience), 
      challengesCompleted:Number(challengesCompleted)
    }
  }


}