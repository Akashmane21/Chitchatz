import Head from "next/head";
import { useRouter } from "next/router";
import Leftarea from "../../comps/Leftarea";
import firebase from "../../Db/firebasedb";
import { useState, useEffect } from "react";
import styles from "../../styles/meeting.module.scss";
import Header from "../../comps/Header";
import Chats from "../../comps/Chats";
import Chatarea from "../../comps/Chatarea";
import { useCounter } from "../../Context/CartContext";
import Messagebox from "../../comps/Messagebox";
import Fade from "react-reveal/Fade";
import Slide from "react-reveal/Slide";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const meetings = () => {
  const router = useRouter();
  const { UserId, UserName } = useCounter();

  const [ID, setID] = useState(" ");
  const [currenturl, setcurrenturl] = useState("");

  const pid = router.query;

  useEffect(() => {
    const helloWorld = window.location.href;
    setcurrenturl(helloWorld);
    if (localStorage.getItem("authcheck") == null) {
      router.push('Auth');
    }
    else{
      console.log("Alrealy Authenicated")
    }
    
    let id;

    if (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
    ) {
      id = helloWorld.replace("http://localhost:3000/Meetings/", "");
      id = id.replace("%20", " ");

      setID(id);
    } else {
      id = helloWorld.replace("https://chitchatz.vercel.app/Meetings/", "");
      id = id.replace("%20", " ");

      setID(id);
    }
  }, [pid]);

  function Join() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    toast.success('Joining Meeting..');

    //
    script.addEventListener("load", function (event) {
      // Initialize the factory function
      const meeting = new VideoSDKMeeting();

      // Set apikey, meetingId and participant name
      const apiKey = "f3e9a2aa-43aa-4711-adc5-3dd47ef49e95"; // generated from app.videosdk.live

      const config = {
        name: UserName,
        apiKey: apiKey,
        meetingId: ID,

        containerId: null,
        redirectOnLeave: window.location.href,

        micEnabled: true,
        webcamEnabled: true,
        participantCanToggleSelfWebcam: true,
        participantCanToggleSelfMic: true,

        chatEnabled: true,
        screenShareEnabled: true,
        pollEnabled: true,
        whiteBoardEnabled: true,
        raiseHandEnabled: true,

        recordingEnabled: true,
        recordingWebhookUrl: "https://www.videosdk.live/callback",
        participantCanToggleRecording: true,

        brandingEnabled: true,
        brandLogoURL:
          "https://firebasestorage.googleapis.com/v0/b/reactcrud-7b0fc.appspot.com/o/Image%2FIcon.png?alt=media&token=fb390f0d-8fcc-4002-b227-4f678a272895",
        brandName: "Chitchatz",
        poweredBy: false,

        participantCanLeave: true, // if false, leave button won't be visible

        // Live stream meeting to youtube
        livestream: {
          autoStart: true,
          outputs: [
            // {
            //   url: "rtmp://x.rtmp.youtube.com/live2",
            //   streamKey: "<STREAM KEY FROM YOUTUBE>",
            // },
          ],
        },
        permissions: {
          askToJoin: false, // Ask joined participants for entry in meeting
          toggleParticipantMic: true, // Can toggle other participant's mic
          toggleParticipantWebcam: true, // Can toggle other participant's webcam
        },

        joinScreen: {
          visible: true, // Show the join screen ?
          title: "Chitchatz", // Meeting title
          meetingUrl: window.location.href, // Meeting joining url
        },
      };

      meeting.init(config);
    });

    script.src =
      "https://sdk.videosdk.live/rtc-js-prebuilt/0.1.5/rtc-js-prebuilt.js";
    document.getElementsByTagName("head")[0].appendChild(script);
  }

  function Share() {
    const shareData = {
      title: "Chitchatz",
      text: `${UserName} is inviting to a Chitchatz Meeting.     
                                                                        
      Join Meeting 👇 .                                                                                                                                                                        `,
      url: window.location.href,
    };
    navigator.share(shareData);
    toast.success('Inviting..');

  }


  function copy(){

    navigator.clipboard.writeText(currenturl);
  toast.success('Copied to Clipboard Successfully..');

  }

  function Goback(){
    window.history.back();

  }

  return (
    <div className={styles.Meetingblock}>

    <nav>
    <i class="fas fa-arrow-left" onClick={Goback}></i>
      <h1>Meeting</h1>
    </nav>
      <div className={styles.Meeting}>
        <Fade top>
        <lottie-player src="https://assets10.lottiefiles.com/packages/lf20_pon5lxe5.json"  background="transparent"  speed="1" style={{ height: "300px"}}  loop  autoplay />

         
        </Fade>

        <div className={styles.link}>
        <h3>Here's the Link to your meeting</h3>
        <h5>
          Copy this link and Send it to people you want to meet with . Be sure
          to save it to you can use it lter , too.
        </h5>
        <div className={styles.info}>
          <Fade left big cascade>
            <h4>Meeting URL :-</h4>
              <div className={styles.copy} onClick={copy}>
            <h1> {currenturl}</h1>
            <i class="fas fa-copy"></i>
              </div>
          </Fade>
        </div>
        <Slide bottom>
          <div className={styles.button}>
            <div className={styles.Join}>
              <button onClick={Join}>Join</button>
            </div>

            <div className={styles.Share}>
              <button onClick={Share}>
                {" "}
                <i class="fas fa-share-alt"></i> Share
              </button>
            </div>
          </div>
        </Slide>
 {/* <img
            src="https://www.incimages.com/uploaded_files/image/1920x1080/getty_908692790_376880.jpg"
            alt="logo"
          /> */}
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
};

export default meetings;
