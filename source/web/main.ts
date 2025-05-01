import "pixi.js/unsafe-eval"
import "./assets/stylesheets/main.css"
import "@/App"
import debug from "@/debug"
import { messageListener } from "@/helpers/event/listener"

messageListener()

setTimeout(() => debug(), 1000)
