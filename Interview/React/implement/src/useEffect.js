import React,{ useState, useEffect} from 'react'

export default function useEffect() {
    const [loading, setLoading] = useState(true);
    // 不加第二个参数相当于componentDIdMount
    // useEffect(() => {
    //     setTimeout(() => {
    //         setLoading(false);
    //     }, 3000)
    // })
    // 第二个参数是数组，是依赖项
    // 回掉函数会根据数组发生变化而调用

    // 回掉函数可返回，返回则触发componentDidUnmount
    const [name, setName] = useState('hello');
    const changeName = (name) => {
        setName
    }
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 3000)
    })
    return (
        <div>
            {loading?<div>Loading</div>: <div>Completed</div>}
        </div>
    )
}