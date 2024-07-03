FROM openjdk:17-alpine
VOLUME /tmp
COPY target/auth-service-0.0.12-SNAPSHOT.jar auth-service-0.0.12-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","/auth-service-0.0.12-SNAPSHOT.jar"]
EXPOSE 8080