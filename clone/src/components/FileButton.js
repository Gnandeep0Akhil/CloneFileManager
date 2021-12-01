import React, { Component } from 'react'

export class FileButton extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleChange = (event) => {
    var files = event.target.files;
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (e) => {
      this.props.addFile(
        e.target.result,
        this.props.display,
        event.target.files[0].type,
        event.target.files[0].name
      );
    };
  };

  render() {
    return (
      <div className="FileButton">
        <input
          type="file"
          name="file"
          className="upload"
          onChange={this.handleChange}
        />
        <span>Upload</span>
      </div>
    );
  }
}

export default FileButton
