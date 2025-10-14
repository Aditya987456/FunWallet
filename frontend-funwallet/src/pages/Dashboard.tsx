

import { Linkedin } from "lucide-react"
import { Appbar } from "../components/Appbar"
import { BalanceShow } from "../components/BalanceShow"
 import { TransactionHistory } from "../components/TransactionHistory"
import { Users } from "../components/users"

export const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#f2f6fc] flex flex-col items-center">
      <div className="w-full max-w-6xl  flex flex-col min-h-screen">
        
        
        <Appbar />


        <main className="bg-[#f6f9fc]  rounded-b-xl flex flex-col md:flex-row gap-8 p-6 md:p-10 flex-grow">
                  
                  <div className="md:w-1/2 w-full flex flex-col gap-6">
                    <div className="order-1 md:order-none"> <BalanceShow /> </div> 
                    <div className="bg-[#fefeff] rounded-xl md:shadow-none shadow order-3 md:order-none">
                     <TransactionHistory/>
                      </div>
                  </div>

                
                  <div className="md:w-1/2 w-full">
                    <div className="bg-[#fefeff] order-2 md:order-none p-4 md:shadow-none shadow rounded-xl"> 
                      <Users/> </div>
                  </div>
                </main>












<footer className="text-center py-4 text-gray-600 text-sm flex items-center justify-center gap-2">
  <span>
    Made with ❤️ by <span className="font-semibold">Aditya raj</span>
  </span>
  <span>·</span>
  <a 
    href="https://www.linkedin.com/in/aditya-raj-006978250/" 
    target="_blank" 
    rel="noopener noreferrer"
    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
  >
    <span>Say hello</span>
    <span className="animate-wave">👋</span>
    <Linkedin className="w-4 h-4" />
  </a>
</footer>

        


      </div>
    </div>
  )
}






