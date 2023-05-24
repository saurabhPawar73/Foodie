package com.niit.foodie.dao;

import com.niit.foodie.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<User, String> {
    public User findByEmailIdAndPassword(String eId, String password);

}
