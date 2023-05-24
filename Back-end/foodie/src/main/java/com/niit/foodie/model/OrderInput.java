package com.niit.foodie.model;

import java.util.List;

public class OrderInput {

    private String fullName;
    private String address;
    private String contactNo;

    private String transactionId;
    private List<OrderDishQuantity> orderDishQuantityList;

    public OrderInput(String fullName, String address, String contactNo, String transactionId, List<OrderDishQuantity> orderDishQuantityList) {
        this.fullName = fullName;
        this.address = address;
        this.contactNo = contactNo;
        this.transactionId = transactionId;
        this.orderDishQuantityList = orderDishQuantityList;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getContactNo() {
        return contactNo;
    }

    public void setContactNo(String contactNo) {
        this.contactNo = contactNo;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public List<OrderDishQuantity> getOrderDishQuantityList() {
        return orderDishQuantityList;
    }

    public void setOrderDishQuantityList(List<OrderDishQuantity> orderDishQuantityList) {
        this.orderDishQuantityList = orderDishQuantityList;
    }
}
