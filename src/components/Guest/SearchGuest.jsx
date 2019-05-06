import React, { Component } from 'react'
import { Dropdown } from 'semantic-ui-react'
import {Button} from 'reactstrap'
import { MDBIcon, MDBFormInline, MDBBtn } from "mdbreact";

import Select from 'react-select';
const options = [
  { label: 'First Name',  value: 'First Name' },
  { label: 'Last Name', value: 'Last Name' }
]

class SearchGuest extends Component {
  render() {

    return (
    <div className="row">
      <div className="col-md-9"></div>
      <div className="col-md-2.5">
        <Select  placeholder="Choose by..."options={ options } isSearchable={false}/>
        <div className="input-container">
        <i className="material-icons">search</i>
        <input className="searchBox " type="search" placeholder="Search" />
        </div>
      </div>
    </div>
    )
  }
}
// <Button color="primary" >Search</Button>
export default SearchGuest