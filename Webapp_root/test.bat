@echo off

SET app=myflaskapp
SET app_name=myflaskappcontainer
docker "build" "-t" "%app%" "."
docker "run" "-d" "-p" "8000:8000" "--name=%app_name%" "-v" "%PWD%:\app" "%app%"