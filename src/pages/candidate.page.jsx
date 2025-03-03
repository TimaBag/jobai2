"use client"

import { useState } from "react"
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Chip,
  Avatar,
  IconButton,
  Alert,
  Snackbar,
  FormControlLabel,
  Checkbox,
} from "@mui/material"
import {
  CloudUpload as CloudUploadIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  PhotoCamera as PhotoCameraIcon,
} from "@mui/icons-material"

// Simulated CV parser function
const parseCV = (file) => {
    console.log(file)
  return new Promise((resolve) => {
    // In a real application, this would send the file to a backend service
    // For demo purposes, we'll simulate parsing with a timeout
    setTimeout(() => {
      // Simulated parsed data
      resolve({
        personalInfo: {
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
          phone: "(555) 123-4567",
          address: "123 Main St, Anytown, USA",
          linkedin: "linkedin.com/in/johndoe",
          github: "github.com/johndoe",
          website: "johndoe.com",
        },
        education: [
          {
            institution: "University of Technology",
            degree: "Bachelor of Science",
            field: "Computer Science",
            startDate: "2015-09-01",
            endDate: "2019-06-30",
            gpa: "3.8",
            description: "Graduated with honors. Specialized in artificial intelligence and machine learning.",
          },
        ],
        workExperience: [
          {
            company: "Tech Solutions Inc.",
            position: "Software Developer",
            startDate: "2019-07-01",
            endDate: "2022-03-15",
            current: false,
            description:
              "Developed and maintained web applications using React and Node.js. Collaborated with cross-functional teams to deliver high-quality software products.",
          },
        ],
        skills: ["JavaScript", "React", "Node.js", "HTML", "CSS", "Git"],
        languages: [
          { language: "English", proficiency: "Native" },
          { language: "Spanish", proficiency: "Intermediate" },
        ],
      })
    }, 1500)
  })
}

