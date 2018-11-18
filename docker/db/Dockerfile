# escape=`
FROM microsoft/mssql-server-windows-express

ENV ACCEPT_EULA="Y" `
    DATA_PATH="C:\mssqldata" `
    sa_password="Your_password123"

VOLUME ${DATA_PATH}
WORKDIR C:\init

COPY docker/db/Initialize-Database.ps1 .
CMD powershell ./Initialize-Database.ps1 -sa_password $env:sa_password -data_path $env:data_path -Verbose
