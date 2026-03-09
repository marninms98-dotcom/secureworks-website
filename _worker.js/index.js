globalThis.process ??= {}; globalThis.process.env ??= {};
import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_2b56boU3.mjs';
import { manifest } from './manifest_C4r4R5SC.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/about.astro.mjs');
const _page1 = () => import('./pages/contact.astro.mjs');
const _page2 = () => import('./pages/decking-perth/composite.astro.mjs');
const _page3 = () => import('./pages/decking-perth.astro.mjs');
const _page4 = () => import('./pages/fencing-perth/colorbond.astro.mjs');
const _page5 = () => import('./pages/fencing-perth.astro.mjs');
const _page6 = () => import('./pages/patios-perth/insulated.astro.mjs');
const _page7 = () => import('./pages/patios-perth.astro.mjs');
const _page8 = () => import('./pages/projects.astro.mjs');
const _page9 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["src/pages/about.astro", _page0],
    ["src/pages/contact.astro", _page1],
    ["src/pages/decking-perth/composite.astro", _page2],
    ["src/pages/decking-perth/index.astro", _page3],
    ["src/pages/fencing-perth/colorbond.astro", _page4],
    ["src/pages/fencing-perth/index.astro", _page5],
    ["src/pages/patios-perth/insulated.astro", _page6],
    ["src/pages/patios-perth/index.astro", _page7],
    ["src/pages/projects.astro", _page8],
    ["src/pages/index.astro", _page9]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = undefined;
const _exports = createExports(_manifest);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
