import React, { useEffect, useState } from 'react'
import { ButtonGroup,Button, GridRow, GridColumn, Grid, Menu,Segment,Header } from 'semantic-ui-react'
import Chart from "./utils/ChartPie";
import ChartIncome from "./utils/ChartPieIncome";
const GridExampleTextAlignmentCenter = () => {
  const [data, setData] = useState([1,0]);
  const [load, setLoad] = useState(false);
  const handlePerRowsChange =  (newPerPage) => {
    setData(newPerPage);
  
  };
  useEffect(() => {
    console.log(data)
  }, []);
return(
  <Segment >
    <ButtonGroup style={{display:'none'}}>
    <Button onClick={()=>{handlePerRowsChange([1,0])}} >One</Button>
    <Button onClick={()=>{handlePerRowsChange([2,1])}}>Two</Button>
    <Button onClick={()=>{setLoad(!load)}}>Three</Button>
  </ButtonGroup>
  <Grid textAlign='center' columns={3}>
    <GridRow>
    <GridColumn>
    <Header as='h2' attached='top'>
    Deposits
    </Header>
    <Segment color='green' attached>
      <Chart mode="Deposit" day={data[0]}/>
     
      
   
      <Chart mode="Deposit"  day={data[1]}/>
      </Segment>
      </GridColumn>
      <GridColumn>
      <Header as='h2' attached='top'>
      Cashouts
    </Header>
    <Segment color='red' attached>
      
      <Chart mode="Cashout"  day={data[0]}/>
    
     
   
      <Chart mode="Cashout"  day={data[1]}/></Segment>
      </GridColumn>
      <GridColumn>
      <Header as='h2' attached='top'>
      PokerRakes
    </Header>
    <Segment color='blue' attached>
      
      <ChartIncome mode="Income"  day={data[0]}/>
    
     
   
      <ChartIncome mode="Income"  day={data[1]}/></Segment>
      </GridColumn>
    </GridRow>
  </Grid></Segment>
)
}

export default GridExampleTextAlignmentCenter