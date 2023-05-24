package com.niit.foodie.dao;

import com.niit.foodie.model.OrderDetail;
import com.niit.foodie.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDetailRepo extends JpaRepository<OrderDetail, Integer> {
public List<OrderDetail> findByUser(User user);

public List<OrderDetail> findByOrderStatus(String orderStatus);
}
