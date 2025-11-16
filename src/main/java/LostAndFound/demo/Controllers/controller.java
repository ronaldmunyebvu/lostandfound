/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package LostAndFound.demo.Controllers;

import LostAndFound.demo.Models.Details;
import LostAndFound.demo.Repository.NewRepo;
import LostAndFound.demo.Server01.userService;
import java.io.IOException;
import java.net.MalformedURLException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

/**
 *
 * @author FALCON ELECTRONIX
 */
@Controller

public class controller {
    @Autowired
    private NewRepo repose;
 //Service folder
    @Autowired
    private userService service;
    
 
    @GetMapping("/superAdmin")
    public String superAdmin1(){
        return "superADMIN";
    }
    @PostMapping("/super")
    public String loginSuper(@RequestParam String username, @RequestParam String password, Model model,
    RedirectAttributes redirectAttributes){
        
        if ("Super".equals(username) && "casper".equals(password)) {
            return "redirect:/loged"; // Redirect to super.html
        } else {
            model.addAttribute("error", "Invalid username or password");
        return "superADMIN";
    }
      
    
    }
     @GetMapping("/loged")
     public String loginPage(){
        return"admin";
    }
     //submiting data to database
      /*if( repose.existsByNationalid(nationalid)){
             redirectAttributes.addFlashAttribute("error","National id or passport number already exists");
             return"redirect:/another";
         }*/
         
     @PostMapping("/submited")
     public String saving(@RequestParam("fname") String fname, @RequestParam("lname") String lname,
             @RequestParam(required = false) String nationalid,
              String passportnumber,
             @RequestParam("location") String location, @RequestParam("documentname") String documentname, @RequestParam("contactnumber") String contactnumber,
             @RequestParam("containernumber") int containernumber, Model model,
             RedirectAttributes redirectAttributes)throws MalformedURLException{
         
       if (nationalid == null || nationalid.trim().isEmpty()) {
        nationalid = "DEFAULT_VALUE"; // Replace with your desired default value
    }

    // Check if National ID exists if provided
    if (!nationalid.equals("DEFAULT_VALUE") && repose.existsByNationalid(nationalid)) {
        redirectAttributes.addFlashAttribute("error", "National ID already exists.");
        return "redirect:/another"; // Redirect on error
    }
        
        
              Details dt = new Details();
         dt.setFname(fname);
         dt.setLname(lname);
         dt.setNationalid(nationalid);
         
         dt.setLocation(location);
         dt.setDocumentname(documentname);
         dt.setContactnumber(contactnumber);
         dt.setContainernumber(containernumber);
         
         repose.save(dt);        
         if(repose.save(dt).equals(dt)){
               redirectAttributes.addFlashAttribute("error","The names already exists");
             
         }
         System.out.println("Submitted number: " + containernumber);
        
         
         
         return "redirect:/retrieve";
     }
     @GetMapping("/another")
     public String forms(){
         return "anotherform";
     }
     
     //Searching the data
     
     
    @GetMapping("/search1")
    public String searchUser(
            
           @RequestParam(required = false) String nationalid,
            @RequestParam(required = false) String documentname,
            @RequestParam(required = false) String fname,
            @RequestParam(required = false) String lname,
            
            Model model) {
        
      List<Details> users = service.searchUsers(documentname, nationalid, fname, lname);

        if (users.isEmpty()) {
            model.addAttribute("error", "No results found for this document type and search criteria.");
        } else {
            model.addAttribute("users", users);
        }
        return "results"; // This will return the "results.html" view to display the search results
    }
    //Returning results
    @GetMapping("/reults")
    public String results(){
        return "results";
    }
    @GetMapping("/example")
    public String example(){
        return "example";
    }
    
      @GetMapping("/retrieve")
      public String out(Model model){
             try{
             Iterable <Details> users = repose.findAll();
    model.addAttribute("users",users);

        
        }catch(Exception e){
            e.printStackTrace();
        }
          return "permit";
      }
      //Editing 
      @GetMapping("/edit")
      public String editing(@RequestParam Long id, Model model){
           Details users = repose.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Invalid city ID: " + id));
        model.addAttribute("users", users);
          
          return "editing";
          
      }
      @PostMapping("/edit2/{id}")
      public String editingData(@RequestParam Long id,
                               @ RequestParam String fname,
                               @RequestParam String lname,
                               @RequestParam String nationalid,
                               @RequestParam String location,
                               @RequestParam String documentname,
                                @RequestParam String contactnumber,
                                @RequestParam int containernumber ){
          
          Details dt = service.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid city ID: " + id));
          
          dt.setFname(fname);
          dt.setLname(lname);
          dt.setNationalid(nationalid);
          dt.setLocation(location);
          dt.setDocumentname(documentname);
          dt.setContactnumber(contactnumber);
          dt.setContainernumber(containernumber);
          
          repose.save(dt);
    
          return "redirect:/retrieve";
      }
      //Deleting
      @PostMapping("/delete/{id}")
      public String delete(@PathVariable Long id, Model model){
          repose.deleteById(id);
          return"redirect:/retrieve";
          
      }
      //Admin searching
      @GetMapping("/adminsearch")
      public String adminsearch(){
          
          return "adminsearch";
      }
      //Admin search results 
       @GetMapping("/search2")
    public String searchAdmin(
            
           @RequestParam(required = false) String nationalid,
            @RequestParam(required = false) String documentname,
            @RequestParam(required = false) String fname,
            @RequestParam(required = false) String lname,
            
            Model model) {
        
      List<Details> users = service.searchUsers(documentname, nationalid, fname, lname);

        if (users.isEmpty()) {
            model.addAttribute("error", "No results found for this document type and search criteria.");
        } else {
            model.addAttribute("users", users);
        }
        return "permit"; // This will return the "results.html" view to display the search results
    }
    //Aout us
    @GetMapping("/about")
    
    public String about(){
        return "about";
    }
    @GetMapping("/contact")
    public String contact(){
        return "contact";
    }
    
      @GetMapping("/bulking")
    public String bulking(){
        return "bulk";
    }
    
    //Bulk Uploading from Excel sheet
     @PostMapping("/upload")
    public String uploadExcelFile(@RequestParam("file") MultipartFile file, Model model) {
        try {
            service.saveUsersFromExcel(file.getInputStream());
              model.addAttribute("message", "File uploaded and data saved successfully!");
        return "success";
        } catch (IOException e) {
            return "Failed to upload file: " + e.getMessage();
        }
    }
    
     
}
     
