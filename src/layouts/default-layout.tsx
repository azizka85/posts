import { JSX } from "solid-js"

type Props = {
  children?: JSX.Element
}

export default ({children}: Props) => 
  <div>
    {children}
  </div>
