FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build-env

WORKDIR /app

# Copy csproj and restore as distinct layers
COPY MTG.Scores2.IdentityServer/*.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY MTG.Scores2.IdentityServer/ ./
RUN dotnet publish -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1

# Copy certs
WORKDIR /certs
COPY Certs/*.pfx ./

WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "MTG.Scores2.IdentityServer.dll"]