@ECHO OFF
set initdir=%cd%
cd %~dp0
node bf %initdir%\%1
cd %initdir%