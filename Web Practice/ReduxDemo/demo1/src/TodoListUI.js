import React from 'react';
import 'antd/dist/antd.css';
import { Input, Button, List } from 'antd';

const TodoListUI = (props) => {
    return( 
        <div style = {{ margin:'10px'}} onKeyPress = { props.handleOnKeyPress } >
                    <div>
                        <Input 
                            placeholder = {props.inputValue} 
                            style={{width: '250px', marginRight:'10px'}} 
                            onChange={props.changeInputValue}
                            value={props.inputValue}
                            />
                        <Button type='primary'
                            onClick={props.clickBtn}
                            >Add</Button>
                    </div>
                        <div style={{margin:'10px', width:'300px'}}>
                            <List bordered dataSource={props.list} renderItem={(item, index)=>(<List.Item onClick={props.deleteItem.bind(this, index)}>{item}</List.Item>)} />
                        </div>
        </div >
        )
};
// Class-based Components
// class TodoListUI extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {  }
//     }
//     render() { 
//         return ( <div onKeyPress={this.props.handleOnKeyPress}>
//             <div style={{margin:'10px'}}>
//                 <Input 
//                     placeholder = {this.props.inputValue} 
//                     style={{width: '250px', marginRight:'10px'}} 
//                     onChange={this.props.changeInputValue}
//                     value={this.props.inputValue}
//                     />
//                 <Button type='primary'
//                     onClick={this.props.clickBtn}>Add</Button>
//             </div>
//             <div style={{margin:'10px', width:'300px'}}>
//                 <List bordered dataSource={this.props.list} renderItem={(item, index)=>(<List.Item onClick={this.props.deleteItem.bind(this, index)}>{item}</List.Item>)} />
//             </div>
//         </div>  );
//     }
// }

export default TodoListUI;