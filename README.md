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
TBD
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
TBD
- Ubuntu:
1. Download ChromeDriver: chromedriver_linux64.zip
[ChromeWebDriver v2.39.* link](https://chromedriver.storage.googleapis.com/index.html?path=2.39/) or in terminal: 
```
wget -N http://chromedriver.storage.googleapis.com/2.39/chromedriver_linux64.zip -P ~/
```
2. Unzip chromedriver_linux64.zip. In terminal: 
```
unzip ~/chromedriver_linux64.zip -d ~/ rm ~/chromedriver_linux64.zip
```
3. Move Chromedriver to /usr/local/bin/chromedriver In terminal: 
```
sudo mv -f ~/chromedriver /usr/local/bin/chromedriver
```
4. Add privilages 
```
sudo chown root:root /usr/local/bin/chromedriver
sudo chmod 0755 /usr/local/bin/chromedriver
```

4. Download project dependencies.
```
npm install
```

## Project structure description.
**
