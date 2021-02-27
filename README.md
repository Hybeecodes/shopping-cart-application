# Shopping Cart Application - Paystack Assessment Test

## Requirements

For development, you will only need Node.js, a node global package, npm, MySQL and Redis installed in your development environment.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
  Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Node installation on macOS

  You can install nodejs and npm easily with brew install, just run the following commands.

      $ brew install node

### MySQL
- ### Installation
  
  Visit [MySQL official documentation](https://dev.mysql.com/doc/mysql-installer/en/) for installation guide.

### Redis
- ### Installation

  Visit [Redis official website](https://redis.io/) for installation guide.
---

## Clone

    $ git clone https://github.com/Hybeecodes/shopping-cart-application.git
    $ cd shopping-cart-application

## Configure app
- Create a ```.env``` file
- Copy the contents of ```.env.sample``` into the ```.env``` file
- You can replace the database credentials if necessary
- Also, you should set the mail credentials in the ```.env``` file (test will fail if this is not done)
- Create the database on your local MySQL instance
- Run the ````setup.sh```` file in the project root. \
If you got a permission error, please run ```chmod +x setup.sh``` to change permission, then try again.\
The ```setup.sh``` file does the following: 

   - Installs project Dependencies
  - Runs the Project Build
  - Runs the Database Migration
  - Seeds Demo Data into the database


## Assumption
- Only the Cart Module is to be implemented


## Run app

- Run ```npm start``` to start the app (app runs on PORT 8081 by default).
- Run ```npm test``` to run test.
- [Published Postman Collection URL](https://documenter.getpostman.com/view/2687229/TWDcEEZj)

## Design & Implementation Decisions
- Cart data was stored in redis for faster access and better performance. 
-

## Feedback on Assessment
The Assessment was a very good one. 
