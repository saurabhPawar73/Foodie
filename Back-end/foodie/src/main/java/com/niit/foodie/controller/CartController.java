package com.niit.foodie.controller;

import com.niit.foodie.model.Cart;
import com.niit.foodie.model.Dish;
import com.niit.foodie.services.CartService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/add-to-cart")
    public Cart addToCart(@RequestBody Dish dish, HttpServletRequest httpServletRequest){
        String inst_emailId=(String)httpServletRequest.getAttribute("user-emailId");
        return cartService.addToCart(dish, inst_emailId);
    }

    @GetMapping("/get-cart-items")
    public List<Cart> getCartItems(HttpServletRequest httpServletRequest){
        String emailId= (String) httpServletRequest.getAttribute("user-emailId");
        return cartService.getCartItems(emailId);
    }

    @DeleteMapping("/delete-cart-item/{cartId}")
    public void deleteCartItem(@PathVariable(name = "cartId") Integer cardId){
        cartService.removeCartItem(cardId);
    }
}
