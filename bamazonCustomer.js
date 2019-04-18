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
  readDatabase();
});

function readDatabase() {
  connection.query("SELECT * FROM bamazondb.products", function(err, res) {
    if (err) throw err;

    // Log all results of the SELECT statement
    console.log("\n=============Welcome to Bamazon!!=============\n=====A shopping destination for all your pet needs======\n================== U・ᴥ・U ==================\n")
    console.log("Take a look at some special items on sale:")
    console.table(res);
    itemSelection();
  });
}

var quantity;

// function to handle posting new items up for auction
function itemSelection() {
  // prompt for info about the item being put up for auction
  inquirer
    .prompt([
      {
        name: "id",
        type: "input",
        message: "What is the ID of the item you would like to buy?"
      },
      {
        name: "quantity",
        type: "input",
        message: "How many units would you like to buy?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      connection.query(
        "SELECT * FROM products WHERE id=" + answer.id,
        function(err, results) {
            console.table(results);
            quantity = parseInt(answer.quantity);
          if (quantity > results[0].quantity) {
            console.log("Insufficient Quantity");
          } else {
            var total = results[0].price * quantity;
            console.log("We have that in stock! The total is " + total);
            var remainQuantity =  results[0].quantity - quantity;
            updateProducts(remainQuantity, answer)
          }
        })
    });

function updateProducts(remainQuantity, answer) {
    
    connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                quantity: remainQuantity
              },
              {
                id: answer.id
              }
            ],
    );
    }
}
