# ecommerce-fullstack-application
==========================================================
# Live appication

- Frontend application [https://ak-ecom.netlify.app/](https://ak-ecom.netlify.app/)
- Backend apps registered in the Eureka, spring boot microservices running at [http://34.138.169.171:8761/](http://34.138.169.171:8761/)

# Lets explore the frontend part

The frontend of this project was built with [ReactJs](https://github.com/facebook/create-react-app) and used [Bootstrap](https://getbootstrap.com) for the smooth user experience.

SignUp:
- Whenever a user Register/Signin for the first time, there is a constraint that if the username was already exist in the database then he will get error message like usename is already taken i.e., unique for identification which cannot be changable after registration. Those form details will be sent to the backend if it return success response to the frontend then immediately hit the login API which will generate the jwtToken in the backend and sent to the frontend which means user logged in successfully. Then jwtToken will be stored in localstorage for further user specific operations like account info, cart, and order related services etc.
The jwtToken is valid for only 2hours after login everytime, if the jwtToken expires then you canot perform cart/orders/account related APIs. You've to login again.

SingIn:
- Similar process as above after succesfull login then the app will hit cart api carries the jwttoken for authentication, if the user already have some items in the cart previously then it'll reflect back in the frontend immediately.

Public APIs :
- Signup
- Signin

The user specific components (the user should be authenticated with jwtToken) :
- Cart
- Order history
- Account info

The admin specific components :
- Account info
- Admin page (should have admin authorization) can able to update the order status for each orders of all users which are coming in.
    
The seller specific components :
- Account info
- Seller Page (should have seller authorization) can able to add the new product or modify the existed products like quantity change or discounts.

# Deployment - frontend

Pushed the frontend code to the git repo named as [ecommerce-application](https://github.com/ashokumaar/ecommerce-application) (its a private repo).

Deployed the frontend project via [Netlify](https://app.netlify.com/) with CI/CD linked to Github - [ecommerce-application](https://github.com/ashokumaar/ecommerce-application) for automatic redeployment.


# Lets explore the backend part

The backend was built with Java - Spring Boot. Utilised microservices architecture, and divided the application into different small microservices (spring boot).

- Eureka Server : centralised registry, for registering all microservices into one place so that we can know how many apps are running and how many are scaled up or down at one place.

- API Gateway : Centralized API management, security, routing, load balancing your APIs. APplication is having different type of categorized apis for different roles for example, I've defined 3 roles in this application i.e., USER, SELLER, and ADMIN roles. If the user hits seller or admin api then he will get '403 - forbidden' response which means he/she is not authorized to hit that api.

- Auth Service : Manages authentication, authorization, user details, order history, and cart detailswith JWT for secure sessions.

- Fashion Service: Handles fashion-related product information including men's and women's clothing, shoes, and accessories.

- Electronics Service: Manages electronics products, focusing on mobile devices.
Books Service: Manages books products.

- Security: Implemented robust security with JWT tokens for authentication and Bcrypt for password encryption.

# Deployment (backend): 

Dockerized all the microservices and deployed them using Kubernetes (GKE) for high availability and scalability, exposing services via external IPs.


# Technologies/tools used :

- Java, Spring Boot, MySQL, Docker, Kubernetes(GKE), JavaScript, ReactJS, Bootstrap, JWT, Bcrypt.
