FROM maven:3.9-amazoncorretto-21 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -q
COPY src ./src
RUN mvn clean package -DskipTests -q

FROM bellsoft/liberica-openjre-alpine:21
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", \
             "-XX:+UseContainerSupport", \
             "-XX:MaxRAMPercentage=75.0", \
             "-Djava.security.egd=file:/dev/./urandom", \
             "-jar", "app.jar"]