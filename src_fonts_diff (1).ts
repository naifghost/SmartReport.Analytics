--- src/fonts.ts (原始)
/* ————————————————————————————————————————————
   خطوط عربية مدمجة داخل حزمة البرنامج (base64)
   لا يوجد أي طلب خارجي — يعمل بدون إنترنت تماماً
   ———————————————————————————————————————————— */
import alexAr500 from "@fontsource/alexandria/files/alexandria-arabic-500-normal.woff2?inline";
import alexAr600 from "@fontsource/alexandria/files/alexandria-arabic-600-normal.woff2?inline";
import alexAr700 from "@fontsource/alexandria/files/alexandria-arabic-700-normal.woff2?inline";
import alexAr800 from "@fontsource/alexandria/files/alexandria-arabic-800-normal.woff2?inline";
import alexLa500 from "@fontsource/alexandria/files/alexandria-latin-500-normal.woff2?inline";
import alexLa600 from "@fontsource/alexandria/files/alexandria-latin-600-normal.woff2?inline";
import alexLa700 from "@fontsource/alexandria/files/alexandria-latin-700-normal.woff2?inline";
import alexLa800 from "@fontsource/alexandria/files/alexandria-latin-800-normal.woff2?inline";

import plexAr400 from "@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-400-normal.woff2?inline";
import plexAr500 from "@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-500-normal.woff2?inline";
import plexAr600 from "@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-600-normal.woff2?inline";
import plexAr700 from "@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-700-normal.woff2?inline";
import plexLa400 from "@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-latin-400-normal.woff2?inline";
import plexLa500 from "@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-latin-500-normal.woff2?inline";
import plexLa600 from "@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-latin-600-normal.woff2?inline";
import plexLa700 from "@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-latin-700-normal.woff2?inline";

const ARABIC =
  "U+0600-06FF, U+0750-077F, U+08A0-08FF, U+FB50-FDFF, U+FE70-FEFF, U+200C-200E, U+2010-2011, U+204F, U+2E41, U+1EE00-1EEFF";
const LATIN =
  "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD";

const face = (family: string, weight: number, src: string, range: string) =>
  `@font-face{font-family:'${family}';font-style:normal;font-weight:${weight};font-display:swap;src:url(${src}) format('woff2');unicode-range:${range};}`;

const css = [
  face("Alexandria", 500, alexAr500, ARABIC),
  face("Alexandria", 600, alexAr600, ARABIC),
  face("Alexandria", 700, alexAr700, ARABIC),
  face("Alexandria", 800, alexAr800, ARABIC),
  face("Alexandria", 500, alexLa500, LATIN),
  face("Alexandria", 600, alexLa600, LATIN),
  face("Alexandria", 700, alexLa700, LATIN),
  face("Alexandria", 800, alexLa800, LATIN),
  face("IBM Plex Sans Arabic", 400, plexAr400, ARABIC),
  face("IBM Plex Sans Arabic", 500, plexAr500, ARABIC),
  face("IBM Plex Sans Arabic", 600, plexAr600, ARABIC),
  face("IBM Plex Sans Arabic", 700, plexAr700, ARABIC),
  face("IBM Plex Sans Arabic", 400, plexLa400, LATIN),
  face("IBM Plex Sans Arabic", 500, plexLa500, LATIN),
  face("IBM Plex Sans Arabic", 600, plexLa600, LATIN),
  face("IBM Plex Sans Arabic", 700, plexLa700, LATIN),
].join("");

const style = document.createElement("style");
style.setAttribute("data-fonts", "embedded");
style.textContent = css;
document.head.appendChild(style);


+++ src/fonts.ts (修改后)
/* ————————————————————————————————————————————
   خطوط عربية مدمجة داخل حزمة البرنامج (base64)
   لا يوجد أي طلب خارجي — يعمل بدون إنترنت تماماً
   (الأوزان الأساسية فقط للحفاظ على حجم ملف واحد صغير)
   ———————————————————————————————————————————— */
import alexAr600 from "@fontsource/alexandria/files/alexandria-arabic-600-normal.woff2?inline";
import alexAr700 from "@fontsource/alexandria/files/alexandria-arabic-700-normal.woff2?inline";
import alexAr800 from "@fontsource/alexandria/files/alexandria-arabic-800-normal.woff2?inline";
import alexLa700 from "@fontsource/alexandria/files/alexandria-latin-700-normal.woff2?inline";
import alexLa800 from "@fontsource/alexandria/files/alexandria-latin-800-normal.woff2?inline";

import plexAr400 from "@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-400-normal.woff2?inline";
import plexAr500 from "@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-500-normal.woff2?inline";
import plexAr600 from "@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-600-normal.woff2?inline";
import plexAr700 from "@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-700-normal.woff2?inline";
import plexLa400 from "@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-latin-400-normal.woff2?inline";
import plexLa600 from "@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-latin-600-normal.woff2?inline";

const ARABIC =
  "U+0600-06FF, U+0750-077F, U+08A0-08FF, U+FB50-FDFF, U+FE70-FEFF, U+200C-200E, U+2010-2011, U+204F, U+2E41, U+1EE00-1EEFF";
const LATIN =
  "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD";

const face = (family: string, weight: number, src: string, range: string) =>
  `@font-face{font-family:'${family}';font-style:normal;font-weight:${weight};font-display:swap;src:url(${src}) format('woff2');unicode-range:${range};}`;

const css = [
  face("Alexandria", 600, alexAr600, ARABIC),
  face("Alexandria", 700, alexAr700, ARABIC),
  face("Alexandria", 800, alexAr800, ARABIC),
  face("Alexandria", 700, alexLa700, LATIN),
  face("Alexandria", 800, alexLa800, LATIN),
  face("IBM Plex Sans Arabic", 400, plexAr400, ARABIC),
  face("IBM Plex Sans Arabic", 500, plexAr500, ARABIC),
  face("IBM Plex Sans Arabic", 600, plexAr600, ARABIC),
  face("IBM Plex Sans Arabic", 700, plexAr700, ARABIC),
  face("IBM Plex Sans Arabic", 400, plexLa400, LATIN),
  face("IBM Plex Sans Arabic", 600, plexLa600, LATIN),
].join("");

const style = document.createElement("style");
style.setAttribute("data-fonts", "embedded");
style.textContent = css;
document.head.appendChild(style);
