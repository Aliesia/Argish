# Online shop testing suite.Example.
## About testing tools.
## Project requirements.
## Installation guide.
1. Clone repository to a local folder.
In console(terminal):
```
git clone https://github.com/Aliesia/onlineshop-autotests-example.git 
```
2. Install NodeJs.
- Windows:
* Download the Windows installer from Nodejs.org.(find LTS Windows Installer (.msi) for 64-bit)
* Run the installer (the .msi file you downloaded in the previous step.
* Follow the prompts in the installer (Accept the license agreement, click the NEXT button a bunch of times and accept the default installation settings).
* check the NodeJs was installed(In terminal):
```
node -v
```
- Ubuntu:
In terminal 
* download lts(long-time service) version:
``` 
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
```
* download latest version:
```
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
```
* than check the NodeJs was installed:
```
node -v
```
3. Download Chrome WebDriver.
This project uses ChromeDriver v2.39.*
- Windows:
* Install via npm (Or grab the source and node ./install.js)
```
npm install chromedriver
```
* or Download ChromeDriver v2.43.*: chromedriver_win32.zip 
[Chromedriver v.2.43.* link](https://chromedriver.storage.googleapis.com/index.html?path=2.43/)
+ Unzip chromedriver_win32.zip
+ Move Chromedriver to folder Windows
- Ubuntu:
+ Download ChromeDriver: chromedriver_linux64.zip
[ChromeWebDriver v2.39.* link](https://chromedriver.storage.googleapis.com/index.html?path=2.39/) or in terminal: 
```
wget -N http://chromedriver.storage.googleapis.com/2.39/chromedriver_linux64.zip -P ~/
```
+ Unzip chromedriver_linux64.zip. In terminal: 
```
unzip ~/chromedriver_linux64.zip -d ~/ rm ~/chromedriver_linux64.zip
```
+ Move Chromedriver to /usr/local/bin/chromedriver In terminal: 
```
sudo mv -f ~/chromedriver /usr/local/bin/chromedriver
```
+ Add privilages 
```
sudo chown root:root /usr/local/bin/chromedriver
sudo chmod 0755 /usr/local/bin/chromedriver
```
4. Download project dependencies in folder with the project (In terminal).
```
npm install
```
5. Start project tests.
run command
```
npm test oop_clean_site_test/controllers/AllTestsContoller.js
```
or
```
node node_modules/mocha/bin/mocha oop_clean_site_test/controllers/AllTestsContoller.js
```
## Project structure description.
**
