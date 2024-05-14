import { JSX } from "solid-js"

import DefaultLayout from "./default-layout"

import AppBar from "../components/app-bar"
import Drawer from "../components/drawer"

type Props = {
  children?: JSX.Element
}

export default ({children}: Props) => {  
  return (
    <DefaultLayout>
      <AppBar />
      <Drawer />
      <main class="main-content app-bar-fixed-adjust">
        {children}
      </main>
    </DefaultLayout>
  )
}  
