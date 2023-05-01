import './App.css'
import { LoginForm } from './components/Form/Login';
import MainDash from './components/MainDash/MainDash';
import RightSide from './components/RigtSide/RightSide';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="App">
      {/* <div className="AppGlass">
        <Sidebar/>
        <MainDash/>
        <RightSide/>
      </div> */}
      <LoginForm/>
    </div>
  );
}

export default App;
