--- vite.config.js (原始)
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { viteSingleFile } from "vite-plugin-singlefile";

// viteSingleFile: يدمج الجافاسكربت والـ CSS والخطوط داخل index.html واحد
// حتى يعمل البرنامج من أي مسار على GitHub Pages بدون مجلد assets
export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile()],
  server: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
    hmr: {
      port: 3000,
    },
  },
});


+++ vite.config.js (修改后)
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { readFileSync, writeFileSync, readdirSync, rmSync, existsSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

/* ————————————————————————————————————————————————————————
   غلاف التشغيل: ملف HTML واحد "يفك ضغط نفسه"
   البرنامج + الخطوط مخزّنان داخله بصيغة gzip+base64،
   ويفك المتصفح ضغطهما عند الفتح عبر DecompressionStream
   (لا يحتاج أي ملفات خارجية — يعمل من أي مسار)
   ———————————————————————————————————————————————————————— */
const SHELL = `<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="description" content="SmartReport Analytics — منصة تحليل تقارير محلية تعمل بدون إنترنت: ربط ملفات Excel وتنظيف البيانات وداشبورد تفاعلي وملخص تنفيذي." />
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%230B2E31'/%3E%3Cpath d='M8 22V14M14 22V8M20 22v-6M26 22V11' stroke='%23E8A020' stroke-width='3' stroke-linecap='round' transform='translate(-1.5 0)'/%3E%3C/svg%3E" />
<title>SmartReport Analytics — تحليل التقارير الذكية</title>
<style>
html,body{height:100%;margin:0;background:#0b2e31}
#boot{position:fixed;inset:0;z-index:99;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:13px;
background:
 radial-gradient(1000px 520px at 82% -12%, rgba(14,110,102,.5), transparent 62%),
 radial-gradient(760px 420px at 8% 112%, rgba(232,160,32,.16), transparent 58%),
 #0b2e31;
font-family:"Segoe UI",Tahoma,"Helvetica Neue",sans-serif;color:#eaf4f2;text-align:center;padding:20px}
#boot .logo{filter:drop-shadow(0 10px 30px rgba(0,0,0,.35))}
#boot .logo .b{animation:bootpulse 1.6s ease-in-out infinite}
#boot .logo .b2{animation-delay:.15s}#boot .logo .b3{animation-delay:.3s}#boot .logo .b4{animation-delay:.45s}
@keyframes bootpulse{0%,100%{opacity:.5}50%{opacity:1}}
#boot h1{margin:4px 0 0;font-size:21px;letter-spacing:.2px}
#boot .tag{margin:0;font-size:12.5px;color:#9db8b3}
#boot .track{width:220px;height:5px;border-radius:99px;background:rgba(255,255,255,.14);overflow:hidden;margin-top:10px}
#boot .track i{display:block;height:100%;width:38%;border-radius:99px;background:linear-gradient(90deg,#0e6e66,#e8a020);animation:bootmove 1.15s cubic-bezier(.45,.1,.55,.9) infinite}
@keyframes bootmove{0%{transform:translateX(280%)}100%{transform:translateX(-280%)}}
[dir="ltr"] #boot .track i{animation-name:bootmoveL}
@keyframes bootmoveL{0%{transform:translateX(-280%)}100%{transform:translateX(280%)}}
#boot small{font-size:11.5px;color:#8fb0ab}
#boot .err{display:none;max-width:480px;margin-top:8px;background:#fdf3dd;border:1px solid #e8a020;color:#7a5206;border-radius:14px;padding:14px 18px;font-size:13px;line-height:1.9;text-align:right}
[dir="ltr"] #boot .err{text-align:left}
#boot .err b{color:#8a5c07}
#boot .ver{position:absolute;bottom:16px;font-size:10.5px;color:#6f8f8a;letter-spacing:.5px}
</style>
</head>
<body>
<div id="root">
  <div id="boot">
    <svg class="logo" width="64" height="64" viewBox="0 0 40 40" aria-hidden="true">
      <rect width="40" height="40" rx="9" fill="#0E6E66"/>
      <rect x="1.5" y="1.5" width="37" height="37" rx="8" fill="none" stroke="#E8A020" stroke-opacity=".5" stroke-width="1.2"/>
      <g stroke="#F5E9D0" stroke-width="3" stroke-linecap="round">
        <path class="b" d="M11 28v-8"/>
        <path class="b b2" d="M18 28V10" stroke="#E8A020"/>
        <path class="b b3" d="M25 28v-6"/>
        <path class="b b4" d="M32 28V14" stroke="#E8A020"/>
      </g>
      <circle cx="31" cy="9.5" r="2.4" fill="#E8A020"/>
    </svg>
    <h1>SmartReport <span style="color:#e8a020">Analytics</span></h1>
    <p class="tag">تحليل التقارير الذكية — يعمل بالكامل على جهازك بدون إنترنت</p>
    <div class="track"><i></i></div>
    <small id="boot-msg">جارٍ فك ضغط البرنامج وتشغيله…</small>
    <div class="err" id="boot-err">
      <b id="boot-err-msg">تعذّر تشغيل النظام.</b><br/>
      جرّب التحديث (F5) أو الفتح في نافذة تصفح خاصة، أو استخدم متصفحاً حديثاً (Chrome / Edge).<br/>
      إن استمرت المشكلة فالملف منزّل ناقصاً — أعد تنزيله وتأكد أن حجمه مكتمل.
    </div>
    <div class="ver">SmartReport Analytics · single-file offline build</div>
  </div>
</div>
<script>
(function () {
  "use strict";
  var CSS_GZ = "__CSS_B64__";
  var JS_GZ = "__JS_B64__";
  var msg = document.getElementById("boot-msg");
  var errBox = document.getElementById("boot-err");
  var errMsg = document.getElementById("boot-err-msg");
  function fail(text) {
    if (msg) msg.style.display = "none";
    if (errMsg && text) errMsg.textContent = text;
    if (errBox) errBox.style.display = "block";
  }
  function toBytes(b64) {
    var bin = atob(b64);
    var out = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  }
  function gunzip(bytes) {
    var ds = new DecompressionStream("gzip");
    return new Response(new Blob([bytes]).stream().pipeThrough(ds)).text();
  }
  if (typeof DecompressionStream === "undefined") {
    fail("متصفحك لا يدعم فك الضغط (DecompressionStream) — استخدم نسخة حديثة من Chrome أو Edge.");
    return;
  }
  window.addEventListener("error", function (ev) {
    var boot = document.getElementById("boot");
    if (boot && boot.isConnected && ev && ev.message) fail(ev.message);
  });
  gunzip(toBytes(CSS_GZ))
    .then(function (css) {
      var st = document.createElement("style");
      st.textContent = css;
      document.head.appendChild(st);
      if (msg) msg.textContent = "جارٍ تشغيل النظام…";
      return gunzip(toBytes(JS_GZ));
    })
    .then(function (js) {
      var url = URL.createObjectURL(new Blob([js], { type: "text/javascript" }));
      var sc = document.createElement("script");
      sc.type = "module";
      sc.src = url;
      sc.onerror = function () { fail("تعذّر تنفيذ حزمة البرنامج."); };
      document.head.appendChild(sc);
    })
    .catch(function (e) { fail(e && e.message ? "فشل فك الضغط — الملف قد يكون ناقصاً: " + e.message : "فشل فك الضغط — الملف قد يكون ناقصاً."); });
})();
</script>
</body>
</html>
`;

const README_TXT = `SmartReport Analytics — ملف واحد كامل
==============================================

الملف index.html في هذا المجلد هو البرنامج كاملاً
(البرنامج + الخطوط العربية + التنسيقات داخله، ولا يحتاج أي ملفات أخرى).

■ التشغيل المحلي:
  افتح index.html بنقرة مزدوجة في المتصفح (Chrome أو Edge).

■ النشر على GitHub Pages:
  1) ارفع ملف index.html إلى المستودع (واستبدل القديم).
  2) Settings ← Pages: الفرع main والمجلد / (root).
  3) افتح الموقع في نافذة تصفح خاصة (Incognito).

■ إن ظهرت رسالة "الملف قد يكون ناقصاً":
  يعني أن التنزيل انقطع قبل اكتماله — أعد تنزيل الملف
  وتأكد أن حجمه على القرص مطابق للحجم المعلن.
`;

/* يقرأ نواتج البناء، يضغطها gzip، ويحقنها في غلاف HTML واحد */
function selfExtractingSingleFile() {
  return {
    name: "sra-self-extracting-single-file",
    apply: "build",
    enforce: "post",
    closeBundle() {
      const dist = resolve(__dirname, "dist");
      const assetsDir = resolve(dist, "assets");
      if (!existsSync(assetsDir)) return;
      const names = readdirSync(assetsDir);
      const jsName = names.find((f) => f.startsWith("index-") && f.endsWith(".js"));
      const cssName = names.find((f) => f.startsWith("index-") && f.endsWith(".css"));
      if (!jsName) return;
      const jsB64 = gzipSync(readFileSync(resolve(assetsDir, jsName)), { level: 9 }).toString("base64");
      const cssB64 = cssName
        ? gzipSync(readFileSync(resolve(assetsDir, cssName)), { level: 9 }).toString("base64")
        : "";
      const html = SHELL.replace("__CSS_B64__", cssB64).replace("__JS_B64__", jsB64);
      writeFileSync(resolve(dist, "index.html"), html, "utf8");
      rmSync(assetsDir, { recursive: true, force: true });
      writeFileSync(resolve(dist, "اقرأني-التشغيل.txt"), README_TXT, "utf8");
      console.log(
        "[SRA] single-file ready: dist/index.html (" + (html.length / 1024).toFixed(0) + " KB) — js gzip " + (jsB64.length / 1024).toFixed(0) + " KB"
      );
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), selfExtractingSingleFile()],
  server: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
    hmr: {
      port: 3000,
    },
  },
});
