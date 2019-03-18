# BallRenaLauncher

ElectronJS game launcher and updater, based on ElectronJS, HTML and CSS

How to publish?


Generate a GitHub access token by going to <https://github.com/settings/tokens/new>.  The access token should have the `repo` scope/permission.  Once you have the token, assign it to an environment variable

    On macOS/linux:

        export GH_TOKEN="<YOUR_TOKEN_HERE>"

    On Windows, run in powershell:

        [Environment]::SetEnvironmentVariable("GH_TOKEN","<YOUR_TOKEN_HERE>","User")

    Make sure to restart IDE/Terminal to inherit latest env variable.
