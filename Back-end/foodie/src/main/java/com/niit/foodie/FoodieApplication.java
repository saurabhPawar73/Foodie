package com.niit.foodie;

import com.niit.foodie.filter.JwtFilter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.core.Ordered;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@SpringBootApplication
public class FoodieApplication {


	public static void main(String[] args) {
		SpringApplication.run(FoodieApplication.class, args);
	}

		@Bean
		public FilterRegistrationBean filter(){
		FilterRegistrationBean frObj=new FilterRegistrationBean<>();
		frObj.setFilter(new JwtFilter());
		frObj.addUrlPatterns("/place-order/*", "/add-to-cart", "/get-cart-items","/getDishDetails/*",
				"/get-orders", "/get-all-orders/*");
		return frObj;
	}

	@Bean
	public FilterRegistrationBean filterRegistrationBean(){
		final CorsConfiguration config=new CorsConfiguration();
		config.setAllowCredentials(true);
		config.addAllowedOrigin("http://localhost:4200");
		config.addAllowedHeader("*");
		config.addAllowedMethod("*");

		final UrlBasedCorsConfigurationSource source=new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", config);
		FilterRegistrationBean bean=new FilterRegistrationBean(new CorsFilter(source));
		bean.setOrder(Ordered.HIGHEST_PRECEDENCE);
		return bean;
	}
}