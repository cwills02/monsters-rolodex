import React, { Component } from 'react';
import { CardList } from './components/card-list/card-list';
import logo from './logo.svg';
import './App.css';
import { SearchBox } from './components/search-box/search-box';

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: '',
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => this.setState({monsters: users}))
  };

  handleChange = (e) => {
    this.setState({ searchField: e.target.value })
  };
  // arrow functions automatically allow you to set 'this' when the function is defined; 'this' gets automatically bound to the place where the arrow function was defined in the first place and the context of the arrow function is the App component

  render() {
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchField.toLowerCase())
    });

    return (
      <div className='App'>
        <h1>Monsters Rolodex</h1>
        <SearchBox
          placeholder='search monsters'
          handleChange={this.handleChange }
        />
        <CardList monsters={filteredMonsters} />
      </div>
    )
  }
}

export default App;

// this.setState is an asynchronous function, which is why we pass the console.log in as the 2nd paramter in the onChange to make sure the console.log is up to date and not 1 character behing like before
// in order to console.log successfully and see up to date info we have to pass the console.log in as the 2nd argument into the onChange property w/ the setState function
// REACT HAS  synthetic events such as onChange, which are first communicated to the virtual DOM 
// react is smart as it figures out the best way to update the DOM, we only communicate with the virtual DOM; we just declare that we want an update but leave it to the react bot to determine the best way to do this


// any time you want to use setState to update the state and there are props or state to use within the update, you should use a function instead of an object

/*
it used to be that if you ever want to use this.props inside of the constructor you must pass it as props into the constructor() and super()

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      meaningOfLife: 47 + this.props.increment,
    }
    this.props
  }

  can also write state as

  state = {
    meaningOfLife: 47
  }
  however you will not have acces to the props inside when you do it this way

handleClick = () => {
  this.setState((prevState, prevProps) => {
    return {meaningOfLife: prevState.meaningOfLife + prevProps.increment + 1}
  },
    () => console.log(this.state.meaningOfLife)
  )
}

}

in above function this is if increment was passed down from a parent component
*/