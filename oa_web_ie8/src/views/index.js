/**
 * 页面出口文件
 * yel 2019年8月23日
 */
import Uncheck from './Uncheck/Uncheck'
import Dashboard from './Home/Dashboard'
import Approve from './Approve/Approve'
import DocSign from './DocSign/DocSign'
import News from './News/News'
import Schedule from './Schedule/Schedule'
import Profile from './Profile/Profile'
import Chat from './Chat/Chat'

// const WysiwygBundle = Loadable({
//   // 按需加载富文本配置
//   loader: () => import('./ui/Wysiwyg'),
//   loading: Loading,
// });

export default {
  Uncheck,
  Dashboard,
  Approve,
  DocSign,
  News,
  Schedule,
  Profile,
  Chat
}
