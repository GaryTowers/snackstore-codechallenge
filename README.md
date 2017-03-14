# Code Challenge

## Description

This repo is a coding challenge for a snack store with simple requirements:

1. Adding/Removing products and set their stock quantity.
1. Modify the price of the products.
   1. Save a log of the price updates for a product.
1. Buy a product.
   1. Buying a product should reduce its stock.
   1. Keep a log of all the sales.
1. Obtain a list of all the available products.
   1. The list should be sortable by name (default), and by popularity.
   1. The list should have pagination functionality.
   1. Search through the products by name.
    
and some more requirements for extra credits:

5. Only admins can Add/remove products.
6. Only admins can modify price of the products.
7. Only logged-in users can buy a product.
8. Only logged-in users can *like* a product
9. Everyone (logged in or not logged in) can get a list of all the products.
10. Everyone (logged in or not logged in) can use the search feature.

##### Requirement 2.i IS NOT inside this code

Considering *my best approach* to look up for data model integrity,
 the logging of the updates of the products price was taken to a trigger inside MySql using the following SQL command:
 
```sql
DELIMITER $$
  CREATE TRIGGER after_products_update
  AFTER UPDATE ON products
    FOR EACH ROW
    BEGIN
      IF NEW.price <> OLD.price THEN
        INSERT INTO audit_products
          SELECT NULL, OLD.price, products.id, NOW()
          FROM products WHERE id = OLD.id;
      END IF;
END;$$
DELIMITER ;
```
**_Why?_**

Data may change from any other different way than our application's API.
To preserve integrity, it is best to keep historical data storing as close as possible to the data itself being stored, 
thus I considered a trigger as the best approach _(IMHO)_.

## Install instructions
##### Install dependencies
  
Depending on which database engine you may wish to use to test this repository with, 
you'll need to proceed with its respective npm module installation.
In my case, I used MySql which was installed with the following command:

```
$npm install mysql --save 
```
  
##### Configure your database

Open the env file and update it with your database credentials.

##### Run the migrations

Open up a terminal and run the following command:

```
$./ace migration:run
```

This will execute all the migrations inside database/migrations directory to create the tables needed for the project to work.
  
##### Start local server

```bash
$npm run start
```
 
##### or development server with hot reload
 
```bash
$npm run serve:dev
```
  
## Are we there yet?
  
Use my collection of postman requests to test the API!

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/145a470a255fede5c8e1)
