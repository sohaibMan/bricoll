import {Pie} from "react-chartjs-2";
import {ProjectStats} from "../../../types/resolvers";
import {CategoryScale} from "chart.js";
import Chart from "chart.js/auto";

Chart.register(CategoryScale);
export const BarChart = (props: { stats: ProjectStats }) => {


    const labels = Object.keys(props.stats).filter((key) => key !== "__typename").map(key => key.split("_").join(" ").toLowerCase())
    const values = Object.values(props.stats).filter(key => typeof key === "number") as number[]


    const data = {
        labels: labels,
        datasets: [{
            data: values,
            borderWidth: 1
        }]
    };

    return (<Pie data={data} options={{
            plugins:
                {
                    title: {
                        display: true,
                        text: 'Number of Proposal'
                    },
                }
        }}/>
    )
}