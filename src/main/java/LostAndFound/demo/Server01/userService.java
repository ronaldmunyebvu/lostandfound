/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package LostAndFound.demo.Server01;

import LostAndFound.demo.Models.Details;
import LostAndFound.demo.Repository.NewRepo;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    }


   

