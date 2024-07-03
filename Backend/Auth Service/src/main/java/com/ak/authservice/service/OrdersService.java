package com.ak.authservice.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ak.authservice.entity.OrderDetail;
import com.ak.authservice.entity.Orders;
import com.ak.authservice.entity.repository.OrderDetailRepository;
import com.ak.authservice.entity.repository.OrderRepository;

@Service
public class OrdersService {

	@Autowired
	private OrderRepository ordersRepo;
	
	@Autowired
	private OrderDetailRepository itemsRepo;
	
    public Orders placeOrder(Orders Orders) {
        if(Orders !=null) {
          Orders createdOrder = ordersRepo.save(Orders);
          List<OrderDetail> itemsToSave = new ArrayList<>(createdOrder.getItems());
          int i=0;
          for(OrderDetail item : itemsToSave) {
        	  item.setOrder(createdOrder);
        	  item.setProduct(Orders.getItems().get(i).getProduct());
        	  itemsRepo.save(item);
        	  i++;
          }
        }
        return null;
    }

    public List<Orders> getOrdersByPeriod(Date startDate, Date endDate) {
        System.out.println(startDate);
        System.out.println(endDate);
        if(startDate!=null && endDate!=null) {
            return ordersRepo.findByCreatedAtBetween(startDate, endDate);
        }
        return null;
    }

    public List<Orders> findAll() {
        return ordersRepo.findAll();
    }
}
