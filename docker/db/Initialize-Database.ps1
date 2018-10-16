param(
    [Parameter(Mandatory=$true)]
    [string] $sa_password,

    [Parameter(Mandatory=$true)]
    [string] $data_path)

# start the service
Write-Verbose 'Starting SQL Server'
Start-Service MSSQL`$SQLEXPRESS

if ($sa_password -ne "_") {
	Write-Verbose 'Changing SA login credentials'
    $sqlcmd = "ALTER LOGIN sa with password='$sa_password'; ALTER LOGIN sa ENABLE;"
    Invoke-SqlCmd -Query $sqlcmd -ServerInstance ".\SQLEXPRESS" 
}

$dbName = "MTGScores2"
$mdfPath = "$data_path\$dbName.mdf"
$ldfPath = "$data_path\$dbName_log.ldf"

# attach data files if they exist: 
if ((Test-Path $mdfPath) -eq $true) {
    $sqlcmd = "IF DB_ID('$dbName') IS NULL BEGIN CREATE DATABASE $dbName ON (FILENAME = N'$mdfPath')"
    if ((Test-Path $ldfPath) -eq $true) {
        $sqlcmd =  "$sqlcmd, (FILENAME = N'$ldfPath')"
    }
    $sqlcmd = "$sqlcmd FOR ATTACH; END"
    Write-Verbose 'Data files exist - will attach '
    Invoke-Sqlcmd -Query $sqlcmd -ServerInstance ".\SQLEXPRESS"
}
else {
    Write-Verbose 'No data files - will create new database'

    $sqlcmd = "CREATE DATABASE [$dbName] ON PRIMARY
    (   NAME        = N'$dbName'
        ,FILENAME   = N'$mdfPath') 
    LOG ON
    (   NAME        = N'$dbName_log'
        ,FILENAME   = N'$ldfPath')
    GO"

    Invoke-Sqlcmd -Query $sqlcmd -ServerInstance ".\SQLEXPRESS"
}

Write-Verbose "Deployed $dbName database, data files at: $data_path"

$lastCheck = (Get-Date).AddSeconds(-5) 
while ($true) { 
    Get-EventLog -LogName Application -Source "MSSQL*" -After $lastCheck | Select-Object TimeGenerated, EntryType, Message	 
    $lastCheck = Get-Date 
    Start-Sleep -Seconds 5 
}