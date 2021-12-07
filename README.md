# Assignment_5_Frontend

This is a single page application made using react.js. It is a wenpage that showcases the microservice application created for assignment 5. 

There are 5 endpoints in this app that displays results from server accordingly

The 5 endpoints are:
1. [http://localhost:3000/](http://localhost:3000/) => Displays Home page.
2. [http://localhost:3000/customers](http://localhost:3000/customers) => Displays List of all customers and their details present in the database.
3. [http://localhost:3000/customers/<customer_id>](http://localhost:3000/customers/<customer_id>) => Displays Customer details whose ID is passed if present in the db.
4. [http://localhost:3000/customers/<customer_id>/orders](http://localhost:3000/customers/<customer_id>/orders) => Displays list of all orders of that customer.
5. [http://localhost:3000/customers/<customer_id>/orders/<order_id>](http://localhost:3000/customers/<customer_id>/orders/<order_id>) => Display selected order details.

## Available Scripts

In the project directory, you can run:

## `npm install`

Install all the packages and dependency required to run the react app on your local machine.
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
