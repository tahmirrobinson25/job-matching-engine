//scoring functions and logical operations
import { normalizeSynonyms } from './synonyms.ts'

export const scoreTitle = (jobTitle :string , userTitle :string) => {
  const job = normalizeSynonyms(jobTitle);
  const user = normalizeSynonyms(userTitle || "");

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

export const scoreLocation = (jobLocation :string, userLocation : string) => {
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

export const scoreType = (jobType :string , userType :string) => {
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

export const scoreSalary = (jobSalary :number, userSalary :number) =>  {
    const jSalary = jobSalary;
    const uSalary = userSalary;

    if (!uSalary)
    {
        return 0;
    }
    
    if (jSalary >= uSalary)
    {
        return 100;
    }

    if (jSalary  >= (uSalary - 10000))
    {
        return 75;
    }

    else if (jSalary >= (uSalary - 20000))
    {
        return 50;
    }

    return 0;

};