import React from "react"
import { Route, Routes } from 'react-router-dom'

import App from "../App"

export const IndexRouter: React.FC = () => (
    <Routes>
        <Route path="/" element={<App />} />
    </Routes>
)