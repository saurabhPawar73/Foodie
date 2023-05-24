package com.niit.foodie.filter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.filter.GenericFilterBean;

import java.io.IOException;

public class JwtFilter extends GenericFilterBean {
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {

        HttpServletRequest httpServletRequest=(HttpServletRequest)servletRequest;
        HttpServletResponse httpServletResponse=(HttpServletResponse)servletResponse;

            String header=httpServletRequest.getHeader("authorization");

        String userToken=header.substring(7);

        Claims claims= Jwts.parser().setSigningKey("foodie-key").parseClaimsJws(userToken).getBody();

        httpServletRequest.setAttribute("user-emailId", claims.get("emailId"));
        filterChain.doFilter(servletRequest, httpServletResponse);

    }
}
