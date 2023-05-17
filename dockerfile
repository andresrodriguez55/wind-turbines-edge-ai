FROM adoptopenjdk:11-jre-hotspot
ARG JAR_FILE=target/windturbines-data-server-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} windturbines-rest-for-client.jar
# EXPOSE 9980
ENTRYPOINT ["java","-jar","/windturbines-rest-for-client.jar"]