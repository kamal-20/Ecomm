
# :handbag: A Ecommerce website
## Deploy (https://ecomm-20.herokuapp.com)

## Features

<b>Products Features</b>

| Feature  |  Coded?       | Description  |
|----------|:-------------:|:-------------|
| Add a Product | &#10004; | Ability of Add a Product on the System |
| List Products | &#10004; | Ability of List Products |
| Edit a Product | &#10004; | Ability of Edit a Product |
| Delete a Product | &#10004; | Ability of Delete a Product |
| Wishlist a Product | &#10004; | Ability of Add a Product to YOUr Wishlist |

<b>Purchase Features</b>

| Feature  |  Coded?       | Description  |
|----------|:-------------:|:-------------|
| See Cart | &#10004; | Ability to see the Cart and it items |
| Add Item | &#10004; | Ability of add a new Item on the Cart |
| Remove a Item | &#10004; | Ability of Remove a Item from the Cart |
| Checkout | &#10004; | Ability to Checkout |

# eCommerce

**eCommerce** it's an open source (test scenario) software made to create a easy and simple "Shop" API, where you have two micro services, one the **Products API** that stores and handles everything Related to Stock and Products. And the **Purchase API** where you can create orders (cart's) and checkout items.

The purpose of this repository it's for education and test. But the code it's being coded in a proper way.

## Installation

* **eCommerce** Installing 
* **eCommerce** it's easy, the tutorial above will explain to you.
* **eCommerce** 

You can run **eCommerce** in different ways. You can go to the [Releases Page](releases/) and download the source code of the latest release, or a bundled .war or a standalone java application (.jar).

**It's recommend see the notes on [this](#notes) section.**

### Production

Production Environments are focused in being ready. That means, you just need execute the Jar File.

In the Production Environment all eCommerce API's are configured to work with **MySQL** in two databases; **productsAPI** and **purchaseAPI** and to work with a default **username and password** combination:

**Note.:** Remember importing each SQL files, if using MySQL for Production. You can find them inside `products-api/src/main/sql/` and `purchase-api/src/main/sql/`

* **Username:** 
* **Password:** 
* **Database:** 
* **Port:** 408

You can change those credentials in the `application.yaml` file. In production environments **you need import the database schema** before running the software. Both `products-api` and `purchase-api` DDL files are available on [this](sql/) folder.

### Notes

**Note.:** By default 

**Note.:** 

**Note.:** 

**Note.:** 

## Credits
Ubaid Ahmed &
Kamlender Rathour
