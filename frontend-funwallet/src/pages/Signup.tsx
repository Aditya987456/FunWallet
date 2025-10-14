import { Heading } from "../components/heading";
import { SubHeading } from "../components/subheading";
import { InputBox } from "../components/Inputbox";
import { ButtonComponent } from "../components/ButtonComponent";
import { BottomWarning } from "../components/BottomWarning";
import { LandingpageSide } from "../components/LandingpageSide";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { BACKEND_URL } from "./config";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";



export function Signup() {
  const navigate = useNavigate()

  const [firstname, setFirstname]=useState('')
  const [lastname, setLastname]=useState('')
  const [email, setEmail]=useState('')
  const [password, setPassword]=useState('')
  const [ loader, setLoader]=useState(false)


  async function  SigningUp() {
    setLoader(true)
    try {

      // if( !firstname.trim() || !lastname.trim() || !email.trim() || !password.trim() ){
      //   toast.error('All fields required !')
      //   return;
      // }

      // const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
      //   firstname,
      //   lastname,
      //   email,
      //   password
      // })


// enhaced using help of GPT
      const normalizedFirstname = firstname.trim();
      const normalizedLastname = lastname.trim();
      const normalizedEmail = email.trim().toLowerCase();  // email lowercased
      const normalizedPassword = password.trim();          // password trimmed

      if (!normalizedFirstname || !normalizedLastname || !normalizedEmail || !normalizedPassword) {
        toast.error('All fields required !');
        return;
      }

      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
        firstname: normalizedFirstname,
        lastname: normalizedLastname,
        email: normalizedEmail,
        password: normalizedPassword,
      });


      toast.success(response.data.message || 'Successfully signed up!');
      navigate('/signin');

    } catch (error) {

  /*#### *****************--------  MY  OWN TAKE  -----------********************** 
      NOTE- best way to show the errors like since i wrote the backend very carefully like 
      with proper status code and message , So use that in the frontend .
      */

       if (axios.isAxiosError(error) && error.response) {
      const { status, data } = error.response;

      if (status === 403 && data.message === "User already exist.") {
        toast.error("User already exists! Try signing in.");
      } 
      else if (status === 411 && data.message === "Incorrect input formate.") {
        toast.error("Invalid input format.");
      } 
      else if (status === 409 && data.error === "Username already exists") {
        toast.error("Username already exists!");
      } 
      else {
        toast.error(data.message || "Something went wrong.");
      }
    } else {
      //for the network error - like fallback.
      toast.error("Server not reachable or unexpected error!");
    }
    }finally{
      setLoader(false)
    }
  }



  return (
    <div className="min-h-screen flex flex-col md:flex-row">
        {/* left part fixed half page. */}
      <LandingpageSide />

      <div className="w-full md:w-1/2 border-t md:border-t-0 md:border-l flex justify-center items-center py-8">
        <div className="rounded-lg bg-white border max-w-md w-full text-center p-6 mx-4">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your information to create an account"} />

          <InputBox
           onChange={
            (e:any)=>{ setFirstname(e.target.value)}}
            placeholder="Aditya" label={"First Name"} />

          <InputBox 
            onChange={
            (e:any)=>{ setLastname(e.target.value)}}
            placeholder="raj" label={"Last Name"} />

          <InputBox 
            onChange={
            (e:any)=>{ setEmail(e.target.value)}}
            placeholder="adityarajxdev@gmail.com" label={"Email"} />

          <InputBox 
            onChange={
            (e:any)=>{ setPassword(e.target.value)}}
            placeholder="123456" label={"Password"} />

          <div className="pt-4">
            <ButtonComponent
             label={loader ? <ClipLoader size={20} color="#fff" /> : "Sign up"}
             onClick={SigningUp} />
          </div>
          <BottomWarning label={"Already have an account?"} linktext={"Sign in"} to={"/signin"} />
        </div>
      </div>
    </div>
  );
}