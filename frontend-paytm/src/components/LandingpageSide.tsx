// import { WalletIcon } from "./walletIcon";

// export const LandingpageSide = () => {
//   return (
//     <div className="w-1/2 bg-white flex flex-col justify-center items-center px-10">
//       <h1 className="text-5xl font-bold text-blue-900">
//         <span className="flex items-center justify-center"><WalletIcon/> FunWallet</span>
//         </h1>
//       <p className="text-2xl text-gray-600 mt-2 text-center">
//         A wallet for play, not pay.
//       </p>
//       <p className="text-md text-gray-500 mt-8 text-center max-w-md">
//         Practice balance checks, transactions, transactions history — all without real money.
//       </p>
//       {/* <img src="/wallet-illustration.svg" alt="Wallet illustration" className="mt-8 w-3/4" /> */}
    
//     </div>
//   );
// };



// LandingpageSide.jsx
import { WalletIcon } from "./walletIcon";

export const LandingpageSide = () => {
  return (
    <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center px-6 md:px-10 py-10 md:py-0">
      <h1 className="text-4xl md:text-5xl font-bold text-blue-900 text-center">
        <span className="flex items-center justify-center gap-1">
          <WalletIcon /> FunWallet
        </span>
      </h1>

      <p className="text-lg md:text-2xl text-gray-600 mt-2 text-center">
        A wallet for play, not pay.
      </p>

      <p className="text-sm md:text-md text-gray-500 mt-6 md:mt-8 text-center max-w-sm md:max-w-md">
        Practice balance checks, transactions, and history — all without real money.
      </p>
    </div>
  );
};

