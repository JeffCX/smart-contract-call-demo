const ReadContractData = async (web3Ref, contractAddress, contractABI, method, args) => {
    const contract = new web3Ref.eth.Contract(
        contractABI,
        contractAddress
    )
    const result = await contract.methods[method](...args).call()
    return result
}

const writeContractData = () => {

}

export { ReadContractData }

// const contract = new web3.eth.Contract(
//     BEP20_ABI,
//     tokenAddress
// )

// const symbol = await contract.methods.symbol().call()
// const balance = await contract.methods.balanceOf(address).call()