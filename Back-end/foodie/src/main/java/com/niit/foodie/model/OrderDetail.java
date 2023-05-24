package com.niit.foodie.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class OrderDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer orderId;
    private String ordererFullName;
    private String orderFullAddress;
    private String ordererContactNo;
    private String orderStatus;
    private Integer orderTotalAmount;
    @OneToOne
    private Dish dish;
    @OneToOne
    private User user;

    private String transactionId;



    public OrderDetail(String ordererFullName, String orderFullAddress, String ordererContactNo, String orderStatus, Integer orderTotalAmount, Dish dish, User user,
                       String transactionId) {
        this.ordererFullName = ordererFullName;
        this.orderFullAddress = orderFullAddress;
        this.ordererContactNo = ordererContactNo;
        this.orderStatus = orderStatus;
        this.orderTotalAmount = orderTotalAmount;
        this.dish = dish;
        this.user = user;
        this.transactionId=transactionId;
    }
}
