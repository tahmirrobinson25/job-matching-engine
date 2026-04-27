import {useState, useEffect} from "react";

 type Job = {
        id: number;
        title: string;
        company: string;
        location: string;
        type: string;
    };

function App() {
    //State stores data from backend
    const [jobs,setJobs] = useState<Job[]> ([]);

    

    //fetching data with callbacks
    /*
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
    */

    //Calling jobs using async/await
    useEffect(() => {
    const fetchJobs = async () => {
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
                <input type="text" placeholder="Ex. 'Software Engineer'"/>
                </div>
                <div>
                <label>Enter Location: </label>
                <input type="text" placeholder="Ex. 'New Jersey' or 'Remote'" />
                </div>
                <div>
                <label>Enter Job Type: </label>
                <input type="text" placeholder="Ex. 'Full-time' "/>
                </div>
                <div>
                <button type="submit" onClick={handleClick}>Search all jobs</button>
                </div>
                
            </div>
        </>
        
    );
}



export default App;