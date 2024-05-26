import React from 'react'
import { Route, Switch } from "react-router";
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'

const Home = React.lazy(() => import('../home/Home'));

const TheLayout = () => {

  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route>
        <div className="c-app c-default-layout">
          <TheSidebar />
          <div className="c-wrapper">
            <TheHeader />
            <div className="c-body">
              <TheContent />
            </div>
            <TheFooter />
          </div>
        </div>
      </Route>
    </Switch>
  )
}

export default TheLayout
