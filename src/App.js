import React, { useState } from "react";
import GraphPlot from "./components/graphPlot";
import { Box, Button, Grid, Paper } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from "@mui/system";


function csvTextSentenceToNumArr(text) {
    let resultArr = [];

    if (text !==null && text.length !== 0) {
        let splitedText = text.split(",")

        for (let ind = 0; ind < splitedText.length; ind++){
            let dataKey = null
            try {
                dataKey = parseInt(splitedText[ind].trim());
            } catch {
                console.log("issue")
                dataKey = 0;
                throw Error 
            }
            if (isNaN(dataKey)) {
                dataKey = 0;
            }
            resultArr.push(dataKey);
        }
    }
    return resultArr
}

function App() {
    const [file, setFile] = useState();
    const [fileY, setFileY] = useState();
    const [x, setX] = useState([]);
    const [y, setY] = useState([]);
    const [plotGraph, setPlotGraph] = useState(false);

    

    const fileReader = new FileReader();
    const handleOnChange = (e) => {
      setFile(e.target.files[0]);
    };

    const handleOnChangeY = (e) => {
        setFileY(e.target.files[0]);
    };
    

    const handleOnSubmit = (e) => {
      e.preventDefault();
      if (file) {
        fileReader.onload = function (event) {
            const text = event.target.result;
            setX(csvTextSentenceToNumArr(text));
          };
          
        }
        fileReader.readAsText(file);
    };
    const handleOnSubmitY = (e) => {
        e.preventDefault();
        if (fileY) {
          fileReader.onload = function (event) {
              const text = event.target.result;
              setY(csvTextSentenceToNumArr(text));
            };
            
          }
          fileReader.readAsText(fileY);
    };
    const handlePlotGraph = () => {
        if (x.length === 0) {
            toast.error("Please upload x-axis data")
            return 
        }
        if (y.length === 0) {
            toast.error("Please upload y-axis data")
            return 
        }
        if (y.length !== x.length ) {
            toast.error("Please upload same length data")
            return 
        }
         
        setPlotGraph(true)
        toast.success("Graph Plotted Successfully!")
    }

    console.log(x, y)
    return (
        <React.Fragment>
            <ToastContainer />
                <Container>
                    <Paper elevation={5} style={{minWidth:1200,minHeight:600}}>
                        <div style={{ textAlign: "center" , marginTop:30, padding:20 }}>
                            <form>
                                <Grid container>
                                    <Grid xs={12} md={12} sm={12}>
                                        <label>Choose X-Axis file </label>
                                        <input
                                            type={"file"}
                                            id={"csvFileInput"}        
                                            accept={".csv"}
                                            onChange={handleOnChange}
                                        />

                                        <Button
                                            color='primary'
                                            variant='outlined' 
                                            size="small"
                                            onClick={(e) => {
                                                handleOnSubmit(e);
                                            }}
                                        >
                                        IMPORT CSV
                                        </Button>
                                    
                                    </Grid>
                                </Grid>
                            <br />
                            <br/>
                                <Grid container>
                                    <Grid xs={12} md={12} sm={12}>
                                        <label>Choose Y-Axis file </label>
                                        <input
                                        type={"file"}
                                        id={"csvFileInput"}        
                                        accept={".csv"}
                                        onChange={handleOnChangeY}
                                        />

                                        <Button
                                        color='primary'
                                        variant='outlined' 
                                        size="small"
                                        onClick={(e) => {
                                        handleOnSubmitY(e);
                                        }}
                                        >
                                        IMPORT CSV
                                        </Button>      
                                        
                                    </Grid>
                                </Grid>
                            </form>
                                <br />
                                <br/>
                            <Button
                            onClick={handlePlotGraph}
                            color='primary'
                            variant='contained'
                            >
                            Plot Graph 
                            </Button>

                            {plotGraph && <GraphPlot dataX={x} dataY={y} />}
                        
                            
                            
                        
                                                         
                        </div>
                    
                    </Paper>
                </Container>
        </React.Fragment>
  );
}

export default App;
