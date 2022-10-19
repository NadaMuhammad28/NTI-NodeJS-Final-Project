const app = require("./src/src")
app.all("*",(req,res)=>{
    res.status(500).send({apiStatus:false, data:{}, message:"invalid url"})
})
const PORT = process.env.PORT
app.listen(PORT, ()=>{
     console.log(`http://localhost:${PORT}`)
    })