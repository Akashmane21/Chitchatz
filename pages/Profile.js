import Head from "next/head";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../styles/Profile.module.scss";
import Header from "../comps/Header";
import firebase from "../Db/firebasedb";
import { useCounter } from "../Context/CartContext";
import { useRouter } from "next/router";
import Flip from 'react-reveal/Flip';
import Slide from 'react-reveal/Slide';

export default function Profile() {
  const { UserId, UserName } = useCounter();
  const router = useRouter();
  const [Profiledata, setProfiledata] = useState([]);

  useEffect(() => {

    if (localStorage.getItem("authcheck") == null) {
      router.push('Auth');
    }
    else{
      console.log("Alrealy Authenicated")
    }


    
    const Admin = firebase.database().ref(`Chitchatz/Users/${UserId}/Auth`);
    Admin.on("value", (snapshot) => {
      const data = snapshot.val();
      setProfiledata(data);
    });
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Profile</title>
        <meta name="description" content="user Profile" />
      </Head>
      <Header />
      {Profiledata && (
        <div className={styles.Profile}>
          <div className={styles.brand}>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/reactcrud-7b0fc.appspot.com/o/Image%2FIcon.png?alt=media&token=fb390f0d-8fcc-4002-b227-4f678a272895"
              alt=""
            />
            <h3>Chitchatz</h3>
          </div>
          <div className={styles.Pic}>
            <img src={Profiledata.DPLink} alt={Profiledata.Name} />
          </div>
          <div className={styles.profileinfo}>
          
            <Flip bottom cascade>
            <span>
            <i class="fas fa-user"></i>
            <div>

            <h2>Name</h2>

               <h1>{Profiledata.Name}</h1>
            </div>
            </span>
               </Flip>

               <Flip bottom cascade>

            <span>
            <i class="fas fa-mobile"></i>
            <div>

            <h2>Phone</h2>
            <h1>{Profiledata.Phone}</h1>
            </div>
            </span>
</Flip>

<Flip bottom cascade>

            <span>
            <i class="fas fa-lock"></i>
            <div>
            <h2>password</h2>
            <h1>{Profiledata.Password}</h1>
            </div>
            </span>
            </Flip>
          </div>
        </div>
      )}
    </div>
  );
}
