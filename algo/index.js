const app = require('./app') // the actual Express application

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server running on port 8080`)
})