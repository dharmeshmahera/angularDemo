 # practical Test
  - Home page layout with header and footer (https://bootstrapmade.com/demo/Mamba/)
- contact us page with a map(base on company address)
- Faq's pages
- Sing up(name,email,password,image,birthday,roles dropdwon(admin,user,sub-admin))
- user login
- display social icon on header and footer
- LogOut

sub-admin
=======
- manage a pages (create, update,list)
- Social icon Setting
- Manage Faq's
- Manage company Address, email, phone number
- Manage site Logo
- Dashboard (total user, total pages, total faq's)

Admin
- login
- Dashboard (total user, total pages, total faq's)
- List of users (Data-table with filter and sorting(Material))
- Manage users( add,update,change password)
- Layout (header,sidebar,content,footer) -> https://startbootstrap.com/templates/sb-admin/
- update admin details and password
- Logout
- manage a pages (create, update,list)
- Social icon Setting
- Manage Faq's
- Manage company Address, email, phone number
- Manage site Logo

 # tables data
   clientside\src\assets\SQL Script/'all table data are here import this file in mysql db'
 # Sql script
  CREATE TABLE `company` (
  `idcompany` int NOT NULL AUTO_INCREMENT,
  `address` varchar(450) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `logo` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`idcompany`),
  UNIQUE KEY `idcompany_UNIQUE` (`idcompany`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


 CREATE TABLE `customers` (
 `id` int NOT NULL AUTO_INCREMENT,
  `role` varchar(100) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` bigint DEFAULT NULL,
  `address` varchar(250) DEFAULT NULL,
  `password` varchar(1000) NOT NULL,
  `profile_pic` varchar(2000) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=259 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `faq` (
  `faqid` int NOT NULL AUTO_INCREMENT,
  `question` text,
  `answer` text,
  PRIMARY KEY (`faqid`),
  UNIQUE KEY `faqid_UNIQUE` (`faqid`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=armscii8;



CREATE TABLE `icon` (
  `iconid` int NOT NULL AUTO_INCREMENT,
  `icon` varchar(2000) DEFAULT NULL,
  `link` text,
  PRIMARY KEY (`iconid`),
  UNIQUE KEY `iconid_UNIQUE` (`iconid`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `pages` (
  `pageid` int NOT NULL AUTO_INCREMENT,
  `title` varchar(1000) DEFAULT NULL,
  `content` text,
  PRIMARY KEY (`pageid`),
  UNIQUE KEY `pageid_UNIQUE` (`pageid`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

(or)
--clientside\src\assets\SQL Script\sql script.sql


## solution ##
 # Admin Login Credential
    Email:marut@gmail.com
    Pass:marut@123
  # SubAdmin Login Credential
  Email:nikhil@gmail.com 
  Pass:nikhil@123 

  # Admin
    -login
      1.click on home page login
      2.after give credential of admin
    - Dashboard (total user, total pages, total faq's)
        Admin Page
    - List of users (Data-table with filter and sorting(Material))
        Adminpage-->user Information card (or) sidebar-->manage users       
    - Manage users( add,update,change password)
        sidebar-->manageusers-->table users
    -Layout (header,sidebar,content,footer) -> https://startbootstrap.com/templates/sb-admin/ 
        Adminpage
    -update admin details and password
        AdminPage-->more-vert(three dot)-->Edit Profile  
    -Logout
      Adminpage-->more-vert(three dot)-->logout 
    (- manage a pages (create, update,list)
    - Social icon Setting
    - Manage Faq's
    - Manage company Address, email, phone number
    - Manage site Logo )
        adminpage-->setting (or)adminpage-->slidebar-->setting

  # sub Admin
  (
    - manage a pages (create, update,list)
    - Social icon Setting
    - Manage Faq's
    - Manage company Address, email, phone number
    - Manage site Logo
  )     ==>   subadminpage-->setting (or) subadminpage-->slidebar-->setting

  - Dashboard (total user, total pages, total faq's)
    Sub-Admin Page
# - Home page layout with header and footer (https://bootstrapmade.com/demo/Mamba/)
    localhost:4200
# - contact us page with a map(base on company address)
    home-->contact us
# - Faq's pages
    home-->FAQ 
# - Sing up(name,email,password,image,birthday,roles dropdwon(admin,user,sub-admin)    
    home-->signup   

# - user login
    home-->login credential=>email:pratik@gmail.com,pass:pratik@123
 # - display social icon on header and footer
      header bar and footer bar

 # - LogOut
    home-->login-->logout              

# SimpleAngular6App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).






