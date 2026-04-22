const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

let jobs = [
    {
     id: 1,
     title: "Software Engineer",
     company: "Google",
     location: "Remote"
    },
    
    {
      id: 2,
      title: "Software Developer",
      company: "Microsoft",
      location: "New Jersey"
    },

    {
      id: 3,
      title: "Sr. Software Engineer",
      company: "Sony",
      location: "Remote",
    },

    {
      id: 4,
      title: "Game Developer",
      company: "Sony",
      location:"California",
    },

    {
      id: 5,
      title: "Junior Front-End Developer",
      company: "Meta",
      location: "New Jersey"
    }
];

app.get("/jobs", (req, res) => {
    res.json(jobs);
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
