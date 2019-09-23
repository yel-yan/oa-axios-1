/**
 * 路由组件出口文件
 * yel 2019年8月23日
 */
import App from '../App'
import Inbox from './Inbox'
import Message from './Message'
import Count from './Count'
import Echarts from './chart/Echarts'
import lineChart from './chart/Echarts'
import BarChart from './chart/Echarts2'
import calendar from './chart/Echarts3'
import QJModal from './modals/QJModal'
import BXModal from './modals/BXModal'
import CCModal from './modals/CCModal'
import JBModal from './modals/JBModal'
import WCModal from './modals/WCModal'
import WPModal from './modals/WPModal'
import GWModal from './modals/GWModal'
import RCModal from './modals/RCModal'
import Tab from './tabpane/Tab'
import Tab_apply from './tabpane/Tab_apply'

// const WysiwygBundle = Loadable({
//   // 按需加载富文本配置
//   loader: () => import('./ui/Wysiwyg'),
//   loading: Loading,
// });

export default {
  App,
  Inbox,
  Message,
  Count,
  Echarts,
  lineChart,
  BarChart,
  QJModal,
  BXModal,
  Tab,
  Tab_apply,
  CCModal,
  JBModal,
  WCModal,
  WPModal,
  calendar,
  GWModal,
  RCModal
}
