#FROM ibm-semeru-runtimes:open-17-jre-focal
#FROM openjdk:17-jdk-slim
#FROM maven:3.8.2-jdk17 AS build
#RUN mvn clean package -DskipTests


# COPY target/windturbines-data-server-0.0.1-SNAPSHOT.jar /app/server.jar
FROM openjdk:17-jdk-slim
COPY /target/windturbines-data-server-0.0.1-SNAPSHOT.jar demo.jar
EXPOSE 8080
# ENTRYPOINT ["java", "-XX:MaxRAM=70m", "-jar", "server.jar"]
CMD java $_JAVA_OPTIONS -jar demo.jar
#ENTRYPOINT ["java","-jar","demo.jar"]