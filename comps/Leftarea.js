import Head from 'next/head'
import { useState , useEffect } from "react";
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from './Header';
import Chats from './Chats';
import Chatarea from './Chatarea';
import { useRouter } from 'next/router'
import firebase from '../Db/firebasedb'

export default function Leftarea() {
  const router = useRouter()


  return (
    <div className={styles.container}>
    

      <main className={styles.main}>
       <Header />
       <div className={styles.block}>
       <div className={styles.chat}>
       <Chats />
       </div >

       <div className={styles.area}>

       <Chatarea />
       </div>
     
     </div>

      </main>

     
    </div>
  )
}
