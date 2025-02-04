import { getElections } from "@/blockchain/scripts/voting";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Electiondashboard = () => {
  const [elections, setelections] = useState<any>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchVal = async () => {
      const res = await getElections();
      if (res) {
        setelections(res);
      }
    };
    fetchVal();
  }, []);

  function epochToDateTime(epoch: number) {
    const date = new Date(epoch * 1000); // Convert seconds to milliseconds
    return date.toLocaleString(); // Convert to local date-time string
  }
  const currentEpoch = Math.floor(Date.now() / 1000);

  return (
    <div
      style={{
        marginTop: "1rem",
        padding: "4rem",
        display: "flex",
        width: "100%",
        flexWrap: elections.length>4?"wrap":'nowrap',
      }}
    >
      {elections.length == 0 && (
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
      {elections?.map((election: any, index: number) => (
        <div
          key={index}
          style={{
            padding: "16px",
            width: "500px",
            flexFlow: "wrap",
            background: "#151621",
            color: "#C9D3EE",
            cursor: "pointer",
            display: "flex",
            marginLeft: "2rem",
            flexWrap: "wrap",
            borderRadius: "6px",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => {
            router.push(`/election/${Number(election.id)}`);
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <text>{election.title}</text>
              <text>
                {currentEpoch > Number(election.endsAt) ? "Ended" : "Ongoing"}
              </text>
            </div>
            <div style={{ marginTop: "0.5rem" }}>
              Director: {election.director}
            </div>
            <div>
              Voting Begins At : {epochToDateTime(Number(election.startsAt))}
            </div>
            <div>
              Voting Ends At : {epochToDateTime(Number(election.endsAt))}
            </div>
            <div>Total Votes: {Number(election.votes)}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Electiondashboard;
