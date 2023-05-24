package com.niit.foodie.services;

import com.niit.foodie.dao.CartRepo;
import com.niit.foodie.dao.DishRepo;
import com.niit.foodie.dao.OrderDetailRepo;
import com.niit.foodie.dao.UserRepo;
import com.niit.foodie.model.*;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderDetailService {

    @Autowired
    private OrderDetailRepo orderDetailRepo;

    @Autowired
    private DishRepo dishRepo;

    @Autowired
    private UserRepo userRepo;

    private static final String order_placed = "Placed";

    private static final String KEY = "rzp_test_Q8FTo9c5RWip6u";
    private static final String KEY_SECRET = "qfkpGBAB93UOHszpmYlQEJ3z";
    private static final  String CURRENCY = "INR";


    @Autowired
    private CartRepo cartRepo;

    public TransactionDetail createTransaction(Integer amount){
        try {

            JSONObject jsonObject=new JSONObject();
            jsonObject.put("amount", (amount * 100));
            jsonObject.put("currency", CURRENCY);

            RazorpayClient razorpayClient=new RazorpayClient(KEY, KEY_SECRET);
            Order order = razorpayClient.orders.create(jsonObject);

            TransactionDetail transactionDetail=prepareTransaction(order);
            return transactionDetail;
        } catch (RazorpayException e) {
            throw new RuntimeException(e);
        }
    }

    public TransactionDetail prepareTransaction(Order order){
        String  orderId=order.get("id");
        String currency =order.get("currency");
        Integer amount=order.get("amount");

        TransactionDetail transactionDetail=new TransactionDetail(orderId, currency, amount, KEY);

        return transactionDetail;
    }
    public void placeOrder(OrderInput orderInput, String emailId, boolean isSingleDishCheckout) {
        List<OrderDishQuantity> dishQuantityList = orderInput.getOrderDishQuantityList();

        for (OrderDishQuantity odq : dishQuantityList) {
            Dish dish = dishRepo.findById(odq.getDishId()).get();


            User user = userRepo.findById(emailId).get();

            OrderDetail orderDetail = new OrderDetail(
                    orderInput.getFullName(),
                    orderInput.getAddress(),
                    orderInput.getContactNo(),
                    order_placed,
                    dish.getDishPrice() * odq.getQuantity(),
                    dish,
                    user,
                    orderInput.getTransactionId()
            );
            if (!isSingleDishCheckout){
                    List<Cart> carts=cartRepo.findByUser(user);
                    carts.stream().forEach(x -> cartRepo.deleteById(x.getCartId()));
            }

            orderDetailRepo.save(orderDetail);
        }

    }

public List<Dish> getDishDetails(boolean isSingleDishCheckout, Integer dishId, String emailId){
        if (isSingleDishCheckout && dishId!=0){
            List<Dish> dishList=new ArrayList<>();
            Dish dish=dishRepo.findById(dishId).get();
            dishList.add(dish);
            return dishList;
        }else {
            User user=userRepo.findById(emailId).get();
            List<Cart> cartList=cartRepo.findByUser(user);

            return cartList.stream().map( x -> x.getDish()).collect(Collectors.toList());
        }
}

public List<OrderDetail> getUserOrders(String eid){
    User user=userRepo.findById(eid).get();
        return orderDetailRepo.findByUser(user);
    }

    public List<OrderDetail> getAllOrders(String emailId, String status){
        List<OrderDetail> orderDetailList=new ArrayList<>();
        User user=userRepo.findById(emailId).get();

        if (user.getRole().equals("admin")){
            if (status.equals("all")){
        orderDetailRepo.findAll().forEach(
                x -> orderDetailList.add(x));
            }
            else {
                orderDetailRepo.findByOrderStatus(status).forEach(
                        x -> orderDetailList.add(x)
                );
            }
        }
        return orderDetailList;
    }

    public void changeOrderStatus(Integer orderId){
        OrderDetail orderDetail=orderDetailRepo.findById(orderId).get();
        orderDetail.setOrderStatus("Delivered");
        orderDetailRepo.save(orderDetail);
    }
}

