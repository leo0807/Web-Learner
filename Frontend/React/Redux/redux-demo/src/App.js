import './App.css';
import 'antd/dist/antd.css'
import {Input, Button, List} from 'antd'

function App() {
  const data = [
    '早8点吃饭',
    '午12点吃饭',
    '晚6点吃饭',
  ]
  return (
    <div className="App">
      <Input placeholder="Write Something"
        style={{ width: "250px",marginRight: "10px" }} />
      <Button type="primary"></Button>
      <div style={{ margin: '10px', width: '300px' }}>
        <List bordered dataSource={data} renderItem={item => (<List.Item>{item}</List.Item>)} />
      </div>
    </div>
  );
}

export default App;
