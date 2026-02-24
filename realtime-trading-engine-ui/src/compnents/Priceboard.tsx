import React, {useEffect, useState, useContext } from "react";
import { SocketContext } from "../context/socketContext";


interface Price  {
    symbol: string,
    price: number
}

const symbols = ["AAPL","TSLA","BTC","ETH"]
export const PriceBoard : React.FC = () => {
    const {socket} = useContext(SocketContext);
    const [prices,setPrices] = useState<Record<string,number>>({});
    useEffect(() => {
        symbols.forEach(sym => {
            socket.emit("subscribe",{topic: `${sym}.price`})
        }) 
        socket.on("priceUpdate", (data:Price) => {
            setPrices(prev => ({...prev,[data.symbol]:data.price}));
      
        })

        return () => {
            socket.off('priceUpdate')
        }


    },[socket])


    return (
        <div>
            <h2>Live Prices</h2>
            <ul>
                {symbols.map(sym => (
                    <li key={sym}>
                        {sym}: {prices[sym]?.toFixed(2) || "--"}
                    </li>
                ))}
            </ul>
        </div>
    )
    
}