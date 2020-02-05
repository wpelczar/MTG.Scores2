﻿[CmdletBinding()]
param(
    [Parameter(Mandatory=$true)][securestring]$password = ""
)

#https://mcguirev10.com/2018/01/04/localhost-ssl-identityserver-certificates.html#identityserver-token-credentials
$cwd = Convert-Path .
$sCerFile = "$cwd\token_signing.cer"
$sPfxFile = "$cwd\token_signing.pfx"
$vCerFile = "$cwd\token_validation.cer"
$vPfxFile = "$cwd\token_validation.pfx"

# abort if files exist
if((Test-Path($sPfxFile)) -or (Test-Path($sCerFile)) -or (Test-Path($vPfxFile)) -or (Test-Path($vCerFile)))
{
    Write-Warning "Failed, token_signing or token_validation files already exist in current directory."
    Exit
}

function Get-NewCert([string]$name, [string]$subject)
{
    New-SelfSignedCertificate `
        -Subject $subject `
        -DnsName $subject `
        -FriendlyName $name `
        -NotBefore (Get-Date) `
        -NotAfter (Get-Date).AddYears(10) `
        -CertStoreLocation "cert:CurrentUser\My" `
        -KeyAlgorithm RSA `
        -KeyLength 4096 `
        -HashAlgorithm SHA256 `
        -KeyUsage DigitalSignature, KeyEncipherment, DataEncipherment `
        -Type Custom,DocumentEncryptionCert `
        -TextExtension @("2.5.29.37={text}1.3.6.1.5.5.7.3.1")
}

# token signing certificate
$cert = Get-NewCert -name "IdentityServer Token Signing Credentials" -subject "mtgscores2identityserver_signing"
$store = 'Cert:\CurrentUser\My\' + ($cert.ThumbPrint)  
Export-PfxCertificate -Cert $store -FilePath $sPfxFile -Password $password
Export-Certificate -Cert $store -FilePath $sCerFile
Write-Host "Token-signing thumbprint: " $cert.Thumbprint

# token validation certificate
$cert =  Get-NewCert -name "IdentityServer Token Validation Credentials" -subject "mtgscores2identityserver_validation"
$store = 'Cert:\CurrentUser\My\' + ($cert.ThumbPrint)  
Export-PfxCertificate -Cert $store -FilePath $vPfxFile -Password $password
Export-Certificate -Cert $store -FilePath $vCerFile
Write-Host "Token-validation thumbprint: " $cert.Thumbprint