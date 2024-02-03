// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12 <0.9.0;

contract Agreements {
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
