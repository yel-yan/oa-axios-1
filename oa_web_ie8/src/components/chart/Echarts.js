import React from 'react'
import { DatePicker ,Button} from 'antd'
import './Chart.less'
import * as API from '../../axios/myAxios'
const RangePicker = DatePicker.RangePicker;

class Echarts extends React.Component {
    state = {
      option: {
        xAxis: {
          type: 'category',
          data: ['请假', '加班', '报销', '出差', '外出', '物品'],
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
          },
          padding: [5, 10],
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top:'3%',
          containLabel: true,
        },
        yAxis: {
          type: 'value',
        },
        series: [{
          name: '数量',
          data: [],
          type: 'line',
        }],
      },
      start:'',
      end:''
    }

    componentDidMount() {
      const { option } = this.state
      this.charts = echarts.init(document.getElementById('charts'))
      this.charts.setOption(option)
      this.handlePull();
    }

    handlePull = () => {
      API.GET('user/my_apply_allcount',{ start_date:this.state.start,end_date:this.state.end }).then((data) => {
        console.log("图表数据",data)
        // 填入数据
        this.charts.setOption({
          // xAxis: {
          //     data: data.categories
          // },
          series: [{
              // 根据名字对应到相应的系列
              name: '数量',
              data: data.data,
              type: 'line',
          }]
        });
      }).catch((err) => {
        console.log(err);
      })
    }

    handleSearch = () => {
      API.GET('user/my_apply_allcount',{ start_date:this.state.start,end_date:this.state.end }).then((data) => {
        console.log(data)
        // 填入数据
        this.charts.setOption({
          // xAxis: {
          //     data: data.categories
          // },
          series: [{
              // 根据名字对应到相应的系列
              name: '数量',
              data: data.data,
              type: 'line',
          }]
        });
      }).catch((err) => {
        console.log(err);
      })
    }

    onDateChange = (value, dateString) => {
      console.log('From: ', value[0], ', to: ', value[1]);
      console.log('From: ', dateString[0], ', to: ', dateString[1]);
      this.setState({start:dateString[0],end:dateString[1]})
    }

  render() {
    return (
      <div className="chart-card">
        <div className="chart-header">
          <i /> 我发起的审批
        </div>
        <div style={{padding:'15px'}}>
          <RangePicker style={{width: 184}} onChange={this.onDateChange} />
          <Button type="primary" htmlType="submit" style={{marginLeft:'10px'}} onClick={this.handleSearch}>搜索</Button>
        </div>
        <div id="charts" style={{ width: '100%', height: '300px' }} />
      </div>
    )
  }
}

export default Echarts
