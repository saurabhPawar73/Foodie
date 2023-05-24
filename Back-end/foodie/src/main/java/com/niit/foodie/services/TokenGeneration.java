package com.niit.foodie.services;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import com.niit.foodie.model.User;
import org.springframework.stereotype.Service;

@Service
public class TokenGeneration {



    public Map<String, String> tokenGeneration(User user) {
        Map<String, String> token=new HashMap<>();

        Map<String, Object> tokenData=new HashMap<>();
        tokenData.put("emailId", user.getEmailId());
        tokenData.put("password", user.getPassword());
        tokenData.put("firstName", user.getFirstName());
        tokenData.put("role", user.getRole());

        String tokenbuilder= Jwts.builder()
                .setClaims(tokenData)
                .setIssuedAt(new Date())
                .setIssuer("foodie_user")
                .signWith(SignatureAlgorithm.HS512, "foodie-key")
                .compact();

        token.put("token", tokenbuilder);
        token.put("message", "login successfull, token generated");
        token.put("role", user.getRole());
        token.put("emailId", user.getEmailId());



        return token;
    }
}
