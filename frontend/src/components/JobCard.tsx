import type { Job } from '../types';

type JobCardProps = {
  job: Job;
};

export const JobCard = ({ job }: JobCardProps) => {
  return (
    <div
      style={{
        border: '2px solid #cfcfcf',
        padding: '15px',
        marginBottom: '15px',
        marginLeft: "10px",
        marginRight: "10px",
        borderRadius: '10px',
        backgroundColor: '#ffffff',
      }}
    >
      <h3 style={{ margin: '0 0 5px 0' }}>{job.company}</h3>
      <p style={{ margin: '0 0 10px 0' }}>Title: {job.title}</p>
      <p style={{ margin: '0 0 10px 0' }}>Location: {job.location}</p>
      <p style={{ margin: '0 0 10px 0' }}>Type: {job.type}</p>
      <p style={{ margin: '0 0 10px 0' }}>Salary: {job.salary}</p>
      <p style={{ margin: '0 0 10px 0' }}><strong>Score: {job.score}</strong></p>

      <button>View Full Description</button>
      
    </div>
  );
};
