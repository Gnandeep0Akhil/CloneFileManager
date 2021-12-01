import React, { Component } from 'react'
import File from './File'
import FileButton from './FileButton'

export class Files extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    

    render() {
        return (
          <>
            <div className="FourthLine">
              <div className="label">Files</div>
              <FileButton
                setDepthName={this.props.setDepthName}
                display={this.props.display}
                addFile={this.props.addFile}
              />
            </div>
            <div className="FileContainer">
              {this.props.file.map((item) => (
                <File paint={item} onDragStart={this.props.onDragStart} />
              ))}
            </div>
          </>
        );
    }
}

export default Files
