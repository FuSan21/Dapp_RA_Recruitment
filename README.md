# Fix Error Project

This project is a simple decentralized application (DApp) that allows users to store and retrieve data on the Ethereum blockchain using smart contracts.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have Node.js 18 installed. You can download it from [Node.js official website](https://nodejs.org/).
- You have Truffle installed globally. If you don't have it installed, you can do so by running:
  ```bash
  npm install -g truffle
  ```
- You have Ganache or another Ethereum client running to deploy the smart contracts.
- You have MetaMask installed in your browser. You can download it from [MetaMask official website](https://metamask.io/).

## Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/FuSan21/Dapp_RA_Recruitment.git
   cd Dapp_RA_Recruitment
   ```

2. **Install project dependencies:**
   Navigate to the project directory and run:
   ```bash
   npm install
   ```

3. **Compile the smart contracts:**
   Run the following command to compile the smart contracts:
   ```bash
   truffle compile
   ```

4. **Migrate the smart contracts:**
   Deploy the smart contracts to your local blockchain (e.g., Ganache) by running:
   ```bash
   truffle migrate
   ```

5. **Start the development server:**
   You can start the development server using Lite Server by running:
   ```bash
   npm run dev
   ```

6. **Connect MetaMask:**
   - Open MetaMask and create a new wallet or import an existing one.
   - Add the network to MetaMask by using the following configuration:
        - Network Name: Ganache
        - New RPC URL: http://localhost:8545
        - Chain ID: 1337
        - Currency Symbol: ETH
   - Make sure you are connected to the same network as your local blockchain (e.g., Ganache).
   - Import the private key of the account from Ganache you want to use for testing.


7. **Open the application:**
   Open your web browser and navigate to `http://localhost:3000` to access the application.

## Usage

- Use the "Store" button to save data to the blockchain.
- Use the "Read Data" button to retrieve the stored data.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.