App = {
    // the vaiable below will store references of wallet, smart contract and your accounts
    webProvider: null,
    contracts: {},
    account: '0x0',
   
   
  initWeb: async function() {
      // if an ethereum provider instance is already provided by metamask
      const provider = window.ethereum
      if(provider) {
        App.webProvider = provider;
        try {
          // Request account access
          await window.ethereum.request({ method: 'eth_requestAccounts' });
        } catch (error) {
          console.error("User denied account access");
        }
      }
      else {
        $("#loader-msg").html('No metamask ethereum provider found')
        // specify default instance if no web3 instance provided
        App.webProvider = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
      }
      
      return App.initContract();
  },
   
   
  initContract: function() {
      $.getJSON("SimpleStorage.json", function( SimpleStorageContract ){
        // instantiate a new truffle contract from the artifict
        App.contracts.SimpleStorage = TruffleContract( SimpleStorageContract );
    
        // connect provider to interact with contract
        App.contracts.SimpleStorage.setProvider( App.webProvider );
  
        return App.render();
      })
  },
   
  render: async function(){
      // open wallet and load account data
      if (window.ethereum) {
        try {
          // recommended approach to requesting user to connect mmetamask instead of directly getting the list of connected account
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          App.account = accounts;
          $("#accountAddress").html(`You have ${ App.account.length } account connected from metamask: ${ App.account } <br/> Current account in use: ${App.account[0]}`);
        } catch (error) {
          if (error.code === 4001) {
            // User rejected request
            console.warn('user rejected')
          }
          $("#accountAddress").html("Your Account: Not Connected");
          console.error(error);
        }
      }
  },
  store: async function(){
    const contractInstance = await App.contracts.SimpleStorage.deployed()
    
    const data = $("#user-data").val();
    await contractInstance.store( data, { from: App.account[0] } )

    alert("Data Stored successfully!")
  },
  retrieve: async function(){
    const contractInstance = await App.contracts.SimpleStorage.deployed()
    
    const receivedData = await contractInstance.retrieve();
    const formattedData = receivedData

    const storedData = $("#stored-data");
    storedData.empty();
    storedData.append( formattedData );
  }
};
   
   
   $(function() {
    $(window).load(function() {
      App.initWeb();
    });
   });
   