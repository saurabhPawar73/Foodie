package com.niit.foodie.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class TransactionDetail {

    private String orderId;
    private String currency;
    private Integer amount;
    private String key;
}
