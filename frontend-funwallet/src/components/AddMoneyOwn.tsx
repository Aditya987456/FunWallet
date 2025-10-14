import { useState } from "react";
import { ButtonComponent } from "./ButtonComponent";

export const AddMoneyModal = ({ onClose, onConfirm }:any) => {
  const [amount, setAmount] = useState("");

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-80 md:w-96">
        <h2 className="text-xl font-semibold text-center mb-4">Add Money</h2>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount (in ₹)"
          className="w-full border rounded px-3 py-2 mb-4"
        />

        <div className="flex justify-between gap-4">
          <ButtonComponent
            label="Cancel"
            onClick={onClose}
          />
          <ButtonComponent
            label="Add"
            onClick={() => onConfirm(amount)}    
            //here onconfirm call when initiate the add money to own balance -- for this logic is in the BalanceShow.tsx
            
          />
        </div>
      </div>
    </div>
  );
};
