import React, { useState, useRef } from "react";
import { Button, Card, CardContent, Typography, Box } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";

export function UploadCV({ onUpload }) {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      onUpload(selectedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
      onUpload(droppedFile);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  return (
    <Box sx={{ mt: 3, mb: 3 }}>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Upload Your CV
        </Typography>
        <Typography variant="body1" color="textSecondary">
          We'll use your CV to understand your experience and skills
        </Typography>
      </Box>

      <Card
        variant="outlined"
        sx={{
          mt: 2,
          p: 3,
          border: "2px dashed",
          borderColor: isDragging ? "primary.main" : "grey.300",
          bgcolor: isDragging ? "action.hover" : "background.paper",
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <CardContent>
          {!file ? (
            <Box sx={{ textAlign: "center" }}>
              <UploadFileIcon sx={{ fontSize: 48, color: "action.active", mb: 2 }} />
              <Typography variant="body1" gutterBottom>
                Drag and drop your CV here, or click to select
              </Typography>
              <Button
                variant="contained"
                component="label"
                startIcon={<UploadFileIcon />}
              >
                Upload CV
                <input
                  type="file"
                  hidden
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                />
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <InsertDriveFileIcon sx={{ fontSize: 24, mr: 1 }} />
                <Typography variant="body1">{file.name}</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CheckCircleIcon sx={{ color: "success.main", mr: 1 }} />
                <Typography variant="body2" color="textSecondary">
                  Uploaded successfully
                </Typography>
                <Button
                  onClick={handleRemoveFile}
                  startIcon={<CloseIcon />}
                  sx={{ ml: 2 }}
                >
                  Remove
                </Button>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}