import './App.css';
import React, { Component } from 'react'
import History from './components/History';
import Folders from './components/Folders';
import Files from './components/Files';
import FolderName from './components/FolderName';

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      final: [[0, "Root", [], []]],
      history: [[0, "Root"]],
      folder: [],
      file: [],
      trigger: false,
      display: [],
      eDepth: null,
      eName: null,
    };
  }

  componentDidMount() {
    var len = this.state.final.length;
    for (let i = 0; i < len; i++) {
      if (this.state.final[i][0] === 0 && this.state.final[i][1] === "Root") {
        this.setState({ folder: this.state.final[i][2] });
        this.setState({ file: this.state.final[i][3] });
        this.setState({ display: this.state.final[i] });
      }
    }
  }

  setTrigger = (value) => {
    this.setState({ trigger: value });
  };

  setDepthName = (display) => {
    // change eDepth && eName
    this.setState({ eDepth: display[0] });
    this.setState({ eName: display[1] });
  };

  changeDisplayH = (array) => {
    //history state
    //setFolder//
    //display
    var depth = array[0];
    var name = array[1];
    var len = this.state.final.length;
    for (let i = 0; i < len; i++) {
      if (this.state.final[i][0] === depth && this.state.final[i][1] === name) {
        this.setState({ display: this.state.final[i] });
        this.setState({ folder: this.state.final[i][2] });
        this.setState({ file: this.state.final[i][3] });
      }
    }
    var pointer = null;
    for (let j = 0; j < this.state.history.length; j++) {
      if (this.state.history[j] === array) {
        pointer = j;
      }
    }
    var res = [];
    for(let i=0; i<=pointer; i++){
      var item = this.state.history[i];
      res = [...res, item];
    }
    this.setState({ history: [...res] });
  };

  setFolder = (display, value) => {
    //change folder state
    //change file state
    //history state
    //display
    var len = this.state.final.length;
    for (let i = 0; i < len; i++) {
      if (
        this.state.final[i][0] === display[0] + 1 &&
        this.state.final[i][1] === value
      ) {
        this.setState({ folder: this.state.final[i][2] });
        this.setState({ file: this.state.final[i][3] });
        this.setState({ display: this.state.final[i] });
        this.setState({
          history: [...this.state.history, [display[0] + 1, value]],
        });
      }
    }
  };

  addFolder = (value) => {
    //only change final and folder state
    var len = this.state.final.length;
    var res = [];
    for (let i = 0; i < len; i++) {
      if (
        this.state.final[i][0] === this.state.eDepth &&
        this.state.final[i][1] === this.state.eName
      ) {
        var newPaint = [this.state.eDepth + 1, value, [], []];
        var newPaint2 = [
          ...this.state.final[i][2],
          [this.state.eDepth + 1, value],
        ];
        var newState = [
          this.state.final[i][0],
          this.state.final[i][1],
          [...newPaint2],
          this.state.final[i][3],
        ];
        this.setState({ folder: newPaint2 });
        this.setState({ file: this.state.final[i][3] });
        res = [...res, [...newState], [...newPaint]];
      } else {
        res = [...res, [...this.state.final[i]]];
      }
    }
    this.setState({ final: [...res] });
  };

  addFile = (target, display, type, name) => {
    //only change final and file state
    var len = this.state.final.length;
    var res = [];
    // var path = target.value;
    for (let i = 0; i < len; i++) {
      if (
        this.state.final[i][0] === display[0] &&
        this.state.final[i][1] === display[1]
      ) {
        var newPaint = [...this.state.final[i][3], [target, type, name]];
        var newState = [
          this.state.final[i][0],
          this.state.final[i][1],
          this.state.final[i][2],
          [...newPaint],
        ];
        this.setState({ folder: this.state.final[i][2] });
        this.setState({ file: newPaint });
        res = [...res, [...newState]];
      } else {
        res = [...res, [...this.state.final[i]]];
      }
    }
    this.setState({ final: [...res] });
  };

  onDragStart = (e, paint) => {
    e.dataTransfer.setData("name", paint[2]);
    e.dataTransfer.setData("type", paint[1]);
    e.dataTransfer.setData("data", paint[0]);
  }

  onDragOver = (e) => {
    e.preventDefault();
  }

  onDrop = (e, display, paint) => {
    var data = e.dataTransfer.getData("data");
    var type = e.dataTransfer.getData("type");
    var name = e.dataTransfer.getData("name");
    var res = [];
    for (let i = 0; i < this.state.final.length; i++) {
      if (
        this.state.final[i][0] === display[0] + 1 &&
        this.state.final[i][1] === paint
      ) {
        var newPaint = [...this.state.final[i][3], [data, type, name]];
        var newState = [
          this.state.final[i][0],
          this.state.final[i][1],
          this.state.final[i][2],
          [...newPaint],
        ];
        res = [...res, [...newState]];
      } else {
        res = [...res, [...this.state.final[i]]];
      }
    }
    this.deleteData(e, display, res);
  }

  deleteData = (e, display, res) => {
    var data = e.dataTransfer.getData("data");
    var type = e.dataTransfer.getData("type");
    var name = e.dataTransfer.getData("name");
    var ref = [data, type, name];
    var resD = [];
    for (let i = 0; i < res.length; i++) {
      if (
        res[i][0] === display[0] &&
        res[i][1] === display[1]
      ) {
        var loop = res[i][3];
        var len = loop.length;
        var newPaint = [];
        for(let j=0; j<len; j++){
          if (loop[j][0] !== ref[0] && loop[j][2] !== ref[2]) {
            newPaint = [...newPaint, loop[j]];
          }
        }
        var newState = [
          res[i][0],
          res[i][1],
          res[i][2],
          [...newPaint],
        ];
        resD = [...resD, [...newState]];
        this.setState({ file: newPaint });
      } else {
        resD = [...resD, [...res[i]]];
      }
    }
    this.setState({ final: [...resD] });
  }

  render() {
    if (this.state.trigger) {
      return (
        <div className="main">
          <History
            history={this.state.history}
            changeDisplayH={this.changeDisplayH}
          />
          <Folders
            folder={this.state.folder}
            setTrigger={this.setTrigger}
            display={this.state.display}
            setDepthName={this.setDepthName}
            setFolder={this.setFolder}
            onDragOver={this.onDragOver}
            onDrop={this.onDrop}
          />
          <Files
            file={this.state.file}
            addFile={this.addFile}
            display={this.state.display}
            setDepthName={this.setDepthName}
            onDragStart={this.onDragStart}
          />
          <FolderName addFolder={this.addFolder} setTrigger={this.setTrigger} />
        </div>
      );
    } else {
      return (
        <div className="main">
          <History
            history={this.state.history}
            changeDisplayH={this.changeDisplayH}
          />
          <Folders
            folder={this.state.folder}
            setTrigger={this.setTrigger}
            display={this.state.display}
            setDepthName={this.setDepthName}
            setFolder={this.setFolder}
            onDragOver={this.onDragOver}
            onDrop={this.onDrop}
          />
          <Files
            file={this.state.file}
            addFile={this.addFile}
            display={this.state.display}
            setDepthName={this.setDepthName}
            onDragStart={this.onDragStart}
          />
        </div>
      );
    }
  }
}

export default App