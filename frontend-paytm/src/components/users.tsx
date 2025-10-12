import { useEffect, useState } from "react"
import { BACKEND_URL } from "../pages/config"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { ButtonComponent } from "./ButtonComponent"
import { SendMoneyModal } from "./SendMoneyModal"


interface User {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
}


export const Users = ()=>{
    //ye dono props ko send karna hai in sendMoneyModal.
    const [showSendMoneyModal, setShowSendMoneyModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState({ id: "", name: "" });

    const [users, setUsers]=useState<User[]>([])
    const [filter, setFilter]=useState('')


    useEffect( ()=>{
        const token=localStorage.getItem('token');

        axios.get(`${BACKEND_URL}/api/v1/user/bulk?filter=${filter}`, {
            headers: {
        authorization: `${token}`},  // sending jwt token from localstorage
      })
        .then(res=>{
            setUsers(res.data.user)   //user hii return kar raha hai backend.
        })
    },[filter])

    return <>
        <div className="font-bold flex justify-start items-center text-2xl">
            Search users
        </div>

        <div className="my-2">
            <input onChange={(e) => {
                setFilter(e.target.value)
            }} type="text" placeholder="Search users..." className="w-full px-2 py-2 border rounded border-slate-200"></input>
        </div>

        <div className="max-h-lvh flex-1 overflow-y-auto pr-1 md:pr-2">
            {users.map(Each =>(<UserDisplay 
            key={Each._id}
            user={Each}
//######NOTE-- like on sending the props - setselecteduser-means send money to this user + and
//  each user can start show modal.  here oneSend - is a function jo sabhi user ke pass hai aur trugger hoga 
//  jab individual user pe send money button click karenge aur sath me showmodal bhi open hoga.
            onSend={() => {
            setSelectedUser({ id: Each._id, name: Each.firstname });
            setShowSendMoneyModal(true);
            }}
            
            />))}
        </div>

            <SendMoneyModal
            show={showSendMoneyModal}
            onClose={() => setShowSendMoneyModal(false)}
            receiver={selectedUser} />
    </>
}






//### this is to show the users with send money button in structure way.

// interface UserDisplayType{
//     firstname:string,
//     lastname:string,
//     email:string,
//     _id:any
// }

function UserDisplay({user, onSend}:any){
   // const navigate=useNavigate()
    

    return <div className="flex justify-between my-4 rounded-lg md:px-1 hover:bg-slate-100 ">
        <div className="flex">

            {/* circle logo- */}
            <div className="rounded-full h-9 w-9 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstname[0]}
                </div>
            </div>

            {/* name first+last. */}
            <div className="flex flex-col justify-center h-full">
                <div>
                    {user.firstname} {user.lastname}
                </div>
            </div>

        </div>

{/* ######## its like sending money tp --->  /send?id=123&name=Aditya  to receiverid=123 and name=aditya */}
        <div className="flex flex-col justify-center h-full">
           
            {/* <ButtonComponent onClick={() => {
                navigate("/send?id=" + user._id + "&name=" + user.firstname)
            }} label={"Send Money"} /> */}
            
        {/* -------- not navigate, this is good for the modal type things. */}
{/*####### NOTE_ onClick={onSend} means when the button is clicked, call the 
        onSend function passed from the parent (Users component). */}
             <ButtonComponent onClick={onSend} label={"Send Money"} />

        </div>

    </div>

}