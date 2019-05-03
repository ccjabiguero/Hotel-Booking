import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class SearchGuest extends React.Component {
  handleInputChange = event => {
    const query = event.target.value;

    this.setState(prevState => {
      const filteredData = prevState.data.filter(element => {
        return element.name.toLowerCase().includes(query.toLowerCase());
      });

      return {
        query,
        filteredData
      };
    });
  };

  getData = () => {
    fetch(`http://localhost:4000/restaurants`)
      .then(response => response.json())
      .then(data => {
        const { query } = this.state;
        const filteredData = data.filter(element => {
          return element.name.toLowerCase().includes(query.toLowerCase());
        });

        this.setState({
          data,
          filteredData
        });
      });
  };

  componentWillMount() {
    this.getData();
  }

  render() {
    return (
        <p>Search by First Name
        {/* <div className="searchForm">
        <form>
          <input
            placeholder="Search for..."
            value={this.state.query}
            onChange={this.handleInputChange}
          />
        </form>
        <div>{this.state.filteredData.map(i => <p>{i.name}</p>)}</div>
      </div> */}
      </p>
    );
  }
}