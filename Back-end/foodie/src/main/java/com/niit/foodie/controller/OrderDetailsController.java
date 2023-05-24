package com.niit.foodie.controller;

import com.niit.foodie.dao.OrderDetailRepo;
import com.niit.foodie.dao.UserRepo;
import com.niit.foodie.model.*;
import com.niit.foodie.services.OrderDetailService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class OrderDetailsController {

    @Autowired
    private OrderDetailService orderDetailService;
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private OrderDetailRepo orderDetailRepo;

    @PostMapping("/place-order/{isSingleDishCheckout}")
    public void placeOrder(@RequestBody OrderInput orderInput, HttpServletRequest httpServletRequest, @PathVariable(name = "isSingleDishCheckout")boolean isSingleDishCheckout){
        String curr_emailId=(String) httpServletRequest.getAttribute("user-emailId");
         orderDetailService.placeOrder(orderInput, curr_emailId, isSingleDishCheckout);
    }

    @GetMapping("/getDishDetails/{isSingleDishCheckout}/{dishId}")
    public List<Dish> getDishDetails(HttpServletRequest request, @PathVariable(name = "isSingleDishCheckout")boolean isSingleDishCheckout,
                                     @PathVariable(name = "dishId") Integer dishId){
        String emailId=(String)request.getAttribute("user-emailId");
        return orderDetailService.getDishDetails(isSingleDishCheckout,dishId, emailId);
    }

    @GetMapping("/get-orders")
    public List<OrderDetail> getMyOrders(HttpServletRequest request){
        String emailId=(String)request.getAttribute("user-emailId");
        return orderDetailService.getUserOrders(emailId);
    }

    @GetMapping("/get-all-orders/{status}")
    public ResponseEntity<?> getAllOrders(HttpServletRequest servletRequest, @PathVariable(name = "status")
                                          String status){
    String emailId= (String) servletRequest.getAttribute("user-emailId");

    return new ResponseEntity<>(orderDetailService.getAllOrders(emailId, status), HttpStatus.OK);}


    @GetMapping("/change-status/{orderId}")
    public void markAsDelivered(@PathVariable(name = "orderId")Integer orderId){
        orderDetailService.changeOrderStatus(orderId);
}

    @GetMapping("/create-transaction/{amount}")
    public TransactionDetail createTransaction(@PathVariable (name = "amount") Integer amount ){
        return orderDetailService.createTransaction(amount);
    }

}



