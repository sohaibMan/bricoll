import {Pie} from "react-chartjs-2";
import {CategoryScale} from "chart.js";
import Chart from "chart.js/auto";

Chart.register(CategoryScale);
export const BarChart = (props: { labels: string[], values: number[] }) => {


    const data = {
        labels: props.labels,
        datasets: [{
            data: props.values,
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