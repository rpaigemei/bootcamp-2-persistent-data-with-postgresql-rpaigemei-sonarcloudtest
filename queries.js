import { Sequelize, Model, DataTypes,  QueryTypes, sql } from '@sequelize/core';


  //imports dontenv module and allows us to access stored environment variables stored in .env file
  import 'dotenv/config';

  import { Listing } from './ListingModel.js';

/* Connect to your database */
//ADD CODE HERE to connect to you database - same code you put for JSONtoPostgreSQL.js and ListingModel.js
  const sequelize = new Sequelize(process.env.API_URL);

/*
  There are many ways to make aynchronous calls in Javascript: Promises, callbacks, Asyc/Await - https://www.geeksforgeeks.org/difference-between-promise-and-async-await-in-node-js/
  Best Practice: A current practice is to use Async Await.  
  Async / Await - https://www.theodinproject.com/lessons/node-path-javascript-async-and-await and https://javascript.info/async-await
  When creating functions in Javascript there are two notations for functions: regular notation and arrow notation. 
    Syntax & Examples - Async / Await - regular function notation function functionName() -  https://www.w3schools.com/js/js_async.asp
    Syntax & Examples - Async / Await - arrow notation ()=> https://www.geeksforgeeks.org/async-await-function-in-javascript/
  Best Practice: When making asynchronous calls, you need to handle errors.
    Try-Catch - Wrap your code in Try and Catch errors - try {code} catch (error){handle error} - https://www.w3schools.com/js/js_errors.asp#:~:text=The%20try%20statement%20defines%20a,statement%20defines%20a%20custom%20error.
    Throw Errors -  if (err) throw err;  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw
*/

// For this starter code I will use async-await and regular async functional notation. Feel free to ues the syntax that works best for you. 
try {
 /*
  Testing the Connection
  See details in the Sequelize Docs - https://sequelize.org/docs/v6/getting-started/#testing-the-connection
*/
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } 
  
  /*
    In this file - queries.js - You will define several queries that retreive, remove, add, and update listing entries in the database. 
    One of the reasons we are using sequelize is that it make it easy to query the database without writing explicit SQL queries in our code. 
    Learn more about the finder methods available to sequelize models - https://sequelize.org/docs/v6/core-concepts/model-querying-finders/

    While sequelize will allow us to write raw queries, this is not recommended and precautions need to be made connecting with your database.  
      - Writing raw sql queries - https://sequelize.org/docs/v6/core-concepts/raw-queries/ - 
      - Identifying and Mitigating SQL-Injection Vulnerabilities - https://appsbd.com/sql-injection-attack-fixing-orm-is-not-enough/
    
    Security Best Practice: It is not recommended for developers to writing explicit SQL queries in code. This leaves us vulnerable for SQL injection and other software vulnerabilities. 
    Seurity Best Practices: Use a tool to monitor vulnerabilities and to scan your code for vulnerabilities.
      - Example - SQL Injection affecting Sequelize - https://security.snyk.io/vuln/SNYK-JS-SEQUELIZE-2932027
      - Checkout the CVE and GitHub refs to see examples - https://www.cve.org/CVERecord?id=CVE-2023-25813
      - Click on some of the Github examples and look at the workarounds and check that you are running the latest version of the Sequelize where patches have been issued.
  */
   
   
    /* 
      Retrieve all listings in the database, and log them to the console. 
      Learn more about the finder methods available to sequelize models - https://sequelize.org/docs/v6/core-concepts/model-querying-finders/
    */
      async function retrieveAllListings() {
          // ADD CODE HERE
          console.log('Retrieving all listings');

          const listing = await Listing.findAll();
          console.log(JSON.stringify(listing, null, 2));
      }

    /* 
      Find the document that contains data corresponding to Library West, then log it to the console. 
      Learn more about the finder methods available to sequelize models - https://sequelize.org/docs/v6/core-concepts/model-querying-finders/
    */
      async function findLibraryWest() {
        //ADD CODE HERE
        console.log('Finding Library West');

        const listing = await Listing.findOne({where: {name: 'Library West'}});
        console.log(JSON.stringify(listing));
        
      }

    /*
      Find the document with the code 'CABL' and remove this listing.
      This cooresponds with courses that can only be viewed on cable TV.
      Since we live in the 21st century and most courses are now web based,
      go ahead and remove this listing from your database and log the document to the console. 
      Learn more about the finder methods available to sequelize models - https://sequelize.org/docs/v6/core-concepts/model-querying-finders/
    */
      async function removeCable() {
         //ADD CODE HERE
        console.log('Removing Cable BLDG');

        const listing = await Listing.findOne({where: {code: 'CABL'}});
        await Listing.destroy({where: {code: 'CABL'}});
        console.log(JSON.stringify(listing));
      }

    /*
      Create a listing for the new Data Science and IT (DSIT) Building. Add the code and name to the database.
      Learn more about the finder methods available to sequelize models - https://sequelize.org/docs/v6/core-concepts/model-querying-finders/
    */
      async function addDSIT() {
        //ADD CODE HERE
        console.log('Adding the new DSIT BLDG that will be across from Reitz union. Bye Bye CSE, Hub, and French Fries.');

        await Listing.create({code: 'DSIT', name: 'Data Science and IT Building'});
      }
   

    /*
      The Phelps Lab address is incorrect.
      Find the listing, update it with the correct address (Google address), and then log the updated listing in the database and use console.log to inspect it.
      Learn more about the finder methods available to sequelize models - https://sequelize.org/docs/v6/core-concepts/model-querying-finders/ 
    */
      async function updatePhelpsLab() {
        //ADD CODE HERE
        console.log('UpdatingPhelpsLab.');

        const listing = await Listing.findOne({where: {name: 'Phelps Laboratory'}});
        listing.address = '1953 Museum Rd, Gainesville, FL 32603';
        await listing.save();

        console.log(JSON.stringify(listing));
      }

    
   console.log('Use these calls to test that your functions work. Use console.log statements in each so you can look at the terminal window to see what is executing. Also check the database.')
   
   //Calling all the functions to test them
   await retrieveAllListings() 
   await removeCable(); 
   await addDSIT();
   await updatePhelpsLab();
   await findLibraryWest();
       
  


