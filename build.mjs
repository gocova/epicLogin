import * as esbuild from "esbuild";
import { solidPlugin } from "esbuild-plugin-solid";
import http from "node:http";

let ctx = await esbuild.context({
  entryPoints: ["./src/ts/main.tsx"],
  bundle: true,
  minify: true,
  sourcemap: true,
  outfile: "./public/js/app.js",
  logLevel: "info",
  plugins: [solidPlugin()],
});

await ctx.watch();

// let { host, port } = await ctx.serve({
//   servedir: "./public",
//   port: 15001,
// });

// http
//   .createServer((clientReq, clientRes) => {
//     const options = {
//       hostname: host,
//       port: port,
//       path: clientReq.url,
//       method: clientReq.method,
//       headers: clientReq.headers,
//     };

//     const proxy = http.request(options, (res) => {
//       if (res.statusCode === 404) {
//         const redirectReq = http.request(
//           { ...options, path: "/" },
//           (proxyRes) => {
//             clientRes.writeHead(proxyRes.statusCode, proxyRes.headers);
//             proxyRes.pipe(clientRes, { end: true });
//           },
//         );

//         redirectReq.end();
//       } else {
//         clientRes.writeHead(res.statusCode, res.headers);
//         res.pipe(clientRes, { end: true });
//       }
//     });

//     clientReq.pipe(proxy, { end: true });
//   })
//   .listen(port - 1, host);
