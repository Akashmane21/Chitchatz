import Head from 'next/head'
import { useRouter } from 'next/router'
import Leftarea from '../../comps/Leftarea';
import firebase from '../../Db/firebasedb'
import { useState , useEffect } from "react";
import styles from '../../styles/Home.module.css'
import Header from '../../comps/Header';
import Chats from '../../comps/Chats';
import Chatarea from '../../comps/Chatarea';
import { useCounter } from "../../Context/CartContext";
import Messagebox from '../../comps/Messagebox';
// Roommenu imports
import style from '../../styles/Chatroom.module.scss'
import Fade from 'react-reveal/Fade';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Details = ({id}) => {
  const router = useRouter()
  const { UserId, UserName } = useCounter();

const [Data, setData] = useState()

// const [Data, setData] = useState([]);
const [Admin, setAdmin] = useState(' ')
const [Message, setMessage] = useState(" ")
const [Userdata, setUserdata] = useState([])
const [allMessages, setallMessages] = useState([ ])

// Roommenu hooks

const [menudata, setmenudata] = useState([]);
const [menuAdmin, setmenuAdmin] = useState('')
const [menuData, setmenuData] = useState([])
const [menuMembers, setmenuMembers] = useState([]);
const [menudeluserid, setmenudeluserid] = useState("")


const [isCall, setIsCall] = useState(false)


const  pid  = router.query

useEffect(() => {


  if (localStorage.getItem("authcheck") == null) {
    router.push('Auth');
  }
  else{
  }


  const helloWorld = window.location.href;
  
 
  const Products = firebase.database().ref(`Chitchatz/Rooms`);
  Products.on("value", (snapshot) => {
    const data = snapshot.val();
    const Room_List = [];
    for (let id in data) {
      Room_List.push({ id, ...data[id] });
    }
    const Allrooms = Room_List.reverse()
    let obj = Allrooms.find(movie => movie.id === id);

    //  setData(JSON.stringify(obj))
    setAdmin(obj.Admin)

  });



  firebase.database().ref(`Chitchatz/Users/${UserId}/Auth`)
  .on("value", (snapshot) => {
     const todos = snapshot.val();
     setUserdata(todos)
   });

 

   firebase
     .database()
     .ref(`Chitchatz/Rooms/${id}/Members`)
     .on("value", (snapshot) => {
       const todos = snapshot.val();
       const Products_List = [];

       for (let id in todos) {
         Products_List.push({ ...todos[id] });
       }
       setData(Products_List);
     });


     firebase
     .database()
     .ref(`Chitchatz/Rooms/${id}/Messages`)
     .on("value", (snapshot) => {
       const todos = snapshot.val();
       const Products_List = [];
       for (let id in todos) {
         Products_List.push({ ...todos[id] });
       }
       setallMessages(Products_List);
      //  STB()
     });


    //  Roommenu Firebase data
    

    firebase
      .database()
      .ref(`Chitchatz/Rooms/${id}/Admin`)
      .on("value", (snapshot) => {
        const todos = snapshot.val();
        setmenudata(todos);
       });

       firebase
       .database()
       .ref(`Chitchatz/Rooms/${id}/Members`)
       .on("value", (snapshot) => {
         const Products_List = [];
         const todos = snapshot.val();
 
         for (let id in todos) {
           Products_List.push({ ...todos[id] });
         }
         setmenuMembers(Products_List);
       
       });
 
       firebase
       .database()
       .ref(`Chitchatz/Rooms/${id}/Members`)
       .on("value", (snapshot) => {
         const todos = snapshot.val();
         const Products_List = [];
 
         for (let id in todos) {
           Products_List.push({id, ...todos[id] });
         }
         setmenuData(Products_List); 
 
         for(var i=0 ; i<Products_List.length;i++){
           if(Products_List[i].Name===UserName){
             setmenudeluserid(Products_List[i].id)
 
 
           }
   
         }
 
       });


  
}, [pid])


function Send(){
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

  const Msg = {
    ...Userdata,
    Message : Message,
    Time:strTime,
    date:fulldate
  }

  firebase
  .database()
  .ref(`Chitchatz/Rooms/${id}/Messages`)
  .push(Msg);

  document.getElementById("msg").value="";
  

  var myDiv = document.getElementById("msgs");
  myDiv.scrollTop = myDiv.scrollHeight+100;


}

function handle(e){
  if(e.keyCode === 13){
    Send()
 }
}




// Roommenu Functions 

function Goback(){
  router.push(`/`);
}

function Friends(){
  var modal = document.getElementById("join");
  modal.style.display = "block"; 
}

function onclose() {
  var mode = document.getElementById("join");
  mode.style.display = "none";
  var modal = document.getElementById("delete");
  modal.style.display = "none";
}

function Leave(){
var modal = document.getElementById("delete");
modal.style.display = "block";

}


function LeaveRoom(){
const id = localStorage.getItem("roomid")

firebase
.database()
.ref(`Chitchatz/Users/${UserId}/Rooms`)
.child(id)
.remove();

firebase
.database()
.ref(`Chitchatz/Rooms/${id}/Members`)
.child(deluserid)
.remove();
toast.info('Leaving Chat room..')

router.push("/");


}




function VideoCall() {
setIsCall(true)
var script = document.createElement("script");
script.type = "text/javascript";
script.addEventListener("load", function (event) {
  // Initialize the factory function
  const meeting = new VideoSDKMeeting();

  // Set apikey, meetingId and participant name
  const apiKey = "f3e9a2aa-43aa-4711-adc5-3dd47ef49e95"; // generated from app.videosdk.live

  const config = {
    name: UserName,
    apiKey: apiKey,
    meetingId: id,

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
    brandLogoURL:"https://firebasestorage.googleapis.com/v0/b/reactcrud-7b0fc.appspot.com/o/Image%2FIcon.png?alt=media&token=fb390f0d-8fcc-4002-b227-4f678a272895",
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


function Endcall(){
window.location.reload()

}

function Down(){

  var myDiv = document.getElementById("msgs");
  myDiv.scrollTop = myDiv.scrollHeight+100;
}


  return (
    <div className={styles.Scroll}>
   

   <div onClick={Down}  className={styles.arrow}>
   <i class="fas fa-arrow-alt-circle-down"></i>
   </div>
   
   <main className={styles.main}>
   <div className={styles.groupheader}>

       <Header />
   </div>
       <div className={styles.block}>
       <div className={styles.chatpage}>
       <Chats />
       </div>


       <div className={styles.areapage}>
      
       <div className="room">
      
      <div className="roommenu">

{isCall ? (
  <>
 
  <Fade top>

  <div className={style.CallScreen}>

  <h3>Joining ...</h3>

  <button onClick={Endcall}>
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="orangered" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 2l19.8 19.8M15 15.7V17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7c0-1.1.9-2 2-2h.3m5.4 0H13a2 2 0 0 1 2 2v3.3l1 1L22 7v10"/></svg></button>

  </div>
  </Fade>
  
  </>
) : (
  ""
)}

{menudata && 
<>
<svg onClick={Goback} xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H6M12 5l-7 7 7 7"/></svg>
    <div className="imgdiv">
        <img src={menudata.Grpimg} alt="" />
      </div>

      <div className="roominfo">
        <h1>{menudata.Roomname}</h1>
        <div className="Members">
        {menuMembers ? menuMembers.map((member, index) => <h6> {member.Name}  </h6>) : " "}
        </div>
      </div>
      </>
}
     

      
      <div className="roombtns">
      
        <svg onClick={VideoCall} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="gray" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15.6 11.6L22 7v10l-6.4-4.5v-1zM4 5h9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7c0-1.1.9-2 2-2z"/></svg>
        <button onClick={Leave}>
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v18h-6M10 17l5-5-5-5M13.8 12H3"/></svg>
        </button>
        <div className="dots">
        <i onClick={Friends} class="fas fa-user-friends"></i>
        </div>
        <div className="dots" onClick={Leave}>
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="orangered" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
          </div>
      </div>



      
     

      <div id="join" class="modal">
        <div class="modal-content" id="mem">
          <span onClick={onclose} class="close">
            {" "}
            &times;
          </span>
          <h1>Group Members</h1>

            {menuData ? menuData.map((member, index) => 
            <>
              <div className="Admin">

          
                {Admin===`${member.Name}` ? ( <h1>Admin</h1> ) : ( "")}
            <div className="Memberblock">
            
            <div className="imgdiv">
                <img src={member.DPLink} alt={member.Name}  />
                </div>
                <div className="mem_info">
                
            <h6> {member.Name}  </h6>
            <h2>{member.Phone}</h2>
                </div>
            </div>
            </div>
       </>
            ) : " "}
        </div>
        
      </div>


      <div id="delete" class="modal">
        <div class="modal-content">
          <span onClick={onclose} class="close">
            {" "}
            &times;
          </span>
          <div className="leave">
            <h1>Are you Sure ?</h1>
            <button onClick={LeaveRoom}>Leave_
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v18h-6M10 17l5-5-5-5M13.8 12H3"/></svg>
        </button>
        

        <h3>* You will be no longer part of this ChatRoom </h3>
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







      
      <div className="chatblock">
        <div className="Chatbox">
        <div className="msgs" id="msgs">
        {allMessages ? allMessages.map((MSG, index) => 
           <Messagebox Msg={MSG} />
            ) :" "}

        </div>
        <div className="send">
            <input id="msg" onKeyUp={handle} placeholder="Enter the Message here" onChange={e => setMessage(e.target.value)} />
          
            <button onClick={Send}>
            <i class="fas fa-paper-plane"></i>
     </button>
        </div>
        </div>

        <div className="Chatmembers">
          <h1>Group Members</h1>

            {Data ? Data.map((member, index) => 
            <>
            <div className="Admin">

          
                {Admin===`${member.Name}` ? ( <h1>Admin</h1> ) : ( "")}
            <div className="Memberblock">
            
            <div className="imgdiv">
                <img src={member.DPLink} alt={member.Name}  />
                </div>
                <div className="mem_info">
                
            <h6> {member.Name}  </h6>
            <h2>{member.Phone}</h2>
                </div>
            </div>
            </div>
       </>
            ) : " "}

        </div>
      </div>
    </div>
      
       </div>

      </div>
      </main>

    
    </div>
  );
}


Details.getInitialProps = async ({ query }) => {
  const {id} = query

  return {id}
}



export default Details;