import React from 'react'
import { Tabs, Breadcrumb, Select, Table } from 'antd'
import '../../style/news.less'
import * as API from '../../axios/myAxios'

const TabPane = Tabs.TabPane
const Option = Select.Option


class News extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // current: 1,
      // total: 0,
      list: [],
      // search: '',
      // status: 99,
      // modalData: {},
      // operationType: false,
      options: [],
    },
    this.page = 1
    this.num = 30
  }

  componentDidMount() {
    this.handlePull()
  }

  handlePull = () => {
    API.GET('news/list', { page: this.page, num: this.num }).then((data) => {
      console.log('数据')
      console.log(data)
      const newData = data.data
      this.setState({ list: newData })
      console.log("list:",this.state.list)
    }).catch((err) => {
      console.log(err)
    })
  }
  handleChange = (value) => {
    if (!value || value.indexOf('@') >= 0) {
      options = []
    } else {
      options = ['gmail.com', '163.com', 'qq.com'].map((domain) => {
        const email = `${value}@${domain}`
        return <Option key={email}>{email}</Option>
      })
    }
  }

  render() {
    const { list } = this.state
    // console.log("asdasda",list)
    const columns = [
      {
        title: '新闻ID',
        dataIndex: 'Id',
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
        title: '阅览量',
        dataIndex: 'Browse',
      },
      {
        title: '点赞',
        dataIndex: 'Zan',
      },
      {
        title: '是否删除',
        dataIndex: 'State',
      },
      {
        title: '新闻创建时间',
        dataIndex: 'CreateAt',
      },
      {
        title: '新闻更新时间',
        dataIndex: 'UpdateAt',
      },
    ]

    return (
      <div className="news-container">
        <div className="news-breadcrumb">
          <Breadcrumb separator=">">
            <Breadcrumb.Item href="">首页</Breadcrumb.Item>
            <Breadcrumb.Item href="">新闻资讯</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="news-tab">
          <div>
            <Table
              columns={columns}
              dataSource={list}
              pagination
            />
          </div>
        </div>
      </div>
    )
  }
}

export default News

