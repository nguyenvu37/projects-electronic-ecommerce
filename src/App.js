import React, { Suspense, lazy } from 'react';
import './App.css';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import { NotificationContainer } from "react-notifications";
import { BrowserRouter as Router,
  Route,
  Switch 
} from 'react-router-dom';
import Waiting from './common/waiting';
import routes from './config/routes';

const AddTitle = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      return (document.title = rest.title) && <Component {...props} />;
    }}
  />
);

function App() {
  return (
    <div className="App">
    <Suspense 
        fallback={<Waiting custom={{ position: "relative", top: "300px" }} />}
      >
        <Router>
          <Header />
          <Switch>
            {
              routes.map((config, index)=> {
                const component = lazy(() => import(`${config.component}`));
                return (
                  <AddTitle 
                    key={`route + ${index}`}
                    exact
                    title={config.title}
                    path={config.path}
                    component={component}
                  />
                );
              })
            }
          </Switch>
          <Footer />
        </Router>
        <NotificationContainer />
      </Suspense>      
    </div>
  );
}

export default App;
