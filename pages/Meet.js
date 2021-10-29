import Head from "next/head";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../styles/Chatarea.module.scss";
import style from "../styles/Meet.module.scss";

import Header from "../comps/Header";
import Fade from "react-reveal/Fade";
import { Formik, Field, Form } from "formik";
import Slide from "react-reveal/Slide";
import { useCounter } from "../Context/CartContext";
import { useRouter } from 'next/router'
import firebase from '../Db/firebasedb'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Meet() {
  const router = useRouter()

  const { UserId, UserName } = useCounter();

  const [create, setcreate] = useState(false);
  const [join, setjoin] = useState(false);
useEffect(() => {
  if (localStorage.getItem("authcheck") == null) {
    router.push('Auth');
  }
  else{
    console.log("Alrealy Authenicated")
  }
}, [])



const CreateMeet = ({name , password}) => {

  const Meetid="meet~"+name+"~"+password
  toast.success('Processing...');


  firebase
  .database()
  .ref(`Chitchatz/Meetings/${Meetid}/`)
  .once("value", (snapshot) => {
    if (snapshot.exists()) {
      toast.info('Meet already exists..');

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
       Date : fulldate,
        Time : strTime,
        Meetname:Meetid,
        Admin:UserName
       }

      firebase
        .database()
        .ref(`Chitchatz/Meetings/${Meetid}/Admin`)
        .set(Roomdata)
        .then((res) => {
         router.push(`/Meetings/`+Meetid);
         toast.success('Created Successfully....');
        });

       
}
});



};




function JoinMeet({name , password}){
  const Meetid="meet~"+name+"~"+password
  toast.success('Processing...');

  firebase
  .database()
  .ref(`Chitchatz/Meetings/${Meetid}/`)
  .once("value", (snapshot) => {
    if (snapshot.exists()) {
      router.push(`/Meetings/`+Meetid);
      toast.success('Joining Meeting..');
    } else {
      toast.warn('Invalid Credentials ');
      

    }})
}





  function isNew() {
    setjoin(false);
    setcreate(true);
  }
  function isJoin() {
    setcreate(true);
    setjoin(true);
  }

  function Cancel() {
    setcreate(false);
    setjoin(false);
  }
 

  return (
    <>
      <Header />

      <div className={style.Meet}>
        <Fade left big cascade>
          <h5>Dreams and teams work together</h5>
        </Fade>
        <div className={style.Meet_block}>
          <img src="/online school.svg" alt="" />

          {create ? (
            <div className={style.form}>
              <Slide left>
                {join ? (
                  <div className={style.formblock}>
                    <h1>Join Meet</h1>
                    <Formik
                      initialValues={{ name: "", password: "" }}
                      onSubmit={async (values) => {
                        JoinMeet(values);
                      }}
                    >
                      <Form className={style.forminput}>
                        <Field
                          placeholder="Meet Name"
                          name="name"
                          type="text"
                          required={true}
                        />
                        <br />
                        <Field
                          placeholder="Password"
                          name="password"
                          type="password"
                          required={true}
                        />
                        <br />
                        <div className={style.flex}>
                          <div className={style.Cancelbtn}>
                            <button onClick={Cancel}>Cancel</button>
                          </div>
                          <div className={style.joinbtn}>
                            <button type="submit">Join</button>
                          </div>

                        </div>
                        
                      </Form>
                    </Formik>
                  </div>
                ) : (
                  <div className={style.formblock}>
                    <h1>Create new </h1>
                    <Formik
                      initialValues={{ name: "", password: "" }}
                      onSubmit={async (values) => {
                        CreateMeet(values);
                      }}
                    >
                      <Form>
                        <Field
                          placeholder="Meet Name"
                          name="name"
                          type="text"
                          required={true}
                        />
                        <br />
                        <Field
                          placeholder="Password"
                          name="password"
                          type="password"
                          required={true}
                        />
                        <br />
                        <div className={style.flex}>
                          <div className={style.Cancelbtn}>
                            <button onClick={Cancel}>Cancel</button>
                          </div>
                          <div className={style.joinbtn}>
                            <button type="submit">Create</button>
                          </div>

                        </div>

                        

                      
                      </Form>
                    </Formik>

                  </div>
                )}
              </Slide>
            </div>
          ) : (
            <>
              <Slide right>
                <div className={style.Meet_area}>
                  <div onClick={isNew} className={style.Meet_buttons}>
                    <Fade bottom cascade>
                      <h2>New Meeting </h2>
                    </Fade>
                  </div>
                  <div onClick={isJoin} className={style.Meet_buttons}>
                    <Fade bottom cascade>
                      <h2>Join with code </h2>
                    </Fade>
                  </div>
                </div>
              </Slide>
            </>
          )}
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

    </>
  );
}
