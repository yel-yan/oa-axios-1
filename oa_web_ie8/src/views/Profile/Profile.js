import React from 'react'
import { Tabs } from 'antd'
import '../../style/profile.less'

const TabPane = Tabs.TabPane
function callback(key) {
  console.log(key)
}
class Profile extends React.Component {
  render() {
    return (
      <div className="Profile-box" >
        <div className="setting"><img src="../src/media/img/bg.png" width="100%" height="100%" /></div>
        <div className="message">
          <div className="modifier">
            <div className="modifier2">修改密码</div>
          </div>
          <div className="message1">
            <div className="message2">
              <div className="name">
                <div className="headportrait2"><img src="../src/media/img/my.png" width="100%" height="100%" /></div>
                <div className="monicker"> 蔡文姬</div>
              </div>
              <div className="company">
                <div className="headportrait3"><img src="../src/media/img/company.png" width="100%" height="100%" /></div>
                <div className="reputation">广西杰思信息科技有限公司</div>
              </div>
              <div className="cellphone">
                <div className="headportrait4"><img src="../src/media/img/call.png" width="100%" height="100%" /></div>
                <div className="number"> 15577872770</div>
              </div>
              <div className="mailbox">
                <div className="headportrait5"><img src="../src/media/img/email.png" width="100%" height="100%" /></div>
                <div className="site">591776748@qq.com</div>
              </div>
              <div className="position">
                <div className="headportrait6"><img src="../src/media/img/post.png" width="100%" height="100%" /></div>
                <div className="osition">UI设计</div>
              </div>
            </div>
          </div>
          <div className="folder">
            <Tabs defaultActiveKey="1" onChange={callback}>
              <TabPane tab="收藏" key="1">
                <div className="list">
                  <div className="list1">
                    <div className="box2">
                      <div className="name2">李白</div>
                      <div className="time">2019-08-13</div>
                    </div>
                    <div className="box3">
                      <div className="name3">收藏内容收藏内容收藏内容收藏内容收藏内容收藏内容收藏内容收藏内容收藏内容收藏内容收藏内容收藏内容</div>
                    </div>
                  </div>
                  <div className="list1">
                    <div className="box2">
                      <div className="name2">李白</div>
                      <div className="time">2019-08-13</div>
                    </div>
                    <div className="box3">
                      <div className="name3">收藏内容收藏内容收藏内容收藏内容收藏内容收藏内容收藏内容收藏内容收藏内容收藏内容收藏内容收藏内容</div>
                    </div>
                  </div>
                  <div className="list1">
                    <div className="box2">
                      <div className="name2">李白</div>
                      <div className="time">2019-08-13</div>
                    </div>
                    <div className="box3">
                      <div className="name3">收藏内容收藏内容收藏内容收藏内容收藏内容收藏内容收藏内容收藏内容收藏内容收藏内容收藏内容收藏内容</div>
                    </div>
                  </div>
                  <div className="list1">
                    <div className="box2">
                      <div className="name2">李白</div>
                      <div className="time">2019-08-13</div>
                    </div>
                    <div className="box3">
                      <div className="name3">收藏内容收藏内容收藏内容收藏内容收藏内容收藏内容收藏内容收藏内容收藏内容收藏内容收藏内容收藏内容</div>
                    </div>
                  </div>
                  <div className="list1">
                    <div className="box2">
                      <div className="name2">李白</div>
                      <div className="time">2019-08-13</div>
                    </div>
                    <div className="box3">
                      <div className="name3">收藏内容收藏内容收藏内容收藏内容收藏内容收藏内容收藏内容收藏内容收藏内容收藏内容收藏内容收藏内容</div>
                    </div>
                  </div>
                  <div className="list1">
                    <div className="box2">
                      <div className="name2">李白</div>
                      <div className="time">2019-08-13</div>
                    </div>
                    <div className="box3">
                      <div className="name3">收藏内容收藏内容收藏内容收藏内容收藏内容收藏内容收藏内容收藏内容收藏内容收藏内容收藏内容收藏内容</div>
                    </div>
                  </div>
                </div>
              </TabPane>
              <TabPane tab="文件盘" key="2">
                <div className="list">
                  <div className="list2">
                    <div className="box4" >
                      <div className="picture">
                        <div className="picture1"><img src="../src/media/img/touxiang.png" width="100%" height="100%" /></div>
                        <div className="serial" >IMG-352515151.JPG</div>
                        <div className="monicker1">李白白</div>
                        <div className="schedule">2019-08-13</div>
                      </div>
                      <div className="picture">
                        <div className="picture1"><img src="../src/media/img/touxiang.png" width="100%" height="100%" /></div>
                        <div className="serial" >IMG-352515151.JPG</div>
                        <div className="monicker1">李白白</div>
                        <div className="schedule">2019-08-13</div>
                      </div>
                      <div className="picture">
                        <div className="picture1"><img src="../src/media/img/touxiang.png" width="100%" height="100%" /></div>
                        <div className="serial" >IMG-352515151.JPG</div>
                        <div className="monicker1">李白白</div>
                        <div className="schedule">2019-08-13</div>
                      </div>
                      <div className="picture">
                        <div className="picture1"><img src="../src/media/img/touxiang.png" width="100%" height="100%" /></div>
                        <div className="serial" >IMG-352515151.JPG</div>
                        <div className="monicker1">李白白</div>
                        <div className="schedule">2019-08-13</div>
                      </div>
                      <div className="picture">
                        <div className="picture1"><img src="../src/media/img/touxiang.png" width="100%" height="100%" /></div>
                        <div className="serial" >IMG-352515151.JPG</div>
                        <div className="monicker1">李白白</div>
                        <div className="schedule">2019-08-13</div>
                      </div>
                      <div className="picture">
                        <div className="picture1"><img src="../src/media/img/touxiang.png" width="100%" height="100%" /></div>
                        <div className="serial" >IMG-352515151.JPG</div>
                        <div className="monicker1">李白白</div>
                        <div className="schedule">2019-08-13</div>
                      </div>
                      <div className="picture">
                        <div className="picture1"><img src="../src/media/img/touxiang.png" width="100%" height="100%" /></div>
                        <div className="serial" >IMG-352515151.JPG</div>
                        <div className="monicker1">李白白</div>
                        <div className="schedule">2019-08-13</div>
                      </div>
                    </div>

                    <div className="box4" >
                      <div className="picture">
                        <div className="picture1"><img src="../src/media/img/touxiang.png" width="100%" height="100%" /></div>
                        <div className="serial" >IMG-352515151.JPG</div>
                        <div className="monicker1">李白白</div>
                        <div className="schedule">2019-08-13</div>
                      </div>
                      <div className="picture">
                        <div className="picture1"><img src="../src/media/img/touxiang.png" width="100%" height="100%" /></div>
                        <div className="serial" >IMG-352515151.JPG</div>
                        <div className="monicker1">李白白</div>
                        <div className="schedule">2019-08-13</div>
                      </div>
                      <div className="picture">
                        <div className="picture1"><img src="../src/media/img/touxiang.png" width="100%" height="100%" /></div>
                        <div className="serial" >IMG-352515151.JPG</div>
                        <div className="monicker1">李白白</div>
                        <div className="schedule">2019-08-13</div>
                      </div>
                      <div className="picture">
                        <div className="picture1"><img src="../src/media/img/touxiang.png" width="100%" height="100%" /></div>
                        <div className="serial" >IMG-352515151.JPG</div>
                        <div className="monicker1">李白白</div>
                        <div className="schedule">2019-08-13</div>
                      </div>
                      <div className="picture">
                        <div className="picture1"><img src="../src/media/img/touxiang.png" width="100%" height="100%" /></div>
                        <div className="serial" >IMG-352515151.JPG</div>
                        <div className="monicker1">李白白</div>
                        <div className="schedule">2019-08-13</div>
                      </div>
                      <div className="picture">
                        <div className="picture1"><img src="../src/media/img/touxiang.png" width="100%" height="100%" /></div>
                        <div className="serial" >IMG-352515151.JPG</div>
                        <div className="monicker1">李白白</div>
                        <div className="schedule">2019-08-13</div>
                      </div>
                      <div className="picture">
                        <div className="picture1"><img src="../src/media/img/touxiang.png" width="100%" height="100%" /></div>
                        <div className="serial" >IMG-352515151.JPG</div>
                        <div className="monicker1">李白白</div>
                        <div className="schedule">2019-08-13</div>
                      </div>
                    </div>

                  </div>
                </div>
              </TabPane>
            </Tabs>
          </div>
        </div>
        <div className="headportrait ">
          <img src="../src/media/img/touxiang.png" width="100%" height="100%" />
          <div className="sexism " />
        </div>
      </div>
    )
  }
}

export default Profile
