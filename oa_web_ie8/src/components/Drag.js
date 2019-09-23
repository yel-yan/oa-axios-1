import React, { Component } from 'react';
import './drag.css'

class Drag extends React.Component{
    constructor(...args){
        super(...args)
        this.state={x:0,y:0}
    }
    fn(ev){
        var disx=ev.pageX-this.state.x
        var disy=ev.pageY-this.state.y

        var _this=this
        document.onmousemove=function(ev){
            _this.setState({
                x:ev.pageX-disx,
                y:ev.pageY-disy
            })
        }
        document.onmouseup=function(){
            document.onmousemove=null
            document.onmousedown=null
        }
    }
    render(){
        return <div className="box1" style={{left:this.state.x+'px',top:this.state.y+'px'}} onMouseDown={this.fn.bind(this)}></div>
    }
}
export default Drag;