import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Suspense, lazy } from "react"

const Home = lazy(() => import("../paginas/home/Home"))

export default function RoutesApp() {
    return (
        <BrowserRouter>
            <Suspense>
                <Routes>
                    <Route path="/" element={<Home/>} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}