import { useParams } from "react-router-dom";
import JobDetails from "../components/job-details";
import jobs from "../utils/jobs";
  
const JobDetailsPage = () => {
    const { id } = useParams();
    const job = jobs.find((job) => job.id === parseInt(id));

    return <JobDetails job={job} />;
};

export default JobDetailsPage;
