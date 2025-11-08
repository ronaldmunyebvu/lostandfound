/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package LostAndFound.demo.Repository;

import LostAndFound.demo.Models.Details;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author FALCON ELECTRONIX
 */
public interface NewRepo extends CrudRepository<Details,Long>,JpaSpecificationExecutor<Details>{
    List<Details> searchByNationalid(String nationalid);
   
   
    
    boolean existsByNationalid(String nationalid);

    //For searching purposes
  List<Details> findByDocumentnameAndNationalidIgnoreCase(String documentname, String nationalid);
    
    List<Details> findByDocumentnameAndFnameIgnoreCase(String documentname, String fname);
    
    List<Details> findByDocumentnameAndLnameIgnoreCase(String documentname, String lname);
}

    

    

