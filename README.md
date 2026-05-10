Job Matching Engine
This Job Matching Engine helps users identify job opportunities that best match their preferences based on criteria such as job title, location, and employment type. The application scores and ranks jobs so users can quickly see which opportunities are the strongest matches.

Tech Stack
Frontend
•	React 
•	TypeScript 
•	Vite 
Backend
•	Node.js 
•	Express 
•	TypeScript 
Features
•	Fetches job data from the backend API 
•	Allows users to search by: 
o	Job Title 
o	Location 
o	Job Type 
•	Scores and ranks jobs based on match quality 
•	Displays jobs in order of highest relevance 

Prerequisites
Before running the project, make sure you have installed:
•	Node.js 
•	npm 
•	Visual Studio Code (recommended) 

Installation
Clone the repository:
git clone <repository-url>
cd job-matching-engine
Install Backend Dependencies
cd backend
npm install
Install Frontend Dependencies
cd ../frontend
npm install
Running the Application
Start the Backend
From the backend directory, run:
npm run dev
Expected output:
Server running on port 3000
Start the Frontend
From the frontend directory, run:
npm run dev
Expected output:
VITE v...
Local: http://localhost:5173/

Using the Application
1.	Open your browser and navigate to:
http://localhost:5173 
2.	Enter search criteria. 
3.	Click Search All Jobs. 
4.	Review the ranked job results. 

Project Structure
job-matching-engine/
├── backend/
│   ├── data/
│   ├── logic/
│   ├── routes/
│   ├── index.ts
│   └── package.json
├── frontend/
│   ├── src/
│   ├── index.html
│   └── package.json
└── README.md

Notes
These setup instructions were tested successfully in Visual Studio Code using a fresh installation of the repository.
