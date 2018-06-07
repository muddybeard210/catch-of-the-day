import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  componentDidMount() {
    // fetch("https://pokeapi.co/api/v2/pokemon/1").then(results => {
    //   console.log(results.json());
    // });
    const storeID = this.props.match.params.storeID;
    const localStorageRef = localStorage.getItem(storeID);

    if (localStorageRef) {
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }

    // this.databseReference is a made up custom name.  not built in.
    this.databaseReference = base.syncState(`${storeID}/fishes`, {
      context: this,
      state: "fishes"
    });
  }
  componentDidUpdate() {
    const storeID = this.props.match.params.storeID;
    localStorage.setItem(storeID, JSON.stringify(this.state.order));
  }

  componentWillUnmount() {
    base.removeBinding(this.databaseReference);
  }

  addFish = fish => {
    // 1. Take copy of existing state
    const fishes = { ...this.state.fishes };
    // 2. Add new fish to fishes variable
    fishes[`fish${Date.now()}`] = fish;
    // 3. Set the new fishes object to state;
    this.setState({
      fishes: fishes
    });
  };

  updateFish = (key, updatedFish) => {
    //1. Take a copy of current state
    const fishes = { ...this.state.fishes };
    //2. update that state
    fishes[key] = updatedFish;
    //3. set that to state
    this.setState({
      fishes: fishes
    });
  };

  deleteFish = key => {
    const fishes = { ...this.state.fishes };

    fishes[key] = null;

    this.setState({
      fishes: fishes
    });
  };

  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes
    });
  };
  addToOrder = key => {
    // 1. Take a copy of state
    const order = { ...this.state.order };
    // 2. Either add to the order or update the number in our order
    order[key] = order[key] + 1 || 1;
    // 3. Call setState to update our state object
    this.setState({
      order: order
    });
  };

  removeFromOrder = key => {
    const order = { ...this.state.order };
    delete order[key];
    this.setState({
      order: order
    });
  };
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          removeFromOrder={this.removeFromOrder}
          order={this.state.order}
        />
        <Inventory
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          storeID={this.props.match.params.storeID}
        />
      </div>
    );
  }
}

export default App;
