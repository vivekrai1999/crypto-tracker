import { createSlice } from "@reduxjs/toolkit";
import charts from "../../assets/charts/chartIndex";

const initialState = [
  {
    id: "btc",
    name: "Bitcoin",
    symbol: "BTC",
    price: 94015.57,
    percent1h: -0.06,
    percent24h: -0.06,
    percent7d: -0.95,
    marketCap: 1_862_000_000_000,
    volume24h: 43_874_950_947,
    circulating: 19_850_000,
    maxSupply: 46_780_000,
    chart7d: charts.btc,
  },
  {
    id: "eth",
    name: "Ethereum",
    symbol: "ETH",
    price: 1797.2,
    percent1h: +2.33,
    percent24h: +2.33,
    percent7d: +2.5,
    marketCap: 216_900_000_000,
    volume24h: 23_547_469_307,
    circulating: 120_710_000,
    maxSupply: null,
    chart7d: charts.eth,
  },
  {
    id: "sol",
    name: "Solana",
    symbol: "SOL",
    price: 151.0,
    percent1h: 1.48,
    percent24h: 1.48,
    percent7d: 9.7,
    marketCap: 76_700_000_000,
    volume24h: 4_700_000_000,
    circulating: 517_300_000,
    maxSupply: null,
    chart7d: charts.sol,
  },
  {
    id: "ada",
    name: "Cardano",
    symbol: "ADA",
    price: 0.7,
    percent1h: 0.0,
    percent24h: +2.0,
    percent7d: +5.0,
    marketCap: 40_873_000_000,
    volume24h: 5_131_481_491,
    circulating: 58_390_000_000,
    maxSupply: 100_000_000_000,
    chart7d: charts.ada,
  },
  {
    id: "bnb",
    name: "BNB",
    symbol: "BNB",
    price: 606.65,
    percent1h: -0.09,
    percent24h: -1.2,
    percent7d: -3.73,
    marketCap: 85_471_956_947,
    volume24h: 1_874_281_784,
    circulating: 140_890_000,
    maxSupply: 200_000_000,
    chart7d: charts.bnb,
  },
];

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    updateAsset(state, action) {
      const { id, changes } = action.payload;
      const asset = state.find((a) => a.id === id);
      if (asset) Object.assign(asset, changes);
    },
  },
});

export const { updateAsset } = cryptoSlice.actions;

export const startSimulation = () => (dispatch) => {
  const assets = ["btc", "eth", "bnb", "ada"];
  const streams = assets.map((id) => `${id}usdt@ticker`).join("/");
  const ws = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${streams}`);

  ws.onmessage = (event) => {
    const parsed = JSON.parse(event.data);
    const { stream, data: tickerData } = parsed;

    const symbol = stream.split("@")[0].replace("usdt", "");
    const id = symbol.toLowerCase();

    dispatch(
      updateAsset({
        id,
        changes: {
          price: parseFloat(tickerData.c),
          percent24h: parseFloat(tickerData.P),
          volume24h: parseFloat(tickerData.q),
        },
      })
    );
  };

  ws.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  return () => ws.close();
};

export default cryptoSlice.reducer;
