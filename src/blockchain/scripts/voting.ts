import { ethers } from "ethers";
import votingAbi from '../abis/voting.abi.json'
export const getElections=async()=>{
    try {
        const provider=new ethers.providers.JsonRpcProvider('https://rpc-holesky.rockx.com')
        const contract=new ethers.Contract('0x50a1068E756A13DE3C42633236c0eE75a308b6c5',votingAbi,provider)
        const elections=await contract.getAllPolls()
        return elections
    } catch (error) {
        console.log(error,'err in get call for elections')
    }
}

export const getContestants=async(pollId:number)=>{
    try {
        const provider=new ethers.providers.JsonRpcProvider('https://rpc-holesky.rockx.com')
        const contract=new ethers.Contract('0x50a1068E756A13DE3C42633236c0eE75a308b6c5',votingAbi,provider)
        const contestants=await contract.getContestants(pollId)
        return contestants
    } catch (error) {
        console.log(error,'err in get call for elections')
    }
}

export const getWhiteListedVoters=async(pollId:number)=>{
    try {
        const provider=new ethers.providers.JsonRpcProvider('https://rpc-holesky.rockx.com')
        const contract=new ethers.Contract('0x50a1068E756A13DE3C42633236c0eE75a308b6c5',votingAbi,provider)
        const voters=await contract.getWhitelistedVoters(pollId)
        return voters
    } catch (error) {
        console.log(error,'err in get call for elections')
    }
}

export const getWinner=async(pollId:number)=>{
    try {
        const provider=new ethers.providers.JsonRpcProvider('https://rpc-holesky.rockx.com')
        const contract=new ethers.Contract('0x50a1068E756A13DE3C42633236c0eE75a308b6c5',votingAbi,provider)
        const voters=await contract.getWinner(pollId)
        return voters
    } catch (error) {
        console.log(error,'err in get call for elections')
    }
}