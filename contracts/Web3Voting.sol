// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Web3Voting {
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    } 
    mapping (uint => Candidate) public candidates;
    uint public candidateCount;
    address owner;
    mapping (address => bool) public voters;
    event VoteEvent(uint indexed _candidateId);

    constructor() {
        owner = msg.sender;
        addCandidate("Candidat 1");
        addCandidate("Candidat 2");
    }
    modifier onlyOwner{
        require(msg.sender == owner, "Not the owner");
        _;
    } 
    function addCandidate(string memory _name) onlyOwner private {
        candidateCount++;
        candidates[candidateCount] = Candidate(candidateCount, _name, 0);
    } 
    function vote(uint _candidateId) public {
        require(!voters[msg.sender], "Already vote");
        require(_candidateId > 0 && _candidateId < candidateCount, "Unknown candidate");
        voters[msg.sender] = true;
        candidates[_candidateId].voteCount++;
        emit VoteEvent(_candidateId);
    }
    function getVoteCount(uint _candidateId) public view returns (uint) {
    return candidates[_candidateId].voteCount;
}
}