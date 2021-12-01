import React, { Component } from 'react'
import { Document, Page, pdfjs } from "react-pdf";

export class File extends Component {

    constructor(props) {
        super(props)
        pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
        this.state = {
            
        }
    }
    

    render() {
        var type = this.props.paint[1];
        if(type === 'application/pdf'){
          return (
            <div
              className="File"
              draggable
              onDragStart={(e) => {
                this.props.onDragStart(e, this.props.paint);
              }}
            >
              <Document file={this.props.paint[0]}>
                <Page pageNumber={1} />
              </Document>
              <div className="name">{this.props.paint[2]}</div>
            </div>
          );
        }else if(type === 'image/jpeg' || 'image/png'){
          return (
            <div
              className="File"
              draggable
              onDragStart={(e) => {
                this.props.onDragStart(e, this.props.paint);
              }}
            >
              <img src={this.props.paint[0]} alt={this.props.paint[2]}></img>
              <div className="name">{this.props.paint[2]}</div>
            </div>
          );
        }
    }
}

export default File
