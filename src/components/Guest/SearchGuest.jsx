import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
const options = [
  { label: 'First Name',  value: 'First Name' },
  { label: 'Last Name', value: 'Last Name' }
]
class SearchGuest extends Component {
  searchGuest(name){
    axios.get("http://localhost:8080/HotelBooking/rest/guests?firstName="+name).then((response)=>{
    
    });
  }
  render() {
    return (
    <div className="row">
      <div className="col-md-9"></div>
      <div className="col-md-2.5">
        <Select  placeholder="Choose by..."options={ options } isSearchable={false}/>
        <div className="input-container">
        <i className="material-icons">search</i>
        <input className="searchBox " type="search" placeholder="Search" />
        <button className="searchButton" onClick={this.searchGuest.bind(this)}>Search</button>
        </div>
      </div>
    </div>
    )
  }
}
// 
export default SearchGuest