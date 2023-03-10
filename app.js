const express = require("express")
const bodyParser = require("body-parser")
const date = require(__dirname + "/date.js")

const app = express()
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

const items = ["Buy food", "Cook Food", "Eat food"]
const workItems = []

app.get("/", function(req, res) {
    
    const day = date.getDate() //we created "date" which is a module that we created and exported, but imported into this file

    //ejs looks within a folder called views (which we made) and looks for the file with the corresponding name (list.ejs, dont have to write .ejs with the render method) and then sends the object over to change the letiables that we named in the "lists" file (letiable name is kindOfDay)
    res.render("list", {
        listTitle: day,
        newListItems: items
    })
     
})

app.post("/", function(req,res) {
    const item = req.body.newItem

    if (req.body.list === "Work"){
        workItems.push(item)
        res.redirect("/work")
    }else{
        items.push(item)
        res.redirect("/")
    }
})

app.get("/work", (req,res) => {
    res.render("list", {
        listTitle: "Work List",
        newListItems: workItems
    })
})

app.post("/work", (req,res) => {
    const item = req.body.newItem
    workItems.push(item)
    res.redirect("/work")
})

app.get("/about", (req,res) => {
    res.render("about")
})

app.listen(3000, function() {
    console.log("Server started on port 3000")
})