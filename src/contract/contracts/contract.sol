//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SpotiFi {

    // struct Artist {
    //     bool isArtist;
    //     uint credits;
    // }

    struct User {
        bool isUser;
        bool isArtist;
        uint spendingCredits;
        uint revenueCredits;
    }

    address payable owner;
    mapping(address => User) public users;
    // mapping(address => Artist) public artists;

    constructor() payable {
        owner = payable(msg.sender);
    }

    // autocall function 
    function grantFreeCredits() public {
        require(msg.sender != address(0), "Invalid sender");
        if(!users[msg.sender].isUser){
            users[msg.sender].spendingCredits += 5;
            users[msg.sender].isUser = true;
            return;
        }
        revert();
    }

    // autocall function 
    function addArtist() public {
        require(msg.sender != address(0), "Invalid sender");
        users[msg.sender].isArtist = true;
    }

    function buyCredits(uint _tokens) public payable {
        require(msg.sender != address(0), "Invalid sender");
        require(_tokens > 0);
        uint amount = _tokens * 100000000000000000;
        require(amount == msg.value, "Token amount and fees don't match");
        // owner.transfer(amount);
        users[msg.sender].spendingCredits += _tokens;
    }

    // autocall function 
    function checkEnoughTokens() public view returns (bool) {
        require(msg.sender != address(0), "Invalid sender");
        if(users[msg.sender].spendingCredits == 0){
            return false;
        }
        return true;
    }

    // autocall function 
    function playedSong(address _artist) public {
        require(msg.sender != address(0), "Invalid sender");
        require(_artist != address(0), "Invalid artist address");
        require(users[_artist].isArtist, "Artist doesn't exist");
        users[msg.sender].spendingCredits -= 1;
        users[_artist].revenueCredits += 1;
    }

    function getRewards() public payable {
        require(msg.sender != address(0), "Invalid sender");
        require(users[msg.sender].isArtist, "You are not an artist");
        uint reward = users[msg.sender].revenueCredits * 100000000000000000;
        payable(msg.sender).transfer(reward);
        users[msg.sender].revenueCredits = 0;
    }
}