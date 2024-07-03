package com.ak.apigateway.util;

import java.security.Key;
import java.util.function.Function;

//import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@SuppressWarnings("deprecation")
@Component
public class JwtUtil {

	public static final String SECRET = "2b0e25d61128d2f1142611606691c02f96dc757674908b08dd2c5e687fdf1fa6";
			
	private <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
		final Claims claims = exctractAllClaims(token);
		return claimResolver.apply(claims);
	}

	public String extractUsername(String token) {
		return extractClaim(token, Claims::getSubject);
	}

//	private Date extractExpiration(String token) {
//		return extractClaim(token, Claims::getExpiration);
//	}

	private Claims exctractAllClaims(String token) {

		return Jwts.parser().setSigningKey(getSignKey()).build().parseClaimsJws(token).getBody();
	}

	private Key getSignKey() {
		byte[] keyBytes = Decoders.BASE64.decode(SECRET);
		return Keys.hmacShaKeyFor(keyBytes);
	}
	
	public void validateToken(String token) {
		Jwts.parser().setSigningKey(getSignKey()).build().parseClaimsJws(token);
	}
	
//	private Boolean isTokenExpired(String token) {
//		return extractExpiration(token).before(new Date());
//	}
//
//	public Boolean validateToken(String token, UserDetails userDetails) {
//		final String userName = extractUsername(token);
//		return (userName.equals(userDetails.getUsername()) && !isTokenExpired(token));
//	}

//	@SuppressWarnings("deprecation")
//	private String createToken(Map<String, Object> clams, String userName) {
//
//		return Jwts.builder().setClaims(clams).setSubject(userName).setIssuedAt(new Date(System.currentTimeMillis()))
//				.setExpiration(new Date(System.currentTimeMillis() + 2000 * 60 * 60))
//				.signWith(getSignKey(), SignatureAlgorithm.HS256).compact();
//	}

//	public String generateToken(String username) {
//		Map<String, Object> claims = new HashMap<>();
//		return createToken(claims, username);
//	}


}
