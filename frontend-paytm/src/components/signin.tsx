// import { Heading } from "./heading";
// import { SubHeading } from "./subheading";
// import { InputBox } from "./Inputbox";
// import { ButtonComponent } from "./ButtonComponent";
// import { BottomWarning } from "./BottomWarning";
// import { LandingpageSide } from "./LandingpageSide";



// export function Signin(){

//       return (
//         <div className="h-screen flex">
//           <LandingpageSide />
//           <div className="w-1/2 border-l flex justify-center items-center">
//             <div className="rounded-lg bg-white border  max-w-md text-center p-6">
//               <Heading label={"Sign in"} />
//               <SubHeading label={"Enter your information to signin into your account"} />
//               <InputBox placeholder="adityarajxdev@gmail.com" label={"Email"} />
//               <InputBox placeholder="123456" label={"Password"} />
//               <div className="pt-4">
//                 <ButtonComponent label={"Sign in"} onClick={() => {}} />
//               </div>
//               <BottomWarning label={"Don't have an account?"} linktext={"Sign up"} to={"/signup"} />
//             </div>
//           </div>
//         </div>
//       );
// }



// Signin.jsx
import { Heading } from "./heading";
import { SubHeading } from "./subheading";
import { InputBox } from "./Inputbox";
import { ButtonComponent } from "./ButtonComponent";
import { BottomWarning } from "./BottomWarning";
import { LandingpageSide } from "./LandingpageSide";

export function Signin() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* fixed left side half landing page like things. */}
      <LandingpageSide />   

      
      <div className="    w-full md:w-1/2 border-t md:border-t-0 md:border-l flex justify-center items-center py-8">
        <div className="  rounded-lg bg-white border max-w-md w-full text-center p-6 mx-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your information to sign in to your account"} />

          <InputBox placeholder="adityarajxdev@gmail.com" label={"Email"} />
          <InputBox placeholder="123456" label={"Password"} />

          <div className="pt-4">
            <ButtonComponent label={"Sign in"} onClick={() => {}} />
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
