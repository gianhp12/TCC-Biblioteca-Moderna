package io.gianhenrique.apibiblioteca.config;

import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    protected void configure(HttpSecurity http) throws Exception {
        http.cors().configurationSource(corsConfigurationSource()).and()
                .csrf().disable()
                .authorizeRequests()
                .antMatchers(HttpMethod.POST, "/api/alunos/**")
                .permitAll()
                .antMatchers(HttpMethod.POST, "/api/livros/**")
                .permitAll()
                .antMatchers(HttpMethod.POST, "/api/funcionarios/**")
                .permitAll()
                .antMatchers(HttpMethod.POST, "/api/emprestimo/**")
                .permitAll()
                .antMatchers(HttpMethod.GET,"/api/alunos/**")
                .permitAll()
                .antMatchers(HttpMethod.GET,"/api/livros/**")
                .permitAll()
                .antMatchers(HttpMethod.GET,"/api/funcionarios/**")
                .permitAll()
                .antMatchers(HttpMethod.GET,"/api/emprestimo/**")
                .permitAll()
                .antMatchers(HttpMethod.DELETE,"/api/alunos/**")
                .permitAll()
                .antMatchers(HttpMethod.DELETE,"/api/livros/**")
                .permitAll()
                .antMatchers(HttpMethod.DELETE,"/api/funcionarios/**")
                .permitAll()
                .antMatchers(HttpMethod.DELETE,"/api/emprestimo/**")
                .permitAll()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        final CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowCredentials(false);
        configuration.addAllowedOrigin("*");
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}

