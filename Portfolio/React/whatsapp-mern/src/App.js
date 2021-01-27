import './App.css';
import Sidebar from './components/Siderbar';
import Chat from './components/Chat';
function App() {
  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default App;
