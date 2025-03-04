import { useState } from "react"
import { UploadCV } from "../components/upload-cv"
import { ChatWithBot } from "../components/chat-with-bot"
import { FinalizeInfo } from "../components/finalize-info"
import { LinearProgress, Button, Container, Typography, Box, Step, StepLabel, Stepper } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import CheckIcon from "@mui/icons-material/Check"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "react-toastify"
import { uploadCV } from "../services/user.service"

const ACCESS_TOKEN = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlFnSWVkdlRqaThEX0tDWE8zaHNhVCJ9.eyJuaWNrbmFtZSI6InRlc3QiLCJuYW1lIjoidGVzdEBnbWFpbC5jb20iLCJwaWN0dXJlIjoiaHR0cHM6Ly9zLmdyYXZhdGFyLmNvbS9hdmF0YXIvMWFlZGI4ZDlkYzQ3NTFlMjI5YTMzNWUzNzFkYjgwNTg_cz00ODAmcj1wZyZkPWh0dHBzJTNBJTJGJTJGY2RuLmF1dGgwLmNvbSUyRmF2YXRhcnMlMkZ0ZS5wbmciLCJ1cGRhdGVkX2F0IjoiMjAyNS0wMy0wNFQwOTowNjoxNy44NDZaIiwiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6Ly9oYWNrYXRob24tYWktb3V0cmVhY2gudWsuYXV0aDAuY29tLyIsImF1ZCI6ImdtTVZ5WTBqZGFFV1NxcVFTTGU2V1NxbFNRMG5keEpUIiwic3ViIjoiYXV0aDB8NjdjNjlmNmEwZjJiMTUzNzY3ZjFjZWVhIiwiaWF0IjoxNzQxMDc5MTc5LCJleHAiOjE3NDExMTUxNzksInNpZCI6Iksta25nU2RqWTN5amoySXZpNkNqanZDVGo5OW1Zc21CIiwibm9uY2UiOiJWRzVMYURGRk5tVTFWME51TTJsUU4zcFlaM0puU1VKS2R6WlhSSFpmZFVnNGZqRXpaRTUyV2xOWVl3PT0ifQ.1w257Qegv8T5uxQeMnEqXZJbS5J70XhQFRHPCCqQUUHGg6TIgVhdEa0iBBeNvZdghFBaInwEhhMObA3--TCjrkuKq8cJtvb2qOVneTRJ30_AZJd6kF6ndvsS9h_0YyAWXOhZDDqiqb8kgqfArZmxpGSAbjzHMS5KzTtXdJ5y3GLF5HcLjJRGpCINORhNy6LePUAJ5JbdYkJwg8D3gvEkHyVvc2rQn2JXdx5ETdaBztoma0w-IB8ClxQMNotIBl7aJ_5dsZJpInz8w97Lu4sUlZHvHWzE9MG39rEm4XVw9pZp35Li0LbGRRbqhnMisLXM6ieDhpwhuldqTyjjz03p8w'

export default function SignupPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [cvUploaded, setCvUploaded] = useState(false)
  const [chatCompleted, setChatCompleted] = useState(false)
  // const [file, setFile] = useState(null);

  const totalSteps = 3
//   const progress = (currentStep / totalSteps) * 100

  // const uploadCV = async (formData) => {
  //   console.log('HERE')
  //   const response = await axios.post("https://hackathon-ai-outreach-production.up.railway.app/api/upload-cv", formData, {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //       Authorization: `${ACCESS_TOKEN}`,
  //       'Access-Control-Allow-Credentials': true,
  //       'Access-Control-Allow-Origin': '*',
  //       'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
  //       'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
  //     },
  //   });
  //   return response.data;
  // };

  const mutation = useMutation(uploadCV);

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleCvUpload = (file) => {
    console.log("CV uploaded:", file.name);
    setCvUploaded(true);
  
    const formData = new FormData();
    formData.append("file", file);
    formData.append("filename", file.name);
  
    mutation.mutate(formData, {  // ✅ Pass formData instead of calling uploadCV()
      onSuccess: (data) => {
        toast.success('CV uploaded successfully');
        console.log("Upload successful:", data);
      },
      onError: (error) => {
        console.error("Upload failed:", error);
      },
    });
  };

  // const handleCvUpload = (file) => {
  //   // Handle the CV upload logic here
  //   console.log("CV uploaded:", file.name)
  //   setCvUploaded(true)
  //   // setFile(file);

  //   console.log('file', file)

  //   const formData = new FormData();
  //   console.log('formData before append:', Object.fromEntries(formData));
  //   formData.append("file", file);
  //   formData.append("filename", file.name);
  //   console.log('formData after append:', Object.fromEntries(formData));

  //   mutation.mutate(uploadCV(formData), {
  //     onSuccess: (data) => {
  //       toast.success('CV uploaded successfully');
  //       console.log("Upload successful:", data);
  //     },
  //     onError: (error) => {
  //       // toast.error('Error uploading CV');
  //       console.error("Upload failed:", error);
  //     },
  //   });
  // }

  const handleChatComplete = () => {
    setChatCompleted(true)
  }

  const handleSubmit = (data) => {
    // Handle the final submission
    console.log("Application submitted:", data)
    // Redirect or show success message
    alert("Application submitted successfully!")
  }


  console.log(mutation)

  return (
    <Box className="min-h-screen" sx={{ bgcolor: 'grey.100' }}>
      <Container maxWidth="lg" sx={{ px: 4, py: 8 }}>
        <Box className="mb-8 text-center">
          <Typography variant="h3" component="h1" gutterBottom color="text.primary">Join Our Team</Typography>
          <Typography variant="body1" color="text.secondary">Complete these steps to apply for a position</Typography>
        </Box>

        <Box className="max-w-3xl mx-auto mb-8">
          <Stepper activeStep={currentStep - 1} alternativeLabel>
            {[1, 2, 3].map((step) => (
              <Step key={step}>
                <StepLabel>{`Step ${step}`}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {/* <LinearProgress variant="determinate" value={progress} sx={{ mb: 4 }} /> */}

        <Box className="max-w-3xl mx-auto">
          {currentStep === 1 && <UploadCV onUpload={handleCvUpload} />}
          {currentStep === 2 && <ChatWithBot onComplete={handleChatComplete} />}
          {currentStep === 3 && <FinalizeInfo onSubmit={handleSubmit} />}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            variant="outlined"
            onClick={handleBack}
            disabled={currentStep === 1}
            startIcon={<ArrowBackIcon />}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={currentStep === totalSteps ? handleSubmit : handleNext}
            disabled={(currentStep === 1 && !cvUploaded) || (currentStep === 2 && !chatCompleted) || mutation.isPending || mutation.isLoading}
            endIcon={currentStep === totalSteps ? <CheckIcon /> : <ArrowForwardIcon />}
          >
            {currentStep === totalSteps ? "Submit" : "Next"}
          </Button>
        </Box>
      </Container>
    </Box>
  )
}