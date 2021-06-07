import Head from "next/head";

export default function SEO() {
  return (
    <Head>
      <meta
        name="description"
        content="Be on top of your job hunt. Build a resume that elevates your applications, track your applications, and bring more insights to your job search with powerful analytics"
      />
      <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo.png" />
      <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
      {/* Primary Meta Tags */}
      <title>Ampersand — Elevate your job hunt</title>
      <meta name="title" content="Ampersand — Elevate your job hunt" />
      <meta
        name="description"
        content="Be on top of your job hunt. Build a resume that elevates your applications, track your applications, and bring more insights to your job search with powerful analytics"
      />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.ampersand.careers/" />
      <meta property="og:title" content="Ampersand — Elevate your job hunt" />
      <meta
        property="og:description"
        content="Be on top of your job hunt. Build a resume that elevates your applications, track your applications, and bring more insights to your job search with powerful analytics"
      />
      <meta
        property="og:image"
        content="https://res.cloudinary.com/beaniegram/image/upload/v1618851232/Personal%20Site/a15d0fb6-82ca-4d8f-ba70-17c665c0f536_d3b7qd.png"
      />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://www.ampersand.careers/" />
      <meta
        property="twitter:title"
        content="Ampersand — Elevate your job hunt"
      />
      <meta
        property="twitter:description"
        content="Be on top of your job hunt. Build a resume that elevates your applications, track your applications, and bring more insights to your job search with powerful analytics"
      />
      <meta
        property="twitter:image"
        content="https://res.cloudinary.com/beaniegram/image/upload/v1618851232/Personal%20Site/a15d0fb6-82ca-4d8f-ba70-17c665c0f536_d3b7qd.png"
      />
    </Head>
  );
}
