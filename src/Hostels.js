import React, { Component } from "react";
import axios from 'axios';
import DataTable from './components/hostels-data'

class Hostels extends Component {
  
  constructor(props) {
    super(props);
    this.state = { allHostels: [] };
}

  componentDidMount() {
    axios.get('http://localhost:3001/hostels?')
        .then(res => {
            this.setState({ allHostels: res.data });
        })
        .catch(function (error) {
            console.log(error);
        })
}

  dataTable() {
    return this.state.allHostels.map((data, i) => {
        return <DataTable obj={data} key={i} />;
    });
}
  render() {
    return (
      <div>
        <h2>Hostels</h2>
        <div className="wrapper-users">
                <div className="container">
                    <table className="table table-striped table-dark">
                        <thead className="thead-dark">
                            <tr>
                                <td>ID</td>
                                <td>Name</td>
                                <td>Address</td>
                                <td>Postcode</td>
                                <td>Email</td>
                                <td>Description</td>                              
                            </tr>
                        </thead>
                        <tbody>
                            {this.dataTable()}
                        </tbody>
                    </table>
                </div>
            </div>
        
      </div>
    );
  }
}
 
export default Hostels;