package com.windturbines.dataserver.configuration.security;

import com.windturbines.dataserver.configuration.security.filters.JwtAuthenticationFilter;
import com.windturbines.dataserver.entities.enums.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig
{
    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception
    {
        http
                .csrf().disable();
                //.cors().disable();
        /*
            .authorizeHttpRequests()
            .requestMatchers( "/api/authentication")
            .permitAll()

            .and()
            .authorizeHttpRequests()
            .requestMatchers("/api/users/**").hasAnyRole(Role.ADMIN.name())

            .requestMatchers(HttpMethod.GET,"/api/windturbines")
            .hasAnyRole(Arrays.stream(Role.values()).map(Enum::name).toArray(String[]::new))
            .requestMatchers(HttpMethod.POST,"/api/windturbines").hasAnyRole(Role.ADMIN.name())
            .requestMatchers(HttpMethod.DELETE,"/api/windturbines").hasAnyRole(Role.ADMIN.name())

            .requestMatchers(HttpMethod.GET,"/api/histories")
            .hasAnyRole(Arrays.stream(Role.values()).map(Enum::name).toArray(String[]::new))
            .requestMatchers(HttpMethod.GET,"/api/histories/**")
            .hasAnyRole(Arrays.stream(Role.values()).map(Enum::name).toArray(String[]::new))


            .anyRequest()
            .authenticated()
            .and()
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .authenticationProvider(authenticationProvider)
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        */

        return http.build();
    }
}
