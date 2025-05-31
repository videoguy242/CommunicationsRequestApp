const fs = require('fs');
const path = require('path');
const os = require('os');

// Wait until DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
  // Auto-fill current date
  const currentDateInput = document.getElementById('currentDate');
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0]; // YYYY-MM-DD
  currentDateInput.value = formattedDate;

  // Form submission handler
  const form = document.getElementById('requestForm');
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Collect form data
    const requestName = document.getElementById('requestName').value.trim();
    const serviceDate = document.getElementById('serviceDate').value;
    const yourName = document.getElementById('yourName').value.trim();
    const department = document.getElementById('department').value.trim();
    const additionalInfo = document.getElementById('additionalInfo').value.trim();

    const selectedServices = Array.from(document.querySelectorAll('input[name="services"]:checked'))
      .map(cb => cb.value);

    // Build formatted output
    const summaryText = `
Request Name: ${requestName}
Request Date: ${formattedDate}
Requested Service Date & Time: ${serviceDate}
Name: ${yourName}
Department: ${department}
Services Requested: ${selectedServices.join(', ')}
Additional Information: ${additionalInfo}
`.trim();

    const summaryHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${requestName} - ${formattedDate} - Summary</title>
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      background: #f5f9ff;
      padding: 20px;
      color: #333;
    }
    .logo {
      max-width: 150px;
    }
    .container {
      background: white;
      border-radius: 16px;
      padding: 20px;
      box-shadow: 0 0 25px rgba(0,0,0,0.05);
      max-width: 800px;
      margin: auto;
    }
    h1 {
      color: #1e4ba0;
    }
    .field {
      margin-bottom: 12px;
    }
    .label {
      font-weight: bold;
      color: #1e4ba0;
    }
  </style>
</head>
<body>
  <div class="container">
    <img src="assets/moh-logo.png" alt="MOH Logo" class="logo" />
    <h1>Request Summary</h1>
    <div class="field"><span class="label">Request Name:</span> ${requestName}</div>
    <div class="field"><span class="label">Request Date:</span> ${formattedDate}</div>
    <div class="field"><span class="label">Requested Service Date & Time:</span> ${serviceDate}</div>
    <div class="field"><span class="label">Name:</span> ${yourName}</div>
    <div class="field"><span class="label">Department:</span> ${department}</div>
    <div class="field"><span class="label">Services Requested:</span> ${selectedServices.join(', ')}</div>
    <div class="field"><span class="label">Additional Information:</span> ${additionalInfo}</div>
  </div>
</body>
</html>
`;

    // Define desktop path and create folder
    const desktopPath = path.join(os.homedir(), 'Desktop');
    const folderName = `${requestName} - ${formattedDate}`;
    const baseFolder = path.join(desktopPath, 'Communications Requests', folderName);

    // Create folder if not exists
    fs.mkdirSync(baseFolder, { recursive: true });

    // Write TXT file
    const txtFilePath = path.join(baseFolder, 'Request.txt');
    fs.writeFileSync(txtFilePath, summaryText, 'utf-8');

    // Write HTML summary
    const htmlFileName = `${requestName}-${formattedDate}-Summary.html`.replace(/[\\/:*?"<>|]/g, '');
    const htmlFilePath = path.join(baseFolder, htmlFileName);
    fs.writeFileSync(htmlFilePath, summaryHTML, 'utf-8');

    // Redirect to thank-you page
    window.location.href = 'thankyou.html';
  });
});
