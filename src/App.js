import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Login from './Login';
import { useStateValue } from './StateProvider';


function App() {

  const [{user}, dispatch] = useStateValue()
  

  return (
    <div className="App">
      {!user ? 
      <Login></Login>
      :
      <div className='app__body'>
      <Router>
        <Sidebar></Sidebar>
        <Switch>
          <Route path='/:chat_id'>
            <Chat></Chat>
          </Route>
          <Route path='/'>
            <Chat></Chat>
          </Route>
        </Switch>
      </Router>
    </div>
      }

    </div>
  );
}

export default App;
