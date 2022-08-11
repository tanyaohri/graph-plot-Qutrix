import { colors, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react'
import {
    CartesianGrid,
    Line,
    LineChart,
    Tooltip,
    XAxis,
    YAxis,
    ResponsiveContainer,
    AreaChart,
    Area,
    Treemap,
    ComposedChart,
    Legend,
    Bar,
    Scatter,
    BarChart,
    Cell,
    PieChart,
    Pie,
    ScatterChart
} from 'recharts'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import PropTypes from 'prop-types';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';


const colorsType = scaleOrdinal(schemeCategory10).range();

const GraphPlot = ({
    dataX=[], 
    dataY = [],
    xLabel = "",
    yLabel=""
}) => {

    const getPath = (x, y, width, height) => `M${x},${y + height}
          C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
          C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
          Z`;
    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;
      
        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
      };
      
     

    const [data, setData] = useState([]);

    const handleChangeGraphType = (event) => {
        setGraphType(event.target.value);
    };

    const [graphType, setGraphType] = useState("line");

    useEffect(() => {
        setData(dataX.reduce((result, curr, ind) => {
            return [...result, {x:curr, y:dataY[ind]}]
        }, []))
    }, [dataX, dataY])

    const GraphView = () => {
        switch (graphType) {
            case "line":
                return (
                    <div>
                        <Paper elevation={9} style={{ marginLeft: 100, marginTop: 100, maxWidth: 1000, maxHeight: "auto" }}>
                            <LineChart width={500} height={300} data={data} style={{ marginLeft: 210, }}>
                                <Tooltip></Tooltip>
                                <XAxis dataKey="x"/>
                                <YAxis dataKey={"y"}/>
                                <CartesianGrid stroke="#eee" strokeDasharray="10 10"/>
                                <Line type="monotone" dataKey="y" stroke={colors.red[700]} />
                            </LineChart>
                        </Paper>      
                    </div>
                )
                break;
            
            case "area":
                return (
                    <div>
                        <ResponsiveContainer width="100%" height="100%">
                            <Paper elevation={9} style={{ marginLeft: 100, marginTop: 100, maxWidth: 1000, maxHeight: "auto" }}>
                                <AreaChart
                                    width={500}
                                    height={400}
                                    data={data}
                                    style={{ marginLeft: 210, }}
                                    margin={{
                                        top: 10,
                                        right: 30,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="x" />
                                    <YAxis dataKey={"y"} />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="y" stroke="#8884d8" fill="#8884d8" />
                                </AreaChart>
                            </Paper>
                        </ResponsiveContainer>
                    </div>
                )
                break;
            case "shapebar":
                return (
                    <ResponsiveContainer width="100%" height="100%">
                        <Paper elevation={9} style={{ marginLeft: 100, marginTop: 100, maxWidth: 1000, maxHeight: "auto" }}>
                            <BarChart
                            width={500}
                            height={300}
                            data={data}
                            style={{ marginLeft: 210, }}
                            margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                            }}
                            >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="x" />
                            <YAxis dataKey={"y"} />
                            <Tooltip />
                            <Bar dataKey="y" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                            {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colorsType[index % 20]} />
                            ))}
                            </Bar>
                            </BarChart>
                        </Paper>
                    </ResponsiveContainer>
                    );
                    break;
                case "bar":
                    return (
                        <ResponsiveContainer width="100%" height="100%">
                            <Paper elevation={9} style={{ marginLeft: 100, marginTop: 100, maxWidth: 1000, maxHeight: "auto" }}>
                                <ComposedChart
                                    width={500}
                                    height={400}
                                    data={data}
                                    style={{ marginLeft: 210, }}
                                    margin={{
                                        top: 20,
                                        right: 20,
                                        bottom: 20,
                                        left: 20,
                                }}
                                >
                                <CartesianGrid stroke="#f5f5f5" />
                                <XAxis dataKey="x" scale="band" />
                                <YAxis dataKey={"y"}/>
                                <Tooltip />
                                <Legend />
                                <Area type="monotone" dataKey="y" fill="#8884d8" stroke="#8884d8" />
                                <Bar dataKey="y" barSize={20} fill="#413ea0" />
                                <Line type="monotone" dataKey="y" stroke="#ff7300" />
                                <Scatter dataKey="y" fill="red" />
                                </ComposedChart>
                            </Paper>
                        </ResponsiveContainer>
                    );
                break;
                case "scatter":
                    return (
                        <ResponsiveContainer width="100%" height="100%">
                            <Paper elevation={9} style={{ marginLeft: 100, marginTop: 100, maxWidth: 1000, maxHeight: "auto" }}>
                                <ScatterChart
                                    width={400}
                                    height={400}
                                    style={{ marginLeft: 210, }}
                                    margin={{
                                    top: 20,
                                    right: 20,
                                    bottom: 20,
                                    left: 20,
                                    }}
                                >
                                <CartesianGrid />
                                <XAxis  dataKey="x" />
                                <YAxis dataKey={"y"} />
                                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                <Scatter name="y" data={data} fill="#8884d8" />
                                </ScatterChart>
                            </Paper>
                        </ResponsiveContainer>                     
                    );
                    break;
                    case "pie":
                        return (
                            <ResponsiveContainer width="100%" height="100%">
                                <Paper elevation={9} style={{ marginLeft: 100, marginTop: 100, maxWidth: 1000, maxHeight: "auto" }}>
                                    <PieChart width={400} height={400} style={{ marginLeft: 210, }}>
                                            <Tooltip/>
                                        <Pie data={data} dataKey="x" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" />
                                        <Pie data={data} dataKey="y" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#82ca9d" label />
                                    </PieChart>
                                </Paper>
                            </ResponsiveContainer>      
                                );
                        break;
            default:
                break;
        }
    }

    return (
        <React.Fragment>
             <FormControl style={{marginTop:20}}>
                <FormLabel id="demo-row-radio-buttons-group-label">Select Graph Type</FormLabel>
                <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onClick={handleChangeGraphType}   
                >
                <FormControlLabel value="line" control={<Radio  />} label="LineGraph" />
                <FormControlLabel value="area" control={<Radio />} label="AreaGraph" />
                <FormControlLabel value="bar" control={<Radio />} label="LineBarAreaComposedChart" />
                <FormControlLabel value="scatter" control={<Radio />} label="SimpleScatterChart" />
                <FormControlLabel value="pie" control={<Radio />} label="TwoLevelPieChart" />
                <FormControlLabel value="shapebar" control={<Radio />} label="CustomShapeBarChart" />
                </RadioGroup>
            </FormControl> 
            <GraphView/>
        </React.Fragment>
    )
    
}

export default GraphPlot
