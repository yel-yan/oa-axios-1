import React from 'react'
import { Menu, Icon,Tabs,Breadcrumb,Select,Button,Table } from 'antd'
import '../../style/DocSign.less'
const TabPane = Tabs.TabPane;
const Option = Select.Option;
import components from '../../components/index'
import * as API from '../../axios/myAxios'

class DocSign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current:1,
      total:0,
      list:[],
      search:'',
      status:99,
      modalData:{},
      operationType:false,
      PaneStatus:true
    },
    this.page = 1;
    this.num = 30;
    this.total = 0;
  }

  componentDidMount () {
    this.handlePull();
  }

  handlePull = () => {
    API.GET('signing/search_my_approve',{ page:this.page,num:this.num,status:this.state.status }).then((data) => {
      console.log('公文签批列表数据')
      console.log(data)
      let newData = data.data.list
      this.setState({list:newData,PaneStatus:true})
    }).catch((err) => {
      console.log(err);
    })
  }

  handleSearch = () => {
    this.setState({list:[]})
    API.GET('signing/search_my_approve',{keyword:this.state.search,status:this.state.status}).then((data) => {
      console.log('搜索待审批数据')
      let newData = data.data.list
      this.setState({list:newData})
    }).catch((err) => {
      console.log(err);
    })
  }

  handleMyApplySearch =() => {
    this.setState({list:[]})
    API.GET('signing/search_my_apply',{keyword:this.state.search,result:this.state.status}).then((data) => {
      console.log('我的申请公文签批')
      let newData = data.data.list
      this.setState({list:newData})
    }).catch((err) => {
      console.log(err);
    })
  }

  handleAdd = () => {
    console.log("添加")
    this.setState({visible:true,operationType:false})
  }

  handleMyApply = () => {
    this.setState({list:[],PaneStatus:false})
    API.GET('signing/search_my_apply',{keyword:this.state.search,result:this.state.status}).then((data) => {
      console.log('我的申请公文签批')
      let newData = data.data.list
      this.setState({list:newData})
    }).catch((err) => {
      console.log(err);
    })
  }

  handleUpdate = (text) => {
    console.log(text);
    API.GET('signing/approval',{id:text.ApplyId}).then((data) => {
      console.log('公文签批详情页数据')
      console.log(data)
      this.setState({modalData:data.data,visible: true,operationType:true})
    }).catch((err) => {
      console.log(err);
    })
  }

  handleSelectChange = (value) => {
    console.log(`selected ${value}`)
    this.setState({status:value})
  }

  onChange = (current) => {
    console.log('Current: ', current);
    this.setState({
      current: current
    });
    this.page = current;
    this.handlePull()
  }

  handleOk = (params) => {
    this.setState({ visible: false});
  }

  handleCancel = (params) => {
    this.setState({ visible: false});
  }

  render() {
    const { list,operationType,modalData,visible,PaneStatus } = this.state;
    const columns = [
      {
        title: '发送者',
        dataIndex: 'Realname',
        render: text => <a>{text}</a>,
      },
      {
        title: '标题',
        className: 'column-money',
        dataIndex: 'Title',
      },
      {
        title: '内容',
        dataIndex: 'Content',
      },
      {
        title: '审批状态',
        dataIndex: 'StatusCn',
      },
      {
        title: '操作',
        key: 'operation',
        width:'100',
        className:'column-operation',
        render: (text, record) => {
          return <span>
            <Button type="primary" htmlType="submit" style={{marginLeft:'10px'}} onClick={this.handleUpdate.bind(this, text)}>审批</Button>
          </span>;
        }
      }
    ]
    return (
      <div className="approve-container">
        <div className="breadcrumb">
          <Breadcrumb separator=">">
            <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
            <Breadcrumb.Item href="">首页</Breadcrumb.Item>
            <Breadcrumb.Item href="">公文签批</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div style={{marginBottom:'15px'}}>
        <Select style={{ width: 120 }} onChange={this.handleSelectChange} allowClear={true}>
            <Select.Option value="0">未审批</Select.Option>
            <Select.Option value="1">已同意</Select.Option>
            <Select.Option value="2">已拒绝</Select.Option>
          </Select>
          <Select combobox
            style={{width:200,marginLeft:'10px'}}
            onChange={this.handleChange}
            filterOption={false}
            searchPlaceholder="请输入账户名">
            {this.state.options}
          </Select>
          {
            PaneStatus ? 
            <Button type="primary" htmlType="submit" style={{margin:'0 10px'}} onClick={this.handleSearch}>搜索</Button>
            :
            <Button type="primary" htmlType="submit" style={{margin:'0 10px'}} onClick={this.handleMyApplySearch}>搜索</Button>
          }
          <Button type="primary" onClick={this.handleAdd}>添加</Button>
          {
            PaneStatus ? 
            <Button style={{float:'right'}} onClick={this.handleMyApply}>我的申请</Button> 
            :
            <Button style={{float:'right'}} onClick={this.handlePull}>我的审批</Button>
          }
        </div>
        <div>
          <Table
            columns={columns}
            dataSource={list}
            pagination={{
              total: this.state.total,
              current: this.state.current,
              showSizeChanger: true,
              showQuickJumper :true,
              onShowSizeChange: (current, pageSize) => {
                console.log('Current: ', current, '; PageSize: ', pageSize);
                this.setState({current:current})
                this.num = pageSize;
                this.handlePull()
              },
              onShowQuickJumper:(current) => {
                console.log('Current: ', current,);
                this.setState({current:current})
                this.page = current;
                this.handlePull()
              },
              onChange: this.onChange
            }}
            bordered
          />
        </div>
        { <components.GWModal visible={visible} formData={modalData} onOk={this.handleOk} onCancel={this.handleCancel} operationType={operationType}/> }
      </div>
    )
  }
}

export default DocSign
