import { Heading } from "./heading";
import { SubHeading } from "./subheading";
import { InputBox } from "./Inputbox";
import { ButtonComponent } from "./ButtonComponent";
import { BottomWarning } from "./BottomWarning";
import { LandingpageSide } from "./LandingpageSide";

// export function Signup() {
//   return (
//     <div className="h-screen flex">
//       {/* Left side: Branding / Landing */}
//       <div className="w-1/2 bg-white flex flex-col justify-center items-center px-10">
//         <h1 className="text-4xl font-bold text-blue-900">✨ FunWallet</h1>
//         <p className="text-xl text-gray-600 mt-4 text-center">
//           A wallet for play, not pay.
//         </p>
//         <p className="text-md text-gray-500 mt-2 text-center max-w-md">
//           FunWallet is a mock digital wallet designed for practicing user signup, balance checks, transactions, and payment flows — all without real money.
//         </p>
//         {/* Optional illustration */}
//         <img src="/wallet-illustration.svg" alt="Wallet illustration" className="mt-8 w-3/4" />
//       </div>


//       {/* Right side: Signup Form */}
//       <div className="w-1/2  border-l-2 flex justify-center items-center">
//         <div className="rounded-lg border bg-white text-center p-6">
//           <Heading label={"Sign up"} />
//           <SubHeading label={"Enter your information to create an account"} />
//           <InputBox placeholder="John" label={"First Name"} />
//           <InputBox placeholder="Doe" label={"Last Name"} />
//           <InputBox placeholder="harkirat@gmail.com" label={"Email"} />
//           <InputBox placeholder="123456" label={"Password"} />
//           <div className="pt-4">
//             <ButtonComponent label={"Sign up"} onClick={() => {}} />
//           </div>
//           <BottomWarning
//             label={"Already have an account?"}
//             linktext={"Sign in"}
//             to={"/signin"}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }


export function Signup() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
        {/* left part fixed half page. */}
      <LandingpageSide />

      <div className="w-full md:w-1/2 border-t md:border-t-0 md:border-l flex justify-center items-center py-8">
        <div className="rounded-lg bg-white border max-w-md w-full text-center p-6 mx-4">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your information to create an account"} />
          <InputBox placeholder="Aditya" label={"First Name"} />
          <InputBox placeholder="raj" label={"Last Name"} />
          <InputBox placeholder="adityarajxdev@gmail.com" label={"Email"} />
          <InputBox placeholder="123456" label={"Password"} />
          <div className="pt-4">
            <ButtonComponent label={"Sign up"} onClick={() => {}} />
          </div>
          <BottomWarning label={"Already have an account?"} linktext={"Sign in"} to={"/signin"} />
        </div>
      </div>
    </div>
  );
}
