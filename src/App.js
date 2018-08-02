import React, { Component } from 'react';
import './App.css';
const swapi = require('swapi-node');
const Autocomplete = require('react-autocomplete-custom-input');

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      inputVal: '',
      item: {},
    };
    this.swapiSearch = this.swapiSearch.bind(this);
    this.selectCharacter = this.selectCharacter.bind(this);
  }

  // Handles the lookup against API
  swapiSearch (event) {
    this.setState({
      value: event.target.value,
      flip: ''
    });
    swapi.get(`https://swapi.co/api/people/?search=${event.target.value}`).then((result) => {
      this.setState({searchResults: result.results});
    });
  }

  selectCharacter ( {value, item} ) {
    this.setState( {
      value,
      item,
      flip: 'flip'
    });
  }

  render() {
    return (
      <div className="App">
        <h1>STAR WARS</h1>
        <h2>Character fact finder</h2>
        <div className="Search">
          <Autocomplete
            getItemValue={(item) => item.name}
            items={this.state.searchResults}
            renderItem={(item, isHighlighted) =>
              <div style={{
                background: isHighlighted ? 'lightgray' : 'white',
                color: 'black',
                padding: '.2em',
              }}>
                {item.name}
              </div>
            }
            value={this.state.value}
            onChange={this.swapiSearch}
            onSelect={(value, item) => this.selectCharacter({ value, item })}
            placeholder="Star wars character finder"
          />
        </div>
        <div className="flipContainer">
          <div className={`flipContainer_flipper ${this.state.flip}`}>
            <div className="flipContainer_side Card CardBack ">
            </div>
            <div className="Card flipContainer_side flipContainerback flipContainer_side-back">
              <div className="Card_inner">
                <div className="Card_header">
                  <div className="Card_logo">
                    <img className="respImage" src="http://pngimg.com/uploads/star_wars_logo/star_wars_logo_PNG14.png" alt="STAR WARS logo"/>
                  </div>
                  <h3 className="Card_name">{this.state.item.name}</h3>
                </div>
                <img className="respImage Card_image" src="http://wirelesssoul.net/amazing-wallpapers/lego-star-wars-image-On-HD-Wallpaper.jpg" alt="character holding banner"/>
                <ul className="Card_stats">
                  <li className="Card_stat">Height<span className="Card_statChild">{this.state.item.height} cm</span></li>
                  <li className="Card_stat">Mass<span className="Card_statChild">{this.state.item.mass} kg</span></li>
                  <li className="Card_stat">Eye colour<span className="Card_statChild">{this.state.item.eye_color}</span></li>
                  <li className="Card_stat">Birth year<span className="Card_statChild">{this.state.item.birth_year}</span></li>
                  <li className="Card_stat">Skin colour<span className="Card_statChild">{this.state.item.skin_color}</span></li>
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
