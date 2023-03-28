const express = require("express")
const session = require('express-session')
const passport = require('passport')

const app = express()
app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())


const path = require("path")
const hbs = require("hbs")
const collection = require("./mongodb")




require("./auth")

const templatePath = path.join(__dirname, "../templates")


function isLoggedIn(req, res, next) {
	// console.log(req.user)
  req.user ? next() : res.sendStatus(401);
}


app.use(express.json())

app.set("view engine", "hbs")
app.set("views", templatePath)

app.use(express.urlencoded({
	extended: false
}))

app.get("/", (req, res) => {
	res.render("login")
})

app.get("/login", (req, res) => {
	res.render("login")
})

app.get("/home", isLoggedIn, (req, res) => {
	
	// res.send(`Hi ${req.user.displayName}`)
	res.render("Home")

})

app.get("/signup", (req, res) => {
	res.render("signup")
})

// app.get("/logout", (req, res) => {
// 	res.render("login")
// })

app.get('/auth/google',
  passport.authenticate('google', { scope: [ 'email', 'profile' ] }
));


app.get( '/google/callback',
  passport.authenticate( 'google', {
    successRedirect: '/home',
    failureRedirect: '/auth/google/failure'
  })
);

app.get('/auth/google/failure', (req, res) => {
  res.send('Failed to authenticate with Google..');
});


app.post('/signup', async (req, res) => {
    
    // const data = new LogInCollection({
    //     name: req.body.name,
    //     password: req.body.password
    // })
    // await data.save()

    const data = {
        name: req.body.name,
        password: req.body.password
    }

    const checking = await collection.findOne({ 
    	name: req.body.name 
    })

   try{
	    // if (checking.name === req.body.name && checking.password===req.body.password) {
	    //     res.send("user details already exists")
	    // }
	    // else{
	    //     await collection.insertMany([data])
	    // }


   		await collection.insertMany([data])

   }
   catch(e){
    res.send(e)
   }

    res.status(201).render("login", {
        naming: req.body.name
    })
})






app.post("/login",async (req, res) => {
	try{
		//console.log(req)
		// const data = {
		// 	name: req.body.name,
		// 	password: req.body.password
		// }

		// const data = {
		// 	name: 'name',
		// 	password: 'pass'
		// }

		//console.log(data)


		const check = await collection.findOne({ 
			name: req.body.name 
		})

		if (check.password === req.body.password) {

			//res.session.loggedin = true
            res.status(201).render("home", { 
            	naming: `${req.body.password}+${req.body.name}` 
            })
        }

        else {
            res.send("incorrect password")
        }

		// await collection.insertMany([data])
	}
	catch(e){
		res.send("wrong details")
		console.log(e);
	}

	// res.render("home")

})




// app.get('/logout',  function (req, res, next)  {
    
//     // If the user is loggedin
//     if (req.session.loggedin) {
//           req.session.loggedin = false;
//           res.redirect('/');
//     }else{
//         // Not logged in
//         res.redirect('/');
//     }
// })








app.listen(3000, () => {

	console.log('Hello, connection successfull')
})