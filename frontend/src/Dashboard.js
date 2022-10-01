
import React, { Component } from 'react';

import { Input } from "semantic-ui-react";


// import { Input } from "semantic-ui-react";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
const onRowClick = (state, rowInfo, column, instance) => {
  return {
      onClick: e => {
        // return <Redirect to='/chart'  />
       
          // navigate("/chart");
        
        // this.context.history.push('/chart' );
        console.log('A Td Element was clicked!')
      
        
         
          // console.log('A Td Element was clicked!',state)
          // console.log('it produced this event:', e)
          // console.log('It was in this column:', column)
          console.log('It was in this row:', rowInfo)
          // console.log('It was in this table instance:', instance)
      }
  }
}


const axios = require('axios');
const originalData = [
  { DeviceId: "D-1567",  DeviceType: "Aircraft", Timestamp: '31-08-2022 10:05', location: 'L1' },
  
  { DeviceId: "D-1568",  DeviceType: "Personal", Timestamp: '31-08-2022 10:05', location: 'L3' },
  
  { DeviceId: "D-1569",  DeviceType: "Asset", Timestamp: '31-08-2022 10:15', location: 'L4' },
 
  { DeviceId: "D-1570",  DeviceType: "Personal", Timestamp: '31-08-2022 10:05', location: 'L3' },
  { DeviceId: "D-1571",  DeviceType: "Personal", Timestamp: '31-08-2022 10:05', location: 'L4' },

];



var data = []

export default class App extends React.Component {
  constructor(props,context) {
    super(props,context);
    this.state = {
      data:[],
      columns: [],
      // products:[],
      searchInput: "",
      token:''

    };
  }

  componentDidMount() {

    let token = localStorage.getItem('token');
    if (!token) {
      this.props.history.push('/login');
    } else {
      this.setState({ token: token }, () => {
        this.getProduct();
      });
    }

    let columns = [
      
      {
        Header: "Device Id",
        accessor: "DeviceId",
        sortable: true,
        show: true,
        url: true,
        displayValue: "DeviceId"
      },
      {
        Header: "Device Type",
        accessor: "DeviceType",
        sortable: true,
        show: true,
        displayValue: "DeviceType "
      },
      {
        Header: "Timestamp",
        accessor: "Timestamp",
        sortable: true,
        show: true,
        displayValue: " Timestamp "
      },
      {
        Header: "location",
        accessor: "location",
        sortable: true,
        show: true,
        displayValue: " location "
      },
      
      
    ];
    this.setState({ columns });
  }

  getProduct = () => {
    
    this.setState({ loading: true });

  
    axios.get(`http://localhost:2000/get-product`, {
      headers: {
        'token': this.state.token
      }
    }).then((res) => {
      this.setState({ loading: false, data: res.data.products,'token': this.state.token });
    }).catch((err) => {
      console.log(err)
      this.setState({ loading: false, products: [], pages: 0 },()=>{});
    });
  }



  handleChange = event => {
    this.setState({ searchInput: event.target.value }, () => {
      this.globalSearch();
    });
  };

  globalSearch = () => {
    let { searchInput } = this.state;
    let filteredData = originalData.filter(value => {
      return (
        value.DeviceType.toLowerCase().includes(searchInput.toLowerCase()) ||
        value.DeviceId.toLowerCase().includes(searchInput.toLowerCase()) ||
        value.location
          .toString()
          .toLowerCase()
          .includes(searchInput.toLowerCase())
      );
    });
    this.setState({ data: filteredData });
  };

  

  render() {
    let { data, columns, searchInput } = this.state;
    return (
      <div>
        <br />
        <Input
          size="large"
          name="searchInput"
          value={searchInput || ""}
          onChange={this.handleChange}
          label="Search"
        />
        <br />
        <br />
        <ReactTable
       
   
          getTrProps={onRowClick}
          data={data}
          columns={columns}
          defaultPageSize={5}
           
          className="-striped -highlight"
        />
      </div>
    );
  }
}


