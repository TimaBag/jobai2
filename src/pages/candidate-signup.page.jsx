import { useState } from "react"
import { UploadCV } from "../components/upload-cv"
import { ChatWithBot } from "../components/chat-with-bot"
import { FinalizeInfo } from "../components/finalize-info"
import { LinearProgress, Button, Container, Typography, Box, Step, StepLabel, Stepper } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import CheckIcon from "@mui/icons-material/Check"

export default function SignupPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [cvUploaded, setCvUploaded] = useState(false)
  const [chatCompleted, setChatCompleted] = useState(false)

  const totalSteps = 3
//   const progress = (currentStep / totalSteps) * 100

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
    // Handle the CV upload logic here
    console.log("CV uploaded:", file.name)
    setCvUploaded(true)
  }

  const handleChatComplete = () => {
    setChatCompleted(true)
  }

  const handleSubmit = (data) => {
    // Handle the final submission
    console.log("Application submitted:", data)
    // Redirect or show success message
    alert("Application submitted successfully!")
  }

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
            disabled={(currentStep === 1 && !cvUploaded) || (currentStep === 2 && !chatCompleted)}
            endIcon={currentStep === totalSteps ? <CheckIcon /> : <ArrowForwardIcon />}
          >
            {currentStep === totalSteps ? "Submit" : "Next"}
          </Button>
        </Box>
      </Container>
    </Box>
  )
}