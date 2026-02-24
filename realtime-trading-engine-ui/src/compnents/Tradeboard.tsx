import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/socketContext";

interface Trade {
  symbol: string;
  price: number;
  size: number;
  side: "buy" | "sell";
  timestamp: number;
}

const symbols = ["AAPL", "TSLA", "BTC", "ETH"];

export const TradeBoard: React.FC = () => {
  const { socket } = useContext(SocketContext);
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    symbols.forEach(sym => socket.emit("subscribe", { topic: `${sym}.trades` }));

    socket.on("tradeUpdate", (trade: Trade) => {
      setTrades(prev => [trade, ...prev].slice(0, 20)); // keep last 20 trades
    });

    return () => {socket.off("tradeUpdate")};
  }, [socket]);

  return (
    <div>
      <h2>Recent Trades</h2>
      <ul>
        {trades.map((t, i) => (
          <li key={i}>
            {t.symbol} | {t.side.toUpperCase()} | {t.size} @ {t.price.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};