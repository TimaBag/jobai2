import React from "react";
import { Container, Typography } from "@mui/material";
import JobCard from "./job-card";
import jobs from "../utils/jobs";

const JobList = ({ onSelectJob }) => {
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
        Find a Job
      </Typography>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} onClick={() => onSelectJob(job)} />
      ))}
    </Container>
  );
};

export default JobList;
