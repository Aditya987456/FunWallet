import { useState } from "react"
import { ButtonComponent } from "./ButtonComponent"
import { BACKEND_URL } from "../pages/config"
import axios from "axios"
import toast from "react-hot-toast"

export const BalanceShow=()=>{

  const [ balance, setBalance]=useState('XXXX')
  const [ visible, setVisible]=useState(false)
  const [ loading, setLoading]=useState(false)
  const [ checkBalLabel, setCheckBalLabel]=useState('Check balance')
  const [ balanceToAdd, setBalanceToAdd ]=useState('')
  const [AddOwnMoneyModal, setAddOwnMoneyModal] = useState(false);

  //-----------Handle check balance -----
 async function HandleCheckBalance() {
    if(visible){
      setBalance('XXXX')
      setVisible(false)
      setCheckBalLabel('Check balance')
      return
    }
    setLoading(true)
    //## if not visible-means we have to call backend route.
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${BACKEND_URL}/api/v1/account/balance`,
        { headers: {
        authorization:`${token}`}}
      )

      const bal = response.data.balance
        // const msg = response.data.message

      
      //USING GPT****
      const formattedBal = new Intl.NumberFormat('en-IN', { 
        style: 'currency', 
        currency: 'INR' 
      }).format(bal);

      setBalance(formattedBal)
      setVisible(true)
      setCheckBalLabel('Hide balance')
      
    } catch (error) {
      if(axios.isAxiosError(error) && error.response){
        const { status, data }=error.response;

        if(status === 403 && data ==="Error in getting the balance. Try after sometime" ){
          toast.error('Error in getting the balance')
        }
        //fallback UI.
      }else{
        toast.error("Server not reachable or unexpected error!");
      }
    }finally{
      setLoading(false)
    }



  }


  //-------------  add money yourself like in own a/c  -------------
  async function Addmoney() {

    if(!balanceToAdd){
      return toast.error('Enter Amount')
    }

    try {
      const token=localStorage.getItem('token')
      const response = await axios.post(`${BACKEND_URL}/api/v1/account/add`,
       { amount: Number(balanceToAdd) },
       { headers: { authorization: `Bearer ${token}` } }
    )
    const updatedBal = response.data.amount; //new updated balance
    setBalance(updatedBal)
    setBalanceToAdd('')
    toast.success(`Balance updated successfully.`)
      
    } catch (error) {
      if(axios.isAxiosError(error) && error.response){
        const { status, data }=error.response

        if(status === 400  && data === 'Amount exceeds limit of 3000'){
          toast.error('Amount exceeds limit of 3k')
        }
        else if(status === 404 && data === 'Account not found'){
          toast.error('Account not found')
        }else if( status === 403 && data === 'Error in updating balance'){
          toast.error('Error in updating balance')
        }

      }else{
      //fallback ui
      toast.error('server error')
    }
    }

  }







  
    return  <div className="bg-[#e6f1fd] rounded-xl border  p-6 text-center ">
            <h2 className="text-xl font-semibold text-gray-700">Your Balance</h2>

            <p className="text-4xl font-bold text-[#081933] mt-2 md:mb-4 mb-2">{balance}</p>
            
            <div className="flex justify-evenly items-center md:gap-8">

              <ButtonComponent label={loading?`loading...`:`${checkBalLabel}`} onClick={HandleCheckBalance}></ButtonComponent>

              <ButtonComponent label={'Add money'} onClick={Addmoney}></ButtonComponent>
            </div>
          </div>

    
}