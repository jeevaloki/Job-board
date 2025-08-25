import React, { useState, useEffect } from "react";


const jobsData = [
  { id: 1, title: "Frontend Developer", category: "IT", applicants: 5 },
  { id: 2, title: "Backend Developer", category: "IT", applicants: 2 },
  { id: 3, title: "HR Manager", category: "HR", applicants: 3 },
  { id: 4, title: "Sales Executive", category: "Sales", applicants: 4 },
  { id: 5, title: "Marketing Specialist", category: "Marketing", applicants: 1 },
  { id: 6, title: "UI/UX Designer", category: "Design", applicants: 6 },
  { id: 7, title: "Data Analyst", category: "IT", applicants: 2 },
  { id: 8, title: "Content Writer", category: "Marketing", applicants: 3 },
];

export default function App() {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);
  const jobsPerPage = 3;

  useEffect(() => {
    // Mock fetch
    setJobs(jobsData);
  }, []);

  const applyJob = (id) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === id ? { ...job, applicants: job.applicants + 1 } : job
      )
    );
  };

  const filteredJobs =
    filter === "All" ? jobs : jobs.filter((job) => job.category === filter);

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const startIndex = (page - 1) * jobsPerPage;
  const paginatedJobs = filteredJobs.slice(startIndex, startIndex + jobsPerPage);

  return (
    <div className="container">
      <h1>Job Board</h1>

      {/* Filter */}
      <div className="filter">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Sales">Sales</option>
          <option value="Marketing">Marketing</option>
          <option value="Design">Design</option>
        </select>
      </div>

      {/* Jobs */}
      {paginatedJobs.map((job) => (
        <div key={job.id} className="job-card">
          <h3>{job.title}</h3>
          <p>Category: {job.category}</p>
          <p>Applicants: {job.applicants}</p>
          <button onClick={() => applyJob(job.id)}>Apply</button>
        </div>
      ))}

      {/* Pagination */}
      <div className="pagination">
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))}>
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button onClick={() => setPage((p) => Math.min(p + 1, totalPages))}>
          Next
        </button>
      </div>
    </div>
  );
}
