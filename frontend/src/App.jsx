import {useState, useEffect} from "react";


function App() {
    //State stores data from backend
    const [jobs,setJobs] = useState([]);

    //Effect (runs when component loads)
    useEffect(() => {
        //Fetch request
        fetch("http://localhost:3000/jobs")
        .then((response) => response.json()) //convert response to JSON
        .then((data) => {
        //update the state with backend data 
        console.log("DATA FROM BACKEND:", data);
        setJobs(data);
        });
    }, []);

    //Display data
    return (
        <div>
            <h1>Job Matching Engine</h1>

            {jobs.map((job) => (
                <div key={job.id}>
                    <p>{job.title} - {job.company}</p>
                </div>
            
            ))}
        </div>
    );
}

export default App;