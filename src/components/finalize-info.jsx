import React, { useState } from "react"
import { 
  TextField, 
  Button, 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  FormControlLabel, 
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from "@mui/material"

export function FinalizeInfo({ onSubmit }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    position: "",
    experience: "",
    availability: "",
    salary: "",
    referral: "",
    additionalInfo: "",
    agreeTerms: false,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name) => (event) => {
    setFormData((prev) => ({ ...prev, [name]: event.target.value }))
  }

  const handleCheckboxChange = (event) => {
    setFormData((prev) => ({ ...prev, agreeTerms: event.target.checked }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
      <Typography variant="h4" align="center" gutterBottom color="text.primary">
        Finalize Your Application
      </Typography>
      <Typography variant="body1" align="center" color="textSecondary" paragraph>
        Please review and complete your application details
      </Typography>

      <form onSubmit={handleSubmit}>
        <Card style={{ marginBottom: '20px' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              Provide your contact details so we can reach you
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="City, Country"
                  required
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card style={{ marginBottom: '20px' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Professional Details
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              Tell us about your professional background
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel id="position-label">Position Applied For</InputLabel>
                  <Select
                    labelId="position-label"
                    value={formData.position}
                    onChange={handleSelectChange("position")}
                    label="Position Applied For"
                  >
                    <MenuItem value="software-engineer">Software Engineer</MenuItem>
                    <MenuItem value="product-manager">Product Manager</MenuItem>
                    <MenuItem value="data-scientist">Data Scientist</MenuItem>
                    <MenuItem value="ux-designer">UX Designer</MenuItem>
                    <MenuItem value="marketing-specialist">Marketing Specialist</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel id="experience-label">Years of Experience</InputLabel>
                  <Select
                    labelId="experience-label"
                    value={formData.experience}
                    onChange={handleSelectChange("experience")}
                    label="Years of Experience"
                  >
                    <MenuItem value="0-1">0-1 years</MenuItem>
                    <MenuItem value="1-3">1-3 years</MenuItem>
                    <MenuItem value="3-5">3-5 years</MenuItem>
                    <MenuItem value="5-10">5-10 years</MenuItem>
                    <MenuItem value="10+">10+ years</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel id="availability-label">Availability</InputLabel>
                  <Select
                    labelId="availability-label"
                    value={formData.availability}
                    onChange={handleSelectChange("availability")}
                    label="Availability"
                  >
                    <MenuItem value="immediate">Immediate</MenuItem>
                    <MenuItem value="2-weeks">2 weeks notice</MenuItem>
                    <MenuItem value="1-month">1 month notice</MenuItem>
                    <MenuItem value="2-months">2+ months notice</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Expected Salary"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="USD per year"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="How did you hear about us?"
                  name="referral"
                  value={formData.referral}
                  onChange={handleChange}
                  placeholder="LinkedIn, Job Board, Referral, etc."
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Additional Information"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  placeholder="Anything else you'd like us to know?"
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <FormControlLabel
          control={
            <Checkbox
              checked={formData.agreeTerms}
              onChange={handleCheckboxChange}
              name="agreeTerms"
              color="primary"
              required
            />
          }
          label="I agree to the terms and conditions"
        />
        <Typography variant="body2" color="textSecondary" paragraph>
          By submitting this application, you agree to our privacy policy and terms of service.
        </Typography>

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit Application
        </Button>
      </form>
    </div>
  )
}