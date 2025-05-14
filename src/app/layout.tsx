// app/layout.tsx
"use client";

import { ReactNode } from "react";
import Head from "next/head";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { MathJaxContext } from "better-react-mathjax";
import theme from "@/theme";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <Head>
        {/* Load the MathJax library */}
        <script
          id="MathJax-script"
          async
          src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
        />
      </Head>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {/* Provide MathJax to all child components */}
          <MathJaxContext>{children}</MathJaxContext>
        </ThemeProvider>
      </body>
    </html>
  );
}
