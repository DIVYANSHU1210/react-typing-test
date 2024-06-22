import React from 'react'
import { Line } from 'react-chartjs-2';
import {
    Chart as Chartjs,
    CategoryScale,  //for x axis (horizontal)
    LinearScale,  // for y axis (vertical)
    LineElement, // for the line
    PointElement, //for point

    Title,
    Tooltip,
    Legend
} from 'react-chartjs-2'


function Graph() {
  return (
    <div>
        <Line
            data={{
                labels : [1,2,3,4],
                datasets : [
                    {
                        
                    }
                ]
            }}
        ></Line>
    </div>
    
  )
}

export default Graph