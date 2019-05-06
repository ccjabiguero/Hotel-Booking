import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
const options = [
  { label: 'CheckIn',  value: 'CheckIn' },
  { label: 'CheckOut', value: 'CheckOut' }
]
class SearchBooking extends Component {
  
  render() {
    return (
    <div className="row">
      <div className="col-md-9"></div>
      <div className="col-md-2.5">
        <Select  placeholder="Choose by..."options={ options } isSearchable={false}/>
        <div className="input-container">
        <i className="material-icons">search</i>
        <input className="searchBox " type="search" placeholder="Search" />
        <button className="searchButton" >Search</button>
        </div>
      </div>
    </div>
    )
  }
}
// 
export default SearchBooking