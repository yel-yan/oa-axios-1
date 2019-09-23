import React from 'react'
import { Router, Route, hashHistory, IndexRoute, Redirect,Switch,browserHistory } from 'react-router'
import App from '../App'
import Inbox from '../components/Inbox'
import Drag from '../components/Drag'
import Test from '../components/Test'
import Message from '../components/Message'
import AllViews from '../views/index'
import Login from "../components/login/Login";
import PasswordChange from "../components/password-change/PasswordChange";

const Routes = () => (
  <Router history={hashHistory}>
    <Route path='/login'  component={Login}/>
    <Route path='/password-change'  component={PasswordChange}/>
    <Route path="/" component={App}>
      <IndexRoute component={AllViews.Dashboard} />
      <Route path="inbox" component={Test}>
        <Route path="messages/:id" component={Message} />
      </Route>
      <Route path="uncheck" component={AllViews.Uncheck} />
      <Route path="Approve" component={AllViews.Approve} />
      <Route path="docsign" component={AllViews.DocSign} />
      <Route path="news" component={AllViews.News} />
      <Route path="schedule" component={AllViews.Schedule} />
      <Route path="profile" component={AllViews.Profile} />
      <Route path="chat" component={AllViews.Chat} />
    </Route>
    <Redirect from="*" to="/" />
  </Router>
)

export default Routes
