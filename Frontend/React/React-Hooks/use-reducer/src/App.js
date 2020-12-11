import ShowArea from './ShowArea'
import Buttons from './Buttons'
import { Color } from './Color'
import './App.css';

function App() {
  return (
    <div className="App">
      <Color>
        <ShowArea />
        <Buttons />
      </Color>
    </div>
  );
}

export default App;
