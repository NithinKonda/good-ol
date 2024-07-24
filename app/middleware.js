export { default } from "next-auth/middleware"

export const config = { 
    matcher: [
        // Remove "/play" from here if you want it accessible without authentication
        // "/some-other-protected-route"
    ] 
}