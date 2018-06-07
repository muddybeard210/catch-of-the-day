import React from "react";
import { formatPrice } from "../helpers";
import PropTypes from "prop-types";

class Fish extends React.Component {
  handleClick = () => {
    this.props.addToOrder(this.props.index);
  };
  static propTypes = {
    details: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      desc: PropTypes.string,
      statu: PropTypes.string,
      price: PropTypes.number
    }),
    addToOrder: PropTypes.func
  };
  render() {
    const { image, name, price, desc, status } = this.props.details;
    const isAvailable = status === "available";
    return (
      <div className="menu-fish">
        <li>
          <img src={image} alt={name} />
          <h3 className="fish-name">
            {name}
            <span className="price">{formatPrice(price)}</span>
          </h3>
          <p>{desc}</p>
          <button disabled={!isAvailable} onClick={this.handleClick}>
            {isAvailable ? "Add to Order" : "SOLD OUT"}
          </button>
        </li>
      </div>
    );
  }
}

export default Fish;
