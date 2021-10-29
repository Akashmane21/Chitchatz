import Head from "next/head";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../styles/Header.module.scss";
import { useRouter } from "next/router";
import { useCounter } from "../Context/CartContext";
import firebase from "../Db/firebasedb";
import Link from "next/link";

export default function Header() {
  const { UserId, UserName } = useCounter();

  const router = useRouter();

  const [Userinfo, setUserinfo] = useState([]);
  const [Roomlist, setRoomlist] = useState([]);
  const [routename, setroutename] = useState("/");

  const  pid  = router.query

  useEffect(() => {
    
  const helloWorld = window.location.href;
 


  if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
     {
      console.log("running on localost")
        const id = helloWorld.replace("http://localhost:3000","");
        setroutename(id)

     } 
  else{
    console.log("running on the web")
    const id = helloWorld.replace("https://chitchatz.vercel.app","");
    setroutename(id)
  }




    const Products = firebase.database().ref(`Chitchatz/Users/${UserId}/Auth`);
    Products.on("value", (snapshot) => {
      const Products_List = [];
      const data = snapshot.val();
      setUserinfo(data);
    });

  }, [pid]);

  function logout() {
    localStorage.removeItem("authcheck");
    router.push("/Auth");
  }

  return (
    <>
    <div className={styles.container}>
    

      <div className={styles.header}>
        <div className={styles.icons}>
          <div className={styles.Profile}>
            <img src={Userinfo.DPLink} alt="ProfilePic" />
            <div className={styles.info}>
              <h3>{Userinfo.Name}</h3>
              <h3>{Userinfo.Phone}</h3>
            </div>
          </div>

          <div className={styles.label}>
          <Link href="/">

           <h3>

             {/* <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgb(95, 95, 95)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg> */}
              <i class="fas fa-house-user"></i> 

              Home
          
           </h3>
            </Link>
            {/* <h3>
              <i class="fas fa-comment-alt"></i> Chat Rooms
            </h3> */}
            <Link href="/Meet/">

            <h3>
              <i class="fab fa-meetup" ></i> Meeting
            </h3>
            </Link>

            <Link href="/Profile/">

            <h3>
              <i class="fas fa-user-cog"></i> Profile
            </h3>
            </Link>

            <h3 className={styles.logout} onClick={logout}>
              <i class="fas fa-sign-out-alt" /> Logout
            </h3>
          </div>
        </div>
      </div>
    </div>


    <div className={styles.Mobnav}>
    <Link href="/">
    {routename=="/" ? 
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="orangered" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
   :         <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgb(95, 95, 95)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>


    }
           </Link>
              <Link href="/Meet/">
              {routename=="/Meet" ? 
              <i class="fab fa-meetup" style={{ color: "orangered"}} ></i> 
              :  <i class="fab fa-meetup" style={{ color: "rgb(95, 95, 95)"}}  ></i> 
              }
           </Link>

           <Link href="/Profile/">
           {routename=="/Profile" ? 
              <i class="fas fa-user-cog" style={{ color: "orangered"}} ></i> 
              :  <i class="fas fa-user-cog" style={{ color: "rgb(95, 95, 95)"}}  ></i> 
              }
              
              </Link>
    </div>
    </>
  );
}
