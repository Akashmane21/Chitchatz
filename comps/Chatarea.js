import { useState , useEffect } from "react";
import styles from '../styles/Chatarea.module.scss'
import Create from './Create';

export default function Chatarea() {

  return (
    <div className={styles.container}>
     
<h6>Create Your own Chat Rooms</h6>
      <div className={styles.Chatblock}>
      <img src="/undraw_Meet_the_team_re_4h08.svg" alt="" />

        <div className={styles.Buttons}>
           <Create />
        </div>
        </div>
       
    
    </div>
  )
}
