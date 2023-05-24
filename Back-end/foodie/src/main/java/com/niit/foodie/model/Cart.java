package com.niit.foodie.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer cartId;
    @OneToOne
    private Dish dish;
    @OneToOne
    private User user;

    public Cart(Dish dish, User user) {
        this.dish = dish;
        this.user = user;
    }
}
