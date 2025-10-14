
# FunWallet 🎉💸  
*A wallet for play, not pay.*  

## description- 
FunWallet is a mini wallet app built for learning and fun. It lets users:  
- Create an account & sign in  
- Add, send, and receive money  
- View transaction history in real-time  

##  Tech Stack  
- **Frontend:** React + TypeScript + Vite + TailwindCSS  
- **Backend:** Node.js + Express + MongoDB + Mongoose  
- **Auth:** JWT  
- **Deployment:**  
  - Frontend → Vercel  
  - Backend → Render  

## ⚡ Features  
- User signup & login  
- Secure JWT authentication  
- Send / receive money between users  
- Transaction history with clear UI  
- Responsive design  

## 🔧 Setup  

### Backend  
```bash
cd backend
npm install
npm start
```

### frontend
```bash
cd frontend-funwallet
npm install
npm run dev

```



<br>
<br>
<br>






<br>

---

---

---

# Important concepts - 
> learned during creating this project - research + GPT.

<br>

### Race condition -
> A race condition happens when two or more operations run at the same time, and they depend on the same data — but the final result changes based on which one finishes first.

In code, this can cause unexpected bugs when:

- Two users try to update the same data at the same time.

- Both read the old value before either one writes the new value.

- You end up with wrong or inconsistent data.

<br>
<br>


> for eg -  Transactions in FunWallet.

- let Balance: ₹1000

- Two transfers of ₹600 happen at the same time.

- Both check: “Is balance ≥ ₹600?” → Yes.

- Both deduct ₹600 → Final balance = ₹−200 (which is wrong).

- Should’ve allowed only one transfer.

<br>
<br>


## 🔒 How MongoDB Prevents This: Document-Level Locking
> MongoDB solves this using document-level locking during transactions.

- What it means:
When a transaction starts and reads a document (like your account), MongoDB locks that document.

- Other transactions trying to read/write the same document must wait until the first one finishes.

- This ensures that only one transaction can change a document at a time.

<br>

----

> Summary - A race condition is when code runs too fast and overlaps — MongoDB avoids this by locking each document during a transaction so only one change happens at a time.

<br>
<br>
<br>


----

## very important -> react custome hook doubt solved...

> if we have custom hook - 
 ```export function useWallet() {
  const [balance, setBalance] = useState(0)
  ...
  const sendMoney = async (...) => { ... }
  const addMoney = async (...) => { ... }

  return { balance, sendMoney, addMoney, ... }
}
```
> Then if we do this in two different components:

```
// In BalanceShow component
const wallet = useWallet()

// In SendMoneyModal component
const { sendMoney } = useWallet()

```

### What actually happens

> Each time you call a hook like useWallet() React creates a completely new isolated instance of that hook’s state.

### i.e 
> Both have their own states and methods

> But they don’t share the same balance state

> So when you call sendMoney() inside SendMoneyModal, it updates its own copy of balance — not the one shown in BalanceShow


<br>

----

>### why .session(session) during transaction in each query??

* Without .session(session):

* MongoDB treats those operations as outside the transaction

* If one fails, others won’t rollback

* You lose atomicity and risk partial updates, which is dangerous for money transfers


---

<br>
<br>
<br>


## Silent Mode, Auto Updates & Why We Need Them
> ### Problem - 
* When user sends or add balance the it automatically updated in balance and transaction history because we calling fetchBalance() + fetchTransactionHistory() after api success.

* But on the receiver side there is no fuction call here it need to refresh whole to see the updated value in the transaction history or balance.

<br>

> solution -
> <br>
> 1. WebSocket: real-time push (ideal, complex).
> 2. Polling (using in this): periodic fetch like every 30s

<br>
<br>
<br>


> ### why silent mode?

In the fetchBalance & fetchTransactionHistory function-

1. If silent:true - 
* Skip clearing errors.
* Skip showing loaders.
* Just update state quietly.

2. if silent:false (by default fixed) -
* When user triggers an action (send/add money).
* Show loaders and errors normally.

<br>

### simple summary - 
* silent = false (default) → show loader + toast errors (good for user actions or page load).

* silent = true → skip loader & skip toasts (good for background auto-refresh).

