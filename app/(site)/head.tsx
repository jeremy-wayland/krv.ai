export default function Head() {
  return (
    <>
      <title>Krv Analytics</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta
        name="description"
        content="One protocol layer that tames enterprise data complexity. Deploy anywhere with no migrations."
      />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content="Krv Analytics" />
      <meta
        property="og:description"
        content="One protocol layer that tames enterprise data complexity. Deploy anywhere with no migrations."
      />
      {/* Image is provided by route handler: /(site)/opengraph-image.tsx */}
      <meta property="og:url" content="https://krv.ai/" />
      <meta property="og:type" content="website" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Krv Analytics" />
      <meta
        name="twitter:description"
        content="One protocol layer that tames enterprise data complexity. Deploy anywhere with no migrations."
      />
      {/* Image is provided by route handler: /(site)/twitter-image.tsx */}

      <link rel="icon" href="/favicon.ico" />
    </>
  );
}
