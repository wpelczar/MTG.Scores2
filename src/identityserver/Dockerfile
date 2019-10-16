FROM microsoft/dotnet:sdk AS build-env
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY MTG.Scores2.IdentityServer/*.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY MTG.Scores2.IdentityServer/ ./
RUN dotnet publish -c Debug -o out

# Build runtime image
FROM microsoft/dotnet:aspnetcore-runtime
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "MTG.Scores2.IdentityServer.dll"]