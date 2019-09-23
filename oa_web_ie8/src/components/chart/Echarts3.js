import React from 'react'
import { DatePicker, Button } from 'antd'
import './Chart.less'

const RangePicker = DatePicker.RangePicker

class Echarts extends React.Component {
    state = {
    }

    render() {
      return (
        <div style={{ padding: '15px' }}>
          <RangePicker style={{ width: 184 }} onChange={this.onChange} />
        </div>
      )
    }
}

export default Echarts
