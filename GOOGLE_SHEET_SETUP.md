# Google Sheet Lead Capture Setup (CV Download Gate)

This guide shows how to automatically log visitors' **Email**, **Mobile Number**, and **Reason** directly into your personal Google Sheet whenever someone downloads your CV.

---

## 2-Minute Google Sheet Web App Deployment

### Step 1: Create a Google Sheet
1. Open [Google Sheets](https://sheets.google.com) and create a new blank spreadsheet.
2. In Row 1, add these column headers:
   - **Column A**: `Timestamp`
   - **Column B**: `Email`
   - **Column C**: `Mobile`
   - **Column D**: `Reason`

---

### Step 2: Add Google Apps Script
1. In your Google Sheet, click on **Extensions** > **Apps Script**.
2. Delete any default code in `Code.gs` and paste the following script:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var timestamp = new Date().toLocaleString();
    var email = e.parameter.Email || '';
    var mobile = e.parameter.Mobile || '';
    var reason = e.parameter.Reason || '';
    
    sheet.appendRow([timestamp, email, mobile, reason]);
    
    return ContentService.createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ result: 'error', error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

---

### Step 3: Deploy as Web App
1. Click the **Deploy** button at the top right > **New deployment**.
2. Click the gear icon (**Select type**) > select **Web app**.
3. Fill out the deployment options:
   - **Description**: `Portfolio CV Lead Generator`
   - **Execute as**: `Me` (your Google Account)
   - **Who has access**: `Anyone` *(Crucial so visitors can submit without Google login)*
4. Click **Deploy**, authorize permissions when prompted.
5. Copy the generated **Web App URL** (starts with `https://script.google.com/macros/s/...`).

---

### Step 4: Paste Web App URL in `script.js`
1. Open `d:\Portfolio\script.js`.
2. Locate Line 309:
   ```javascript
   const GOOGLE_SHEET_WEBAPP_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
   ```
3. Replace `'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec'` with your copied Web App URL!
