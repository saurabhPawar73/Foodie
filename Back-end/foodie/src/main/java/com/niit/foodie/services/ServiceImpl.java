package com.niit.foodie.services;

import com.niit.foodie.dao.DishRepo;
import com.niit.foodie.dao.UserRepo;
import com.niit.foodie.model.Dish;
import com.niit.foodie.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceImpl {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private DishRepo dishRepo;


//    public Role createRole(Role role) {
//        return jwtRepository.save(role);
//    }

    public User createUser(User user){
//        Set<Role> userRoles=new HashSet<>();
//        userRoles.add(new Role("user", "role for newly registered users to access app products"));
//        user.setRoles(userRoles);
        user.setRole("user");
        return userRepo.save(user);}

    public User loginCheck(String emailId, String password){
        return userRepo.findByEmailIdAndPassword(emailId, password);

    }

    public Dish addDish(Dish dish){
       return dishRepo.save(dish);
    }

    public List<Dish> getAllDishes(int pageNo, String searchKey){
        Pageable pageable= PageRequest.of(pageNo, 12);
        if (searchKey.equals("")){
            return (List<Dish>) dishRepo.findAll(pageable);
        }else {
            return dishRepo.findByDishNameContainingIgnoreCaseOrVendorContainingIgnoreCase(searchKey, searchKey, pageable);
        }
         }

    public Dish getDishDetailsById(Integer dishId){
        return dishRepo.findById(dishId).get();
    }
    public void deleteDish(int dishId){
        dishRepo.deleteById(dishId);
    }


}
