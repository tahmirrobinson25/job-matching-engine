import cors from 'cors';
import express from 'express';
import type {Request, Response} from 'express';

const app = express();

app.use(express.json());
app.use(cors());

 let jobs = [
    {
     id: 1,
     title: "Software Engineer",
     company: "Google",
     location: "Remote",
     type: "Part-time"
    },
    
    {
      id: 2,
      title: "Software Developer",
      company: "Microsoft",
      location: "New Jersey",
      type: "Full-time"
    },

    {
      id: 3,
      title: "Sr. Software Engineer",
      company: "Sony",
      location: "Remote",
      type: "Full-time"
    },

    {
      id: 4,
      title: "Game Developer",
      company: "Sony",
      location:"California",
      type: "Contract"
    },

    {
      id: 5,
      title: "Junior Front-End Developer",
      company: "Meta",
      location: "New Jersey",
      type: "Hybrid"
    }
]; 



const scoreTitle = (jobTitle :string , userTitle :string) => {
  const job = jobTitle.toLowerCase();
  const user = (userTitle || "").toLowerCase();

  if (!userTitle) {
    return 0;
  }

  //Exact match
  if (job === user) {
    return 100;
  }

  //Partial match
  if (job.includes(user) || user.includes(job)) {
    return 50;
  }

  //Not a match
  else {
    return 0;
  };
};

const scoreLocation = (jobLocation :string, userLocation : string) => {
  const jobLoc = jobLocation.toLowerCase();
  const userLoc = (userLocation || "").toLowerCase();

  if (!userLocation) {
    return 0;
  }

  if (jobLoc === "remote" && userLoc === "remote")
  {
    return 100;
  }

  else if (jobLoc === userLoc)
  {
    return 100;
  }

  else
  {
    return 0;
  };
};

const scoreType = (jobType :string , userType :string) => {
  const jType = jobType.toLowerCase();
  const uType = (userType || "").toLowerCase();

  if (!userType){
    return 0;
  }

  if (jType === uType) {
    return 100;
  }

    return 0;
};

app.get("/jobs", (req :Request, res :Response) => {
    let filterJobs = jobs;

    const location = req.query.location as string;
    const title = req.query.title as string;
    const company = req.query.company as string;
    const type = req.query.type as string;

    const weights = {
      title: 5,
      location: 3,
      type: 2
    }

    if (company) {
      filterJobs = filterJobs.filter((job) =>
      job.company.toLowerCase() === company.toLowerCase()
      );
    };


     const scoredJobs = filterJobs.map((job) => {
      const scoredTitle = scoreTitle(job.title, title) * weights.title;
      const scoredLocation = scoreLocation(job.location, location) * weights.location;
      const scoredType = scoreType(job.type, type) * weights.type;
      const score = scoredTitle + scoredLocation + scoredType;
      return {...job, score};
    });

    //const filteredJobs = scoredJobs.filter((job => job.score > 0))

    const sortedJobs = scoredJobs.sort((a, b) => {

      return b.score - a.score;

      
    }); 

    


    res.json(sortedJobs);
});

const PORT : number = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});