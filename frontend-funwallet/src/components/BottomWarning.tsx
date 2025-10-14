import { Link } from "react-router-dom"

interface warningprops{
    label:string,
    linktext:string,
    to:any
}

export function BottomWarning({label, linktext, to}:warningprops){
    return <div className="py-2 text-sm flex justify-center">
        <div>
            {label}
        </div>
        <Link className=" pointer cursor-pointer underline pl-1" to={to}>
        {linktext}
        </Link>
    </div>
}