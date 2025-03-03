import { 
    Container, Typography, Box, Button, Card, CardContent, Avatar, 
    Divider, IconButton, Tooltip 
  } from "@mui/material";
  import ContentCopyIcon from "@mui/icons-material/ContentCopy";
  import { useState } from "react";
  
  const JobDetails = ({ job }) => {
    const [copied, setCopied] = useState(false);
  
    if (!job) return <Typography variant="h5">Job not found</Typography>;
  
    const handleCopyLink = () => {
      navigator.clipboard.writeText(job.referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };
  
    return (
      <Container sx={{ display: "flex", gap: 4, mt: 4 }}>
        {/* Left Side - Job Details */}
        <Box sx={{ flex: 2 }}>
          <Typography variant="h3" fontWeight="bold">{job.title}</Typography>
          <Typography variant="h5" color="gray" sx={{ mt: 1 }}>
            {job.salary}
          </Typography>
          <Typography variant="subtitle2" color="gray" sx={{ mt: 1 }}>
            {job.contractType} • {job.location}
          </Typography>
  
          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <Avatar sx={{ bgcolor: "blue", mr: 2 }}>M</Avatar>
            <Box>
              <Typography fontWeight="bold">{job.companyName}</Typography>
              <Typography color="gray">{job.companyWebsite}</Typography>
            </Box>
          </Box>
  
          <Divider sx={{ my: 3 }} />
  
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>About the Job</Typography>
          <Typography paragraph>{job.description}</Typography>
  
          <Typography variant="h6" fontWeight="bold" sx={{ mt: 3 }}>Required Skills</Typography>
          <ul>
            {job.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
  
          <Typography variant="h6" fontWeight="bold" sx={{ mt: 3 }}>Key Responsibilities</Typography>
          <ul>
            {job.responsibilities.map((task, index) => (
              <li key={index}>{task}</li>
            ))}
          </ul>
  
          <Typography variant="h6" fontWeight="bold" sx={{ mt: 3 }}>Compensation & Benefits</Typography>
          <ul>
            {job.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
  
          <Divider sx={{ my: 3 }} />
  
          <Typography variant="h6" fontWeight="bold">Earn $500 by referring</Typography>
          <Typography sx={{ mt: 1 }}>
            Share the referral link below and <strong>earn $500</strong> for each successful hire.
          </Typography>
  
          <Box sx={{ display: "flex", alignItems: "center", mt: 2, p: 2, bgcolor: "#f4f4f4", borderRadius: 1 }}>
            <Typography sx={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis" }}>
              {job.referralLink}
            </Typography>
            <Tooltip title={copied ? "Copied!" : "Copy Link"}>
              <IconButton onClick={handleCopyLink}>
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
  
        {/* Right Sidebar - Job Summary */}
        <Card sx={{ flex: 1, p: 3, height: "fit-content" }}>
          <Typography variant="h5" fontWeight="bold">{job.salary}</Typography>
          <Typography color="gray" sx={{ mt: 1 }}>Total hourly rate</Typography>
  
          <Box sx={{ bgcolor: "#f4f4f4", p: 2, mt: 2, borderRadius: 1 }}>
            <Typography fontWeight="bold">{job.contractType}</Typography>
            <Typography color="gray">{job.workHours} • {job.location}</Typography>
          </Box>
  
          <Button variant="contained" fullWidth sx={{ mt: 3 }}>
            Apply Now
          </Button>
          <Button variant="outlined" fullWidth sx={{ mt: 1 }}>
            Refer & Earn
          </Button>
  
          <Typography color="gray" sx={{ mt: 2, fontSize: "12px" }}>
            Posted {job.postedDaysAgo} days ago
          </Typography>
        </Card>
      </Container>
    );
  };
  
  export default JobDetails;
  