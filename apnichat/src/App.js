import "./App.css";

import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Join from './componant/Join/Join'
import Chat from "./componant/Chat/Chat";





function App() {

  return <div className="App">
    <Router>
    <Routes>
      <Route excat path="/" element={<Join/>} />
      <Route path="/chat" element={<Chat/>}/>
    </Routes>
    </Router>
  </div>;
}

export default App;
