import { useEffect, useState } from "react"
import { BACKEND_URL } from "../pages/config"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { ButtonComponent } from "./ButtonComponent"



export const Users = ()=>{

    const [users, setUsers]=useState([])
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

        <div className="max-h-lvh flex-1 overflow-y-auto pr-2">
            {users.map(Each =>(<UserDisplay user={Each} />))}
        </div>
    </>
}




//### this is to show the users with send money button in structure way.

// interface UserDisplayType{
//     firstname:string,
//     lastname:string,
//     email:string,
//     _id:any
// }

function UserDisplay({user}:any){
    const navigate=useNavigate()

    return <div className="flex justify-between my-4 rounded-lg px-1 hover:bg-slate-100 ">
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

        <div className="flex flex-col justify-center h-full">
            <ButtonComponent onClick={() => {
                navigate("/send?id=" + user._id + "&name=" + user.firstname)
            }} label={"Send Money"} />
        </div>

    </div>

}