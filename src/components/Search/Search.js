import React, { Component } from 'react';
import './Search.css';
const Autocomplete = require('react-autocomplete-custom-input');

class Search extends Component {

  constructor(props) {
    super(props);
    this.swapiSearch = this.props.swapiSearch.bind(this);
    this.selectCharacter = this.props.selectCharacter.bind(this);
  }

  render() {
    return (
      <div className="search">
        <Autocomplete
          getItemValue={(item) => item.name}
          items={this.props.searchResults}
          value={this.props.value}
          renderItem={(item, isHighlighted) =>
            <div key={item.name} style={{
              background: isHighlighted ? 'lightgray' : 'white',
              color: 'black',
              padding: '.2em',
            }}>
              {item.name}
            </div>
          }
          onChange={this.swapiSearch}
          onSelect={(value, item) => this.selectCharacter({ value, item })}
          placeholder="Star wars character finder"
        />
      </div>
    );
  }
}

export default Search;