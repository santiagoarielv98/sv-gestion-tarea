import { RouterProvider } from "react-router-dom"

import { routes } from "./routes"
import useLoadData from "./hook/useLoadData"

function App() {
  useLoadData()
  return <RouterProvider router={routes} />
}

export default App
