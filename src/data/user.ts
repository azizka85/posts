import { createSignal } from "solid-js"

import User from "../models/data/user"

export const [user, setUser] = createSignal<User | undefined>(undefined)
