import React, { useState, useEffect } from "react";
import firebase from "../Db/firebasedb";
import styles from "../styles/Chatroom.module.scss";
import { useCounter } from "../Context/CartContext";
import { useRouter } from "next/router";
import Fade from 'react-reveal/Fade';

export default function Chatroom({ Rooms }) {
  const [Lastmsg, setLastmsg] = useState([]);
  const [Members, setMembers] = useState([]);
  const [moremem, setmoremem] = useState("");

  const [Room, setRoom] = useState([]);
  useEffect(() => {
    firebase
      .database()
      .ref(`Chitchatz/Rooms/${Rooms.RoomName}/Admin`)
      .on("value", (snapshot) => {
        const todos = snapshot.val();
        setRoom(todos);
      });
    firebase
      .database()
      .ref(`Chitchatz/Rooms/${Rooms.RoomName}/Members`)
      .on("value", (snapshot) => {
        const Products_List = [];
        const todos = snapshot.val();

        for (let id in todos) {
          Products_List.push({ ...todos[id] });
        }

        const lastmsg = Products_List.reverse();
        lastmsg.length = 3;
        setMembers(lastmsg);
      });

    firebase
      .database()
      .ref(`Chitchatz/Rooms/${Rooms.RoomName}/Members`)
      .on("value", (snapshot) => {
        const Products_List = [];
        const todos = snapshot.val();

        for (let id in todos) {
          Products_List.push({ ...todos[id] });
        }
        var memlength = Products_List.length;
        if (memlength > 3) {
          setmoremem(`${memlength - 3}+`);
        } else {
          setmoremem("");
        }
      });

    firebase
      .database()
      .ref(`Chitchatz/Rooms/${Rooms.RoomName}/Messages`)
      .on("value", (snapshot) => {
        const todos = snapshot.val();
        const Products_List = [];

        for (let id in todos) {
          Products_List.push({ ...todos[id] });
        }
        const lastmsg = Products_List.reverse();
        lastmsg.length = 1;
        setLastmsg(lastmsg);
      });
  }, [Rooms.RoomName]);

  function GO() {
    const room = Room.Roomname + "_" + Room.Password;
  
    localStorage.setItem("roomid", Rooms.id);
  }


  return (
   

    <div className={styles.overlay}>
    
      <div className={styles.chatbx} onClick={GO}>
        <div className={styles.flex}>

          <div className={styles.imgdiv}>
            <img src={Room.Grpimg} alt=" " />
          </div>

      
<div className={styles.msg}>



<div className={styles.Chat_info}>
    <Fade bottom cascade>
      <h5>{Room.Roomname}</h5>
  </Fade>
  {Lastmsg
    ? Lastmsg.map((member, index) => (
          <h6>{member.Message}</h6>
      ))
    : " "}
</div>


<div className={styles.date}>
  {Lastmsg
    ? Lastmsg.map((member, index) => (
        <>
          <h6>{member.date}</h6>
          <h6>{member.Time}</h6>
        </>
      ))
    : " "}
</div>

</div>




        </div>



<div className={styles.members}>
            <h6>Members</h6>
            <div className={styles.memberno}>
              <div className={styles.memberss}>
                {Members
                  ? Members.map((member, index) => (
                      <>
                        <div className={styles.memimg}>
                          <img src={member.DPLink} alt=" " />
                        </div>
                      </>
                    ))
                  : " "}
              </div>

              <div className={styles.mem}>
                <h6>{moremem}</h6>
              </div>
            </div>
          </div>




      </div>
    </div>
  );
}
