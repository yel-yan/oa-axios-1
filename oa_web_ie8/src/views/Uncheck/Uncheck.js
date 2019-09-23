import React from 'react'
import { Icon,Breadcrumb,Select,Button,Table,Steps } from 'antd'
import '../../style/DocSign.less'
const Option = Select.Option;
const Step = Steps.Step;
import components from '../../components/index'
import * as API from '../../axios/myAxios'
import { timeStampToStr } from '../../utils/common'

const children = []
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>)
}

class Uncheck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current:1,
      total:0,
      formData: {},
      visible_qj:false,
      visible_bx:false,
      visible_cc:false,
      visible_jb:false,
      visible_wc:false,
      visible_wp:false,
      qj:{},
      jb:{},
      bx:{},
      cc:{},
      wc:{},
      wp:{},
      operationType: true,
      list:[],
      search:''
    },
    this.page = 1;
    this.num = 30;
    this.total = 0;
  }

  componentDidMount () {
    this.handlePull();
  }

  handlePull = () => {
    API.GET('user/pending',{ page:this.page,num:this.num }).then((data) => {
      console.log('待审批列表数据')
      console.log(data)
      let newData = data.data.list
      let newList = [];
      newData = newData.map((item) => {
        console.log(item)
        switch (item.Cates) {
          case 'leave':newList.push(Object.assign(item,{type:'qj',Cates:'请假'}));break
          case 'overtime':newList.push(Object.assign(item,{type:'jb',Cates:'加班'})); break
          case 'expense':newList.push(Object.assign(item,{type:'bx',Cates:'报销'}));break
          case 'businesstrip':newList.push(Object.assign(item,{type:'cc',Cates:'出差'})); break
          case 'goout':newList.push(Object.assign(item,{type:'wc',Cates:'外出'})); break
          case 'oagoods':newList.push(Object.assign(item,{type:'wp',Cates:'物品'})); break
        }
      })
      console.log(newList)
      this.setState({list:newList})
    }).catch((err) => {
      console.log(err);
    })
  }

  handleSearchChange = (value) => {
    this.setState({search: value});
  }

  handleSearch = () => {
    this.setState({list:[]})
    API.GET('search/my_approve',{keyword:this.state.search,status:0}).then((data) => {
      console.log('搜索待审批数据')
      let newData = data.data.list
      let newList = [];
      newData = newData.map((item) => {
        console.log(item)
        switch (item.Cates) {
          case 'leave':newList.push(Object.assign(item,{type:'qj',Cates:'请假'}));break
          case 'overtime':newList.push(Object.assign(item,{type:'jb',Cates:'加班'})); break
          case 'expense':newList.push(Object.assign(item,{type:'bx',Cates:'报销'}));break
          case 'businesstrip':newList.push(Object.assign(item,{type:'cc',Cates:'出差'})); break
          case 'goout':newList.push(Object.assign(item,{type:'wc',Cates:'外出'})); break
          case 'oagoods':newList.push(Object.assign(item,{type:'wp',Cates:'物品'})); break
        }
      })
      console.log(newList)
      this.setState({list:newList,total:data.data.count})
    }).catch((err) => {
      console.log(err);
    })
  }

  handleUpdate = (text) => {
    console.log(text);
    const temp = Object.assign({}, text);
    let url = '';
    switch (text.type) {
      case 'qj':this.setState({ visible_qj: true}); url = 'leaves/approval';break
      case 'jb':this.setState({ visible_jb: true}); url = 'overtimes/approval'; break
      case 'bx':this.setState({ visible_bx: true}); url = 'expenses/approval'; break
      case 'cc':this.setState({ visible_cc: true}); url = 'businesstrips/approval'; break
      case 'wc':this.setState({ visible_wc: true}); url = 'goouts/approval'; break
      case 'wp':this.setState({ visible_wp: true}); url = 'oagoods/approval'; break
    }
    API.GET(url,{id:text.ApplyId}).then((data) => {
      console.log('请假详情页数据')
      console.log(data)
      this.setState({[text.type]:data.data,total:data.data.length})
      console.log(this.state.qj,"aaaaaaaaaaaaaaaaaaaa")
    }).catch((err) => {
      console.log(err);
    })
  }

  onChange = (current) => {
    console.log('Current: ', current);
    this.setState({
      current: current
    });
  }

  handleCreate = (params) => {
    console.log(text);
    const temp = Object.assign({operationType:1}, text)
    this.setState({operationType:false})
    switch (text.type) {
      case 'qj':this.setState({ visible_qj: true});break
      case 'jb':this.setState({ visible_jb: true}); break
      case 'bx':this.setState({ visible_bx: true});break
      case 'cc':this.setState({ visible_cc: true}); break
      case 'wc':this.setState({ visible_wc: true}); break
      case 'wp':this.setState({ visible_wp: true}); break
    }
  }

  handleOk = (params) => {
    switch (params.type) {
      case 'qj':this.setState({ visible_qj: false});break
      case 'jb':this.setState({ visible_jb: false}); break
      case 'bx':this.setState({ visible_bx: false}); break
      case 'cc':this.setState({ visible_cc: false});break
      case 'wc':this.setState({ visible_wc: false}); break
      case 'wp':this.setState({ visible_wp: false}); break
    }
  }

  handleCancel = (params) => {
    switch (params.type) {
      case 'qj':this.setState({ visible_qj: false});break
      case 'jb':this.setState({ visible_jb: false}); break
      case 'bx':this.setState({ visible_bx: false});break
      case 'cc':this.setState({ visible_cc: false}); break
      case 'wc':this.setState({ visible_wc: false}); break
      case 'wp':this.setState({ visible_wp: false}); break
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    message.success('收到表单值~~~ ：' + JSON.stringify(this.state.formData, function(k, v) {
      if (typeof v === 'undefined') {
        return '';
      }
      return v;
    }));
  }

  render() {
    const { list, formData ,visible_qj,visible_bx,visible_cc,visible_jb,visible_wc,visible_wp,operationType,
      qj,bx,jb,cc,wc,wp  
    } = this.state;
    const columns = [
      {
        title: '申请人',
        dataIndex: 'Realname',
        render: text => <a>{text}</a>,
      },
      {
        title: '申请类型',
        className: 'column-money',
        dataIndex: 'Cates',
      },
      {
        title: '申请理由',
        dataIndex: 'Reason',
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
            <Breadcrumb.Item href="">待审批</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div style={{marginBottom:'15px'}}>
          <Select combobox
            style={{width:200}}
            onChange={this.handleSearchChange}
            filterOption={false}
            searchPlaceholder="请输入账户名">
            {this.state.options}
          </Select>
          <Button type="primary" htmlType="submit" style={{margin:'0 10px'}} onClick={this.handleSearch}>搜索</Button>
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
              },
              onShowQuickJumper:(current) => {
                console.log('Current: ', current,);
              },
              onChange: this.onChange
            }}
            bordered
            size="middle"
          />
        </div>
        {
          Object.keys(qj).length >0  && <components.QJModal visible={visible_qj} formData={qj} onOk={this.handleOk} onCancel={this.handleCancel} operationType={operationType}/>
        }
        {
          Object.keys(bx).length >0 && <components.BXModal visible={visible_bx} formData={bx} onOk={this.handleOk} onCancel={this.handleCancel} operationType={operationType}/>
        }
        {
          Object.keys(cc).length >0 && <components.CCModal visible={visible_cc} formData={cc} onOk={this.handleOk} onCancel={this.handleCancel} operationType={operationType}/>
        }
        {
          Object.keys(jb).length >0 && <components.JBModal visible={visible_jb} formData={jb} onOk={this.handleOk} onCancel={this.handleCancel} operationType={operationType}/>
        }
        {
          Object.keys(wc).length >0 && <components.WCModal visible={visible_wc} formData={wc} onOk={this.handleOk} onCancel={this.handleCancel} operationType={operationType}/>
        }
        {
          Object.keys(wp).length >0 && <components.WPModal visible={visible_wp} formData={wp} onOk={this.handleOk} onCancel={this.handleCancel} operationType={operationType}/>
        }
      </div>
    )
  }
}

export default Uncheck
