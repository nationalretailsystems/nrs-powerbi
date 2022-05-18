# Local Development Environment Setup Guide

Congratulations on getting started with Next-Gen Applications with Eradani Connect! This guide will provide a walkthrough of the steps required to set up a Next-Gen development environment on a new Windows PC.

**Most of this guide assumes that all prerequisites have already been met. If you are not sure if that is the case, refer to the "Check Prerequisites" section for a list of required software.**

Let's get started!

## Install Prerequisites

Before we can set up a new PC for Next-Gen Application development, 5 requirements must be met:

- The PC must have WSL (Windows Subsystem for Linux) enabled with an Ubuntu distro installed
- Docker Desktop must be installed
- Postman must be installed
- Visual Studio Code (VSCode) must be installed
- You must have an account on github.com or with your company's git source control system (Azure DevOps, Bitbucket, GitLab, etc)

For more information about these prerequisites and why they were chosen, check the "Eradani Connect Open Source Development Environment" document.

### WSL - Windows Subsystem for Linux

> *Note: This is only required for Windows users. Mac and Linux users do not need to install WSL.*

The Windows Subsystem for Linux allows Windows PCs to run an embedded Linux container to better support popular open source software, including Node.js. 

> *Note: This system requires WSL2 to be installed. If you previously had WSL1 installed, it will need to be upgraded.*

