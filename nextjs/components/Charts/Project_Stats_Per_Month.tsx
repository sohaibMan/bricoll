import {Project_Stats_Per_Month} from "../../types/resolvers";
import moment from "moment";
import {Line} from "react-chartjs-2";


export const ProjectStatsBarChartPerMonth = (props: { stats: Project_Stats_Per_Month[] }) => {


    const labels = props.stats.map((key) => moment(key.month, 'MM').format("MMMM"))

    const values = props.stats.map((key => key.count))



    const data = {
        labels,
        datasets: [{
            label: 'Number of Projects per Month',
            data: values,
            borderWidth: 1
        }],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
        ],
        borderWidth: 1
    };


    return (
        <Line data={data}/>)

}