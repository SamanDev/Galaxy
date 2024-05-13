import React from 'react'
import { MenuItem, GridRow, GridColumn, Grid, Menu,Segment,Header } from 'semantic-ui-react'
import Chart from "./utils/ChartPie";
const GridExampleTextAlignmentCenter = () => (
  <Segment >
  <Grid textAlign='center' columns={3}>
    <GridRow>
    <GridColumn>
    <Header as='h2' attached='top'>
    Deposits
    </Header>
    <Segment color='green' attached>
      <Chart mode="Deposit" day="1"/>
     
      
   
      <Chart mode="Deposit"  day="0"/>
      </Segment>
      </GridColumn>
      <GridColumn>
      <Header as='h2' attached='top'>
      Cashouts
    </Header>
    <Segment color='red' attached>
      
      <Chart mode="Cashout"  day="1"/>
    
     
   
      <Chart mode="Cashout"  day="0"/></Segment>
      </GridColumn>
      <GridColumn>
        <Menu fluid vertical>
          <MenuItem className='header'>Monkeys</MenuItem>
        </Menu>
      </GridColumn>
    </GridRow>
  </Grid></Segment>
)

export default GridExampleTextAlignmentCenter