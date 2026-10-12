# ---- 1. Build the Angular client (outputs to API/wwwroot) ----
FROM node:22-alpine AS client
WORKDIR /src/client
COPY client/package*.json ./
RUN npm ci --no-audit --no-fund
COPY client/ ./
RUN mkdir -p /src/API && npx ng build --configuration production

# ---- 2. Build and publish the .NET API ----
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY API/API.csproj API/
RUN dotnet restore API/API.csproj
COPY API/ API/
RUN rm -rf API/wwwroot
COPY --from=client /src/API/wwwroot API/wwwroot
RUN dotnet publish API/API.csproj -c Release -o /app --no-restore

# ---- 3. Runtime image ----
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app .
ENV ASPNETCORE_HTTP_PORTS=8080
EXPOSE 8080
ENTRYPOINT ["dotnet", "API.dll"]
