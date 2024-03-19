import { Component } from "react";
import './App.css'

export default class App extends Component 
{
  constructor()
  {
    super()
    this.watchDataObj = undefined ;

    this.state ={
      isRunning : false ,
      watchData :{
        hour : 0 , minute : 0 , second : 0
      },
      laps : []
    }
  }
  startPause = () => {
    if(this.state.isRunning){
      clearInterval(this.watchDataObj)
      this.watchDataObj = undefined ;
      this.setState({isRunning:false})
    }else{
      this.watchDataObj = setInterval(this.incrementSecond,100)
      this.setState({isRunning :true})
    }
  }
  
  reset = () => {

  }
  incrementSecond = () => {
    var second = this.state.watchData.second
    var minute = this.state.watchData.minute
    var hour = this.state.watchData.hour

    second += 1
    if(second == 60)
    {
      minute += 1
      second = 0
      if(minute == 60)
      {
        hour += 1
        minute = 0
      }
    }
    this.setState({watchData : {hour,minute,second}})
  }
  reset = ()=> {
    clearInterval(this.watchDataObj)
    this.watchDataObj = undefined;
    this.setState({isRunning:false,watchData:{hour:0,minute:0,second:0}})
  }

  addLaps = () => {
    var ob = {...this.state.watchData}
    this.setState({laps:[...this.state.laps,ob]})
  }

  render() {
    return <>
    <div className="row text-center">
        <div className="col-lg-2 col-md-2"></div>
        <div className="col-lg-8 col-md-8">
          <button className="btn btn-lg btn-danger" onClick={this.startPause}>{this.state.isRunning?"Pause":"Start"}</button>&nbsp;&nbsp;
          <button className="btn btn-lg btn-warning" onClick={this.reset}>Reset</button>&nbsp;&nbsp;
          <button className="btn btn-lg btn-success" onClick={this.addLaps}>Lap</button>&nbsp;&nbsp;
        </div>
        <div className="col-lg-2 col-md-2"></div>
      </div><hr/>
      <div className="row text-center">
        <div className="col-lg-4 col-md-4 element">{this.state.watchData.hour}</div>
        <div className="col-lg-4 col-md-4 element">{this.state.watchData.minute}</div>
        <div className="col-lg-4 col-md-4 element">{this.state.watchData.second}</div>
      </div><hr/>
      {this.state.laps.map((lap,index)=><div key={index}>
           <h4 className="alert alert-danger">{lap.hour} : {lap.minute} : {lap.second}</h4>
      </div>)}
    </>
  }
}