// import { useQuery } from "@tanstack/react-query";
import JobList from "../components/job-list";

const JobListPage = () => {
//   const { data } = useQuery(
//     "jobs",
//     async () => {
//       const res = await fetch("/api/jobs");
//       return res.json();
//     }
//   );
  
//   console.log(data)

  return <JobList />;
};

export default JobListPage;
