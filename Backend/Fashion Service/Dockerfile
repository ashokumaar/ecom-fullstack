# fashion-service/Dockerfile
# FROM openjdk:17-oracle
FROM openjdk:17-alpine
VOLUME /tmp
COPY target/fashion-service-0.0.18-SNAPSHOT.jar fashion-service-0.0.18-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","/fashion-service-0.0.18-SNAPSHOT.jar"]
EXPOSE 8100