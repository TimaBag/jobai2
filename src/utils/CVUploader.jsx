// import React, { useState } from "react";
// import { Button, Box, Typography } from "@mui/material";
// import { PDFDocumentProxy, getDocument } from "pdfjs-dist";

// function CVUploader({ onDataExtracted }) {
//   const [preview, setPreview] = useState(null);
//   const [isProcessing, setIsProcessing] = useState(false);

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       parseCV(file);
//     }
//   };

//   const parseCV = async (file) => {
//     setIsProcessing(true);
//     const fileReader = new FileReader();

//     fileReader.onload = async (e) => {
//       const pdfData = new Uint8Array(e.target.result);
//       try {
//         const pdf = await getDocument(pdfData).promise;
//         const text = await extractTextFromPDF(pdf);
//         const extractedData = prefillFormFields(text);
//         setPreview(extractedData);
//         onDataExtracted(extractedData); // Pass data back to the parent component
//       } catch (error) {
//         console.error("Error parsing CV:", error);
//       } finally {
//         setIsProcessing(false);
//       }
//     };

//     fileReader.readAsArrayBuffer(file);
//   };

//   const extractTextFromPDF = async (pdf) => {
//     let text = "";
//     const numPages = pdf.numPages;

//     for (let i = 1; i <= numPages; i++) {
//       const page = await pdf.getPage(i);
//       const content = await page.getTextContent();
//       const pageText = content.items.map((item) => item.str).join(" ");
//       text += pageText + "\n";
//     }

//     return text;
//   };

//   const prefillFormFields = (text) => {
//     const name = text.match(/Name: (\w+\s\w+)/i)?.[1] || "Not Found";
//     const email = text.match(/Email: (\S+@\S+\.\S+)/i)?.[1] || "Not Found";
//     const phone = text.match(/Phone: (\+?\d{1,4}[\s-]?\(?\d{2,3}\)?[\s-]?\d{3,4}[\s-]?\d{4})/i)?.[1] || "Not Found";
//     const experience = text.match(/Experience: (.*?)(Education|Skills|$)/i)?.[1] || "Not Found";

//     return { name, email, phone, experience };
//   };

//   return (
//     <Box sx={{ padding: 3 }}>
//       <input
//         accept=".pdf"
//         type="file"
//         onChange={handleFileUpload}
//         style={{ marginBottom: "20px" }}
//       />
//       {isProcessing && <Typography>Processing your file...</Typography>}
//       {preview && !isProcessing && (
//         <Box>
//           <Typography variant="h6" gutterBottom>Preview of Extracted Data</Typography>
//           <Typography><strong>Name:</strong> {preview.name}</Typography>
//           <Typography><strong>Email:</strong> {preview.email}</Typography>
//           <Typography><strong>Phone:</strong> {preview.phone}</Typography>
//           <Typography><strong>Experience:</strong> {preview.experience}</Typography>
//         </Box>
//       )}
//     </Box>
//   );
// }

// export default CVUploader;
