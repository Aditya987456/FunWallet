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