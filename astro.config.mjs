import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import netlify from "@astrojs/netlify";
import auth from "auth-astro";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), auth()],
  output: "server",
  adapter: netlify()
});