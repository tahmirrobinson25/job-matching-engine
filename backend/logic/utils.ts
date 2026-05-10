//scoring functions and logical operations

export const scoreTitle = (jobTitle :string , userTitle :string) => {
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

