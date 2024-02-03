from solc import compile_source
from web3 import Web3, HTTPProvider
# from web3.contract import ConciseContract

WEB3 = Web3(HTTPProvider('http://127.0.0.1:8545'))
try:
    # with open('./contract/Agreement.sol', 'r') as f:
        CONTRACT_SOURCE_CODE = """
pragma solidity >=0.6.12 <0.9.0;

contract Agreement {
    struct Agreement {
        string individual;
        string pot;
        uint256 amount;
    }

    event AgreementEvent(
        string individual,
        string pot,
        uint256 amount
    );

    Agreement[] internal agreementDatas;

    function save(string memory _individual, string memory _pot, uint256 _amount) public {
        emit AgreementEvent(_individual, _pot, _amount);
        Agreement memory newAgreement = Agreement({
            individual: _individual, pot: _pot, amount: _amount
        });
        agreementDatas.push(newAgreement);
    }

   function getAllOnIndividual(string memory individual) public view returns (Agreement[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < agreementDatas.length; i++) {
            if (keccak256(abi.encodePacked(agreementDatas[i].individual)) == keccak256(abi.encodePacked(individual))) {
                count++;
            }
        }
        Agreement[] memory result = new Agreement[](count);
        count = 0;
        for (uint256 i = 0; i < agreementDatas.length; i++) {
            if (keccak256(abi.encodePacked(agreementDatas[i].individual)) == keccak256(abi.encodePacked(individual))) {
                result[count] = agreementDatas[i];
                count++;
            }
        }
        return result;
    }

    function getAllOnPot(string memory pot) public view returns (Agreement[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < agreementDatas.length; i++) {
            if (keccak256(abi.encodePacked(agreementDatas[i].pot)) == keccak256(abi.encodePacked(pot))) {
                count++;
            }
        }
        Agreement[] memory result = new Agreement[](count);
        count = 0;
        for (uint256 i = 0; i < agreementDatas.length; i++) {
            if (keccak256(abi.encodePacked(agreementDatas[i].pot)) == keccak256(abi.encodePacked(pot))) {
                result[count] = agreementDatas[i];
                count++;
            }
        }
        return result;
    }
}

"""
        COMPILED_SOL = compile_source(CONTRACT_SOURCE_CODE)
        SMARTCONTRACT_INTERFACE = COMPILED_SOL['<stdin>:Agreement']
        StorageContract = WEB3.eth.contract(
            abi=SMARTCONTRACT_INTERFACE['abi'],
            bytecode=SMARTCONTRACT_INTERFACE['bin'])
        WEB3.eth.defaultAccount = WEB3.eth.accounts[0]
        TX_HASH = StorageContract.constructor().transact()
        TX_RECEIPT = WEB3.eth.waitForTransactionReceipt(TX_HASH)
        ASSETREGISTER = WEB3.eth.contract(
            address=TX_RECEIPT.contractAddress,
            abi=SMARTCONTRACT_INTERFACE['abi'],
        )
except Exception as e:
    print("Error:", e)


# from web3 import Web3

# w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:8545'))
# contract_address = "0xe24F57E4757381fDc7181e348333be6aE68D59aa"
# print(w3.eth.gas_price)

# # The ABI (Application Binary Interface) of the smart contract
# contract_abi = [
#     {"constant": False, "inputs": [{"name": "_individual", "type": "string"}, {"name": "_pot", "type": "string"}, {"name": "_amount", "type": "uint256"}], "name": "save", "outputs": [], "payable": False, "stateMutability": "nonpayable", "type": "function"},
#     {"constant": True, "inputs": [{"name": "_individual", "type": "string"}], "name": "getAllOnIndividual", "outputs": [{"name": "", "type": "tuple", "components": [{"name": "individual", "type": "string"}, {"name": "pot", "type": "string"}, {"name": "amount", "type": "uint256"}]}], "payable": False, "stateMutability": "view", "type": "function"},
#     {"constant": True, "inputs": [{"name": "_pot", "type": "string"}], "name": "getAllOnPot", "outputs": [{"name": "", "type": "tuple", "components": [{"name": "individual", "type": "string"}, {"name": "pot", "type": "string"}, {"name": "amount", "type": "uint256"}]}], "payable": False, "stateMutability": "view", "type": "function"},
# ]

# # Create a contract object
# contract = w3.eth.contract(address=contract_address, abi=contract_abi)

# # Example: Call a function (save)
# individual = "Alice"
# pot = "Pot1"
# amount = 100
# transaction_hash = contract.functions.save(individual, pot, amount).transact()
# print("Transaction Hash:", transaction_hash)

# # Example: Call a read-only function (getAllOnIndividual)
# individual_data = contract.functions.getAllOnIndividual(individual).call()
# print("Agreements for {}: {}".format(individual, individual_data))

# # Example: Call a read-only function (getAllOnPot)
# pot_data = contract.functions.getAllOnPot(pot).call()
# print("Agreements for {}: {}".format(pot, pot_data))
