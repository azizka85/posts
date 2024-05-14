import { createSignal } from "solid-js"

export const [drawerClosed, setDrawerClosed] = createSignal(true)

export const [pageLeaving, setPageLeaving] = createSignal(false)
