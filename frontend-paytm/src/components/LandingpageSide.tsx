
export const LandingpageSide = () => {
  return (
    <div className="w-1/2 bg-white flex flex-col justify-center items-center px-10">
      <h1 className="text-4xl font-bold text-blue-900">FunWallet</h1>
      <p className="text-2xl text-gray-600 mt-4 text-center">
        A wallet for play, not pay.
      </p>
      <p className="text-md text-gray-500 mt-2 text-center max-w-md">
        Practice signup, balance checks, and transactions — all without real money.
      </p>
      <img src="/wallet-illustration.svg" alt="Wallet illustration" className="mt-8 w-3/4" />
    </div>
  );
};
