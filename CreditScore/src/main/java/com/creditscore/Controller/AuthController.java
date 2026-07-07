package com.creditscore.Controller;

import com.creditscore.entity.User;

import java.util.Collections;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.creditscore.repository.UserRepository;

@CrossOrigin(origins="http://localhost:4200")
@RestController
@RequestMapping("/auth")
public class AuthController {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@RequestBody User user)
	{
		Optional<User> maybeUser = userRepository.findByUsername(user.getUsername());
		
		if(maybeUser.isPresent())
		{
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username already exists");
		}
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		userRepository.save(user);
		return ResponseEntity.ok("User registered successfully");
	}
	/*public String registerUser(@RequestBody User user)
	{
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		userRepository.save(user);
		return "User registered successfully";
	}*/
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@PostMapping("/login")
	
	/*public ResponseEntity<?> login(@RequestBody Map<String,String> credentials)
	{
		System.out.println("DEBUG: Reached controller with: "+credentials);
		
		return ResponseEntity.ok("Logic logic triggered");
	}
}*/
	public ResponseEntity<?> login(@RequestBody User user)
	{
		try
		{
	 Authentication auth = authenticationManager.authenticate
			 (new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
	 
	   // if(auth.isAuthenticated())
	   // {
			return ResponseEntity.ok(Collections.singletonMap("message", "Login success"));
	    }
	    catch(Exception e)
	    {
	    	e.printStackTrace();
		
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.singletonMap("message", "invalid credentials"));
			
		}
	}
}
	