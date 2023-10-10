# Use a base image with Java and Maven pre-installed
FROM maven:3.8.4-jdk-11 AS build
WORKDIR /app
COPY . .
RUN mvn clean package

# Use a lightweight Java runtime as the final image
FROM openjdk:21-jdk
WORKDIR /app
COPY target/LoanApplication-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8081
CMD ["java", "-jar", "app.jar"]