
import React, { useState, useEffect } from 'react';
import { CAKE_ADDRESS, BEP20_ABI }from "./constants"
import Web3 from 'web3';

const web3 = new Web3('https://bsc-dataseed1.binance.org/');

function App() {

  const [chainId, setChainId] = useState(null)
  const [address, setAddress] = useState('')

  const [tokenName, setTokenName] = useState('')
  const [tokenAddress, setTokenAddress] = useState(CAKE_ADDRESS)
  const [amount, setAmount] = useState('')

  const ConnectToMetaMask = () => {

    const eth = window.ethereum

    if (eth) {

        eth.enable()

        if (eth.isConnected()) {
          const chainId = eth.networkVersion
          setChainId(chainId)
          const selectedAddress = eth.selectedAddress
          setAddress(selectedAddress)
        }

        eth.on('accountsChanged', function (accounts) {
          setAddress(eth.selectedAddress)
        })

        eth.on('networkChanged', function (networkId) {
          setChainId(networkId)
        })

    } else {
        alert('Please install metamask to use the website')
    }

  }

  const getTokenBalance = async () => {

    const contract = new web3.eth.Contract(
      BEP20_ABI,
      tokenAddress
    )

    const symbol = await contract.methods.symbol().call()
    const balance = await contract.methods.balanceOf(address).call()
    setTokenName(symbol)
    setAmount(balance)

  }

  useEffect(() => {
    ConnectToMetaMask()
  }, []);

  return (
    <div style={{fontSize: 20, padding: 40}}>
      <p>Chain ID: {chainId}</p>
      <p>Account Address: {address}</p>

      <p>
        BEP 20 Token name: {tokenName}
      </p>
      <p>
        BEP 20 Token Address:
      </p>
      <p>
        <input 
            style={{padding: 5, width: 400, fontSize: 15}}
            value={tokenAddress} 
            onChange={(e) => {setTokenAddress(e.target.value)}} 
            placeholder='Please Input BSC token address' 
        />
      </p>
      <p>Account has {amount} {tokenName} in user balance</p>
      <button onClick={getTokenBalance}> Get Token Balance </button>
    </div>
  );
}

export default App;
