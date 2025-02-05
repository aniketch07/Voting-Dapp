# Decentralized Voting Application

## Overview

This Decentralized Voting Application allows users to cast votes for their preferred candidates on the Ethereum blockchain. The smart contract is written in Solidity, and the frontend is developed using React. The application leverages Web3.js/Ethers.js to interact with the Ethereum blockchain and MetaMask for user authentication. This project aims to showcase blockchain concepts, smart contract development, and full-stack integration.

## Features

### Blockchain Development:
- **Smart Contract**:
  - Written in Solidity to facilitate voting operations on the blockchain.
  - Deployed on the Ethereum testnet (Rinkeby or Ropsten).
  - Handles:
    - Registering and voting for candidates.
    - Fetching candidates and vote counts.
    - Ensuring only registered voters can vote (optional feature).
  
### Frontend Development:
- **React Components**:
  - `VotingForm`: A component for users to select a candidate and submit their vote.
  - `CandidateList`: Displays a list of candidates and their vote counts in real time.
  - `ResultDisplay`: Displays the final voting result and the current leader.

- **State Management**:
  - Utilizes React hooks (`useState`, `useEffect`) for state management.

- **Functionality**:
  - **Vote Submission**: Users can vote for a candidate by interacting with the Ethereum blockchain.
  - **Voting Results**: Displays current voting results and the leader.
  - **MetaMask Integration**: Allows authentication via MetaMask, enabling secure transactions on the blockchain.

## Technologies Used

- **Blockchain**: Ethereum
- **Smart Contract Development**: Solidity
- **Frontend**: React
- **Blockchain Interaction**: Web3.js / Ethers.js
- **Authentication**: MetaMask
- **Testnet**: Rinkeby or Ropsten
- **Storage**: IPFS (Optional)
- **Testing**: Hardhat / Truffle for smart contract testing
- **State Management**: React Hooks (useState, useEffect)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/aniketch07/Voting-Dapp.git
cd Voting-Dapp
```
### 2. Install Dependencies
Frontend:
Make sure you have Node.js installed and then run:

```bash
npm install
```
### 3. Run the Frontend
Start the React frontend locally by running:

```bash
npm start
```
The app will be accessible at http://localhost:3000. Connect your MetaMask wallet to interact with the app.

### Testing
Smart Contract Tests:
Smart Contract is deployed at address 0x113C3e49CdA48F3f7de343E0D4Dd327dAAeCfB0F on Holesky Testnet

NOTE:
```
To add Holesky testnet to your metamask follow the following link: https://revoke.cash/learn/wallets/add-network/ethereum-holesky
```
Once you have added the Testnet to your metamask you can interact with the smart contract on 

https://holesky.etherscan.io/address/0x113c3e49cda48f3f7de343e0d4dd327daaecfb0f


