import React, {useState} from 'react'

export default function UseMemo() {
    const [memberA, setMemberA] = useState('A is waiting...');
    const [memberB, setMemberB] = useState('B is waiting...');
    return (
        <div>
            <button onClick={()=>{setMemberA(new Date().getTime())}}>Member A</button>
            <button onClick={()=>{setMemberB(new Date().getTime())}}>Member B</button>
        </div>
    )
}
