import React, {useRef, useState} from 'react'

export default function useRefExample() {
    const inputVal = useRef(null);
    const onButtonClick = () => {
        inputVal.current.value = "Hello, useRef";
        console.log(inputEl);
    }
    const textRef = useRef();
    useEffect(() => {
        textRef.current = text;
        console.log(textRef.current);
    })
    const [text, setText] = useState('jspang')
    return (
        <div>
            <input ref={inputVal} type="text" />
            <button onClick={onButtonClick}>Show the text</button>
            <br />
            <br />
            <input value={tetx} onChange={(e) => e.target.value}/>
        </div>
    )
}

export default useRefExample;