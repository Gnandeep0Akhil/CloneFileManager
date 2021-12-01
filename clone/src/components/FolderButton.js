import React, { Component } from 'react'

export class FolderButton extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    

    render() {
        return (
            <div className="FolderButton" onClick={()=>{this.props.setTrigger(true); this.props.setDepthName(this.props.display)}}>AddFolder</div>
        )
    }
}

export default FolderButton
