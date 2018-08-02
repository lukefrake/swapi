import React, { Component } from 'react';
import './App.css';
import Autocomplete from './components/Search/Search';
const Swapi = require('swapi-node');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      inputVal: '',
      item: {},
      searching: null
    };
    this.swapi = this.swapi.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.selectCharacter = this.selectCharacter.bind(this);
  }

  // Load up  the results for our autocomplete pre render
  componentDidMount() {
    this.swapi();
  }

  // Takes an event and lookup in the SWAPI
  // @value {string} [value] the value to be searched
  swapi (value = "") {
    // Check if we're already looking
    if (this.state.searching != null) {
      // Cancel the previous request
      clearTimeout(this.state.searching);
    }

    this.setState({
      searching: setTimeout(() => {Swapi.get(`https://swapi.co/api/people/?search=${value}`).then((result) => {
        this.setState({searchResults: result.results, searching: null});
      })}, 200)
    });
  }

  // Takes an event and lookup in the SWAPI
  // @event {object} JavaScript event
  handleSearch (event) {
    this.setState({
      value: event.target.value,
      flip: '',
    });
    this.swapi(event.target.value)
  }

  // Maintain the state of the chosen character and handle the card state
  // @value {string} The 'name' of the character
  // @item {object} The data about the current character
  selectCharacter ( {value, item} ) {
    this.setState( {
      value,
      item,
      flip: 'flip'
    });
  }

  render() {
    return (
      <div className="app">
        <h1>STAR WARS</h1>
        <h2>Character fact finder</h2>
        <Autocomplete searchResults={this.state.searchResults} value={this.state.value} swapiSearch={this.handleSearch} selectCharacter={this.selectCharacter}/>
        <div className="flipContainer">
          <div className={`flipContainer_flipper ${this.state.flip}`}>
            <div className="flipContainer_side card card-back">
            </div>
            <div className="flipContainer_side flipContainer_side-back card">
              <div className="card_inner">
                <div className="card_header">
                  <div className="card_logo">
                    <img className="respImage" src="http://pngimg.com/uploads/star_wars_logo/star_wars_logo_PNG14.png" alt="STAR WARS logo"/>
                  </div>
                  <h3 className="card_name">{this.state.item.name}</h3>
                </div>
                <img className="respImage card_image" src="http://wirelesssoul.net/amazing-wallpapers/lego-star-wars-image-On-HD-Wallpaper.jpg" alt="character holding banner"/>
                <ul className="card_stats">
                  <li className="card_stat">Height<span className="card_statChild">{this.state.item.height} cm</span></li>
                  <li className="card_stat">Mass<span className="card_statChild">{this.state.item.mass} kg</span></li>
                  <li className="card_stat">Eye colour<span className="card_statChild">{this.state.item.eye_color}</span></li>
                  <li className="card_stat">Birth year<span className="card_statChild">{this.state.item.birth_year}</span></li>
                  <li className="card_stat">Skin colour<span className="card_statChild">{this.state.item.skin_color}</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
