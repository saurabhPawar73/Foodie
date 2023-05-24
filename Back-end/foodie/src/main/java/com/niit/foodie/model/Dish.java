package com.niit.foodie.model;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Dish {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer dishId;
    private String dishName;
    private int dishPrice;
    @Column(length = 2000)
    private String dishDescription;
    private String vendor;
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "dish_images",
    joinColumns = {
            @JoinColumn(name = "dishId")
    },
            inverseJoinColumns = {
            @JoinColumn(name = "imageId")
            }
    )
    private Set<Image> dishImages;


}
