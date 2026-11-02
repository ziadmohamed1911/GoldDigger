import path from "node:path"
import { fileURLToPath } from "node:url"
import { serveStatic } from "../utils/serveStatic.js"
import { handlePrice } from "./routeHandlers.js"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.join(__dirname, "..") // project root, where public/ lives

export async function handleRequest(req, res) {
    const { pathname } = new URL(req.url, `http://${req.headers.host}`)

    if (pathname === "/api/handle-price") {
        return handlePrice(req, res)
    }

    await serveStatic(req, res, rootDir)
}