// import { useState } from "react"
// import { useSearchParams } from "react-router-dom";
// import { BACKEND_URL } from "./config";
// import axios from "axios";
// import toast from "react-hot-toast";

// export function SendMoney() {

//     const [ amount, setAmount ]=useState(0)
//     const [ searchParams ] = useSearchParams()
//     const ReceiverId = searchParams.get('id')
//     const name = searchParams.get('name')


//     async function SendMoney() {

//         try {
//             const token = localStorage.getItem('token')

//             const response = await axios.post(`${BACKEND_URL}/api/v1/account/transfer`, {
//                 receiverId:ReceiverId,
//                  amount
//             }, {headers: {authorization: `${token}`}})

//             toast.success('Transaction successfull')

            
//         } catch (error) {
//             if(axios.isAxiosError(error) && error.response){
//                 const { status, data }=error.response

//                 if(status === 404 && data.message ==='Sender not found'){
//                     toast.error('Sender not found')
//                 }
//                 else if( status === 403  &&  data.message ==='Insufficient balance'){
//                     toast.error('Insufficient balance')
//                 }
//                 else if( status === 404  &&  data.message === 'Receiver not found'){
//                     toast.error('Receiver not found')
//                 }
//                 else{
//                     toast.error('Something went wrong! Transaction aborted')
//                 }
//             }else{
//                 //fallback -ui
//                 toast.error('Server side error , Try later.')
//             }
            
//         }
        
//     }
    

//     return <div className="flex justify-center h-screen bg-gray-100">
//       <div className="h-full flex flex-col justify-center">
//         <div
//             className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg"
//         >
//             <div className="flex flex-col space-y-1.5 p-6">
//             <h2 className="text-3xl font-bold text-center">Send Money</h2>
//             </div>
//             <div className="p-6">
//             <div className="flex items-center space-x-4">
//                 <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
//                 <span className="text-2xl text-white">{name[0].toUpperCase()}</span>
//                 </div>
//                 <h3 className="text-2xl font-semibold">{name}</h3>
//             </div>
//             <div className="space-y-4">
//                 <div className="space-y-2">
//                 <label
//                     className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                 >
//                     Amount (in Rs)
//                 </label>
//                 <input
//                     onChange={(e:any) => {
//                         setAmount(e.target.value);
//                     }}
//                     type="number"
//                     className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
//                     placeholder="Enter amount"
//                 />
//                 </div>
//                 <button onClick={SendMoney} className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
//                     Initiate Transfer
//                 </button>
//             </div>
//             </div>
//     </div>
//     </div>
//     </div>  
// }