export default function CandidateProfileForm() {
  const [activeStep, setActiveStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState({ open: false, message: "", severity: "info" })
  const [profilePicture, setProfilePicture] = useState(null)
  const [cvFile, setCvFile] = useState(null)

  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      dateOfBirth: null,
      linkedin: "",
      github: "",
      website: "",
      summary: "",
    },
    education: [
      {
        institution: "",
        degree: "",
        field: "",
        startDate: null,
        endDate: null,
        gpa: "",
        description: "",
      },
    ],
    workExperience: [
      {
        company: "",
        position: "",
        location: "",
        startDate: null,
        endDate: null,
        current: false,
        description: "",
      },
    ],
    skills: [],
    newSkill: "",
    languages: [{ language: "", proficiency: "" }],
    certifications: [{ name: "", issuer: "", date: null, expires: false, expiryDate: null }],
    projects: [{ name: "", description: "", url: "", technologies: [] }],
    preferences: {
      jobTypes: [],
      locations: [],
      remoteWork: false,
      salaryExpectation: "",
      availableFrom: null,
      willingToRelocate: false,
      visaSponsorship: false,
    },
  })

  const steps = [
    "Personal Information",
    "Education",
    "Work Experience",
    "Skills & Languages",
    "Projects & Certifications",
    "Job Preferences",
    "Review",
  ]

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleInputChange = (section, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }))
  }

  const handleArrayInputChange = (section, index, field, value) => {
    setFormData((prevData) => {
      const newArray = [...prevData[section]]
      newArray[index] = {
        ...newArray[index],
        [field]: value,
      }
      return {
        ...prevData,
        [section]: newArray,
      }
    })
  }

  const handleAddItem = (section) => {
    setFormData((prevData) => {
      const emptyItem = getEmptyItem(section)
      return {
        ...prevData,
        [section]: [...prevData[section], emptyItem],
      }
    })
  }

  const handleRemoveItem = (section, index) => {
    setFormData((prevData) => {
      const newArray = [...prevData[section]]
      newArray.splice(index, 1)
      return {
        ...prevData,
        [section]: newArray,
      }
    })
  }

  const getEmptyItem = (section) => {
    switch (section) {
      case "education":
        return { institution: "", degree: "", field: "", startDate: null, endDate: null, gpa: "", description: "" }
      case "workExperience":
        return {
          company: "",
          position: "",
          location: "",
          startDate: null,
          endDate: null,
          current: false,
          description: "",
        }
      case "languages":
        return { language: "", proficiency: "" }
      case "certifications":
        return { name: "", issuer: "", date: null, expires: false, expiryDate: null }
      case "projects":
        return { name: "", description: "", url: "", technologies: [] }
      default:
        return {}
    }
  }

  const handleAddSkill = () => {
    if (formData.newSkill.trim() && !formData.skills.includes(formData.newSkill.trim())) {
      setFormData((prevData) => ({
        ...prevData,
        skills: [...prevData.skills, prevData.newSkill.trim()],
        newSkill: "",
      }))
    }
  }

  const handleRemoveSkill = (skillToRemove) => {
    setFormData((prevData) => ({
      ...prevData,
      skills: prevData.skills.filter((skill) => skill !== skillToRemove),
    }))
  }

  const handleProfilePictureChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      setProfilePicture(URL.createObjectURL(file))
    }
  }

  const handleCVUpload = async (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      setCvFile(file)
      setLoading(true)
      setNotification({ open: true, message: "Parsing CV...", severity: "info" })

      try {
        const parsedData = await parseCV(file)

        // Update form data with parsed information
        setFormData((prevData) => {
          const updatedData = { ...prevData }

          // Update personal info
          if (parsedData.personalInfo) {
            updatedData.personalInfo = {
              ...updatedData.personalInfo,
              ...parsedData.personalInfo,
            }
          }

          // Update education
          if (parsedData.education && parsedData.education.length > 0) {
            updatedData.education = parsedData.education
          }

          // Update work experience
          if (parsedData.workExperience && parsedData.workExperience.length > 0) {
            updatedData.workExperience = parsedData.workExperience
          }

          // Update skills
          if (parsedData.skills && parsedData.skills.length > 0) {
            updatedData.skills = parsedData.skills
          }

          // Update languages
          if (parsedData.languages && parsedData.languages.length > 0) {
            updatedData.languages = parsedData.languages
          }

          return updatedData
        })

        setNotification({ open: true, message: "CV parsed successfully!", severity: "success" })
      } catch (error) {
        console.error("Error parsing CV:", error)
        setNotification({ open: true, message: "Error parsing CV. Please try again.", severity: "error" })
      } finally {
        setLoading(false)
      }
    }
  }

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false })
  }

  const handleSubmit = () => {
    // In a real application, this would submit the form data to a backend service
    console.log("Form submitted:", formData)
    setNotification({ open: true, message: "Profile submitted successfully!", severity: "success" })
  }

  const renderPersonalInfo = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Personal Information
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <Box sx={{ position: "relative" }}>
          <Avatar src={profilePicture} sx={{ width: 100, height: 100, mb: 1 }} />
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="profile-picture-upload"
            type="file"
            onChange={handleProfilePictureChange}
          />
          <label htmlFor="profile-picture-upload">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              sx={{ position: "absolute", bottom: 0, right: 0, bgcolor: "background.paper" }}
            >
              <PhotoCameraIcon />
            </IconButton>
          </label>
        </Box>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="First Name"
            value={formData.personalInfo.firstName}
            onChange={(e) => handleInputChange("personalInfo", "firstName", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Last Name"
            value={formData.personalInfo.lastName}
            onChange={(e) => handleInputChange("personalInfo", "lastName", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Email"
            type="email"
            value={formData.personalInfo.email}
            onChange={(e) => handleInputChange("personalInfo", "email", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Phone"
            value={formData.personalInfo.phone}
            onChange={(e) => handleInputChange("personalInfo", "phone", e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Address"
            value={formData.personalInfo.address}
            onChange={(e) => handleInputChange("personalInfo", "address", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="City"
            value={formData.personalInfo.city}
            onChange={(e) => handleInputChange("personalInfo", "city", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="State/Province"
            value={formData.personalInfo.state}
            onChange={(e) => handleInputChange("personalInfo", "state", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Zip/Postal Code"
            value={formData.personalInfo.zipCode}
            onChange={(e) => handleInputChange("personalInfo", "zipCode", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Country"
            value={formData.personalInfo.country}
            onChange={(e) => handleInputChange("personalInfo", "country", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Date of Birth"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.personalInfo.dateOfBirth || ''}
            onChange={(e) => handleInputChange("personalInfo", "dateOfBirth", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="LinkedIn Profile"
            value={formData.personalInfo.linkedin}
            onChange={(e) => handleInputChange("personalInfo", "linkedin", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="GitHub Profile"
            value={formData.personalInfo.github}
            onChange={(e) => handleInputChange("personalInfo", "github", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Personal Website"
            value={formData.personalInfo.website}
            onChange={(e) => handleInputChange("personalInfo", "website", e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Professional Summary"
            multiline
            rows={4}
            value={formData.personalInfo.summary}
            onChange={(e) => handleInputChange("personalInfo", "summary", e.target.value)}
          />
        </Grid>
      </Grid>
    </Box>
  )

  const renderEducation = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Education
      </Typography>

      {formData.education.map((edu, index) => (
        <Paper key={index} elevation={2} sx={{ p: 2, mb: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} display="flex" justifyContent="space-between">
              <Typography variant="subtitle1">Education #{index + 1}</Typography>
              {formData.education.length > 1 && (
                <IconButton size="small" color="error" onClick={() => handleRemoveItem("education", index)}>
                  <DeleteIcon />
                </IconButton>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Institution"
                value={edu.institution}
                onChange={(e) => handleArrayInputChange("education", index, "institution", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Degree"
                value={edu.degree}
                onChange={(e) => handleArrayInputChange("education", index, "degree", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Field of Study"
                value={edu.field}
                onChange={(e) => handleArrayInputChange("education", index, "field", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Start Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={edu.startDate || ''}
                onChange={(e) => handleArrayInputChange("education", index, "startDate", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="End Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={edu.endDate || ''}
                onChange={(e) => handleArrayInputChange("education", index, "endDate", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="GPA"
                value={edu.gpa}
                onChange={(e) => handleArrayInputChange("education", index, "gpa", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={2}
                value={edu.description}
                onChange={(e) => handleArrayInputChange("education", index, "description", e.target.value)}
              />
            </Grid>
          </Grid>
        </Paper>
      ))}

      <Button startIcon={<AddIcon />} onClick={() => handleAddItem("education")} variant="outlined" sx={{ mt: 1 }}>
        Add Education
      </Button>
    </Box>
  )

  const renderWorkExperience = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Work Experience
      </Typography>

      {formData.workExperience.map((exp, index) => (
        <Paper key={index} elevation={2} sx={{ p: 2, mb: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} display="flex" justifyContent="space-between">
              <Typography variant="subtitle1">Experience #{index + 1}</Typography>
              {formData.workExperience.length > 1 && (
                <IconButton size="small" color="error" onClick={() => handleRemoveItem("workExperience", index)}>
                  <DeleteIcon />
                </IconButton>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Company"
                value={exp.company}
                onChange={(e) => handleArrayInputChange("workExperience", index, "company", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Position"
                value={exp.position}
                onChange={(e) => handleArrayInputChange("workExperience", index, "position", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                value={exp.location}
                onChange={(e) => handleArrayInputChange("workExperience", index, "location", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={exp.current}
                    onChange={(e) => handleArrayInputChange("workExperience", index, "current", e.target.checked)}
                  />
                }
                label="Current Position"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Start Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={exp.startDate || ''}
                onChange={(e) => handleArrayInputChange("workExperience", index, "startDate", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="End Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={exp.endDate || ''}
                onChange={(e) => handleArrayInputChange("workExperience", index, "endDate", e.target.value)}
                disabled={exp.current}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={4}
                value={exp.description}
                onChange={(e) => handleArrayInputChange("workExperience", index, "description", e.target.value)}
              />
            </Grid>
          </Grid>
        </Paper>
      ))}

      <Button startIcon={<AddIcon />} onClick={() => handleAddItem("workExperience")} variant="outlined" sx={{ mt: 1 }}>
        Add Work Experience
      </Button>
    </Box>
  )

  const renderSkillsLanguages = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Skills & Languages
      </Typography>

      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Skills
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={9}>
            <TextField
              fullWidth
              label="Add a Skill"
              value={formData.newSkill}
              onChange={(e) => setFormData({ ...formData, newSkill: e.target.value })}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleAddSkill()
                }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button variant="contained" onClick={handleAddSkill} fullWidth sx={{ height: "100%" }}>
              Add Skill
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {formData.skills.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  onDelete={() => handleRemoveSkill(skill)}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Typography variant="subtitle1" gutterBottom>
        Languages
      </Typography>

      {formData.languages.map((lang, index) => (
        <Paper key={index} elevation={2} sx={{ p: 2, mb: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} display="flex" justifyContent="space-between">
              <Typography variant="subtitle2">Language #{index + 1}</Typography>
              {formData.languages.length > 1 && (
                <IconButton size="small" color="error" onClick={() => handleRemoveItem("languages", index)}>
                  <DeleteIcon />
                </IconButton>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Language"
                value={lang.language}
                onChange={(e) => handleArrayInputChange("languages", index, "language", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Proficiency</InputLabel>
                <Select
                  value={lang.proficiency}
                  label="Proficiency"
                  onChange={(e) => handleArrayInputChange("languages", index, "proficiency", e.target.value)}
                >
                  <MenuItem value="Native">Native</MenuItem>
                  <MenuItem value="Fluent">Fluent</MenuItem>
                  <MenuItem value="Advanced">Advanced</MenuItem>
                  <MenuItem value="Intermediate">Intermediate</MenuItem>
                  <MenuItem value="Basic">Basic</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>
      ))}

      <Button startIcon={<AddIcon />} onClick={() => handleAddItem("languages")} variant="outlined" sx={{ mt: 1 }}>
        Add Language
      </Button>
    </Box>
  )

  const renderProjectsCertifications = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Projects
      </Typography>

      {formData.projects.map((project, index) => (
        <Paper key={index} elevation={2} sx={{ p: 2, mb: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} display="flex" justifyContent="space-between">
              <Typography variant="subtitle1">Project #{index + 1}</Typography>
              {formData.projects.length > 1 && (
                <IconButton size="small" color="error" onClick={() => handleRemoveItem("projects", index)}>
                  <DeleteIcon />
                </IconButton>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Project Name"
                value={project.name}
                onChange={(e) => handleArrayInputChange("projects", index, "name", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={2}
                value={project.description}
                onChange={(e) => handleArrayInputChange("projects", index, "description", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="URL"
                value={project.url}
                onChange={(e) => handleArrayInputChange("projects", index, "url", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Technologies Used (comma separated)"
                value={project.technologies.join(", ")}
                onChange={(e) => {
                  const techArray = e.target.value
                    .split(",")
                    .map((tech) => tech.trim())
                    .filter((tech) => tech)
                  handleArrayInputChange("projects", index, "technologies", techArray)
                }}
              />
            </Grid>
          </Grid>
        </Paper>
      ))}

      <Button
        startIcon={<AddIcon />}
        onClick={() => handleAddItem("projects")}
        variant="outlined"
        sx={{ mt: 1, mb: 3 }}
      >
        Add Project
      </Button>

      <Typography variant="h6" gutterBottom>
        Certifications
      </Typography>

      {formData.certifications.map((cert, index) => (
        <Paper key={index} elevation={2} sx={{ p: 2, mb: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} display="flex" justifyContent="space-between">
              <Typography variant="subtitle1">Certification #{index + 1}</Typography>
              {formData.certifications.length > 1 && (
                <IconButton size="small" color="error" onClick={() => handleRemoveItem("certifications", index)}>
                  <DeleteIcon />
                </IconButton>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Certification Name"
                value={cert.name}
                onChange={(e) => handleArrayInputChange("certifications", index, "name", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Issuing Organization"
                value={cert.issuer}
                onChange={(e) => handleArrayInputChange("certifications", index, "issuer", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Issue Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={cert.date || ''}
                onChange={(e) => handleArrayInputChange("certifications", index, "date", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={cert.expires}
                    onChange={(e) => handleArrayInputChange("certifications", index, "expires", e.target.checked)}
                  />
                }
                label="Has Expiration Date"
              />
            </Grid>
            {cert.expires && (
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Expiry Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={cert.expiryDate || ''}
                  onChange={(e) => handleArrayInputChange("certifications", index, "expiryDate", e.target.value)}
                />
              </Grid>
            )}
          </Grid>
        </Paper>
      ))}

      <Button startIcon={<AddIcon />} onClick={() => handleAddItem("certifications")} variant="outlined" sx={{ mt: 1 }}>
        Add Certification
      </Button>
    </Box>
  )

  const renderJobPreferences = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Job Preferences
      </Typography>

      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Job Types</InputLabel>
              <Select
                multiple
                value={formData.preferences.jobTypes}
                label="Job Types"
                onChange={(e) => handleInputChange("preferences", "jobTypes", e.target.value)}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                <MenuItem value="Full-time">Full-time</MenuItem>
                <MenuItem value="Part-time">Part-time</MenuItem>
                <MenuItem value="Contract">Contract</MenuItem>
                <MenuItem value="Freelance">Freelance</MenuItem>
                <MenuItem value="Internship">Internship</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Preferred Locations (comma separated)"
              value={formData.preferences.locations.join(", ")}
              onChange={(e) => {
                const locationsArray = e.target.value
                  .split(",")
                  .map((loc) => loc.trim())
                  .filter((loc) => loc)
                handleInputChange("preferences", "locations", locationsArray)
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.preferences.remoteWork}
                  onChange={(e) => handleInputChange("preferences", "remoteWork", e.target.checked)}
                />
              }
              label="Open to Remote Work"
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.preferences.willingToRelocate}
                  onChange={(e) => handleInputChange("preferences", "willingToRelocate", e.target.checked)}
                />
              }
              label="Willing to Relocate"
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.preferences.visaSponsorship}
                  onChange={(e) => handleInputChange("preferences", "visaSponsorship", e.target.checked)}
                />
              }
              label="Require Visa Sponsorship"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Salary Expectation"
              value={formData.preferences.salaryExpectation}
              onChange={(e) => handleInputChange("preferences", "salaryExpectation", e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Available From"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.preferences.availableFrom || ''}
              onChange={(e) => handleInputChange("preferences", "availableFrom", e.target.value)}
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )

  const renderReview = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Review Your Information
      </Typography>

      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Personal Information
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              Name
            </Typography>
            <Typography variant="body1">
              {formData.personalInfo.firstName} {formData.personalInfo.lastName}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              Email
            </Typography>
            <Typography variant="body1">{formData.personalInfo.email}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
                Phone
            </Typography>
            <Typography variant="body1">{formData.personalInfo.phone}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              Location
            </Typography>
            <Typography variant="body1">
              {[formData.personalInfo.city, formData.personalInfo.state, formData.personalInfo.country]
                .filter(Boolean)
                .join(", ")}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Education
        </Typography>
        {formData.education.map((edu, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography variant="body1" fontWeight="bold">
              {edu.institution}
            </Typography>
            <Typography variant="body2">
              {edu.degree} in {edu.field}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {edu.startDate && edu.startDate.substring(0, 4)} -
              {edu.endDate && edu.endDate.substring(0, 4)}
            </Typography>
          </Box>
        ))}
      </Paper>

      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Work Experience
        </Typography>
        {formData.workExperience.map((exp, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography variant="body1" fontWeight="bold">
              {exp.position} at {exp.company}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {exp.startDate && exp.startDate.substring(0, 10)} -
              {exp.current ? "Present" : exp.endDate && exp.endDate.substring(0, 10)}
            </Typography>
            <Typography variant="body2">{exp.description}</Typography>
          </Box>
        ))}
      </Paper>

      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Skills & Languages
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Skills
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
            {formData.skills.map((skill, index) => (
              <Chip key={index} label={skill} color="primary" size="small" />
            ))}
          </Box>
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary">
            Languages
          </Typography>
          {formData.languages.map((lang, index) => (
            <Typography key={index} variant="body2">
              {lang.language}: {lang.proficiency}
            </Typography>
          ))}
        </Box>
      </Paper>

      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Job Preferences
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              Job Types
            </Typography>
            <Typography variant="body1">{formData.preferences.jobTypes.join(", ")}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              Preferred Locations
            </Typography>
            <Typography variant="body1">{formData.preferences.locations.join(", ")}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              Remote Work
            </Typography>
            <Typography variant="body1">{formData.preferences.remoteWork ? "Yes" : "No"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              Salary Expectation
            </Typography>
            <Typography variant="body1">{formData.preferences.salaryExpectation}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              Available From
            </Typography>
            <Typography variant="body1">{formData.preferences.availableFrom}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return renderPersonalInfo()
      case 1:
        return renderEducation()
      case 2:
        return renderWorkExperience()
      case 3:
        return renderSkillsLanguages()
      case 4:
        return renderProjectsCertifications()
      case 5:
        return renderJobPreferences()
      case 6:
        return renderReview()
      default:
        return "Unknown step"
    }
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Candidate Profile
        </Typography>

        <Box sx={{ mb: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <input
            accept=".pdf,.doc,.docx"
            style={{ display: "none" }}
            id="cv-upload"
            type="file"
            onChange={handleCVUpload}
          />
          <label htmlFor="cv-upload">
            <Button variant="contained" component="span" startIcon={<CloudUploadIcon />} disabled={loading}>
              Upload CV
            </Button>
          </label>
          {cvFile && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Uploaded: {cvFile.name}
            </Typography>
          )}
        </Box>

        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Divider sx={{ mb: 4 }} />

        <Box>
          {getStepContent(activeStep)}

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Button disabled={activeStep === 0} onClick={handleBack}>
              Back
            </Button>
            <Box>
              {activeStep === steps.length - 1 ? (
                <Button variant="contained" onClick={handleSubmit} disabled={loading}>
                  Submit
                </Button>
              ) : (
                <Button variant="contained" onClick={handleNext} disabled={loading}>
                  Next
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Paper>

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseNotification} severity={notification.severity}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  )
}

