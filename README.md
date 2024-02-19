# Reebelo Case Study

This app consists of three small services:

* marketplace-api: GraphQL server containing product pricing and availabilty
* order-api: GraphQL service for creating and updating orders
* web: React front-end for browsing product catalog and creating orders

To run all three servcies in developer mode, from project root:

# yarn install
# yarn start

This will spin up all three services, and allow you browse to the front-end 
dev server at http://localhost:4000/.

The backend services rely on AWS Secret Manager and Parameter Store for some runtime
values. See me for credentials.

