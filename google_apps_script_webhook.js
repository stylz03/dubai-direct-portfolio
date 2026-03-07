/**
 * 🚀 DUBAI DIRECT PORTFOLIO - GOOGLE SHEETS WEBHOOK 🚀
 * 
 * FOLLOW THESE STEPS TO CAPTURE LEADS AUTOMATICALLY INTO GOOGLE SHEETS
 * ---------------------------------------------------------------------
 * 1. Go to https://sheets.google.com and create a new Blank Spreadsheet.
 * 2. Name your spreadsheet something like "Dubai Direct Leads".
 * 3. In the top menu, click on: "Extensions" -> "Apps Script".
 * 4. A new tab will open. Delete any code in there, and copy+paste all of the code below into the editor.
 * 5. Click the "Save" icon (or File -> Save).
 * 6. Click the blue "Deploy" button in the top right corner -> "New deployment".
 * 7. Click the 'gear' icon next to "Select type" and choose "Web app".
 * 8. Set "Description" to "Chat Webhook".
 * 9. Set "Execute as" to "Me (your email)".
 * 10. **CRITICAL STEP**: Set "Who has access" to "Anyone" (This allows your website to send data to it).
 * 11. Click "Deploy".
 * 12. Google will ask you to authorize access. Click "Authorize access" -> select your Google account -> Click "Advanced" -> Click "Go to Untitled project (unsafe)" -> Click "Allow".
 * 13. Copy the "Web app URL" it provides you.
 * 14. Paste that URL back to the Agent, or create a `.env` file in the root of your project with the following line:
 *     VITE_GOOGLE_SHEETS_WEBHOOK_URL="[YOUR COPIED WEB APP URL HERE]"
 */

const SHEET_NAME = "Sheet1"; // Make sure this matches the tab name in your Google Sheet (usually Sheet1)

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    if (!sheet) {
      throw new Error(`Sheet with name "${SHEET_NAME}" not found.`);
    }
    
    // Create headers if the sheet is completely empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Contact Type", "Name", "Email", "Phone", "Message"]);
      // Freeze the header row and make it bold for a nice clean look
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, 6).setFontWeight("bold");
    }

    // Since we are sending content as text/plain from the website to avoid CORS preflight errors, 
    // we parse it securely as JSON here.
    const data = JSON.parse(e.postData.contents);
    
    // Append the lead to the bottom of the spreadsheet
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.contactType || "Chat Widget",
      data.name || "",
      data.email || "",
      data.phone || "",
      data.message || ""
    ]);

    // Send success response
    return ContentService.createTextOutput(JSON.stringify({ "status": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // If an error occurs, save it to the sheet too for debugging if there are columns
    try {
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME)
        .appendRow([new Date().toISOString(), "ERROR", error.toString(), "", "", e.postData.contents]);
    } catch(err) {}

    return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Needed to handle any CORS preflight OPTIONS requests just in case they are sent
function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT);
}
