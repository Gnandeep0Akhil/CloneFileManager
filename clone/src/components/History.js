import React, { Component } from 'react'
import HistoryIcon from './HistoryIcon'

export class History extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    

    render() {
        return (
          <div className="History">
            {this.props.history.map((item) => (
              <HistoryIcon changeDisplayH={this.props.changeDisplayH} paint={item}/>
            ))}
          </div>
        );
    }
}

export default History
