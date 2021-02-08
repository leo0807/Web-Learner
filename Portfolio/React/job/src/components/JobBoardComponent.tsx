import React from 'react'
import { dataJson } from '../App';
type AppProps = {
    job: dataJson,
    handleTagClick: Function
};
const JobBoardComponent: React.FC<AppProps> = ({ job: {
    company, logo, isNew, featured, position, role, level,
    postedAt, contract, location, languages, tools
}, handleTagClick }) => {
    const tags = [role, level];
    languages && tags.push(...languages);
    tools && tags.push(...tools);
    return (
        <div className={`transition duration-500 transform hover:-translate-y-1 flex flex-col bg-white shadow-md mx-2 mb-20 p-6 cursor-pointer rounded lg:flex-row lg:mb-4 lg:mx-12 ${
           featured ? 'border-l-4 border-green-500 border-solid':''}`}>
            <div>
                <img className="-mt-16 mb-10 w-20 h-20 sm:mt-0 sm:h-24 sm:w-24 sm:my-0" src={logo} alt={company}/>
            </div>
            <div className="flex flex-col items-start ml-4">
                <h3 className="font-blod text-green-500">
                    {company}
                    {isNew && <span className="text-xs bg-green-500 text-green-100 font-bold py-1 px-2 m-2 rounded-full uppercase text-sm">New</span>}
                    {featured && <span className="text-xs bg-gray-800 text-white font-bold py-1 px-2 rounded-full uppercase text-sm">Featured</span>}
                </h3>
                <h2 className="font-bold text-xl my-2">{position}</h2>
                <p className="text-gray-700">{postedAt} · {contract} · {location}</p>
            </div>
            <div className="flex flex-wrap items-center justify-end mt-4 mx-4 pt-4 border-t border-gray-500 border-solid sm:ml-auto sm:border-0 sm:pt-0 sm:mt-0">
                {
                    tags?tags.map((tag, i) => <span key={i} className="cursor-pointer text-green-500 bg-green-100 font-bold mr-4 mb-4 p-2 rounded sm:mb-0 hover:bg-green-300 hover:text-white" onClick={()=>handleTagClick(tag)}>{tag}</span>): ''
                }
            </div>
        </div>
    )
}

export default JobBoardComponent
