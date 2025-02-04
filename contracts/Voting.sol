// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

contract Voting {
    uint private totalPolls;
    uint private totalContestants;

    struct PollStruct {
        uint id;
        string image;
        string title;
        string description;
        uint votes;
        uint contestants;
        bool deleted;
        address director;
        uint startsAt;
        uint endsAt;
        uint timestamp;
        address[] voters;
        string[] avatars;
    }

    struct ContestantStruct {
        uint id;
        string image;
        string name;
        address contestantAddress;
        uint votes;
        address[] voters;
    }

    mapping(uint => bool) private pollExist;
    mapping(uint => PollStruct) private polls;
    mapping(uint => mapping(address => bool)) private voted;
    mapping(uint => mapping(address => bool)) private contested;
    mapping(uint => mapping(uint => ContestantStruct)) private contestants;
    mapping(uint => mapping(address => bool)) private whitelistedVoters;
    mapping(uint => address[]) private whitelistedVoterList;

    event Voted(address indexed voter, uint timestamp);
    event VoterWhitelisted(uint indexed pollId, address indexed voter);
    event ContestantAdded(uint indexed pollId, uint indexed contestantId, string name, string image, address indexed contestantAddress);
    event PollEnded(uint indexed pollId, uint winnerId, string winnerName, address winnerAddress);

    function createPoll(
        string memory image,
        string memory title,
        string memory description,
        uint startsAt,
        uint endsAt
    ) public {
        require(bytes(title).length > 0, 'Title cannot be empty');
        require(bytes(description).length > 0, 'Description cannot be empty');
        require(bytes(image).length > 0, 'Image URL cannot be empty');
        require(startsAt > 0, 'Start date must be greater than 0');
        require(endsAt > startsAt, 'End date must be greater than start date');

        totalPolls++;
        uint pollId = totalPolls;

        polls[pollId] = PollStruct({
            id: pollId,
            title: title,
            description: description,
            image: image,
            startsAt: startsAt,
            endsAt: endsAt,
            director: msg.sender,
            timestamp: currentTime(),
            votes: 0,
            contestants: 0,
            deleted: false,
            voters: new address[](0),
            avatars: new string[](0)
        });

        pollExist[pollId] = true;
    }

    function whitelistVoter(uint pollId, address voter) public {
        require(pollExist[pollId], 'Poll not found');
        require(polls[pollId].director == msg.sender, 'Only the poll creator can whitelist voters');
        require(!whitelistedVoters[pollId][voter], 'Voter already whitelisted');

        whitelistedVoters[pollId][voter] = true;
        whitelistedVoterList[pollId].push(voter);
        emit VoterWhitelisted(pollId, voter);
    }

    function contest(uint pollId, string memory name, string memory image, address contestantAddress) public {
        require(pollExist[pollId], 'Poll not found');
        require(bytes(name).length > 0, 'Name cannot be empty');
        require(bytes(image).length > 0, 'Image cannot be empty');
        require(polls[pollId].votes < 1, 'Poll has votes already');
        require(polls[pollId].director == msg.sender, 'Only the poll creator can add contestants');

        totalContestants++;
        uint contestantId = totalContestants;

        contestants[pollId][contestantId] = ContestantStruct({
            id: contestantId,
            name: name,
            image: image,
            contestantAddress: contestantAddress,
            votes: 0,
            voters: new address[](0)
        });

        polls[pollId].avatars.push(image);
        polls[pollId].contestants++;

        emit ContestantAdded(pollId, contestantId, name, image, contestantAddress);
    }

    function vote(uint pollId, uint contestantId) public {
        require(pollExist[pollId], 'Poll not found');
        require(!voted[pollId][msg.sender], 'Already voted');
        require(!polls[pollId].deleted, 'Polling not available');
        require(polls[pollId].contestants > 1, 'Not enough contestants');
        require(whitelistedVoters[pollId][msg.sender], 'You are not whitelisted to vote');
        require(currentTime() >= polls[pollId].startsAt && currentTime() < polls[pollId].endsAt, 'Voting must be in session');

        polls[pollId].votes++;
        polls[pollId].voters.push(msg.sender);

        contestants[pollId][contestantId].votes++;
        contestants[pollId][contestantId].voters.push(msg.sender);
        voted[pollId][msg.sender] = true;

        emit Voted(msg.sender, currentTime());
    }

    function getContestants(uint pollId) public view returns (ContestantStruct[] memory) {
        require(pollExist[pollId], 'Poll not found');
        ContestantStruct[] memory allContestants = new ContestantStruct[](polls[pollId].contestants);
        for (uint i = 1; i <= polls[pollId].contestants; i++) {
            allContestants[i - 1] = contestants[pollId][i];
        }
        return allContestants;
    }

    function getWhitelistedVoters(uint pollId) public view returns (address[] memory) {
        require(pollExist[pollId], 'Poll not found');
        return whitelistedVoterList[pollId];
    }

    function deletePoll(uint pollId) public {
        require(pollExist[pollId], 'Poll not found');
        require(polls[pollId].director == msg.sender, 'Only the poll creator can delete the poll');
        require(!polls[pollId].deleted, 'Poll already deleted');

        polls[pollId].deleted = true;
    }

    function getWinner(uint pollId) public view returns (uint winnerId, string memory winnerName, address winnerAddress) {
        require(pollExist[pollId], 'Poll not found');
        require(currentTime() >= polls[pollId].endsAt, 'Poll has not ended yet');
        require(polls[pollId].contestants > 0, 'No contestants in this poll');

        uint highestVotes = 0;
        uint winningContestantId = 0;

        for (uint i = 1; i <= polls[pollId].contestants; i++) {
            if (contestants[pollId][i].votes > highestVotes) {
                highestVotes = contestants[pollId][i].votes;
                winningContestantId = i;
            }
        }

        require(winningContestantId > 0, 'No winner found');

        winnerId = winningContestantId;
        winnerName = contestants[pollId][winningContestantId].name;
        winnerAddress = contestants[pollId][winningContestantId].contestantAddress;

        return (winnerId, winnerName, winnerAddress);
    }

    function getAllPolls() public view returns (PollStruct[] memory) {
        PollStruct[] memory allPolls = new PollStruct[](totalPolls);
        for (uint i = 1; i <= totalPolls; i++) {
            allPolls[i - 1] = polls[i];
        }
        return allPolls;
    }

    function currentTime() internal view returns (uint256) {
        return block.timestamp;
    }
}