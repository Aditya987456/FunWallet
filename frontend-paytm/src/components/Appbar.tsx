//import { ButtonComponent } from "./ButtonComponent"


import { WalletIcon } from "./walletIcon"
export const Appbar=()=>{
    return <header className="mt-2 rounded-t-md w-full h-16 flex justify-between items-center bg-[#fefefe] shadow px-2 md:px-6 py-4">
        <div className="flex items-center sm:gap-1 md:gap-2 text-2xl md:text-3xl font-bold text-blue-900">
          <span><WalletIcon /></span> FunWallet
        </div>
        <div className="flex items-center">
          {/* <span className="hidden sm:block text-gray-700">Hi, Aditya</span> */}
          <button className=" text-sm md:text-md bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition">
            Logout
          </button>
          {/* <ButtonComponent label={'Logout'} onClick={()=>{}}/> */}
        </div>
      </header>
}




// export const Appbar = () => {
//     return <div className="shadow w-full h-14 flex justify-between">
//         <div className="flex flex-col justify-center h-full ml-4">
//             PayTM App
//         </div>
//         <div className="flex">
//             <div className="flex flex-col justify-center h-full mr-4">
//                 Hello
//             </div>
//             <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
//                 <div className="flex flex-col justify-center h-full text-xl">
//                     U
//                 </div>
//             </div>
//         </div>
//     </div>
// }