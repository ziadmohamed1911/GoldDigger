import http from "http"
import { serveStatic } from "./utils/ServeStatic.js"

const PORT = 8000
const __dirname = import.meta.dirname


const server = http.createServer((req,res)=>{
    serveStatic(req, res, __dirname)
})

server.listen(PORT, () => console.log(`Server running at port: ${PORT}`))