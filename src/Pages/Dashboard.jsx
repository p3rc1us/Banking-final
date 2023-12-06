import React, { useState } from 'react';
import Clients from '../clients.json';
import '../Styles/Dashboard.css';

function ArrayedClients() {

  const [modifiedClients, setModifiedClients] = useState([...Clients]);
  const [deposit, setDeposit] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);

  // for transferring //
  
  const [transferAmount, setTransferAmount ] = useState('');
  const [receiverAccountNumber, setReceiverAccountNumber] = useState('');
  const [senderAccountNumber, setSenderAccountNumber ] = useState('');
  

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  function handleDeposit(e) {
    e.preventDefault();

        const updatedClients = modifiedClients.map((client) => {
                if (client.accountNumber === Number(accountNumber)) {
                  return { ...client, balance: client.balance + Number(deposit) };
                } else {
                  return client;
                }
              });
          
              setModifiedClients(updatedClients);
          
              setDeposit(0);
              setAccountNumber('');
              closeModal();
            }
            
  function handleTransfer(e) {
    e.preventDefault();

    let transferSuccess = false;
    let balanceInsufficient = false;

      const updateClients = modifiedClients.map((client) => {
        if (client.accountNumber === Number(senderAccountNumber) &&
            Number(transferAmount) > 0) 
            {// This is the sender
              if(Number(transferAmount) > client.balance){
                balanceInsufficient = true;
              }
              return { ...client, balance: client.balance - Number(transferAmount) };
            } 
        

        else if (client.accountNumber === Number(receiverAccountNumber) && balanceInsufficient === false) {
                      // This is the receiver
                      transferSuccess = true;
                      return { ...client, balance: client.balance + Number(transferAmount) };
                  } else {
                      // This is not the sender or receiver
                      return client;
                  }
              });

              if (!transferSuccess) {
                alert("Can't make the transfer. Sender account not found or insufficient balance.");
                return; // Exit the function if the transfer is not successful
            }          
              setModifiedClients(updateClients);
              setTransferAmount('');
              setReceiverAccountNumber('');
              setSenderAccountNumber('');
          }

    //       function handleWithdraw(e) {
    // e.preventDefault();

    //     const updatedClients = modifiedClients.map((client) => {
    //             if (client.accountNumber === Number(accountNumber)) {
    //               return { ...client, balance: client.balance - Number(deposit) };
    //             } else {
    //               return client;
    //             }
    //           });
          
    //           setModifiedClients(updatedClients);
          
    //           setDeposit(0);
    //           setAccountNumber('');
    //           closeModal();
    //         }
          
          
          



  return (
    <div>
      <div className='table'>
      <div className={`clients ${isModalOpen ? 'dim' : ''}`}>
      <table>
        <thead>
          <tr>
            <th className='border'>Client's Name</th>
            <th className='border'>Account Number</th>
            <th className='border'>Balance</th>
            <th className='border'>Email</th>
            <th className='border'>Contact Number</th>
          </tr>
        </thead>
        <tbody>
          {modifiedClients.map((client) => (
            <tr key={client.id}>
              <td className='border'>{client.name}</td>
              <td className='border'>{client.accountNumber}</td>
              <td className='border'>
              ${(client.balance).toLocaleString()}
              </td>
              <td className='border'>{client.email}</td>
              <td className='border'>{client.contactNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>


      <button
      className="bg-blue-500 hover:bg-blue-400 text-white font-bold mt-8 py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
      onClick={openModal}
      >Deposit
      </button>





      {/* transfer */}
      <form onSubmit={handleTransfer}>
      <input
      type='number'
      value={senderAccountNumber}
      placeholder='Account Sender'
      onChange={(event) => setSenderAccountNumber(event.target.value)}
      />
      
      <input
      type='number'
      value={transferAmount}
      placeholder='Transfer Amount'
      onChange={(event) => setTransferAmount(event.target.value)}
      />

      <input
      type='number'
      value={receiverAccountNumber}
      placeholder='Account Receiver'
      onChange={(event) => setReceiverAccountNumber(event.target.value)}
      />
      <button type='submit'>Submit</button>
      </form>

      {isModalOpen && (
      <form onSubmit={handleDeposit}>
        <button className="btnClose" onClick={closeModal}>
        X
        </button>
        <input
          type="number"
          value={deposit}
          placeholder="$0.00"
          onChange={(event) => setDeposit(event.target.value)}
        />
        <input
          type="number"
          value={accountNumber}
          placeholder="Account Number"
          onChange={(event) => setAccountNumber(event.target.value)}
        />
        <button type='submit'>Submit</button>
      </form>
      )}
    </div>
  </div>
  );
}


export default ArrayedClients;