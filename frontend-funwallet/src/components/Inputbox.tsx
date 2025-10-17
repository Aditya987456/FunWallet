import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";


interface Inputfield{
    label:any,
    placeholder:string,
    onChange:any,
    type?: string;
}


export function InputBox({label, placeholder, onChange, type = "text" }:Inputfield){



      

      const [showPassword, setShowPassword] = useState(false);   

      
    return (
    <div>
      <div className="text-sm font-medium text-left py-2">{label}</div>

      <div className="relative">
        <input
          onChange={onChange}
          placeholder={placeholder}
          type={type === "password" ? (showPassword ? "text" : "password") : type}  //dynamic changing the input type.
          className="w-full px-2 py-1 border rounded border-slate-200 focus:outline-none focus:ring focus:ring-blue-200"
        />

      {type === "password" && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}

      


      </div>
    </div>
  );
}