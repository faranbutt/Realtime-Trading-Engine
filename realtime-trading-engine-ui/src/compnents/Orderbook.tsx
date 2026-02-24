import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/socketContext";

interface OrderBook {
  bids: [number, number][];
  asks: [number, number][];
}

const symbols = ["AAPL", "TSLA", "BTC", "ETH"];

export const OrderbookBoard: React.FC = () => {
  const { socket } = useContext(SocketContext);
  const [books, setBooks] = useState<Record<string, OrderBook>>({});

  useEffect(() => {
    symbols.forEach(sym => {
      socket.emit("subscribe", { topic: `${sym}.orderbook` });
    });

    socket.on("orderBookUpdate", (data: { symbol: string; book: OrderBook }) => {
      setBooks(prev => ({ ...prev, [data.symbol]: data.book }));
    });

    return () => {socket.off("orderBookUpdate")};
  }, [socket]);

  return (
    <div>
      <h2>Orderbooks</h2>
      {symbols.map(sym => (
        <div key={sym}>
          <h3>{sym}</h3>
          <div>Bids: {books[sym]?.bids.map(b => b.join("@")).join(", ")}</div>
          <div>Asks: {books[sym]?.asks.map(a => a.join("@")).join(", ")}</div>
        </div>
      ))}
    </div>
  );
};