import React from 'react'
import { Menu, Icon, Tabs, Breadcrumb, Select, Button, Table, Modal, Form, Input, Checkbox, Radio, Row, Col, DatePicker, Slider, Upload, Steps } from 'antd'
import '../../style/DocSign.less'
import components from '../../components/index'
import '../../style/schedule.less'
import * as API from '../../axios/myAxios'
const RangePicker = DatePicker.RangePicker;
const confirm = Modal.confirm;

class Schedule extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current:1,
      total:0,
      list:[],
      search:'',
      status:99,
      modalData:{},
      operationType:false,
      start:'2019-09-01',
      end:'2019-09-30'
    },
    this.page = 1;
    this.num = 30;
    this.total = 0;
  }

  componentDidMount () {
    this.handlePull();
  }

  handlePull = () => {
    API.GET('schedule/duration_search',{ page:this.page,num:this.num }).then((data) => {
      console.log('日程管理列表数据')
      console.log(data)
      let newData = data.data.list
      this.setState({list:newData,total:data.data.count})
    }).catch((err) => {
      console.log(err);
    })
  }

  handleSearch = () => {
    this.setState({list:[]})
    API.GET('schedule/duration_search',{ page:this.page,num:this.num,keyword: this.state.search,start:this.state.start,end:this.state.end }).then((data) => {
      console.log('日程管理列表数据')
      console.log(data)
      let newData = data.data.list
      this.setState({list:newData,total:data.data.count})
    }).catch((err) => {
      console.log(err);
    })
  }

  onDateChange = (value, dateString) => {
    console.log('From: ', value[0], ', to: ', value[1]);
    console.log('From: ', dateString[0], ', to: ', dateString[1]);
    this.setState({start:dateString[0],end:dateString[1]})
  }

  handleSearchChange = (value) => {
    this.setState({search: value});
  }

  onChange = (current) => {
    console.log('Current: ', current);
    this.setState({
      current: current
    });
  }

  handleUpdate = (text) => {
    console.log(text);
    API.GET('/schedule/detail',{id:text.id}).then((data) => {
      console.log('日程详情页数据')
      console.log(data)
      this.setState({modalData:data.data,visible: true,operationType:true})
    }).catch((err) => {
      console.log(err);
    })
  }

  handleDelete = (text) => {
    console.log(text)
    const { list } = this.state;
    const newList = list;
    API.POST('/schedule/delete',{id:text.text.id}).then((data) => {
      console.log('删除日程')
      newList.splice(text.index,1);
      this.setState({list:newList})
    }).catch((err) => {
      console.log(err);
    })
  }

  onDelete = (text) => {
    confirm({
      title: '您是否确认要删除这项内容',
      content: '点确认 1 秒后关闭',
      onOk() {
        console.log(text);
        () => this.handleDelete();
      },
      onCancel() {},
    });
  }

  handleOk = () => {
    console.log('点击了确定')
    this.setState({
      visible: false,
    })
  }

  handleAdd = () => {
    console.log("添加")
    this.setState({visible:true,operationType:false})
  }


  handleCancel = () => {
    this.handlePull();
    this.setState({
      visible: false,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    message.success(`收到表单值~~~ ：${JSON.stringify(this.state.formData, (k, v) => {
      if (typeof v === 'undefined') {
        return ''
      }
      return v
    })}`)
  }

  render() {
    const { list,operationType,modalData,visible } = this.state;
    const columns = [
      {
        title: '开始时间',
        dataIndex: 'start_at',
        width:'200',
      },
      {
        title: '结束时间',
        dataIndex: 'end_at',
        width:'200',
      },
      {
        title: '内容',
        dataIndex: 'reason',
      },
      {
        title: '操作',
        key: 'operation',
        width:'160',
        render: (text, record,index) => (<span>
          <Button type="primary" htmlType="submit" style={{ marginLeft: '10px' }} onClick={this.handleUpdate.bind(this, text)}>查看</Button>
          <Button type="primary" htmlType="submit" style={{ marginLeft: '10px' }} onClick={this.handleDelete.bind(this, {text,index})}>删除</Button>
        </span>),
      },
    ]
    return (
      <div className="schedule-container">
        <div className="schedule-breadcrumb">
          <Breadcrumb separator=">">
            <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
            <Breadcrumb.Item href="">首页</Breadcrumb.Item>
            <Breadcrumb.Item href="">日程管理</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="schedule-case" style={{ lineHeight: '38px' }}>
          <div style={{marginBottom:'15px'}}>
            <RangePicker style={{width: 184}} onChange={this.onDateChange} />
            <Select combobox
                    style={{width:200,marginLeft:'10px'}}
                    onChange={this.handleSearchChange}
                    filterOption={false}
                    searchPlaceholder="请输入账户名">
              {this.state.options}
            </Select>
            <Button type="primary" htmlType="submit" style={{marginLeft:'10px', backgroundColor: '#2db7f5' }} onClick={this.handleSearch}>搜索</Button>
            <Button type="primary" style={{ margin: '0 10px', backgroundColor: '#2db7f5' }} onClick={this.handleAdd}>添加</Button>
          </div>
        </div>
        <div>
          <div style={{ clear: 'both' }} />
          <Table
            columns={columns}
            dataSource={list}
            pagination={{
              total: this.state.total,
              current: this.state.current,
              showSizeChanger: true,
              showQuickJumper: true,
              onShowSizeChange: (current, pageSize) => {
                console.log('Current: ', current, '; PageSize: ', pageSize)
              },
              onShowQuickJumper: (current) => {
                console.log('Current: ', current)
              },
              onChange: this.onChange,
            }}
            bordered
            size="middle"
          />
        </div>
        { <components.RCModal visible={visible} formData={modalData} onOk={this.handleOk} onCancel={this.handleCancel} operationType={operationType}/> }
      </div>
    )
  }
}

export default Schedule
