
import { useEffect } from "react"
import { useWalletContext } from "../hook/WalletCustomHook"



export const TransactionHistory = ()=>{

const { transactions, fetchBalance, fetchTransactionHistory, historyError }=useWalletContext()


//--run on page load.
// useEffect( ()=>{
//     fetchTransactionHistory()
// }, [])



/*//

####### NOTE - the thing is on sender side we call fetchbalance or transactionhistory so UI automatically 
gets updated but on receiver side no one is there to say that refresh saaaaaaar for this mainly two 
logic one is Websocket and another is pooling means calling api every let say 30sec to refresh the 
receiver side

#:silent:true means loader on every 30sec will not shown on fetching balance if loader logic is there in code
for fetching balance and transaction history.     */


// Initial fetch on page load
  useEffect(() => {
    fetchTransactionHistory()
    fetchBalance()
  }, [])

  // Background silent refresh every 30s
  useEffect(() => {
    const interval = setInterval(() => {
      fetchTransactionHistory({ silent: true })
      fetchBalance({ silent: true })
    }, 15000)

    return () => clearInterval(interval)
  }, [])





  const formatEntry = (tx:any) => {
    const prefix = tx.PaymentType === "send" ? "-" : "+"
    
    return `${prefix}₹${tx.amount} ${tx.PaymentType}`
  }

    return(
        
     <div className="rounded-xl p-4 bg-[#fefeff]">
      <h2 className="text-xl font-semibold mb-3">Transaction History</h2>

      {historyError ?
    //   ya to error hoga ya nahi hoga.
       (
        <p className="text-red-500">{historyError}</p>
      )

      :
//ya to transaction hoga ya nahi hoga-- new account.
       transactions.length === 0 ?
        (
        <p className="text-gray-500">No transactions found.</p>
      ) 
      : 
      (
        <div  className={`space-y-3 ${transactions.length > 5 ? "overflow-y-auto" : ""}
         max-h-[calc(100vh-250px)] md:max-h-[calc(100vh-220px)] lg:max-h-[calc(100vh-200px)] pr-1`}>
          {transactions.map(tx => (
            <div key={tx._id} className="border p-3 rounded-md">
              <p className="font-medium">{formatEntry(tx)}</p>
              <p className="text-sm text-gray-500">{new Date(tx.timestamp).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>

        
    )

}