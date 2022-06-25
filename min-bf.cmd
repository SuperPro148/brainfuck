@ECHO OFF
set initdir=%cd%
cd %~dp0
node min-bf %initdir%\%1
cd %initdir%