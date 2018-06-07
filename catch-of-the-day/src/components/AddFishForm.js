import React from "react";

class AddFishForm extends React.Component {
  nameInput = React.createRef();
  priceInput = React.createRef();
  statusInput = React.createRef();
  descInput = React.createRef();
  imageInput = React.createRef();
  createFish = event => {
    // 1. Stop event from submitting
    event.preventDefault();
    // 2.
    const fish = {
      name: this.nameInput.value.value,
      price: parseFloat(this.priceInput.value.value),
      status: this.statusInput.value.value,
      desc: this.descInput.value.value,
      image: this.imageInput.value.value
    };
    this.props.addFish(fish);
    event.currentTarget.reset();
  };
  render() {
    return (
      <form action="" className="fish-edit" onSubmit={this.createFish}>
        <input
          name="name"
          ref={this.nameInput}
          type="text"
          placeholder="Name"
        />
        <input
          name="price"
          ref={this.priceInput}
          type="text"
          placeholder="Price"
        />
        <select name="status" ref={this.statusInput} placeholder="Status">
          <option value="available">Fresh</option>
          <option value="unavailable">Sold Out</option>
        </select>
        <textarea name="desc" ref={this.descInput} placeholder="Desc" />
        <input
          name="image"
          ref={this.imageInput}
          type="text"
          placeholder="Image"
        />
        <button type="submit">Add Fish</button>
      </form>
    );
  }
}

export default AddFishForm;
