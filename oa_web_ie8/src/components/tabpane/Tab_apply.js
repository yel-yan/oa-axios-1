import React from 'react'
import { Select, Button, Table, Steps } from 'antd'

import components from '../../components/index'
import * as API from '../../axios/myAxios'

const children = []
for (let i = 10; i < 36; i++) {
  children.push(<Select.Option key={i.toString(36) + i}>{i.toString(36) + i}</Select.Option>)
}

class Tab extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: props.visible,
      current: 1,
      total: 0,
      formData: {
        userName: '大眼萌 minion',
        password: undefined,
        gender: 'male',
        remark: undefined,
        agreement: undefined,
      },
      visible: false,
      list:[],
      status:99,
      modalData:{},
      operationType:false,
      types:[],
      approverlist:[],
      search:''
    }
    this.page = 1;
    this.num = 10;
    this.total = 0;
    this.ApplyId=''
  }

  componentDidMount () {
    this.handlePull();
    API.GET('/leaves/types').then(res => {
      console.log("请假类型数据")
      this.setState({types:res.data})
    }) .catch(err => {
        console.log(err)
    });

    API.GET('approver/list').then(res => {
      console.log(res)
      this.setState({approverlist:res.data})
    }) .catch(err => {
        console.log(err)
    });
  }

  handlePull = () => {
    const { type } = this.props;
    let cates = '';
    switch (type) {
      case 'qj':cates = 'leave';break
      case 'jb':cates = 'overtime'; break
      case 'bx':cates = 'expense'; break
      case 'cc':cates = 'businesstrip'; break
      case 'wc':cates = 'goout'; break
      case 'wp':cates = 'oagoods'; break
    }
    API.GET('user/apply_list',{ page:this.page,num:this.num,cates:cates}).then((data) => {
      console.log('我的申请列表数据')
      console.log(data.data.list)
      let newData = data.data.list
      let newList = [];
      newData = newData.map((item) => {
        switch (type) {
          case 'qj':newList.push(Object.assign(item,{type:'qj',Cates:'请假'}));break
          case 'jb':newList.push(Object.assign(item,{type:'jb',Cates:'加班'})); break
          case 'bx':newList.push(Object.assign(item,{type:'bx',Cates:'报销'}));break
          case 'cc':newList.push(Object.assign(item,{type:'cc',Cates:'出差'})); break
          case 'wc':newList.push(Object.assign(item,{type:'wc',Cates:'外出'})); break
          case 'wp':newList.push(Object.assign(item,{type:'wp',Cates:'物品'})); break
        }
      })
      console.log(newList)
      this.setState({list:newList,total:data.data.count})
    }).catch((err) => {
      console.log(err);
    })
  }

  handleSearch = () => {
    const { type } = this.props;
    this.setState({list:[]})
    let cates = '';
    switch (type) {
      case 'qj':cates = 'leave';break
      case 'jb':cates = 'overtime'; break
      case 'bx':cates = 'expense'; break
      case 'cc':cates = 'businesstrip'; break
      case 'wc':cates = 'goout'; break
      case 'wp':cates = 'oagoods'; break
    }
    API.GET('search/my_apply',{ page:this.page,num:this.num ,cates:cates,result:this.state.status,keyword:this.state.search}).then((data) => {
      console.log('搜索列表数据')
      console.log(data.data)
      let newData = data.data.list
      let newList = [];
      newData = newData.map((item) => {
        switch (type) {
          case 'qj':newList.push(Object.assign(item,{type:'qj',Cates:'请假'}));break
          case 'jb':newList.push(Object.assign(item,{type:'jb',Cates:'加班'})); break
          case 'bx':newList.push(Object.assign(item,{type:'bx',Cates:'报销'}));break
          case 'cc':newList.push(Object.assign(item,{type:'cc',Cates:'出差'})); break
          case 'wc':newList.push(Object.assign(item,{type:'wc',Cates:'外出'})); break
          case 'wp':newList.push(Object.assign(item,{type:'wp',Cates:'物品'})); break
        }
      })
      console.log(newList)
      this.setState({list:newList,total:data.data.count})
    }).catch((err) => {
      console.log(err);
    })
  }

  handleSearchChange = (value) => {
    this.setState({search: value});
  }


  handleSelectChange = (value) => {
    console.log(`selected ${value}`)
    this.setState({status:value})
  }

  handleUpdate = (text) => {
    console.log(text);
    let url = '';
    switch (text.type) {
      case 'qj': url = 'leaves/approval';break
      case 'jb': url = 'overtimes/approval';break
      case 'bx': url = 'expenses/approval';break
      case 'cc': url = 'businesstrips/approval';break
      case 'wc': url = 'goouts/approval';break
      case 'wp': url = 'oagoods/approval';break
    }
    this.ApplyId = text.ApplyId;
    API.GET(url,{id:text.ApplyId}).then((data) => {
      console.log('详情页数据')
      console.log(data)
      this.setState({modalData:data.data,visible: true,operationType:true})
    }).catch((err) => {
      console.log(err);
    })
  }

  handleAdd = () => {
    const { type } = this.props;
    let url = '';
    switch (type) {
      case 'qj':url = 'leaves/approval/leave';break
      case 'jb':url = 'overtimes/approval/overtime'; break
      case 'bx':url = 'expenses/approval/expense'; break
      case 'cc':url = 'businesstrips/approval/businesstrip'; break
      case 'wc':url = 'goouts/approval/goout'; break
      case 'wp':url = 'oagoods/approval/oagoods'; break
    }
    
    this.setState({visible:true,operationType:false})
  }

  handleOk = (params) => {
    const { list } = this.state;
    this.setState({ visible: false});
    let li = list;
    li.map((item,index) => {
      if(item.ApplyId == this.ApplyId){
        li.splice(index,1)
      }
    })
    this.setState({list:li})
  }

  handleCancel = (params) => {
    this.setState({ visible: false});
  }

  onChange = (current) => {
    console.log('Current: ', current);
    this.setState({
      current: current
    });
    this.page = current;
    this.handlePull()
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
    const { list ,visible,modalData,operationType,types,approverlist} = this.state
    const { type } = this.props
    const columns = [
      {
        title: '申请人',
        dataIndex: 'ApplyerName',
        key:'ApplyerName',
        render: text => <a>{text}</a>,
      },
      {
        title: '申请类型',
        className: 'column-money',
        dataIndex: 'Cates',
        key:'Cates'
      },
      {
        title: '申请理由',
        dataIndex: 'Reason',
        key:'Reason'
      },
      {
        title: '审批状态',
        dataIndex: 'ResultCn',
        key:'ResultCn',
        render: (text, index) => {
          return <span>{text}</span>;
        }
      },
      {
        title: '操作',
        key: 'operation',
        width:'100',
        className:'column-operation',
        render: (text, index) => {
          return <span>
            <Button type="primary" htmlType="submit" style={{marginLeft:'10px'}} onClick={this.handleUpdate.bind(this, text)}>审批</Button>
          </span>;
        }
      }
    ]

    let modal;
    switch (type) {
      case 'qj':modal = <components.QJModal visible={visible} formData={modalData} onOk={this.handleOk} onCancel={this.handleCancel} operationType={operationType} types={types} approverlist={approverlist}/>;break
      case 'bx':modal = <components.BXModal visible={visible} formData={modalData} onOk={this.handleOk} onCancel={this.handleCancel} operationType={operationType} approverlist={approverlist}/>; break
      case 'cc':modal = <components.CCModal visible={visible} formData={modalData} onOk={this.handleOk} onCancel={this.handleCancel} operationType={operationType} approverlist={approverlist}/>;break
      case 'jb':modal = <components.JBModal visible={visible} formData={modalData} onOk={this.handleOk} onCancel={this.handleCancel} operationType={operationType} approverlist={approverlist}/>; break
      case 'wc':modal = <components.WCModal visible={visible} formData={modalData} onOk={this.handleOk} onCancel={this.handleCancel} operationType={operationType} approverlist={approverlist}/>; break
      case 'wp':modal = <components.WPModal visible={visible} formData={modalData} onOk={this.handleOk} onCancel={this.handleCancel} operationType={operationType} approverlist={approverlist}/>; break
    }
    return (
      <div>
        <div style={{ marginBottom: '15px' }}>
          <Select style={{ width: 120 }} onChange={this.handleSelectChange} allowClear={true}>
            <Select.Option value="0">未审批</Select.Option>
            <Select.Option value="1">已同意</Select.Option>
            <Select.Option value="2">已拒绝</Select.Option>
          </Select>
          <Select
            combobox
            style={{ width: 200, marginLeft: '10px' }}
            onChange={this.handleSearchChange}
            filterOption={false}
            searchPlaceholder="请输入账户名"
          >
            {this.state.options}
          </Select>
          <Button type="primary" htmlType="submit" style={{ margin: '0 10px' }} onClick={this.handleSearch}>搜索</Button>
          <Button type="primary" onClick={this.handleAdd}>添加</Button>
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
          />
        </div>
        { modal }
      </div>
    )
  }
}

export default Tab
