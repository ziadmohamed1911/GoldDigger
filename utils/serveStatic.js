import fs from "fs/promises"
import path from "path"
import { sendResponse } from "./sendResponse.js"
import { getContentType } from "./getContentType.js"

export async function serveStatic(req, res, basedir){
    const pulbicDir = path.join(basedir, "public")
    const filePath = path.join(pulbicDir,
         req.url === "/" ? "index.html" : req.url)
    const ext = path.extname(filePath)
    const contentType = getContentType(ext)
    try{
        const content = await fs.readFile(filePath)
        sendResponse(res, 200, contentType, content)
    }catch(err){
        console.error(`Error reading file ${filePath}:`, err)
    }
}