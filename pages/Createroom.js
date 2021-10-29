import Head from 'next/head'
import { useState , useEffect } from "react";
import Image from 'next/image'
import styles from '../styles/Chatarea.module.scss'
import Create from '../comps/Create';
import Header from '../comps/Header';


export default function Createroom() {
useEffect(() => {
  if (localStorage.getItem("authcheck") == null) {
    router.push('Auth');
  }
  else{
    console.log("Alrealy Authenicated")
  }
}, [])
  return (
    <>
    <Header />

    <div className={styles.container}>
     
<h6>Create Your own Chat Rooms</h6>
      <div className={styles.Chatblock}>
      <img src="https://techvines.in/assets/images/3D%201MB.png" alt="" />

        <div className={styles.Buttons}>
           <Create />
        </div>
        </div>
        <hr />
    
    </div>
    </>
  )
}
