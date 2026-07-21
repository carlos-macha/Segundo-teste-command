import cors from "cors"
import express from "express"
import grupoRouter from "./routes/rotaDeGrupo"
import produtoRouter from "./routes/rotaDeProdutos"
import errorHandler from "./middlewares/errorHandler"
import relatorioRouter from "./routes/rotaDeRelatorio"

const app = express()

app.use(express.json())

app.use(cors())

app.use(grupoRouter)
app.use(produtoRouter)
app.use(relatorioRouter)

app.use(errorHandler)

export default app