  # Code Challenge

  ## Description

This repo is a coding challenge for a snack store with simple requirements:

1. Adding/Removing products and set their stock quantity.
2. Modify the price of the products
    1. Save a log of the price updates for a product.
3. Buy a product
    1. Buying a product should reduce its stock.
    2. Keep a log of all the sells.
4. Obtain a list of all the available products.
    1. The list should be sortable by name (default), and by popularity
    2. The list should have pagination functionality
    3. Search through the products by name.

  ## Install instructions

  ##### Configure your database

Open the env file and update with your access to your database.

  ##### Run the migrations

Open up a terminal and run the following command

```
$./ace migration:run
```

This will execute all the migrations inside database/migrations directory
  
  ##### Start local server

 ```bash
 $ npm run start
 ```
 
