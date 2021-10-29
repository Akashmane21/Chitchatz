import Head from "next/head";
import { useState, useEffect , useMemo } from "react";
import Image from "next/image";
import styles from "../styles/Chats.module.scss";
import style from "../styles/Meet.module.scss";
import ContentLoader, { Facebook } from 'react-content-loader'

import { useCounter } from "../Context/CartContext";
import { useRouter } from 'next/router'
import firebase from '../Db/firebasedb'
import Chatroom from "../comps/Chatroom";
import Link from "next/link";
import LightSpeed from 'react-reveal/LightSpeed';
import {Chatloader , picloader} from "./Skeleton/Chatloader";

export default function Chats() {
  const { UserId, UserName } = useCounter();
  const router = useRouter()
  const [Rooms, setRooms] = useState([])
  const [Profiledp, setProfiledp] = useState("")
  let currDate = new Date()
  currDate = currDate.getHours(); 
  const [Greeting, setGreeting] = useState("")
  const [isloguot, setisloguot] = useState(false)
  const [roomlength, setroomlength] = useState("")
  const [isChataload, setisChataload] = useState(false)
  useEffect(() => {    
        
    if(currDate > 1 && currDate < 12){
      setGreeting("🌄 Good Morning")
       
   }
   else if(currDate >= 12 && currDate < 17){
     setGreeting("🌞 Good Afternoon")
      
   }
   else if(currDate >= 17 && currDate < 19){
     setGreeting("🌅 Good Evening ")
      
   }
   else if(currDate >= 19 && currDate < 24){
     setGreeting("🌚 Good Night")
      
   }

    const Products = firebase.database().ref(`Chitchatz/Users/${UserId}/Rooms`);
    Products.on("value", (snapshot) => {
      const data = snapshot.val();
      const Room_List = [];
      for (let id in data) {
        Room_List.push({ id, ...data[id] });
      }
      const reversed = Room_List.reverse();
      setRooms(reversed);
      setroomlength(reversed.length);
      setisChataload(true)
    });


    const Admin = firebase.database().ref(`Chitchatz/Users/${UserId}/Auth`);
    Admin.on("value", (snapshot) => {
      const data = snapshot.val();
     setProfiledp(data.DPLink)
    });



    const roomss = firebase.database().ref(`Chitchatz/Rooms`);
    roomss.on("value", (snapshot) => {
      const data = snapshot.val();
      const Room_List = [];
      for (let id in data) {
        Room_List.push({ id, ...data[id] });
      }
      const reversed = Room_List.reverse();
    });

  }, []);

  const [search, setSearch] = useState("");
  const [input, setinput] = useState("");

    const countries = useMemo(() => {
        if (!search) return Rooms ;

        return Rooms.filter((country) => {
            return (
                country.RoomName.toLowerCase().includes(search.toLowerCase()) ||
                country.id.toLowerCase().includes(search.toLowerCase())
            );
        });
    }, [search, Rooms]);
    


  function Open(id){
    console.log(id);
    router.push('/Groups/'+id);

  }

  function Logout() {
    setisloguot(!isloguot)
   
  }

  function logout() {
    setisloguot(!isloguot)
    localStorage.removeItem("authcheck");
    router.push("/Auth");

  }

   function Cancel() {
    setisloguot(!isloguot)
  
  }


  return (
    <div className={styles.container}>
{isloguot ? (
  <LightSpeed left>

  <div className={styles.Logprompt}>
  <h2>Are you sure ?</h2>
  <div className={styles.flex}>
                          
                            <h6 onClick={Cancel}>Cancel</h6>
                        
                            <button onClick={logout} >Logout</button>
                          
                        </div>
    </div>



    </LightSpeed>

 ): ( 
""
)}
    

  <Link href="/Createroom">
   <div className={styles.Add}>

<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>    
      </div>
      </Link>
 
      <div className={styles.Chats}>
      <div className={styles.Status}>
      <div class="menu-nav">
  
  <div class="menu-item">
  <div className="name">
  <div class="dropdown-container" tabindex="-1">
 
    <img src={Profiledp} alt="" />
  </div>
<div className={styles.greting}>

<h6>👋 Hii , {UserName} </h6>
<h2>{Greeting}  !</h2>
</div>

<div class="dropdown-container  burger" tabindex="-1">
          <svg class="three-dots" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 9.5H7M21 4.5H3M21 14.5H3M21 19.5H7"/></svg>
    
    <div class="dropdown">
    <Link href="/Profile  ">
 <div>             <i class="fas fa-user"></i> Profile</div>
 </Link>
 <Link href="/Meet">

      <div> <i class="fab fa-meetup" ></i> Meet</div>
      </Link>
      
      <div onClick={Logout}>  <i class="fas fa-sign-out-alt" />  Logout </div>
    </div>
  </div>



</div>

  </div>
</div>
</div>
        <div className={styles.searchber}>
          <i class="fas fa-search"></i>
          <input type="text" placeholder="Search group ..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
           />
       
        
        </div>

       

        <div className={styles.tabs}>
          <h1>Chats</h1>
          <Link href="/Meet">

          <h2>Meetings</h2>
          </Link>
        </div>

        {isChataload ? ( "") : (
        <>
 <div className={styles.loader}>
          <Chatloader />
        </div>
        <div className={styles.loader}>
          <Chatloader />
        </div>
        <div className={styles.loader}>
          <Chatloader />
        </div>
        <div className={styles.loader}>
          <Chatloader />
        </div>
        <div className={styles.loader}>
          <Chatloader />
        </div>
        </>
        )}
       


        {countries
                ? countries.map((room, index) => (
                  <>
                  
                  <div onClick={()=> Open(room.RoomName)}>
                  
                    <Chatroom Rooms={room} key={index} />
                  </div>
</>

                  ))
                : " "}
                

                {roomlength =="0" ? (
                  <div className={styles.Create}>

                    <h1>You are not part of any Group </h1>
                    <h6>Join or Create your own chat room here</h6>
                    <Link href="/Createroom">

                    <button>Continue</button>
                    </Link>

                  </div>
                ):(
                    ""
                )}


       
      </div>
    </div>
  );
}
