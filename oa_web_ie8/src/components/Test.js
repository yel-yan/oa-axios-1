import React from 'react'
import ReactDom from 'react-dom'
var platform = require('platform');
import { Modal } from 'antd'
import QJModal from './modals/QJModal'

class Test extends React.Component {
    showModal () {
        this.div = document.createElement('div');
        document.body.appendChild(this.div);
        this.appendMaskIntoDoc();
    }
    appendMaskIntoDoc(){
        console.log(this);
        ReactDom.unstable_renderSubtreeIntoContainer(
            this,
            <div><QJModal visible={true} onCancel={this.close.bind(this)}/></div>,
            this.div
        )
    }
    close () {
        document.body.removeChild(this.div)
    }

    render () {
        platform.name; // 'IE'
        platform.version; // '10.0'
        platform.layout; // 'Trident'
        platform.os; // 'Windows Server 2008 R2 / 7 x64'
        platform.description;
        console.log(platform.name)
        console.log(platform.version)
        return (
            <div>
                <button onClick = {this.showModal.bind(this)}>显示弹窗</button>
                <div>
                    {platform.name+' /'+platform.version+' /'+platform.layout+' /'+platform.os+' /'+platform.description}
                </div>
            </div>
            
        )
    }
}

export default Test;