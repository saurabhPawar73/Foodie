package com.niit.foodie.services;


import com.niit.foodie.dao.CartRepo;
import com.niit.foodie.dao.DishRepo;
import com.niit.foodie.dao.UserRepo;
import com.niit.foodie.model.Cart;
import com.niit.foodie.model.Dish;
import com.niit.foodie.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartService {

    @Autowired
    private DishRepo dishRepo;

    @Autowired
    private UserRepo userRepo;
    @Autowired
    private CartRepo cartRepo;

    public Cart addToCart(Dish dish, String emailId){
//                Dish dish =dishRepo.findById(dishId).get();
//        System.out.println(dish);
         Integer dishId=dish.getDishId();
         Dish dish1=dishRepo.findById(dishId).get();
                User loggedUser=userRepo.findById(emailId).get();
        System.out.println(loggedUser);
                if (dish!=null && loggedUser!=null){
                    User user=userRepo.findById(emailId).get();
                    List<Cart> cartList =cartRepo.findByUser(user);
                    List<Cart> filteredList= cartList.stream().filter(x -> x.getDish().getDishId()==dishId).collect(Collectors.toList());
                    if (filteredList.size()>0){
                        return null;
                    }
                    Cart cart=new Cart(dish1, loggedUser);
                    return cartRepo.save(cart);
                }
                return null;
    }

    public List<Cart> getCartItems(String emailId){
        User user= userRepo.findById(emailId).get();
        return cartRepo.findByUser(user);
    }

    public void removeCartItem(Integer cartId){
        cartRepo.deleteById(cartId);
    }

}
