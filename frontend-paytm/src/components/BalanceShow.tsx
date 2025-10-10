import { ButtonComponent } from "./ButtonComponent"

export const BalanceShow=()=>{

    return  <div className="bg-[#e6f1fd] rounded-2xl shadow p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-700">Your Balance</h2>
            <p className="text-4xl font-bold text-[#081933] mt-2 mb-2">₹100</p>
            <ButtonComponent label={'add money'} onClick={()=>{}}></ButtonComponent>
          </div>

    
}