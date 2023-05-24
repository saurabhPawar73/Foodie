package com.niit.foodie.dao;

import com.niit.foodie.model.Cart;
import com.niit.foodie.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepo extends JpaRepository<Cart, Integer> {
    public List<Cart> findByUser(User user);
}
