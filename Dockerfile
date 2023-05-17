FROM adoptopenjdk:11-jre-hotspot
ARG JAR_FILE=target/windturbines-data-server-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
# EXPOSE 9980
ENTRYPOINT ["java","-jar","/app.jar"]