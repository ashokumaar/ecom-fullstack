FROM openjdk:17-alpine
VOLUME /tmp
COPY target/eureka-server-0.0.14-SNAPSHOT.jar eureka-server-0.0.14-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","/eureka-server-0.0.14-SNAPSHOT.jar"]
EXPOSE 8761