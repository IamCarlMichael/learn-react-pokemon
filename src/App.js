import React from "react";
import logo from "./logo.svg";
import "./App.css";
import rawData from "./pokemon/pokemon";

const SinglePokemon = props => {
  return (
    <div className={"PokemonCard"}>
      <img src={require(`./pokemon/${props.id}.png`)} alt="Picture" />
      <h2>{props.name}</h2>
      <h4 className={"type"}>
        {props.type.map(element => (
          <p className={"elementtype"}>{element}</p>
        ))}
      </h4>
      <div className={"stats"}>
        <p>{"HP: " + props.hp}</p>
        <p>{"Attack: " + props.Attack}</p>
        <p>{"SpAttack: " + props.SpAttack}</p>
        <p>{"SpDefence: " + props.SpDefence}</p>
        <p>{"Speed: " + props.Speed}</p>
      </div>
    </div>
  );
};

const MapPokemon = props => {
  return props.map(item => (
    <SinglePokemon
      id={item.id}
      name={item.name.english}
      type={item.type}
      hp={item.base.HP}
      Attack={item.base.Attack}
      SpAttack={item.base.SpAttack}
      SpDefence={item.base.SpDefence}
      Speed={item.base.Speed}
    />
  ));
};

class Pokemon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemonData: []
    };
  }

  componentDidMount() {
    fetch(
      "https://us-central1-pokedex-23fb6.cloudfunctions.net/app/pokemonData"
    )
      .then(res => res.json())
      .then(resInJson =>
        this.setState(state => {
          return { pokemonData: resInJson };
        })
      );
  }

  DisplayAllPokemon = () => {
    return MapPokemon(this.state.pokemonData);
  };

  render() {
    return <div>{this.DisplayAllPokemon()}</div>;
  }
}

function App() {
  return (
    <div className="App">
      <Pokemon />
    </div>
  );
}

export default App;
