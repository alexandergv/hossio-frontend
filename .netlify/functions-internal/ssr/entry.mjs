import { renderers } from './renderers.mjs';
import { manifest } from './manifest_BVPVj6kb.mjs';
import * as serverEntrypointModule from '@astrojs/netlify/ssr-function.js';
import { onRequest } from './_noop-middleware.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/auth/_---auth_.astro.mjs');
const _page2 = () => import('./pages/login.astro.mjs');
const _page3 = () => import('./pages/loginowners.astro.mjs');
const _page4 = () => import('./pages/owners.astro.mjs');
const _page5 = () => import('./pages/places/_placeid_.astro.mjs');
const _page6 = () => import('./pages/searchresults.astro.mjs');
const _page7 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["node_modules/auth-astro/src/api/[...auth].ts", _page1],
    ["src/pages/login.astro", _page2],
    ["src/pages/loginOwners.astro", _page3],
    ["src/pages/owners.astro", _page4],
    ["src/pages/places/[placeId].astro", _page5],
    ["src/pages/SearchResults.astro", _page6],
    ["src/pages/index.astro", _page7]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    renderers,
    middleware: onRequest
});
const _args = {
    "middlewareSecret": "16d9e262-3f2c-4ce0-92d9-971b21e2ffbb"
};
const _exports = serverEntrypointModule.createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
