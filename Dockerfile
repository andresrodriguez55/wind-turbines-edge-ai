FROM ibm-semeru-runtimes:open-17-jre-focal
COPY target/windturbines-data-server-0.0.1-SNAPSHOT.jar /app/server.jar
ENV _JAVA_OPTIONS="-XX:MaxRAM=70m"
CMD java $_JAVA_OPTIONS -jar /app/server.jar