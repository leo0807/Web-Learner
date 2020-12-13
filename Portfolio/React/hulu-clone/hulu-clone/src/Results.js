import React, { useState, useEffect } from 'react'
import './Results.css';
import VideoCard from './VideoCard';
import axios from './axios';
import FilpMove from "react-flip-move";

function Results({ selectedOption }) {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(selectedOption);
            setMovies(request.data.results)
            return request
        }
 
        fetchData();

    }, [selectedOption])
    // 第二个参数为依赖项
    // 如果没有第二参数，每次渲染都会执行该函数
    // 如果有第二哥参数为空数组，则只运行一次
    // 如果若第二个参数为【name】，则变量name发生改变时也运行

    return (
        <div className="results">
            <FilpMove>
                {movies.map((movie, index) => {
                    return <VideoCard movie={movie} key={movie.id} />
                })}
            </FilpMove>
        </div>
    )
}
export default Results
