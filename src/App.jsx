import React from "react";
import CryptoTable from "./components/CryptoTable";

function App() {
  return (
    <div className="py-8">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-emerald-900">Realtime Crypto Tracker</h1>
      <CryptoTable />
    </div>
  );
}

export default App;
