import React, {useState, useMemo} from 'react'

export default function Example() {
    const [memberA, setMemberA] = useState('A is waiting...');
    const [memberB, setMemberB] = useState('B is waiting...');
    return (
        <>
            <button onClick={()=>{setMemberA(new Date().getTime())}}>Member A</button>
            <button onClick={() => { setMemberB(new Date().getTime()) }}>Member B</button>
            <ChildComponent name={memberA}>{memberB}</ChildComponent>
        </>
    )
}

export default Example

function ChildComponent({ name, children }) {
    function changeMemberA() {
        console.log('MemberA is coming');
        return name + ', MemberA is coming';
    }
    const actionMemberA = useMemo(() => changeMemberA(name),[name])
    return (
        <React.Fragment>
            { children}
        </React.Fragment>
    )
}
