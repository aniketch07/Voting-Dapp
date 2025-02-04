import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useState } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { useAccount, useDisconnect } from "wagmi";
import { useRouter } from "next/router";

const Navbar = () => {
  const [walletDropdownSelected, setwalletDropdownSelected] =
    useState<boolean>(false);
  const { address } = useAccount();
  const router = useRouter();
  const { disconnect } = useDisconnect();
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        padding: "1rem 2rem",
        background: "#0B0C14",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontSize: "20px",
          fontWeight: "700",
          // cursor: "pointer",
          color: "#3FE0B2",
          display: "flex",
          gap: "2rem",
        }}
      >
        <text
          onClick={() => {
            router.push("/");
          }}
          style={{ cursor: "pointer" }}
        >
          Voting Dapp
        </text>
        <text
          onClick={() => {
            router.push("/");
          }}
          style={{
            fontSize: "18px",
            marginTop: "0.1rem",
            fontWeight: "500",
            cursor: "pointer",
          }}
        >
          Home
        </text>
      </div>
      {walletDropdownSelected && address && (
        <div
          style={{
            position: "fixed",
            right: "2rem",
            cursor: "pointer",
            top: "4rem",
            padding: " 0.5rem 1rem",
            borderRadius: "6px",
            background: "#0B0C14",
            border: "1px solid #727DA133",
          }}
          onClick={() => {
            setwalletDropdownSelected(false);
            disconnect();
          }}
        >
          Disconnect Wallet
        </div>
      )}
      {address ? (
        <div
          style={{
            padding: "0.5rem 1rem",
            cursor: "pointer",
            borderRadius: "6px",
            border: "1px solid #3FE0B2",
          }}
          onClick={() => {
            setwalletDropdownSelected(!walletDropdownSelected);
          }}
        >
          {address.substring(0, 5)}...
          {address.substring(address.length - 5, address.length)}
        </div>
      ) : (
        <ConnectButton />
      )}
    </div>
  );
};

export default Navbar;
