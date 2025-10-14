
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


export function Signin() {

  const navigate = useNavigate()

  const [email, setEmail]=useState('')
  const [password, setPassword]=useState('')


  async function  SigningIn() {
    try {

      if(!email.trim() || !password.trim() ){
        toast.error('All fields required !')
        return;
      }

      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
        email,
        password
      })

      const token = response.data.token
      const firstname = response.data.firstname

      localStorage.setItem('token', token)
      localStorage.setItem('firstname', firstname)


      toast.success('successfully signed up')
      navigate('/dashboard')

    } catch (error) {

 /*#### *****************--------  MY  OWN TAKE  -----------********************** 
      NOTE- best way to show the errors -- since i wrote the backend very carefully like 
      with proper status code and message , So use that in the frontend .
      */


     if(axios.isAxiosError(error) && error.response){
      const { status, data } = error.response;

      if(status === 403 && data.message ==="Invalid emailId."){
        toast.error('Invalid emailId')
      }
      else if (status === 403 && data.message === "Incorrect password. Try again"){
        toast.error('Invalid password. Try again')
      }
      else {
        toast.error(data.message || "Something went wrong.")
      }
     }else{
       //for the network error - like fallback.
      toast.error("Server not reachable or unexpected error!");
     }
    }
  }





  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* fixed left side half landing page like things. */}
      <LandingpageSide />   

      
      <div className="    w-full md:w-1/2 border-t md:border-t-0 md:border-l flex justify-center items-center py-8">
        <div className="  rounded-lg bg-white border max-w-md w-full text-center p-6 mx-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your information to sign in to your account"} />

          <InputBox
           onChange={(e:any)=>{setEmail(e.target.value)}}
           placeholder="adityarajxdev@gmail.com" label={"Email"} />

          <InputBox
           onChange={(e:any)=>{setPassword(e.target.value)}}
           placeholder="123456" label={"Password"} />

          <div className="pt-4">
            <ButtonComponent label={"Sign in"} onClick={SigningIn} />
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
