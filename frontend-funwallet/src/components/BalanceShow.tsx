
import { useState } from "react"
import { ButtonComponent } from "./ButtonComponent"
import { AddMoneyModal } from "./AddMoneyOwn"
import { useWalletContext } from "../hook/WalletCustomHook"

export const BalanceShow = () => {
  //these are again we are taking from useWalletcontext hook ...

  const { balance, loading, visible, checkBalLabel, toggleBalance, addMoney } = useWalletContext()
  const [showAddMoneyModal, setShowAddMoneyModal] = useState(false)   //to show open the modal or not
 
  const handleAddMoney = async (amount: number) => {
    await addMoney(amount)  // update the new balance after adding.
    setShowAddMoneyModal(false)
  }

  return (
    <div className="bg-[#e6f1fd] rounded-xl border p-6 text-center shadow-md">
      <h2 className="text-xl font-semibold text-gray-700">Your Balance</h2>

      <p className="text-4xl font-bold text-[#081933] mt-2 mb-6">
        {visible ? balance : "XXXX"}
      </p>

      <div className="flex justify-evenly items-center md:gap-8 gap-4">
        <ButtonComponent
          label={loading ? "Loading..." : checkBalLabel}
          onClick={toggleBalance}
        />
        <ButtonComponent
          label="Add Money"
          onClick={() => setShowAddMoneyModal(true)}
        />
      </div>

      {showAddMoneyModal && (
        <AddMoneyModal
          onClose={() => setShowAddMoneyModal(false)}
          onConfirm={handleAddMoney}  //onconfirm tab call hoga in AddMoneyModal when we click to add balance
        />
      )}
    </div>
  )
}

