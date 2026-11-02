import http from "node:http"
import { handleRequest } from "../handlers/requestHandler.js"

const PORT = 8000

http.createServer(handleRequest).listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})