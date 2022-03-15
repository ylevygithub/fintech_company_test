import './App.css';
import React, {useState, useEffect} from "react"


function App() {

  const [bids, setBids] = useState(["loading..."])
  const [btc, setBtc] = useState(["loading..."])

  useEffect(() => {
    const wsEth = new WebSocket('wss://stream.binance.com:9443/ws/etheur@trade')
    const wsBtc = new WebSocket('wss://stream.binance.com:9443/ws/btceur@trade')

    wsEth.onmessage = (event) => {
      const jsonData = JSON.parse(event.data)
      try {
        if (!jsonData.event) {
          setBids(parseFloat(jsonData.p).toFixed(2))
          // lastPrice = bids
        }
      } catch (err) {
        console.log(err)
      }
    }
    wsBtc.onmessage = (event) => {
      const jsonData = JSON.parse(event.data)
      try {
        if (!jsonData.event) {
          setBtc(parseFloat(jsonData.p).toFixed(2))
          // lastPrice = bids
        }
      } catch (err) {
        console.log(err)
      }
    }
    //clean up function
    return () => wsEth.close() && wsBtc.close()
  }, [])

  return (
    <div className="App">
      {/**
       * Trying to put the color 
       * in red when its < than lastPrice
       * and in green when its > then lastPrice
       * but doesnt work
      */}
      {/* {
        (!lastPrice || lastPrice === bids
        ? <h3 style={{color:"black"}}>{bids}</h3>
        : bids > lastPrice
        ? <h3 style={{color:"green"}}>{bids}</h3>
        : <h3 style={{color:"red"}}>{bids}</h3>)
      } */}

      {/* -----------Title part--------------- */}
      <div className='title'>Wall Of Trades : Test</div>
      <br /><br /><br /><br /><br />

      {/* -----------Etherum part--------------- */}
      <div className='borders'>
        <h1>Etherum current price in EUR</h1>
        <h2 style={{color:"blue"}}>{bids}</h2>
      </div>
      <br />

      {/* -----------Bitcoin part--------------- */}
      <div className='borders'>
        <h1>Bitcoin current price in EUR</h1>
        <h2 style={{color:"violet"}}>{btc}</h2>
      </div>
    </div>
  );
}

export default App;
