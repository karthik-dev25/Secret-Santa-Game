import * as XLSX from "xlsx";
import { saveAs } from 'file-saver';

// Defining file types here
export const csvFileType = "text/csv";

export const xlsFileType = "application/vnd.ms-excel";

export const xlsxFileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

export function generateSecretSantaList(
  currentEmployeeList,
  previousEmployeeList = []
) {
  // Converting previous assignments to Map for lookup
  const prevMap = new Map();
  previousEmployeeList.forEach((prev) => {
    prevMap.set(prev.Employee_EmailID, prev.Secret_Child_EmailID);
  });

  for (let i = 0; i < 100; i++) {
    // Shuffling the current Employee List
    const shuffled = [...currentEmployeeList].sort(() => Math.random() - 0.5);
    let isValid = true;
    const result = [];

    for (let j = 0; j < currentEmployeeList.length; j++) {
      const santa = currentEmployeeList[j];
      const child = shuffled[j];

      // condition to avoid self assign
      if (santa.Employee_EmailID === child.Employee_EmailID) {
        isValid = false;
        break;
      }

      // condition to do not assign same child on prev year
      const previousChild = prevMap.get(santa.Employee_EmailID);
      if (previousChild && previousChild === child.Employee_EmailID) {
        isValid = false;
        break;
      }

      result.push({
        Employee_Name: santa.Employee_Name,
        Employee_EmailID: santa.Employee_EmailID,
        Secret_Child_Name: child.Employee_Name,
        Secret_Child_EmailID: child.Employee_EmailID,
      });
    }
    console.log('result: ', result);

    if (isValid) {
      return result;
    }
    
  }
}

export function generateJsonToXLSX(jsonData){
  const worksheet = XLSX.utils.json_to_sheet(jsonData);

  // Create a new workbook and append the worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  // Generate buffer
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array',cellStyles:'border' });

  // Create Blob and save
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(blob, `Employee_List.xlsx`);
}
