# 🚀 Real-Time Crypto Price Tracker

![Live Crypto Table Demo](https://raw.githubusercontent.com/vivekrai1999/crypto-tracker/main/src/assets/demo/demo.gif)

## 🏗 Architecture Overview

### 🔧 Redux Slice (`cryptoSlice.js`)

- Stores all live asset data.
- Includes a `startSimulation` thunk that:
  - Connects to the **Binance WebSocket API** for real-time crypto updates.
  - Parses incoming ticker data for `BTC`, `ETH`, `ADA`, `SOL` and `BNB`.
  - Dispatches `updateAsset` to update Redux state with:
    - Live `price`
    - `24h %` change
    - `24h volume`

---

### 📊 `CryptoTable` Component

- Fully **stateless**: uses `useSelector` to pull data and `useDispatch` to start simulation.
- Renders a table using **React Table** with:
  - Sortable headers
  - Sticky columns
  - Dynamic rows
- Icons and visual cues:
  - Token icons via `react-icons`
  - Arrows indicating positive/negative changes
- Color-coded percentage cells for quick readability.

---

### 💡 Responsive Table Design

- Built using **TailwindCSS** for mobile-first responsiveness.
- First two columns (`#` and `Logo`) are **sticky**:
  - Stay visible during horizontal scroll.
  - Improves UX on mobile screens.

---

### 📈 7D Charts

- Static sparkline charts placed in `/assets`:
  - Examples: `chart-btc.svg`, `chart-eth.svg`, etc.

---

### ✅ Tech Stack

| Feature           | Technology / Approach            |
| ----------------- | -------------------------------- |
| State Management  | Redux Toolkit                    |
| Real-Time Updates | Binance WebSocket API            |
| UI Framework      | React + TailwindCSS              |
| Table Logic       | React Table                      |
| Icons & Graphics  | `react-icons`, custom SVG charts |
| Chart Previews    | Static sparkline SVGs            |

---

### ⚙️ Setup & Run

```bash
git clone https://github.com/vivekrai1999/crypto-tracker.git
cd crypto-tracker
npm install
npm run dev
```
