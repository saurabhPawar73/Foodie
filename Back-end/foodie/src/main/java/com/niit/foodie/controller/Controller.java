package com.niit.foodie.controller;

import com.niit.foodie.model.Dish;
import com.niit.foodie.model.Image;
import com.niit.foodie.model.User;
import com.niit.foodie.services.ServiceImpl;
import com.niit.foodie.services.TokenGeneration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@CrossOrigin
@RestController
public class Controller {


    @Autowired
    private TokenGeneration tokenGeneration;

    @Autowired
    private ServiceImpl service;


//    @PostMapping("/create-role")
//    public ResponseEntity<?> createRole(@RequestBody Role role) {
//        return new ResponseEntity<>(service.createRole(role), HttpStatus.OK);
//    }

    @PostMapping("/create-user")
    public User createUser(@RequestBody User user) {
        return service.createUser(user);
    }


    @PostMapping("/login")
    public ResponseEntity<?> loginCheck(@RequestBody User user) {
        User loggedUser = service.loginCheck(user.getEmailId(), user.getPassword());
        if (loggedUser != null)
             return new ResponseEntity<>(tokenGeneration.tokenGeneration(loggedUser), HttpStatus.OK);

        else {
            return new ResponseEntity<>("no such user found", HttpStatus.NOT_FOUND);
        }

    }

    @PostMapping(value = {"/addDish"}, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public Dish addNewDish(@RequestPart("dish") Dish dish,
                                        @RequestPart("image")MultipartFile[] file){

        try{
         Set<Image> images=uploadImage(file);
         dish.setDishImages(images);
//         service.addDish(dish);
        }catch(Exception e){
            System.out.println(e.getMessage());
        }
        return service.addDish(dish);
    }

    public Set<Image> uploadImage(MultipartFile[] multipartFile) throws IOException {

    Set<Image> imageSet=new HashSet<>();
    for (MultipartFile file:multipartFile){
        Image image=new Image();
        image.setImageName(file.getOriginalFilename());
        image.setImageType(file.getContentType());
        image.setBytes(file.getBytes());
        imageSet.add(image);
    }
        return imageSet;
    }

    @GetMapping("/dish/get/all")
    public List<Dish> getAllDishes(@RequestParam(defaultValue = "0") int pageNo,
                                   @RequestParam(defaultValue = "") String searchKey)
    {
        List<Dish> resultDishes=service.getAllDishes(pageNo, searchKey);
        System.out.println(resultDishes);
        return resultDishes;
    }

    @DeleteMapping("/dish/delete/{dishId}")
    public void removeDish(@PathVariable("dishId") Integer dishId){
        service.deleteDish(dishId);
    }

    @GetMapping("/getDishDetailsById/{dishId}")
    public Dish geDishDetailsById(@PathVariable("dishId") Integer dishId){
        return service.getDishDetailsById(dishId);
    }


}