import React, { Component } from 'react'

export class HistoryIcon extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    

    render() {
        return (
            <button className="ButtonHistory" onClick={()=>{this.props.changeDisplayH(this.props.paint);}}>{this.props.paint[1]}</button>
        )
    }
}

export default HistoryIcon
