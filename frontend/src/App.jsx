import {useState, useEffect} from "react";


function App() {
    //State stores data from backend
    const [message,setMessage] = useState("");

    //Effect (runs when component loads)
    useEffect(() => {
        //Fetch request
        fetch("http://localhost:3000")
        .then((response) => response.json()) //convert response to JSON
        .then((data) => {
        //update the state with backend data 
        setMessage(data.message)
        });
    }, []);

    //Display data
    return (
        <div>
            <h1>Job Matching Engine</h1>
            <p>{message}</p>
        </div>
    );
}

export default App;