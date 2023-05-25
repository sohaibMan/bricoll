import {RadarChart} from "../base/RadarChart";
import {Contract_Stats, Proposals_Stats} from "../../../types/resolvers";

interface RadarChartProposalsContractsProps {
    contracts_stats: Array<Contract_Stats>,
    proposals_stats: Array<Proposals_Stats>
}

export const RadarChartProposalsContracts = ({contracts_stats, proposals_stats}: RadarChartProposalsContractsProps) => {
    // doing some stats
    // what is this chart?
    //=>this chart shows the number of contracts and proposals per the total number of contracts and proposals
    //1. bring all the labels
    const labels = contracts_stats.map((key) => key.status.split("_").join(" ").toLowerCase()).concat(proposals_stats.map((key) => key.status.split("_").join(" ").toLowerCase()))
    // const firstDataSetData = contracts_stats.reduce((prv, state) => prv + state.count, 0)
    const contractsValues = contracts_stats.map((key) => key.count)
    const proposalsValues = proposals_stats.map((key) => key.count)


    console.log(contractsValues, proposalsValues)

    const firstDataSetData = contractsValues.concat(proposalsValues)
    const secondDataSetData = [proposals_stats.reduce((prv, state) => prv + state.count, 0), proposals_stats.reduce((prv, state) => prv + state.count, 0)]

    return (
        <RadarChart labels={labels} firstDataSetData={firstDataSetData} secondDataSetData={secondDataSetData}/>
    )
}