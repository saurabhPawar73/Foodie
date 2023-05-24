package com.niit.foodie.model;

import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class User {

    @Id
    private String emailId;
    private String firstName;
    private String lastName;
    private String address;
    private String password;
    private String role;
//    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
//    @JoinTable(name = "User_Roles",
//            joinColumns ={
//            @JoinColumn(name = "user_id")
//            },
//            inverseJoinColumns = {
//            @JoinColumn(name = "role_id")
//            }
//    )



}
