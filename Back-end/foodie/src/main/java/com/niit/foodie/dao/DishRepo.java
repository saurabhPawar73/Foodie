package com.niit.foodie.dao;

import com.niit.foodie.model.Dish;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface DishRepo extends CrudRepository<Dish, Integer> {
    public List<Dish> findAll(Pageable pageable);

    public List<Dish> findByDishNameContainingIgnoreCaseOrVendorContainingIgnoreCase(String key1, String
                                                                                     key2, Pageable pageable);


}
