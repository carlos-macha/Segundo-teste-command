import dotenv from "dotenv"
dotenv.config()
import app from "./index"

console.log("NODE_ENV:", process.env.NODE_ENV)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})