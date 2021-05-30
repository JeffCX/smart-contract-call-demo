const handleApprove = () => {
    cakeContract.methods
      .approve(cakeVaultContract.options.address, ethers.constants.MaxUint256)
      .send({ from: account })
      .on('sending', () => {
        setRequestedApproval(true)
      })
      .on('receipt', () => {
        toastSuccess(
          `${t('Contract Enabled')}`,
          `${t(`You can now stake in the %symbol% vault!`, { symbol: stakingToken.symbol })}`,
        )
        setLastUpdated()
        setRequestedApproval(false)
      })
      .on('error', (error) => {
        console.error(error)
        toastError(
          `${t('Error')}`,
          `${t(`Please try again. Confirm the transaction and make sure you are paying enough gas!`)}`,
        )
        setRequestedApproval(false)
      })
}