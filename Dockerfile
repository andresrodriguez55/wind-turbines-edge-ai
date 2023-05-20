#FROM ibm-semeru-runtimes:open-17-jre-focal
#FROM openjdk:17-jdk-slim
#FROM maven:3.8.2-jdk17 AS build
#RUN mvn clean package -DskipTests


# COPY target/windturbines-data-server-0.0.1-SNAPSHOT.jar /app/server.jar
FROM openjdk:17-jdk-slim
COPY --from=build /target/windturbines-data-server-0.0.1-SNAPSHOT.jar demo.jar
ENV _JAVA_OPTIONS="-XX:MaxRAM=75m"
EXPOSE 8080
# ENTRYPOINT ["java", "-XX:MaxRAM=70m", "-jar", "server.jar"]
#CMD java $_JAVA_OPTIONS -jar server.jar
ENTRYPOINT ["java","-jar","demo.jar"]

# Appended by flyctl
ENV ECTO_IPV6 true
ENV ERL_AFLAGS "-proto_dist inet6_tcp"