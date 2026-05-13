import { useEffect, useState } from 'react';
import type { Job } from './types';
import { SearchForm } from './components/SearchForm';
import { JobList } from './components/JobList';

type Filters = {
  title: string;
  location: string;
  type: string;
  salary: string;
};

function App() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filters, setFilters] = useState<Filters>({
    title: '',
    location: '',
    type: '',
    salary: '',
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:3000/jobs');
        const data: Job[] = await response.json();
        setJobs(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchJobs();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/jobs?title=${filters.title}&location=${filters.location}&type=${filters.type}&salary=${filters.salary}`
      );

      const data: Job[] = await response.json();
      setJobs(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <header>
        <h1>Job Matching Engine</h1>
      </header>

      <SearchForm
        filters={filters}
        setFilters={setFilters}
        handleSubmit={handleSubmit}
      />

      <JobList jobs={jobs} />
    </>
  );
}

export default App;
/* import {useState, useEffect} from "react";
import type { Job } from "./types"
    
function App() {
    //State stores data from backend
    const [jobs,setJobs] = useState<Job[]> ([]);
    const [filters, setFilters] = useState({
        title: "",
        location: "",
        type: "",
        salary: ""
    });

    //Calling jobs using async/await
    useEffect(() => {
    const  fetchJobs = async () => {
    try {
      const response = await fetch("http://localhost:3000/jobs");
      const data : Job[] = await response.json();

      console.log("DATA FROM BACKEND:", data);
      setJobs(data);
    } catch (error :unknown) {
      console.error(error);
    }

    
  };

  fetchJobs();
}, []);

    const handleClick = () => {
    alert("Job submission successful");
}

const handleSubmit = async () => {
  try {
    const response = await fetch(`http://localhost:3000/jobs?title=${filters.title}&location=${filters.location}&type=${filters.type}&salary=${filters.salary}`)

    const data: Job[] = await response.json();

  console.log("Filters:", filters);
  console.log("Response:", data);

  setJobs(data);
  }
  catch (err: unknown) {
    console.error(err)
  }
    
  } 


    //Display data
    return (
        
        <>
            <header>
            <div>
            <h1>Job Matching Engine</h1>
            </div>
            </header>
            <div>
                <div>
                <label>Enter Job Title: </label>
                <input type="text" value={filters.title} placeholder="Ex. 'Software Engineer'"
                onChange={(e) => setFilters({...filters, title: e.target.value})} style={{width:275}} />
                </div>
                <div>
                <label>Enter Location: </label>
                <input type="text" value={filters.location} placeholder="Ex. 'New Jersey' or 'Remote'"
                onChange={(e) => setFilters({...filters, location: e.target.value})} style={{width:275}}/>
                </div>
                <div>
                <label>Enter Job Type: </label>
                <input type="text" value={filters.type}  placeholder="Ex. 'Full-time', 'Part-time', 'Contract', 'Hybrid'"
                onChange={(e) => setFilters({...filters, type: e.target.value})} style={{width:275}}/>
                </div>
                <div>
                  <label>Enter Desired Salary: </label>
                  <input type="number" value={filters.salary} placeholder="Ex. '80000'" 
                  onChange={(e) => setFilters({...filters, salary: e.target.value})} style={{width:235}}/>
                </div>
                <div>
                <button onClick={handleSubmit}>Search all jobs</button>
                </div>
                <div>
                    {jobs.map((job) => (
                        <div key={job.id} >
                        <h3>{job.title}</h3>
                        <p >Company: {job.company}</p> 
                        <p>Location: {job.location}</p>
                        <p>Type: {job.type}</p>
                        <p>Salary: {job.salary}</p>
                        <p>Score: {job.score}</p>
                        </div>
                    ))}
                </div>
                
            </div>
        </>
        
    );
} */