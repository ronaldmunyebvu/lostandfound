/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package LostAndFound.demo.Server01;

import LostAndFound.demo.Models.Details;
import LostAndFound.demo.Repository.NewRepo;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

/**
 *
 * @author FALCON ELECTRONIX
 */
@Service
public class userService {
    @Autowired
    private NewRepo userRepository;

    
   public Optional<Details> findById(Long id) {
        return userRepository.findById(id);
        
   }
    public void update(Details city) {
        userRepository.save(city); // This will save the updated city object
    }
   
    public List<Details> searchUsers(String documentname, String nationalid, String fname, String lname) {
        List<Details> results = new ArrayList<>();

        // Perform searches for each criterion
        if (nationalid != null && !nationalid.isEmpty()) {
            results.addAll(userRepository.findByDocumentnameAndNationalidIgnoreCase(documentname, nationalid));
        }
        if (fname != null && !fname.isEmpty()) {
            results.addAll(userRepository.findByDocumentnameAndFnameIgnoreCase(documentname, fname));
        }
        if (lname != null && !lname.isEmpty()) {
            results.addAll(userRepository.findByDocumentnameAndLnameIgnoreCase(documentname, lname));
        }

        return results;
    }
    //Bulk uploading code
  public void saveUsersFromExcel(InputStream is) {
    try (Workbook workbook = new XSSFWorkbook(is)) {
        Sheet sheet = workbook.getSheetAt(0);
        List<Details> users = new ArrayList<>();

        for (Row row : sheet) {
            Details user = new Details();
            user.setFname(getStringCellValue(row.getCell(0)));
            user.setLname(getStringCellValue(row.getCell(1)));
            user.setNationalid(getStringCellValue(row.getCell(2)));
            user.setLocation(getStringCellValue(row.getCell(3)));
            user.setDocumentname(getStringCellValue(row.getCell(4)));
            user.setContactnumber(getStringCellValue(row.getCell(5)));

            // Handle container number
            Cell containerCell = row.getCell(6); // Assuming this is the correct index for the container number
            if (containerCell != null) {
                try {
                    user.setContainernumber(getNumericContainerNumber(containerCell));
                } catch (IllegalArgumentException e) {
                    System.err.println(e.getMessage());
                    user.setContainernumber(0); // Set a default value if the input is not valid
                }
            } else {
                user.setContainernumber(0); // Set a default if the cell is null
            }

            users.add(user);
        }
        userRepository.saveAll(users);
    } catch (Exception e) {
        e.printStackTrace();
    }
}

// Helper method to get String value safely
private String getStringCellValue(Cell cell) {
    if (cell != null) {
        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue();
            case NUMERIC:
                return String.valueOf((int) cell.getNumericCellValue());
            case BLANK:
                return ""; // Return an empty string for blank cells
            default:
                return ""; // Return empty for unexpected types
        }
    }
    return ""; // Handle null cell
}

// Helper method to get the container number safely and ensure it is numeric
private int getNumericContainerNumber(Cell cell) {
    if (cell != null) {
        switch (cell.getCellType()) {
            case NUMERIC:
                return (int) cell.getNumericCellValue();
            case STRING:
                try {
                    String cellValue = cell.getStringCellValue();
                    // Validate that the string can be numeric 
                    if (cellValue.matches("\\d+")) { // Regex to check for numeric strings only
                        return Integer.parseInt(cellValue);
                    } else {
                        throw new IllegalArgumentException("Invalid container number format: " + cellValue + " at row: " + cell.getRowIndex());
                    }
                } catch (NumberFormatException e) {
                    throw new IllegalArgumentException("Invalid container number format: " + cell.getStringCellValue() + " at row: " + cell.getRowIndex());
                }
            case BLANK:
                return 0; // Return a default value for blank containers
            default:
                throw new IllegalArgumentException("Unexpected cell type for container number at row: " + cell.getRowIndex());
        }
    }
    throw new IllegalArgumentException("Container number cell is null.");
}
}
    


   

