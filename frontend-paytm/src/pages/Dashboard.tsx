// import { Appbar } from "../components/Appbar"
// import { BalanceShow } from "../components/BalanceShow"

// export const Dashboard=()=>{

//     return (
     
//     <div className="min-h-screen bg-gray-50 flex flex-col">
        
//         <Appbar/>

//         <main className="flex flex-col md:flex-row gap-8 p-6 md:p-10">
            

//             {/* left part */}
//             <div className="md:w-1/2 w-full flex flex-col gap-6">
//                 <BalanceShow/>
//             </div>


//             {/* right part */}
//             <div className="md:w-1/2 w-full">

//             </div>


//         </main>
//     </div>
    
//     )
// }


import { Appbar } from "../components/Appbar"
import { BalanceShow } from "../components/BalanceShow"
import { Users } from "../components/users"

export const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#f2f6fc] flex flex-col items-center">
      <div className="w-full max-w-6xl  flex flex-col min-h-screen">
        
        
        <Appbar />


        <main className="bg-[#f6f9fc] rounded-b-xl flex flex-col md:flex-row gap-8 p-6 md:p-10 flex-grow">
                  
                  <div className="md:w-1/2 w-full flex flex-col gap-6">
                    <div className="order-1 md:order-none"> <BalanceShow /> </div> 
                    <div className="bg-[#fefeff] order-3 md:order-none">hello transaction history saaar</div>
                  </div>

                
                  <div className="md:w-1/2 w-full">
                    <div className="bg-[#fefeff] order-2 md:order-none p-4 rounded-xl"> <Users/> </div>
                  </div>
                </main>



        
        


      </div>
    </div>
  )
}






