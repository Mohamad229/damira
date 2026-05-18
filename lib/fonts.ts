import {
  Cairo,
  Geist,
  Geist_Mono,
  Montserrat,
  Roboto,
  Tajawal,
  Readex_Pro,
  Noto_Sans_Arabic,
} from "next/font/google";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "800", "900"],
  display: "swap",
});

export const readex_pro = Readex_Pro({
  variable: "--font-readex-pro",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500","600", "700"],
  display: "swap",
});

export const noto_sans_arabic = Noto_Sans_Arabic({
  variable: "--font-noto-sans-arabic",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "800", "900"],
});

export const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

export const fontVariables = `${geistSans.variable} ${geistMono.variable} ${cairo.variable} ${tajawal.variable} ${readex_pro.variable} ${noto_sans_arabic.variable} ${montserrat.variable} ${roboto.variable}`;
