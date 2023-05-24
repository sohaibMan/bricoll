import {Radar} from "react-chartjs-2"

export const RadarChart = ({labels, firstDataSetData, secondDataSetData}: {
    labels: string[],
    firstDataSetData: number[],
    secondDataSetData: number[]
}) => {


    console.log("first", firstDataSetData)

    const data = {
        labels,
        datasets: [{
            label: 'Current Count ',
            data: firstDataSetData,
            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
            pointBackgroundColor: 'rgb(255, 99, 132)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 99, 132)'
        }, {
            label: 'Total Count',
            data: secondDataSetData,
            fill: true,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            pointBackgroundColor: 'rgb(54, 162, 235)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(54, 162, 235)'
        }]
    };

    const options = {
        elements: {
            line: {
                borderWidth: 3
            }
        },
        scales: {
            r: {
                ticks: {
                    precision: 0,
                    beginAtZero: true
                },
            }
        }
    }

    return <Radar data={data} options={options}/>

}