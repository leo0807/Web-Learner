import React,{useEffect, useState} from 'react';
import './App.css';
import data from './assets/data.json';
import JobBoardComponent from './components/JobBoardComponent';
// import Footer from './container/Footer';
import Pagination from '@material-ui/lab/Pagination';
// import {FixedSizeList as List } from 'react-window';

export type dataJson = {
    "id": number,
    "company": string,
    "logo": string,
    "isNew": boolean,
    "featured": boolean,
    "position": string,
    "role": string,
    "level": string,
    "postedAt": string,
    "contract": string,
    "location": string,
    "languages": Array<string>,
    "tools": Array<string>
}

const App:React.FC = () => {

  const [jobs, setJobs] = useState<Array<dataJson>>([]);
  const [filters, setFilters] = useState<Array<string>>([]);
  const [curPage, setCurPage] = useState<number>(0);
  const [pages, setPages] = useState<number>(0);
  const pageLimit = 5;
  let showedJobs;
  useEffect(() => {
    setJobs(data);
  }, []);
  
  
  const filterFunc = ({role, level, tools, languages}:dataJson): (string| boolean) => {
    if(filters.length === 0) return true;
    const tags = [role, level];
    languages && tags.push(...languages);
    tools && tags.push(...tools);

    return filters.every(filter => tags.includes(filter));
  };

  let filteredJobs = jobs.filter(filterFunc);
  useEffect(() => setPages(Math.ceil(filteredJobs.length / pageLimit)), [filteredJobs.length]);
  
  if (filteredJobs.length > pageLimit) {
    showedJobs = filteredJobs.slice(curPage, curPage + pageLimit);
  } else {
    showedJobs = filteredJobs;
  }
  

  const handleTagClick = (tag:string): void => {
    if (filters.includes(tag)) return;
    setFilters([...filters, tag]);
  }

  function handleFilterClick(passedFilter:string):void {
    setFilters(filters.filter(f => f !== passedFilter));
  }
  const clearFilters = () => {
    setFilters([]);
  }

  const handlePageChange = (event: React.ChangeEvent<any>, page: number):void => {
    setCurPage((page - 1) * pageLimit);
  }
  
  return (
    <div className="App">
      <header className="bg-green-100 mb-12">
          <img className="w-full" src="/images/bg-header-desktop.svg" alt="bg-img"></img>
      </header>
      <div className="container m-auto rounded-md">
        {filters.length > 0 && (
            <div className="flex flex-wrap bg-white dark:bg-black shadow-md -my-20 mb-16 mx-10 p-6 cursor-pointer rounded z-10 relative">
              {filters.map((filter, index) => 
                  <span  key={index}
                      onClick={()=> handleFilterClick(filter)}
                      className="text-green-500 bg-green-100 text-xs font-bold mr-4 p-2 mb-4 rounded hover:bg-green-300 hover:text-white lg:mb-0 lg:text-sm">
                    ×  {filter}
                  </span>
                )}
              <button 
                  className="font-bold text-gray-700 ml-auto hover:text-gray"
                  onClick={clearFilters}>
                    Clear
              </button>
            </div>
        )}  

        {jobs.length === 0 ? (
            <p>Jobs are fetching...</p>
        ) : showedJobs.length !== 0?
              showedJobs.map(job => (
                <JobBoardComponent
                  key={job.id}
                  handleTagClick={handleTagClick}
                  job={job}
                />)) :
            <h1>No Matched Results</h1>
        }

      </div>
      <footer className="flex flex-col items-center bottom-0">
        <Pagination page={curPage} count={pages} variant="outlined" showFirstButton showLastButton siblingCount={2}
          onChange={handlePageChange}
        />
        <h3 className="font-bold">Copyright 2021</h3>
      </footer>
    </div>
  );
}

export default App;

              // filteredJobs.map(job => (
              //   <JobBoardComponent
              //     handleTagClick={handleTagClick}
              //     job={job}
              //     key={job.id}
              //   />))