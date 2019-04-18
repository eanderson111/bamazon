var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "bamazondb"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
  //   console.log("connected as id " + connection.threadId);
    runSearch();
  });

function runSearch() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View products for sale",
          "View low inventory",
          "Add new product",
          "Exit"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "View products for sale":
          productsSale();
          break;
  
        case "View low inventory":
          lowInventory();
          break;
  
        case "Add new product":
          addProduct();
          break;
            
        case "exit":
          connection.end();
          break;
        }
      });
  }
  
  function productsSale() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM bamazondb.products", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table(res);
      runSearch();
    });

  }

  function lowInventory() {
    console.log("Selecting all products with low inventory...\n");
    connection.query("SELECT product FROM bamazondb.products WHERE quantity < 10", function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].product);
          }
          runSearch();
    });
  }
  
  function addProduct() {
    inquirer
      .prompt([
        {
          name: "addition",
          type: "input",
          message: "What product would you like to add?",
        },
        {
            name: "category",
            type: "list",
            message: "What category is this product?",
            choices: [
              "accessories",
              "nutrition",
              "cleaning",
              "toys",
            ]
        },
        {
            name: "price",
            type: "input",
            message: "What is the price of this product?",
          },
          {
            name: "quantity",
            type: "input",
            message: "How many products would you like to add?",
          },
      ])
      .then(function(answer) {
        connection.query("INSERT INTO products SET ?", 
        {
            product: answer.addition,
            category: answer.category,
            price: answer.price,
            quantity: answer.quantity
          },
        
        function(err, res) {
            console.log(res.affectedRows + " product inserted!\n");
            // Call updateProduct AFTER the INSERT completes
            runSearch();
        });
      });
  }
