export default function Head() {
  return (
    <>
      <title>Krv Analytics</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content="Built with Next.js and TypeScript" />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content="Krv Analytics" />
      <meta
        property="og:description"
        content="Transforming your data into intelligent, AI-powered insights"
      />
      <meta property="og:image" content="/images/logo/logo-dark.svg" />
      <meta property="og:url" content="/app/favicon.ico" />

      <link rel="icon" href="/app/favicon.ico" />
    </>
  );
}
