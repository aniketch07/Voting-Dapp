import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import votingabi from "../../blockchain/abis/voting.abi.json";
import { useRouter } from "next/router";
import {
  getContestants,
  getElections,
  getWhiteListedVoters,
  getWinner,
} from "@/blockchain/scripts/voting";
import { holesky } from "viem/chains";
const Index = () => {
  const account = useAccount();
  const { writeContract, writeContractAsync } = useWriteContract();
  const [candidates, setCandidates] = useState<any>([]);
  const [allowedUsers, setallowedUsers] = useState<any>([]);
  const [votedCandidate, setvotedCandidate] = useState<number | null>(null);
  const [whiteListeduser, setwhiteListeduser] = useState<boolean>(false);
  const [alreadyVoted, setalreadyVoted] = useState(false);
  const [winner, setwinner] = useState<any>();
  const [elections, setelections] = useState<any>([]);
  useEffect(() => {
    const fetchVal = async () => {
      const res = await getElections();
      if (res) {
        setelections(res);
      }
    };
    fetchVal();
  }, []);
  function getVotersById(pollsArray: any[], idToMatch: number) {
    for (let poll of pollsArray) {
      // Ensure the first element is a BigNumber object
      if (poll.length > 0) {
        const pollId = Number(poll?.id);

        if (pollId === idToMatch) {
          return poll; // Voters array is the last element
        }
      }
    }
    return []; // Return empty array if no matching ID is found
  }
  const router = useRouter();

  useEffect(() => {
    if (account.address && whiteListeduser && votedCandidate !== null)
      handleTransaction();
  }, [votedCandidate]);

  useEffect(() => {
    if (elections.length > 0 && account.address) {
      const res = getVotersById(elections, Number(router.query.id));
      const value = findWhiteListedUser(account.address, res.voters);
      if (value) {
        setalreadyVoted(value);
      }
    }
  }, [elections]);

  const handleTransaction = async () => {
    try {
      const res = await writeContractAsync({
        abi: votingabi,
        address: "0x50a1068E756A13DE3C42633236c0eE75a308b6c5",
        functionName: "vote",
        args: [router.query.id, votedCandidate],
        chain: holesky,
      });
    } catch (error) {
      console.log(error, "err");
    }
  };

  useEffect(() => {
    if (router.query.id) {
      try {
        const fetchData = async () => {
          const res = await getContestants(Number(router.query.id));
          if (res) {
            setCandidates(res);
          }
        };
        fetchData();
      } catch (error) {
        console.log("error in id call");
      }
    }
  }, [router.query.id]);

  useEffect(() => {
    if (router.query.id) {
      try {
        const fetchData = async () => {
          const res = await getWhiteListedVoters(Number(router.query.id));
          if (res) {
            setallowedUsers(res);
          }
        };
        fetchData();
      } catch (error) {
        console.log("error in id call");
      }
    }
  }, [router.query.id]);

  useEffect(() => {
    if (router.query.id) {
      try {
        const fetchData = async () => {
          const res = await getWinner(Number(router.query.id));
          if (res) {
            setwinner(res);
            // setallowedUsers(res)
          }
        };
        fetchData();
      } catch (error) {
        // console.log('error in id call')
      }
    }
  }, [router.query.id]);

  const findWhiteListedUser = (userAddress: string, dataArray: any[]) => {
    try {
      const isWhitelisted = dataArray.includes(userAddress);
      return isWhitelisted;
    } catch (error) {
      console.log(error, "Error in whitelisted user check");
      return false;
    }
  };

  useEffect(() => {
    if (account.address && allowedUsers.length > 0) {
      const value = findWhiteListedUser(account.address, allowedUsers);
      if (value) {
        setwhiteListeduser(value);
      }
    }
  }, [account.address, allowedUsers]);

  return (
    <div>
      <Navbar />
      {winner && (
        <div
          style={{
            marginTop: "3rem",
            fontSize: "40px",
            width: "100%",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          <text>Voting Has Ended</text>
          <text>
            The Winner is {winner.winnerName} ({winner.winnerAddress})
          </text>
        </div>
      )}
      <div
        style={{
          marginTop: "1rem",
          padding: "4rem",
          display: "flex",
          flexWrap: candidates.length>4?"wrap":'nowrap',
          width: "100%",
        }}
      >
        {candidates.length == 0 && (
          <div
            style={{
              marginTop: "2rem",
              fontSize: "40px",
              width: "100%",
              textAlign: "center",
            }}
          >
            Loading...
          </div>
        )}
        {candidates?.filter((candidate:any,index:number)=>{
          return !candidate.contestantAddress.includes('0x00000')
        }).map((candidate: any, index: number) => (
          <div
            key={index}
            style={{
              padding: "16px",
              width: "100%",
              background: "#151621",
              color: "#C9D3EE",
              cursor: "pointer",
              display: "flex",
              marginTop:'2rem',
              marginLeft: "2rem",
              flexWrap: "wrap",
              borderRadius: "6px",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => {}}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                alignItems: "center",
              }}
            >
              <div>{candidate?.name}</div>
              <div>{candidate.contestantAddress}</div>
              <div>Votes: {Number(candidate?.votes)}</div>
              {winner && (
                <button
                  style={{
                    padding: "8px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    background: "black",
                    border: "1px solid #3FE0B2",
                    marginTop: "0.5rem",
                  }}
                  disabled={
                    !account?.address || !whiteListeduser || alreadyVoted
                  }
                  onClick={() => {
                    setvotedCandidate(Number(candidate.id));
                  }}
                >
                  Cast Vote
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
