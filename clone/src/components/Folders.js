import React, { Component } from 'react'
import Folder from './Folder'
import FolderButton from './FolderButton'

export class Folders extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }

    render() {
        return (
          <>
            <div className="LineTwo">
              <div className="label">Folders</div>
              <FolderButton
                setTrigger={this.props.setTrigger}
                display={this.props.display}
                setDepthName={this.props.setDepthName}
              />
            </div>
            <div className="FolderContainer">
              {this.props.folder.map((item) => (
                <Folder
                  paint={item[1]}
                  display={this.props.display}
                  setFolder={this.props.setFolder}
                  onDragOver={this.props.onDragOver}
                  onDrop={this.props.onDrop}
                />
              ))}
            </div>
          </>
        );
    }
}

export default Folders
