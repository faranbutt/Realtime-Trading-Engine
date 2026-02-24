import './App.css'
import { SocketProvider } from './context/socketContext'
import { PriceBoard } from './compnents/Priceboard'
import { OrderbookBoard } from './compnents/Orderbook'
import { TradeBoard } from './compnents/Tradeboard'

function App() {

  return (
    <>
      <SocketProvider>
        <div style={{ display: "flex", gap: "50px", padding: "20px" }}>
          <PriceBoard />
          <OrderbookBoard/>
          <TradeBoard/>
        </div>
      </SocketProvider>
    </>
  )
}

export default App
