import '../Styles/Main.css';
import Clients from '../clients.json';
import React, { useState } from 'react';
import Logout from '../Components/Logout';

function Main() {

const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);

  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return ( 
    <div className='mainContainer'>

    <div className={`clients ${isModalOpen ? 'dim' : ''}`}>
      {Clients.map(( client) => (
        <fieldset key={client.id} className='clientWindow'>
          <h2>{client.name}</h2>
          <h3>Balance: ${Number(client.balance).toLocaleString()}</h3>
          <h3>Account Number: {client.accountNumber}</h3>
          <h3>Email: {client.email}</h3>
        </fieldset>
      ))}

    <button className="btnOpen"onClick={openModal}>Deposit</button>
    <Logout />
    </div>

    {isModalOpen && (
        <fieldset className="modal">
            <button className="btnClose" onClick={closeModal}>X</button>
            <h2>Hello, I'm a modal!</h2>
        </fieldset>
    )}
    
  </div>    
  );
}

export default Main;