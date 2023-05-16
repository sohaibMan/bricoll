import {BarChart} from "./BarChart";
import {ProjectStats} from "../../types/resolvers";
import Typography from "@mui/joy/Typography";


export const ProjectStatsBarChart = (props: { stats: ProjectStats }) => {
    if(props.stats.approved_count === 0 && props.stats.completed_count === 0 && props.stats.declined_count === 0 && props.stats.in_progress_count === 0) return <Typography>No statistics</Typography>

    const labels = Object.keys(props.stats).filter((key) => key !== "__typename").map(key => key.split("_").join(" ").toLowerCase())

    const values = Object.values(props.stats).filter(key => typeof key === "number") as number[]


    return  <BarChart labels={labels} values={values}/>

}