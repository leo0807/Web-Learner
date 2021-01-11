import React, { useState } from 'react'
import { Form, Input, Button } from 'antd';
function FormPage() {
    const [password, setPassword] = useState("");
    const submit = () => {
        console.log('Submit');
    }
    return (
        <div>
            <h3>Form Page</h3>
            <Form.Item>
                <Input placeholder="please input ur name" ></Input>
            </Form.Item>
            <Form.Item>
                <Input type="password" placeholder="please input ur password"
                    onChange={e => setPassword(e.target.value)}></Input>
            </Form.Item>
            <Button type="primary" onClick={submit}></Button>
        </div>
    )
}

export default FormPage
