const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

/**
 * Parses an Excel file and returns JSON data.
 * @param {string} filePath - Path to the Excel file.
 * @returns {Array<Object>} Parsed data as JSON array.
 */
function parseExcelToJson(filePath) {
  // Read the workbook
  const workbook = XLSX.readFile(filePath);

  // Get the first sheet name
  const sheetName = workbook.SheetNames[0];

  // Get the worksheet
  const worksheet = workbook.Sheets[sheetName];

  // Convert to JSON
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

  return jsonData;
}

// Example usage:
// const data = parseExcelToJson(path.join(__dirname, 'yourfile.xlsx'));
// fs.writeFileSync(path.join(__dirname, 'portfolio.json'), JSON.stringify(data, null, 2));

module.exports = { parseExcelToJson };