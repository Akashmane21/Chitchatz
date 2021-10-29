import React, { useState , useEffect } from "react";
import { useRouter } from 'next/router'
import firebase from '../Db/firebasedb'
import styles from '../styles/Auth.module.scss'
import { Formik, Field, Form } from "formik";
import Roll from 'react-reveal/Roll';
import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Authform() {
    const router = useRouter()

  const [isLogin, setisLogin] = useState(false);



  function Login() {
    setisLogin(true);
  }
  function Register() {
    setisLogin(false);
  }










  

  const newRegister = (data) => {

    toast.info('Processing...')

  
    const name = data.username + "_" + data.password;
    const user = {
      Name:data.username,
      Phone:data.phone ,
      Password:data.password,
      DPLink : "https://firebasestorage.googleapis.com/v0/b/reactcrud-7b0fc.appspot.com/o/Image%2Fuser.png?alt=media&token=8d844cd3-4354-4ac1-a853-6cafa61a9f2f"
    }

    firebase.database().ref(`Chitchatz/Users/${name}/`).once("value", (snapshot) => {
      if (snapshot.exists()) {

        toast.info('User Already exists...')




      } else {
        firebase.database().ref(`Chitchatz/Users/${name}/Auth`).set(user)
          .then((res) => {
            localStorage.setItem("authcheck", "True");
            localStorage.setItem("id", name);
            localStorage.setItem("Name", data.username);
            localStorage.setItem("reload" , "true")
            router.push('/');
            toast.success('Register Successfully...')

        




          });
      }
    });
    

       
    
   
  };





  function newLogin({username , password}) {
    const name = username + "_" + password;
    toast.info('Processing...')

    firebase.database().ref(`Chitchatz/Users/${name}/`).once("value", (snapshot) => {
        if (snapshot.exists()) {
              localStorage.setItem("authcheck", "True");
              localStorage.setItem("id", name);
              localStorage.setItem("Name", username);
              router.push('/');
              localStorage.setItem("reload" , "true")
              toast.success('Login Successfully...')

          
        } else {
          toast.error('Invalid Credentials...')



        }
      });
  }


  

 

  return (
    <div className={styles.Auth_page}>
    
            <div className={styles.formdata}>
            
<div className={styles.brand}>
  <img src="https://firebasestorage.googleapis.com/v0/b/reactcrud-7b0fc.appspot.com/o/Image%2FIcon.png?alt=media&token=fb390f0d-8fcc-4002-b227-4f678a272895" alt="logo" />
  <Fade left>

  <h1>
  Chitchatz
  </h1>
  </Fade>
</div>


            {isLogin ? ( 
              <>

              <h2> Log in </h2>
              <h6>Hello , welcome back to Chitchatz</h6>
              <Fade bottom>
              <Formik
                      initialValues={{ username: "", password: "" }}
                      onSubmit={async (values) => {
                        newLogin(values);
                      }}
                    >
                      <Form className={styles.forminput}>

                      <span>
                      <i class="fas fa-user"></i>
                        <Field placeholder="Name" name="username" type="text" required={true}/>
                      </span>
                      <br />
            
                     <span>
                     <i class="fas fa-lock"></i>
                        <Field placeholder="Password" name="password" type="password" required={true} />
                     </span>
                     <br />
                      

                          <div className={styles.joinbtn}>
                            <button type="submit">Login</button>
                          </div>

                         
                    
                      </Form>
                    </Formik>
                    <h5>
                Don't Have Account ? <h4 onClick={Register}>Create Account</h4>
              </h5>

              </Fade>
                    </>
            ): (
              <>
              <h2> Register Now </h2>
              <h6>Hello , welcome back to Chitchatz</h6>
              <Fade right>

              <Formik
                      initialValues={{ username: "", password: "" , phone:"" }}
                      onSubmit={async (values) => {
                        newRegister(values);
                      }}
                    >
                      <Form className={styles.forminput}>
                      <span>
                      <i class="fas fa-user"></i>
                        <Field placeholder="Name" name="username" type="text" required={true}/>
                      </span>
                      <br />

                      <span> 
                        <i class="fas fa-mobile"></i>
                        <Field placeholder="phone" name="phone" type="Phone" required={true} />
                     </span>
                     <br />

                     <span>
                     <i class="fas fa-lock"></i>
                        <Field placeholder="Password" name="password" type="password" required={true} />
                     </span>
                     <br />
                      

                          <div className={styles.joinbtn}>
                            <button type="submit">Sine up</button>
                          </div>
                      </Form>
                    </Formik>
                    <h5>
                Already Have a Account ? <h4 onClick={Login}>Login</h4>
              </h5>
              </Fade>
                    </>
            )}



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
    </div>
  );
}

export default Authform;
