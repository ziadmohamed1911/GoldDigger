import fs from "fs/promises"
import path from "path"
import { sendResponse } from "./sendResponse.js"
import { getContentType } from "./getContentType.js"

export async function serveStatic(req, res, basedir){
    const pulbicDir = path.join(basedir, "public")
    const filePath = path.join(pulbicDir, req.url === "/" ? "index.html" : req.url)
    const ext = path.extname(filePath)
    const contentType = getContentType(ext)
    if(!filePath.startsWith(pulbicDir)){
        return sendResponse(res, 401, "text/html", "<h1>Forbidden</h1")
    }
    try{
        const content = await fs.readFile(filePath)
        sendResponse(res, 200, contentType, content)
    }catch(err){    
       if(err.code === "ENOENT"){
        const content = await fs.readFile(path.join(pulbicDir, "404.html"))
        sendResponse(res, 404, "text/html", content)
       }else{
        sendResponse(res, 500, "text/html", `<html><h1>Server Error: ${err}</h1></html`)
       }
    }
}