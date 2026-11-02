import http from "http"
import { serveStatic } from "./utils/serveStatic.js"
import { handlePrice } from "./handlers/routeHandlers.js"

const PORT = 8000
const __dirname = import.meta.dirname

const server = http.createServer(async (req,res)=>{
    if(req.url.startsWith("/api/handle-price")){
        await handlePrice(req, res)
        if(req.url === "/api/handle-price"){
            await handlePrice(req, res)
        }    

    }else if(req.url.startsWith("/")){
        await serveStatic(req, res, __dirname)
    }
})

server.listen(PORT, ()=> console.log(`server running on port: ${PORT}`))
