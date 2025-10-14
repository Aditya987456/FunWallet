
import { createContext, useContext, useState } from "react"
import type { ReactNode } from "react"    //GPT
import axios from "axios"
import toast from "react-hot-toast"
import { BACKEND_URL } from "../pages/config"



// ----------* Context Type using--> interface because mainly used for obj or func type------------------
interface WalletContextType {
  balance: string
  loading: boolean
  visible: boolean
  checkBalLabel: string
  // fetchBalance: () => Promise<void>
  fetchBalance: (options?: { silent?: boolean }) => Promise<void>
  toggleBalance: () => Promise<void>
  showBalance: () => void
  addMoney: (amount: number) => Promise<void>
  sendMoney: (receiverId: string, amount: number) => Promise<void>
  transactions: any[]
  historyError: string | null
  // fetchTransactionHistory: () => Promise<void>
  fetchTransactionHistory: (options?: { silent?: boolean}) => Promise<void>
}




// ------------------ Create Context ------------------
export const WalletContext = createContext<WalletContextType | undefined>(undefined)

// ------------------ Provider Component ------------------
export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [balance, setBalance] = useState<string>("XXXX")
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [checkBalLabel, setCheckBalLabel] = useState("Check balance")
  const [transactions, setTransactions] = useState<any[]>([])
 const [historyError, setHistoryError] = useState<string | null>(null)



  // -------------## Fetch Balance from backend ------------------
  const fetchBalance = async ( {silent=false}={}) => {
   
    if (!silent) setLoading(true)  //loading visibleon when manually checking or calling balance
   
    try {
      const token = localStorage.getItem("token")
      const res = await axios.get(`${BACKEND_URL}/api/v1/account/balance`, {
        headers: { authorization: `${token}` },
      })
      const formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(res.data.balance)
      setBalance(formatted)
    } catch (error) {
      if (!silent) {
      if (axios.isAxiosError(error) && error.response) {
        const { status, data } = error.response
        if (status === 403 && data === "Error in getting the balance. Try after sometime") {
          toast.error("Error in getting the balance")
        }
      } else {
        toast.error("Server not reachable or unexpected error!")
      }
    }
    }  finally {
        if (!silent) setLoading(false)
      }
  }




  // --------------## visible or invisible balance ------------------
  const toggleBalance = async () => {
    if (visible) {
      setVisible(false)
      setCheckBalLabel("Check balance")
      setBalance("XXXX")
    } else {
      await fetchBalance()
      setVisible(true)
      setCheckBalLabel("Hide balance")
    }
  }





  const showBalance = () => {
    setVisible(true)
    setCheckBalLabel("Hide balance")
  }






  // --------------## Add Money to own wallet by typing just amount ------------------
  const addMoney = async (amount: number) => {
    if (!amount) {
      toast.error("Enter amount.")
      return
    }
    try {
      const token = localStorage.getItem("token")
      await axios.post(`${BACKEND_URL}/api/v1/account/add`, { amount }, {
        headers: { authorization: `${token}` },
      })
      toast.success("Balance updated successfully.")
      await fetchBalance()
      await fetchTransactionHistory()
      showBalance()     //bal update hone ke baad dikha bhi dena hai

    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { status, data } = error.response
        if (status === 400 && data.error === "Amount exceeds limit of 3000") {
          toast.error("You can only add amount up to 3k at a time.")
        } else if (status === 404 && data === "Account not found") {
          toast.error("Account not found")
        } else if (status === 403 && data === "Error in updating balance") {
          toast.error("Error in updating balance")
        }
      } else {
        toast.error("Server error")
      }
    }
  }




  // ---------------## Sending money to other from the list. ------------------
  const sendMoney = async (receiverId: string, amount: number) => {
    if (amount <= 0) {
      toast.error("Enter a valid amount")
      return
    }
    try {
      const token = localStorage.getItem("token")
      const res = await axios.post(`${BACKEND_URL}/api/v1/account/transfer`, { receiverId, amount }, {
        headers: { authorization: `${token}` },
      })
      await fetchBalance()   //after updating fetch updated balance
      await fetchTransactionHistory()
      toast.success(res.data.message)
      showBalance()
      

    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { status, data } = error.response
        if (status === 403 && data.message === "Insufficient balance") {
          toast.error("Insufficient balance...")
        } else if (status === 404 && data.message === "Receiver not found") {
          toast.error("Receiver not found")
        } else {
          toast.error("Transaction failed")
        }
      } else {
        toast.error("Server error")
      }
    }
  }





  //--------------## for fetching the transaction history of each user -----------
const fetchTransactionHistory = async ({silent = false } = { }) => {

  try {

    if (!silent) {
      setHistoryError(null) // clear error only when user manually calling this.
    }

    const token = localStorage.getItem("token")
    const res = await axios.get(`${BACKEND_URL}/api/v1/account/gethistory`, {
      headers: { authorization: `${token}` },
    })

    const transactionFetched = res.data.transactions
    if (Array.isArray(transactionFetched)) {

      setTransactions(transactionFetched)       //set all transactions after fetching.
      if (!silent) {
        setHistoryError(transactionFetched.length === 0 ? "No transaction history available." : null)
      }
      
     // return res.data.transactions //for update received paymentrealtime.-- testing something.

    } else {      //transaction sahi formate-[] me return nahi ho raha hai.
      throw new Error("Invalid response format")
    }

  } catch (error) {
    if (!silent) {   //on silet:false -- then any error came.
      setTransactions([])
      setHistoryError("Failed to fetch transaction history. Try again.")
    }
  }
}







  return (
    <WalletContext.Provider
      value={{

        fetchTransactionHistory,
        transactions,
        historyError,

        balance,
        loading,
        visible,
        checkBalLabel,
        fetchBalance,
        toggleBalance,
        showBalance,
        addMoney,
        sendMoney,
      }}
    >

      {children}
    </WalletContext.Provider>
  )
}

// ---#####$$  Custom Hook - easy to consume context in components anywhere ------------------
export const useWalletContext = () => {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error("useWalletContext must be used inside WalletProvider")
  }
  return context
}


