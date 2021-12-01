import React, { Component } from 'react'

export class Folder extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    

    render() {
        return (
          <div
            className="Folder"
            onClick={() => {
              this.props.setFolder(this.props.display, this.props.paint);
            }}
            onDragOver={(e) => {
              this.props.onDragOver(e);
            }}
            onDrop={(e) => {
              this.props.onDrop(e, this.props.display, this.props.paint);
            }}
          >
            <div>{this.props.paint.toUpperCase()}</div>
          </div>
        );
    }
}

export default Folder
