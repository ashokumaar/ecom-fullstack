package com.ak.authservice.entity.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.ak.authservice.entity.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, Integer>{

	@Transactional
    @Modifying
    @Query("DELETE FROM CartItem ci WHERE ci.id = :itemId AND ci.cart.id = :cartId")
    void deleteCartItemById(@Param("cartId") int cartId, @Param("itemId") int itemId);
	
	Boolean existsByCart_IdAndId(int cartId, int itemId);
	
}
