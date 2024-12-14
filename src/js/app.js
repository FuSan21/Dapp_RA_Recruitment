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
      
      try {
        await App.initContract();
      } catch (error) {
        console.error("Error initializing contract:", error);
      }
  },
   
   
  initContract: function() {
    return new Promise((resolve, reject) => {
      $.getJSON("SimpleStorage.json", function(SimpleStorageContract) {
        try {
          // instantiate a new truffle contract from the artifact
          App.contracts.SimpleStorage = TruffleContract(SimpleStorageContract);
          
          // connect provider to interact with contract
          App.contracts.SimpleStorage.setProvider(App.webProvider);

          resolve(App.render());
        } catch (error) {
          reject(error);
        }
      }).fail(function(error) {
        reject(error);
      });
    });
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
    try {
      const contractInstance = await App.contracts.SimpleStorage.deployed()
      const receivedData = await contractInstance.retrieve();
      // Convert BigNumber to string and update the UI
      $("#stored-data").html(receivedData.toString());
    } catch (error) {
      console.error("Error retrieving data:", error);
      $("#stored-data").html("Error retrieving data");
    }
  }
};
   
   
   $(function() {
    $(window).load(function() {
      App.initWeb();
    });
   });
   