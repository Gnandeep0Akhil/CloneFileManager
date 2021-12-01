import React, { Component } from 'react'

export class FolderName extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fName: null,
    };
  }

  handleChangeFn = (event) => {
    this.setState({ fName: event.target.value });
  };

  handleSubmit = (event) => {
    this.props.addFolder(this.state.fName);
    this.props.setTrigger(false);
    event.preventDefault();
  };

  render() {
    return (
      <div className="popup">
        <div className="popup-inner">
          <button onClick={() => this.props.setTrigger(false)}>close</button>
          <form onSubmit={this.handleSubmit}>
            <label>
              Folder name:
              <input
                type="text"
                name="fName"
                value={this.state.fName || ""}
                onChange={this.handleChangeFn}
              />
            </label>
            <br />
            <input type="submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default FolderName
