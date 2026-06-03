import { pool } from './connection.ts';

export const jobs = [
    {
     //id: 1,
     title: "Software Engineer",
     company: "Google",
     location: "Remote",
     type: "Part-time",
     salary: 80000,
     //skills: ["node.js", "React", "JavaScript", "TypeScript", "C#", "Agile"],
     description: "Designs, builds, tests, and maintains software applications using modern programming languages and development tools. Collaborates with cross-functional teams to deliver scalable, reliable solutions and troubleshoot production issues"
    },
    
    {
      //id: 2,
      title: "Software Developer",
      company: "Microsoft",
      location: "New Jersey",
      type: "Full-time",
      salary: 70000,
      //skills: ["C#", "Backend development", "Agile", "SQL"],
      description: "Develops and maintains software features, writes clean and efficient code, and fixes bugs. Works with databases, APIs, and user interfaces to deliver business applications and improve existing systems."
    },

    {
      //id: 3,
      title: "Sr. Software Engineer",
      company: "Sony",
      location: "Remote",
      type: "Full-time",
      salary: 90000,
      //skills: ["node.js", "Express", "TypeScript", "Next.js", "POSTGres"],
      description: "Leads the design and implementation of complex software systems, mentors junior developers, and makes architectural decisions. Optimizes performance, reliability, and scalability across large applications."
    },

    {
      //id: 4,
      title: "Game Developer",
      company: "Sony",
      location:"California",
      type: "Contract",
      salary: 50000,
      //skills: ["Game development", "Unity", "Design Mechanics", "C#", "GIMP"],
      description: "Creates interactive video games by implementing gameplay systems, debugging performance issues, and integrating graphics, audio, and user input. Collaborates with designers and artists to deliver polished player experiences."
    },

    {
      //id: 5,
      title: "Junior Front-End Developer",
      company: "Meta",
      location: "New Jersey",
      type: "Hybrid",
      salary: 65000,
      //skills: ["HTML", "CSS", "JavaScript", "Web Technologies", "node.js"],
      description: "Builds responsive user interfaces using HTML, CSS, JavaScript, and React. Implements designs, integrates with backend APIs, and fixes front-end bugs while learning modern web development best practices."
    },

    {
  title: "Backend Developer",
  company: "Amazon",
  location: "Remote",
  type: "Full-time",
  salary: 95000,
  description: "Builds and maintains server-side applications, APIs, and database integrations. Focuses on scalability, security, and performance while supporting business-critical services."
},

{
  title: "Frontend Developer",
  company: "Netflix",
  location: "California",
  type: "Full-time",
  salary: 90000,
  description: "Develops responsive web interfaces using modern JavaScript frameworks. Works closely with designers and backend engineers to create engaging user experiences."
},

{
  title: "Full Stack Developer",
  company: "Spotify",
  location: "Remote",
  type: "Full-time",
  salary: 105000,
  description: "Designs and develops both frontend and backend features. Collaborates across teams to deliver complete web applications from concept to deployment."
},

{
  title: "Junior Software Engineer",
  company: "IBM",
  location: "New Jersey",
  type: "Hybrid",
  salary: 65000,
  description: "Assists in developing software solutions, fixing bugs, and implementing new features while gaining experience with enterprise development practices."
},

{
  title: "Technical Support Engineer",
  company: "Amplify",
  location: "Remote",
  type: "Full-time",
  salary: 70000,
  description: "Investigates technical issues, troubleshoots software problems, and partners with engineering teams to resolve customer-facing incidents."
},

{
  title: "DevOps Engineer",
  company: "Oracle",
  location: "Texas",
  type: "Full-time",
  salary: 115000,
  description: "Automates deployment pipelines, manages cloud infrastructure, and improves system reliability through monitoring and continuous integration practices."
},

{
  title: "QA Automation Engineer",
  company: "Salesforce",
  location: "Remote",
  type: "Full-time",
  salary: 85000,
  description: "Creates automated test suites, validates software quality, and collaborates with developers to ensure reliable releases."
},

{
  title: "Web Developer",
  company: "Adobe",
  location: "Florida",
  type: "Contract",
  salary: 75000,
  description: "Builds and maintains websites, integrates APIs, and optimizes performance while ensuring cross-browser compatibility."
},

{
  title: "Software Engineer I",
  company: "Cisco",
  location: "North Carolina",
  type: "Full-time",
  salary: 80000,
  description: "Contributes to software projects by implementing features, fixing defects, and participating in code reviews and agile development processes."
},

{
  title: "Cloud Engineer",
  company: "Microsoft",
  location: "Remote",
  type: "Full-time",
  salary: 120000,
  description: "Designs, deploys, and manages cloud-based solutions while improving infrastructure scalability, security, and availability."
},

{
  title: "React Developer",
  company: "Meta",
  location: "Remote",
  type: "Contract",
  salary: 85000,
  description: "Builds interactive user interfaces using React and TypeScript while integrating backend APIs and optimizing application performance."
},

{
  title: "Systems Engineer",
  company: "Lockheed Martin",
  location: "Virginia",
  type: "Full-time",
  salary: 95000,
  description: "Designs and supports complex systems, ensuring hardware and software components operate together efficiently."
},

{
  title: "Application Developer",
  company: "Capital One",
  location: "Hybrid",
  type: "Full-time",
  salary: 90000,
  description: "Develops internal and customer-facing applications while maintaining software quality and business functionality."
},

{
  title: "Software Consultant",
  company: "Accenture",
  location: "Remote",
  type: "Contract",
  salary: 100000,
  description: "Works with clients to design software solutions, gather requirements, and implement technology improvements."
},

{
  title: "Data Engineer",
  company: "Snowflake",
  location: "Remote",
  type: "Full-time",
  salary: 125000,
  description: "Builds and maintains data pipelines, optimizes storage systems, and supports analytics initiatives."
},

{
  title: "Platform Engineer",
  company: "Atlassian",
  location: "Remote",
  type: "Full-time",
  salary: 115000,
  description: "Develops internal platforms and infrastructure services that improve developer productivity and operational efficiency."
},

{
  title: "Mobile Developer",
  company: "Uber",
  location: "California",
  type: "Full-time",
  salary: 110000,
  description: "Creates and maintains mobile applications, implements new features, and improves app stability and performance."
},

{
  title: "Entry-Level Software Developer",
  company: "Dell",
  location: "Texas",
  type: "Hybrid",
  salary: 60000,
  description: "Supports software development efforts through coding, testing, debugging, and documentation while learning enterprise workflows."
},

{
  title: "Site Reliability Engineer",
  company: "Google",
  location: "Remote",
  type: "Full-time",
  salary: 130000,
  description: "Improves system reliability, monitors production environments, and automates operational processes."
},

{
  title: "Java Developer",
  company: "JPMorgan Chase",
  location: "New Jersey",
  type: "Full-time",
  salary: 95000,
  description: "Develops enterprise applications using Java and related technologies while supporting financial systems and services."
},

];

export const seedJobs = async () => {
    try {
        await pool.query('TRUNCATE TABLE jobs RESTART IDENTITY');

        for (const job of jobs) {
            await pool.query(
            `
            INSERT INTO jobs(title, company, location, type, salary, description)
            VALUES ($1, $2, $3, $4, $5, $6);
            `,
            [
                job.title,
                job.company,
                job.location,
                job.type,
                job.salary,
                job.description
            ]
            )
        };

        console.log('Database seeded successfully')
    } catch (error) {
        console.error(error);
    } finally {
        await pool.end();
    }
};

seedJobs();