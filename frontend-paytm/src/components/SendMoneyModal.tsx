

import { useState } from "react"
import toast from "react-hot-toast"
import { useWalletContext } from "../hook/WalletCustomHook"; // ✅ use context directly

interface SendMoneyModalProps {
  show: boolean
  onClose: () => void
  receiver: { id: string; name: string }
}

export const SendMoneyModal = ({ show, onClose, receiver }: SendMoneyModalProps) => {
 //ye isi component ke liye define hai bas.
  const [amount, setAmount] = useState("")  //currently string.
  const [loading, setLoading] = useState(false)

  const { sendMoney } = useWalletContext() //here we only need sendmoney function

  if (!show) return null     //like in the users usestate if showsendmoneymodal is true or false

  //it handle the sendmoney like it redirect to the sendmoney function which we accessing here
  //from useWalletContext as sendMoney.

  const handleSendMoney = async () => {
  const numericAmount = Number(amount)   //here converting amount in NUmber from string

  if (!numericAmount || isNaN(numericAmount) || numericAmount <= 0) {
    toast.error("Please enter a valid amount")
    return
  }

  setLoading(true)
  await sendMoney(receiver.id, numericAmount)
  setLoading(false)
  setAmount("") // reset input clean
  onClose()
}

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-11/12 p-6">
        <h2 className="text-3xl font-bold text-center mb-4">Send Money</h2>

        {/*-- Receiver information logo and name --- */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
            <span className="text-2xl text-white">{receiver.name[0].toUpperCase()}</span>
          </div>
          <h3 className="text-2xl font-semibold">{receiver.name}</h3>
        </div>

        {/* Amount input */}
        <div className="mb-4">
          <label htmlFor="amount" className="text-sm font-medium">
            Amount (in ₹)
          </label>
         <input
  type="number"
  value={amount}
  onChange={(e) => setAmount(e.target.value)}  // keep as string
  placeholder="Enter amount"
  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
/>

        </div>

        {/* Buttons--> for add money and cancel  */}
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSendMoney}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  )
}

