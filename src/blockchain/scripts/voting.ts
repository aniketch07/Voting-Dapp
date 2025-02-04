import { ethers } from "ethers";
import votingAbi from '../abis/voting.abi.json'
export const getElections=async()=>{
    try {
        const provider=new ethers.providers.JsonRpcProvider('https://eth-holesky.g.alchemy.com/v2/CW-1OsQTxd4jCJJQjHsTzPvG827ibygn')
        const contract=new ethers.Contract('0x113C3e49CdA48F3f7de343E0D4Dd327dAAeCfB0F',votingAbi,provider)
        const elections=await contract.getAllPolls()
        return elections
    } catch (error) {
        console.log(error,'err in get call for elections')
    }
}

export const getContestants=async(pollId:number)=>{
    try {
        const provider=new ethers.providers.JsonRpcProvider('https://eth-holesky.g.alchemy.com/v2/CW-1OsQTxd4jCJJQjHsTzPvG827ibygn')
        const contract=new ethers.Contract('0x113C3e49CdA48F3f7de343E0D4Dd327dAAeCfB0F',votingAbi,provider)
        const contestants=await contract.getContestants(pollId)
        return contestants
    } catch (error) {
        console.log(error,'err in get call for elections')
    }
}

export const getWhiteListedVoters=async(pollId:number)=>{
    try {
        const provider=new ethers.providers.JsonRpcProvider('https://eth-holesky.g.alchemy.com/v2/CW-1OsQTxd4jCJJQjHsTzPvG827ibygn')
        const contract=new ethers.Contract('0x113C3e49CdA48F3f7de343E0D4Dd327dAAeCfB0F',votingAbi,provider)
        const voters=await contract.getWhitelistedVoters(pollId)
        return voters
    } catch (error) {
        console.log(error,'err in get call for elections')
    }
}

export const getWinner=async(pollId:number)=>{
    try {
        const provider=new ethers.providers.JsonRpcProvider('https://eth-holesky.g.alchemy.com/v2/CW-1OsQTxd4jCJJQjHsTzPvG827ibygn')
        const contract=new ethers.Contract('0x113C3e49CdA48F3f7de343E0D4Dd327dAAeCfB0F',votingAbi,provider)
        const voters=await contract.getWinner(pollId)
        return voters
    } catch (error) {
        console.log(error,'err in get call for elections')
    }
}
