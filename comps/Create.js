import Head from "next/head";
import { useState, useEffect } from "react";
import Image from "next/image";
// import styles from "../styles/Chats.module.scss";
import { useCounter } from "../Context/CartContext";
import { useRouter } from 'next/router'
import firebase from '../Db/firebasedb'
import Chatroom from "../comps/Chatroom";
import Fade from 'react-reveal/Fade';
import { Formik, Field, Form } from "formik";
import styles from '../styles/Auth.module.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Create() {
 
  const { UserId, UserName } = useCounter();
  const router = useRouter()

  const [userinfo, setuserinfo] = useState([])
  const [isJoin, setisJoin] = useState(false)

  useEffect(() => {
    firebase.database().ref(`Chitchatz/Users/${UserId}/`)
    .on("value", (snapshot) => {
      const Products_List = [];
      const todos = snapshot.val();

      for (let id in todos) {
        Products_List.push({ ...todos[id] });
      }
      setuserinfo(Products_List[0])
    });
  }, []);




  const newcreate = ({Roomname ,password }) => {

    const name = Roomname + "_" + password;
   
    firebase
    .database()
    .ref(`Chitchatz/Rooms/${name}/`)
    .once("value", (snapshot) => {
      if (snapshot.exists()) {
        
        toast.success('Chat room Already exists..')


      } else {

        const d = new Date();
        const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
        var month = months[d.getMonth()];
        const date =  d.getDate();
        // const year = d.getFullYear();
        const fulldate = date+" "+month
        var hours = d.getHours();
        var minutes = d.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        
        const Roomdata = {
          ...userinfo ,
          Grpimg : "https://firebasestorage.googleapis.com/v0/b/reactcrud-7b0fc.appspot.com/o/Image%2Fgrp%20dp.png?alt=media&token=46759f5d-7687-407d-ac14-9d7eb6fbe260",
          Date : fulldate,
          Time : strTime,
          Roomname:Roomname
         }

        firebase
          .database()
          .ref(`Chitchatz/Rooms/${name}/Admin`)
          .set(Roomdata)
          .then((res) => {
          
           toast.success('Chat room Creating Successfully..')


          });

          firebase
          .database()
          .ref(`Chitchatz/Users/${UserId}/Rooms`)
          .push({
           RoomName : name
          })
       


          firebase
          .database()
          .ref(`Chitchatz/Rooms/${name}/Members`)
          .push({
           ...userinfo
          })

          const Msg = {
            ...userinfo,
            Message : "Hello Everyone 👋",
            Time:strTime,
            date:fulldate
          }
      
          firebase
          .database()
          .ref(`Chitchatz/Rooms/${name}/Messages`)
          .push(Msg);

          router.push('/');  
          onclose() 
}
});



  };


  function newjoin({Roomname ,password }){
    const name = Roomname + "_" + password;
   
    firebase
    .database()
    .ref(`Chitchatz/Rooms/${name}/`)
    .once("value", (snapshot) => {
      if (snapshot.exists()) {
        firebase
          .database()
          .ref(`Chitchatz/Users/${UserId}/Rooms`)
          .push({
           RoomName : name
          })
          firebase
          .database()
          .ref(`Chitchatz/Rooms/${name}/Members`)
          .push({
           ...userinfo
          })
       
                router.push('/');  
                
                onclose() 
       

      } else {

toast.error('Invalid Credentials..')

      }})
  }


  function Create() {
    setisJoin(false)
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
  }

  function Join() {
    setisJoin(true)
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
  }

  function onclose() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
  }




  return (
    <div>
      <div className="Create_Join">
        <button onClick={Create} className="hidden">
          Create Room
        </button>

        <button onClick={Join} className="hidden">
          Join Room
        </button>

    
      </div>

      <div id="myModal" class="modal">
        <div class="modal-content">
          <span onClick={onclose} class="close">
            {" "}
            &times;
          </span>


          <div className={styles.formdata}>
            

          {isJoin ? ( 
              <>

              <h2> Join Room </h2>
              
              <Fade bottom>
              <Formik
                      initialValues={{ Roomname: "", password: "" }}
                      onSubmit={async (values) => {
                        newjoin(values);
                      }}
                    >
                      <Form className={styles.forminput}>

                      <span>
                      <i class="fab fa-meetup"></i>
                        <Field placeholder="Room Name" name="Roomname" type="text" required={true}/>
                      </span>
                      <br />
            
                     <span>
                     <i class="fas fa-lock"></i>
                        <Field placeholder="Password" name="password" type="password" required={true} />
                     </span>
                     <br />
                      

                          <div className={styles.joinbtn}>
                            <button type="submit">Join </button>
                          </div>

                    
         

                    
                      </Form>
                    </Formik>
                  
              </Fade>
                    </>
            ): (
              <>
              <h2> Create New Room </h2>
              <Fade right>

              <Formik
                      initialValues={{ Roomname: "", password: ""}}
                      onSubmit={async (values) => {
                        newcreate(values);
                      }}
                    >
                      <Form className={styles.forminput}>
                      <span>
                      <i class="fab fa-meetup"></i>
                        <Field placeholder="Room Name" name="Roomname" type="text" required={true}/>
                      </span>
                      <br />


                     <span>
                     <i class="fas fa-lock"></i>
                        <Field placeholder="Password" name="password" type="password" required={true} />
                     </span>
                     <br />
                      

                          <div className={styles.joinbtn}>
                            <button type="submit">Continue</button>
                          </div>
                      </Form>
                    </Formik>
                   
              </Fade>
                    </>
            )}
</div>

       
        </div>
      </div>

     

      <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          />
    </div>
  );
}
