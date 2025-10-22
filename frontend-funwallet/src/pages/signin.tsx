
import { Heading } from "../components/heading";
import { SubHeading } from "../components/subheading";
import { InputBox } from "../components/Inputbox";
import { ButtonComponent } from "../components/ButtonComponent";
import { BottomWarning } from "../components/BottomWarning";
import { LandingpageSide } from "../components/LandingpageSide";
import { BACKEND_URL } from "./config";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { ClipLoader } from "react-spinners";


export function Signin() {

  const navigate = useNavigate()

  const [email, setEmail]=useState('')
  const [password, setPassword]=useState('')
  const [ loader, setLoader ]=useState(false)   //for showing loading after during signing in.


//#### because we are accessing it in the finally block as well for clearing the timeout so for that we can't define it in the try block only.
  let stage1: ReturnType<typeof setTimeout>;
  let stage2: ReturnType<typeof setTimeout>;
  let stage3: ReturnType<typeof setTimeout>;
  let stage4: ReturnType<typeof setTimeout>;
  let stage_5_withRetry: ReturnType<typeof setTimeout>;



  async function  SigningIn() {
    try {
      setLoader(true)

      // if(!email.trim() || !password.trim() ){
      //   toast.error('All fields required !')
      //   return;
      // }

      // const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
      //   email,
      //   password
      // })

//-- enhaced using help of GPT
    
    const normalizedEmail = email.trim().toLowerCase();   //  lowercase + trim
    const normalizedPassword = password.trim();           //  trim spaces

    if (!normalizedEmail || !normalizedPassword) {
      toast.error('All fields required !', {id: 'signin'});
      return;
    }

  toast.loading("Signing in...", { id: "signin" });

  stage1 = setTimeout(() => {
      toast.loading("Starting server, please wait...", { id: "signin" });
    }, 15000);

  stage2 = setTimeout(() => {
      toast.loading("Connecting to backend...", { id: "signin" });
    }, 30000);

  stage3 = setTimeout(() => {
      toast.loading("Loading your wallet...", { id: "signin" });
    }, 45000);

  stage4 = setTimeout(() => {
      toast.loading("Final step in progress...", { id: "signin" });
    }, 60000);

  stage_5_withRetry = setTimeout(() => {
    toast.error("Still waiting? 🔁 Try refreshing.", {
      id: "signin",
      //---------???? refresh button also will add this later.
      // action: {      
      //   label: "🔄 Refresh",
      //   onClick: () => window.location.reload(),
      // },
    });
  }, 75000);


    const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
      email: normalizedEmail,
      password: normalizedPassword,
    });

      const token = response.data.token
      const firstname = response.data.firstname

      localStorage.setItem('token', token)
      localStorage.setItem('firstname', firstname)


      toast.success('successfully signed up', { id:'signin'})
      navigate('/dashboard')

    } catch (error) {

 /*#### *****************--------  MY  OWN TAKE  -----------********************** 
      NOTE- best way to show the errors -- since i wrote the backend very carefully like 
      with proper status code and message , So use that in the frontend .
      */


     if(axios.isAxiosError(error) && error.response){
      const { status, data } = error.response;

      if(status === 403 && data.message ==="Invalid emailId."){
        toast.error('Invalid emailId', { id: "signin" })
      }
      else if (status === 403 && data.message === "Incorrect password. Try again"){
        toast.error('Invalid password. Try again', { id: "signin" })
      }
      else {
        toast.error(data.message || "Something went wrong.", { id: "signin" })
      }
     }else{
       //for the network error - like fallback.
      toast.error("Server not reachable or unexpected error!", { id: "signin" });
     }
    }finally{
      setLoader(false)
      clearTimeout(stage1);
      clearTimeout(stage2);
      clearTimeout(stage3);
      clearTimeout(stage4);
      clearTimeout(stage_5_withRetry);
        }
  }





  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* fixed left side half landing page like things. */}
      <LandingpageSide />   

      
      <div className="  w-full md:w-1/2  md:border-t-0 md:border-l flex justify-center items-center py-8">
        <div className="  rounded-lg bg-white border max-w-md w-full text-center p-6 mx-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your information to sign in to your account"} />

          <InputBox
           onChange={(e:any)=>{setEmail(e.target.value)}}
           placeholder="adityarajxdev@gmail.com"
          //  type="text"  //--- here even if i not pass type then bydefault it takes text because of input component that we define.
            label={"Email"} />

          <InputBox
           onChange={(e:any)=>{setPassword(e.target.value)}}
           placeholder="123456"
            label={"Password"} 
           type="password"/>

          <div className="pt-4">
            <ButtonComponent
             label={loader ? <ClipLoader size={20} color="#fff" /> : "Sign in"}
             onClick={SigningIn} />
          </div>

          <BottomWarning
            label={"Don't have an account?"}
            linktext={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
}