To install WSL on your Windows PC, follow [this guide from Microsoft](https://docs.microsoft.com/en-us/windows/wsl/install).

Once WSL is installed use the `wsl -l -v` command to check the installation. If you see output like this:

```
  NAME                   STATE           VERSION
* Ubuntu                 Running         2
```

then you are done with this step!

If you instead see a message saying that no distributions have been installed, install the Ubuntu distribution with the command: `wsl --install -d Ubuntu` 

> *Note: You may need to reboot your PC and open the Ubuntu app to complete the Ubuntu install.*

Then check the output of `wsl -l -v` again to ensure it looks like the above output.

If you have a version 1 installation of WSL / Ubuntu, run the following two commands to upgrade it:

```
wsl --set-version Ubuntu 2
wsl --set-default-version 2
```

> *Note: WSL2 with Ubuntu must be installed <u>before</u> Docker Desktop. If you notice problems with WSL after installing Docker Desktop, you will need to fully uninstall and reinstall Docker Desktop once the WSL problems have been resolved.*

### Docker Desktop

Docker Desktop (and its behind-the-scenes engine) will allow us to run Container software on your PC so that you can share the standard development environment with a minimal install process.

Docker Desktop can be downloaded and installed from [docker.com](https://docker.com).

Once Docker Desktop has been installed and is running, you should see a green bar in the bottom-left corner of the Docker Desktop window. Hovering over that green box should show a small message saying "Engine Running". If the box is orange, give it a few minutes to start up.

When Docker Desktop is installed and running, open the Settings screen by clicking the gear icon in the top-right of the Docker Desktop Window. In the Settings screen under the "General" tab, make sure that "Start Docker Desktop when you log in" is checked. Then go to the "Resources" tab and the "WSL Integration" section and make sure "Enable integration with my default WSL distro" is checked. 

> *Note: WSL2 with Ubuntu must be installed <u>before</u> Docker Desktop. If you notice problems with WSL after installing Docker Desktop, you will need to fully uninstall and reinstall Docker Desktop once the WSL problems have been resolved.*

Once Docker has been fully installed and configured, reopen Windows Powershell as Administrator and run the `wsl -l -v` command again. This time, the output should look like this:

```
  NAME                   STATE           VERSION
* Ubuntu                 Running         2
  docker-desktop-data    Running         2
  docker-desktop         Running         2
```

If you see that output, you have Docker fully installed and are ready to move on!

### Postman

Postman is an API testing tool that we will use to gather information about APIs we want to call with Eradani Connect Outbound integrations as well as to test our own Eradani Connect Inbound APIs.

Postman can be downloaded from [postman.com](https://postman.com).

> *Note: You do not need to create an account to use Postman. When you open it for the first time it will ask you to sign in or create an account. If you would prefer not to create an account, there is a small gray "skip and go to the app" button below the sign in boxes.*

Once Postman is installed, you're ready to keep moving!

### Visual Studio Code

Visual Studio Code (VSCode) is a cutting-edge IDE (Integrated Development Environment) for all programming languages. It includes top-tier support for open source languages like JavaScript, TypeScript, and Python, as well as great support for IBM i languages like RPG, CL, and COBOL.

And the best part is it's completely free.

You can download VSCode from [code.visualstudio.com](https://code.visualstudio.com).

> *Note: Visual Studio Code and Visual Studio are two very different systems. We want to install Visual Studio <u>Code</u>, NOT Visual Studio. You can tell the difference by their logo colors: Visual Studio's logo is purple while Visual Studio Code's logo is blue. We want the blue one.*

Once VSCode is installed, you're done with this step.

### Git Source Control Account

While Git is completely free to use, most companies set up a centralized source code storage system like GitHub, Azure DevOps, Bitbucket, or GitLab, to name a just few of the options.

When working with industry-standard open source technology as part of your Next-Gen Applications, you will also be using the industry-standard source control technology: Git. If your company has a central system, make sure you have an account there to access your source code. If your company does not have a central system already, create an account on [GitHub.com](https://github.com).

If you are using GitHub, send your GitHub username to Eradani to be invited to the team to work on the project. If you have just been invited, you can go to [github.com](http://github.com), click your profile icon, go to Your Organizations, and the invitation to join `eradani-inc` should be there with a Join button.

Once your account is created, you're done with this step!

## Check Prerequisites

Once you have installed all of the prerequisite software on your PC, run through this section to ensure everything is installed properly.

As a refresher, there are 5 requirements that must be met in order to develop Next-Gen Applications:

- The PC must have WSL (Windows Subsystem for Linux) enabled with an Ubuntu distro installed
- Docker Desktop must be installed
- Postman must be installed
- Visual Studio Code (VSCode) must be installed
- You must have an account on github.com or with your company's git source control system (Azure DevOps, Bitbucket, GitLab, etc)

### WSL

Open a Windows Powershell as Administrator and run the command `wsl -l -v` . You should see three entries in the list like this:

```
  NAME                   STATE           VERSION
* Ubuntu                 Running         2
  docker-desktop-data    Running         2
  docker-desktop         Running         2
```

If you don't see output like that, check the install steps for WSL again in the "Installing Prerequisites" section of this guide. If any of the States are "Stopped", that's OK as long as the list contains all of the right entries at version 2.

If you see those three entries, WSL is ready!

### Docker Desktop

Open Docker Desktop and check to make sure the box in the bottom-left turns green. If you hover over it, it should say "ENGINE RUNNING". If you see that, Docker Desktop is good to go!

### Postman

Open Postman and make sure it starts and that you get past the Create Account screen.

### Visual Studio Code

Open VSCode and make sure it opens successfully.

### Git Source Control Account

Sign in to your company's Git source control system (GitHub, Azure DevOps, Bitbucket, GitLab, etc). If you can sign in to a valid account on that system, your account is set up!

## Project Setup

Once all of the prerequisites have been met, we can move on to setting up your specific project on your PC!

Our environment setup process will follow these major steps:

1. Download the Open Source side of your project onto your PC with all of its source code
2. Configure your user profile and project settings on your PC
3. Set up the IBM i portion of your development environment on your IBM i
4. Connect the environment on your PC to the one on your IBM i and test the connection

### Download the Project

Most of the steps in this section will be done within the Ubuntu app on your PC which was installed along with WSL.

Open the Ubuntu app (orange circular icon) and run the command `pwd` by typing `pwd` and pressing `Enter` . This will display your current working directory in your filesystem. It should be `/home/<your-username>`.

If the `pwd` command did NOT show `/home/<your-username>`, then run the command **_cd /home_** to go to your linux home directory in WSL. Then, go to your user's home directory with **_cd <your-user-name>_** You can find your user name by running the command `id -un`

Once you have moved to your user's home directory, create a directory for all eradani projects on this machine with `mkdir eradani` and then move to the new *eradani* directory with `cd eradani`

We will now need to create a Personal Access Token so that your PC can access your project on your behalf. Open your web browser, log into [github.com](http://github.com/), and generate a Personal Access Token. You can do this by going to [github.com](http://github.com/), clicking on your user profile icon in the top-right corner, going to Settings, then Developer Settings, then Personal Access Tokens, and finally clicking *Generate New Token*. Give the token a name like "My PC", set the expiration to "No Expiration", check the box that says "repo", and then generate the token and copy it.

Back in the Ubuntu app, clone the project to your local PC with the command `git clone https://<your-github-username>:<your-personal-access-token>@<your-repository-url>`. For example, if your github username is `eradani`, your personal access token is `abc123`, and your repository URL is `github.com/eradani-inc/test-project`, the command would be `git clone https://eradani:abc123@github.com/eradani-inc/test-project`.

If the access permissions are right and the clone succeeds, the `git clone` command will create a directory with the name of your repository (`test-project` in the above example) with all of your project's source code in it. Move into that directory with the command: `cd <repository-name>`

Once you can move into that directory, your project has been downloaded!

### Configure User Profile and Project Settings

Now that your project source code has been downloaded, the next step is to configure your user profile and project settings.

Git does not allow any developer to modify the source code of your project until that developer has added at least their full name and email address to their Git configuration. That allows Git to track every change to your application, who changed it, when they changed it, and why they changed it.

Configure your git user settings with the following four commands:

```
git config --global user.name "Your Full Name"
git config --global user.email "Your Email"
git config --global core.editor nano
git config --global pull.rebase false
```

Once your Git profile has been configured, copy your git user settings into your project with the command `cp ~/.gitconfig .` 

> *Note the "." at the end of the command with a space between "gitconfig" and "." - it's important!*

Once that command completes successfully, your user profile has been configured, and we can move on to your project settings!

Open Docker Desktop and make sure the Docker daemon is running by hovering over the bar in the bottom-left corner and checking that it is green and opens a popup saying "Engine Running".

In your Ubuntu app, open your project in VSCode with the command `code .`

> *Note the "." at the end of the command with a space between "code" and "."*

Once VSCode opens, it should prompt you with messages in the bottom-right corner so watch closely.

You may first be prompted to install an extension called _Remote - Containers_. If you get that message, install it. If you don't get that message, open the Extensions tab in VSCode (the icon on the left with the 4 squares where one is slightly removed from the other 3) and search for "Remote - Containers" and install the extension.

Then, once that's done, you should be prompted with an option to **_Reopen In Container_**. Click that button. If a minute goes by and you do not get the message with the *Reopen In Container* option, click the green box in the extreme bottom-left corner of VSCode, go to the popup at the top-center of the screen which will open when you click the green box, and select "Reopen In Container".

VSCode should blank out for a second and reload with a message in the bottom-right corner (keep watching there) that shows a message like "Starting Container (Show Log)". Click on "Show Log" and watch as the container builds itself. Keep an eye out for red error messages. The output will be in the terminal at the bottom-half of VSCode.

> *Note: You may also be prompted with a popup to confirm that you trust the directory and its authors. If you see this popup, click the blue button to confirm that you trust the application and its authors.*

When the container has opened for the first time, click the three-dots button at the top-right corner of the Explorer tab (left side) and make sure "NPM Scripts" is checked. If it isn't, click it to enable it. A small tab at the bottom-left of the Explorer tab should appear saying "NPM Scripts". Open that up, find the script that says `generate-config`, and click the Run button next to it to run it. The Run button will appear when you hover over the `generate-config` script. Then find the script that says `package:dev` in the same list and click the play button on that one.

Once those scripts have completed, press the F5 key to start the application. If it starts up, then gives an *Error Connecting to the Database* message and then shuts down, your application is installed and running - we just haven't told it the IP address of your IBM i to connect to yet!

### Set Up IBM i Environment

In order to build a Next-Gen Application, the Open Source application on your PC needs an IBM i side to connect to.

> *Before continuing, first check: Do you have automated (scheduled) jobs on the IBM i that run as your development user profile? If yes, pause here and create a new user profile for your development with Eradani Connect. That way, any settings we change for your development user profile will not affect your automated jobs. We will change some defaults in your development user profile to better facilitate development of Next-Gen Applications.*

In VSCode on the leftmost column of the window, select the "IBM i" tab. If you have not yet connected VSCode to an IBM i, click the blue button that says "Connect to an IBM i" and fill out the form that pops up to configure your session.

Once your session is configured, a small button should appear in the bottom bar of VSCode that says "Terminals". Click that, and then in the menu that opens in the top-center of the VSCode window, select "PASE" to open an SSH session to the Open Source environment on your IBM i.

In your SSH session, make sure your user profile has a home directory with the command  `cd /home/<your-userprofile>` If that command fails, create a home directory for your user profile by running the command `cd /home` and then `mkdir <your-userprofile>`. Be sure to not include the angle brackets (`<` and `>`) around your actual user profile name in the command.

Once your home directory on the IBM i exists, open a terminal session on your PC. You can do this in VSCode by clicking the `+` icon in the top-right corner of the Terminal window (bottom-half of VSCode). The terminal session on your PC should prompt you for commands  with something like this:

```
node ➜ /workspaces/your-project-name (integration) $
```

Once you see that prompt, upload the default `.profile` and `.bashrc` files to your home directory on the IBM i with the command `scp .devcontainer/.profile .devcontainer/.bashrc YOURUSERPROFILE@your.ibmi.ip.address:/home/YOURUSERPROFILE`. For example, if your user profile name on the IBM i is `ERADANI` and the IP address of your IBM i is `10.0.0.1`, the full command would be:

```
scp .devcontainer/.profile .devcontainer/.bashrc ERADANI@10.0.0.1:/home/ERADANI
```

When the upload completes, open a new SSH session to the IBM i by clicking the "Terminals" button in the bottom bar of VSCode and selecting "PASE" again. This will open a new SSH session to your IBM i. You should get an error about unexpected characters - we will resolve that next.

In your SSH session, set your development library by editing the `.profile` file with the command `nano .profile` 

> *Note: The Nano editor does not support mouse movements. You will need to move your cursor with the arrow keys.*

In Nano, change `LIB=YOUR_DEVELOPMENT_LIBRARY` so that it sets the `LIB` variable equal to the library on your IBM i which you would like to use for development. 

> *Note: Each developer must have a separate, personal development library.*

For example, if my development library is `MYLIB`, then the line should read: `LIB=MYLIB` 

Once you have changed the `LIB` setting, save and exit from Nano by first pressing `Ctrl+O`, then `Enter` to save, and finally `Ctrl+X` to exit. Close and reopen your SSH session to make sure everything is set up correctly. When you reopen your SSH session with the "Terminals > PASE" selection again, you should see a prompt that says `eradani-connect [userprofile] >` where `userprofile` is the name of your user profile on the IBM i.

> *Note: You can always tell the difference between an SSH session connected to an IBM i and a terminal session on your PC by looking at the prompt. If you see something like "eradani-connect [userprofile] >", then you are connected to the IBM i and any command you run will be run on the IBM i against the IBM i IFS. If you see a prompt like "node ➜ /workspaces/your-project-name (integration) $ ", then you are in a terminal session on your PC and any command you run will be run on your PC against your PC's filesystem. Always check the prompt before running commands to make sure you are on the right system!*

In your IBM i SSH session, create a directory for your Next Gen application development by running the command `mkdir eradani` Then, switch back to your "Bash" terminal session for a moment.

> *Note: You can see all of your active terminal sessions in the rightmost column of the Terminal section (bottom half) of VSCode. Sessions labeled "bash" are your local PC sessions. Sessions labeled "IBM i PASE" are your IBM i remote SSH sessions.*

In your local Bash terminal, run the command `git remote -v` That command will report back the URL you can use to clone your project onto the IBM i. Copy the URL in the command output. It doesn't matter which URL you copy - both are the same.

Once you have copied your project URL, switch back to your IBM i SSH session by selecting the "IBM i PASE" session in the sessions list on the right side of the Terminal section of VSCode.

In your IBM i SSH session, run the command `git clone <project url>` For example, if your project url is `https://eradani:abc123@github.com/eradani-inc/test-project`, your command here would be `git clone https://eradani:abc123@github.com/eradani-inc/test-project` This will download an exact copy of your project into your IBM i development environment which we will now set up.

First, we will check the version of NPM you have installed with the command `npm -v`.

> *Note: If your NPM version is under version 8, you will need to update NPM to version 8.16. Log into SSH with a user who has \*ALLOBJ authority and run the command: `PATH=/QOpenSys/pkgs/bin:$PATH npm install -g npm@8.16`*

Once you have a compatible version of NPM installed (8.16), in your personal IBM i SSH session run the command `npm install` to install all of the open source packages required for your Next Gen application. This process may take a few minutes - a typical Next Gen application requires over a thousand open source modules to operate! NPM will figure out for us how to safely install all of the required modules at the required versions and end with an automatic vulnerability scan.

After the NPM installation completes, open a 5250 session as the same user you are using for your Next Gen application development. We will now create a channel for your RPG programs to communicate with your Open Source programs. In your 5250 session, first add the `ECNCT` library to your library list with the command `ADDLIBLE ECNCT`. Then run the command `ECCCRTDTAQ` and pres `F4` to prompt the command. In the `Library` field, enter the name of your personal development library. In the `Request Size` and `Response Size` fields, enter `32767` (maximum size). We recommend using the maximum size for development unless you have a strong reason not to.

Once your channel has been created, we will compile the sample Next Gen RPG programs that come with your base project. Back in your IBM i SSH session, run the command `make -C qsys library` and then `make -C qsys`. The first command will set up source files in your development library for RPG development, and the second will copy in your sample RPG code and compile it.

Remember: during this installation we are setting up a Next Gen IBM i application which includes an Open Source program talking to RPG programs over an Eradani Connect channel. You now have the Open Source program, the RPG programs, and the channel all created - the last step is to point them at each other so that they send their messages to the right place.

Back in your VSCode window, open your Explorer tab (the tab at the top-left corner of the VSCode window that looks like two pages. In that window, open the file at `src > config > development.json` This is your local development configuration file. In there, we will change a few configuration values. This is a JSON file, so we will reference fields in JSON format. That means that if we reference a field called "ecclient.appLibrary", you should first look for a field named "ecclient", and then inside of that look for a field called "appLibrary":

- Change the `ecclient.appLibrary` to the name of your personal development library on the IBM i

- Change the `ecclient.requestLen` and `ecclient.responseLen` to `32767` Note that these are the same values that you entered when you ran the `ECCCRTDTAQ` command on your 5250 session earlier. This information will allow the Open Source program to talk to the correct RPG programs.

- Lower down you should see two ODBC connection strings which look like this: `DSN=*LOCAL;NAM=1;CCSID=1208` That connection string is great on an IBM i, but won't work on your local PC. Change both of the connection strings that look like that to this:

  ```
  Driver={IBM i Access ODBC Driver};System=your.ibmi.ip.address;UserID=YOURUSERPROFILE;Password=YOURPASSWORD;NAM=1;CCSID=1208
  ```

  Make sure to set your actual development user profile and password where it says `YOURUSERPROFILE` and `YOURPASSWORD`!

Once you have changed your configuration file, apply your configuration changes by saving the file and then running the config script by clicking the Run button for `config` under NPM SCRIPTS in your Explorer tab.

> *Note: the "config" script is different from the "generate-config" script! We want to run "config", not "generate-config"!*

Once the configuration script completes, start your Open Source application on your PC by pressing `F5`. You should see messages in your terminal at the bottom of VSCode saying "App Startup Complete!" after a few seconds. Once you see that message, test your application's inbound and outbound functionalities with the following two tests:

- Inbound: Open your web browser and navigate to https://localhost:4001/dashboard/docs. In this page, you should be able to open up the api route that says `GET /api/rpg/simple-calc/{num}`. This will display the documentation for one of the sample api endpoints in your application. This particular endpoint calls an RPG program and returns the result. Click the "Try it out" button, then click "Execute". The system should run your api call, execute the RPG program, and return a result. If you get back a result with a status code of `200`, your inbound APIs are working!
- Outbound: Open a 5250 session to your IBM i as your development user profile. In that session, set your library list for Eradani Connect development by adding the `ECNCT` library to your list along with your personal development library (the one that you gave to the `ECCCRTDTAQ` command earlier). Once your library list is set, run the command `dspvhcl` (Display Vehicle) and prompt it with `F4`. This is a sample integration which calls a public api to retrieve the type of fuel used by a vehicle given its VIN and model year. *On your first call, you may want to set the wait time in this command to a higher value than the default (such as 10 or 15) to give the system time to wake up when it processes your first call*. Once the command completes, check the output by running the command `WRKJOB`, then taking option `4` in the resulting menu, and taking option `5` (Display) on the spooled output file from your `DSPVHCL` call. That spooled file should contain a message saying the fuel type of the vehicle whose VIN you entered in the `DSPVHCL` command. If you kept the default VIN, the fuel type should be `Gasoline`.

If both of those tests pass, congratulations! Your Eradani Connect development environment is fully configured and ready to go!
