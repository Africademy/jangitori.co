const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const config = {
  poweredByHeader: false,
  env: {
    NEXT_PUBLIC_APP_STAGE: process.env.NEXT_PUBLIC_APP_STAGE,
    NEXT_PUBLIC_SUPABASE_API_KEY: process.env.NEXT_PUBLIC_SUPABASE_API_KEY,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY:
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  },
  // The starter code load resources from `public` folder with `router.basePath` in React components.
  // So, the source code is "basePath-ready".
  // You can remove `basePath` if you don't need it.
  reactStrictMode: true,
  async headers() {
    const headers = [
      {
        // Make all fonts immutable and cached for one year
        source: '/static/fonts/(.*?)',
        headers: [
          {
            key: 'Cache-Control',
            // See https://www.keycdn.com/blog/cache-control-immutable#what-is-cache-control-immutable
            // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#browser_compatibility
            value: `public, max-age=31536000, immutable`,
          },
        ],
      },
      {
        // Make all other static assets immutable and cached for one hour
        source: '/static/(.*?)',
        headers: [
          {
            key: 'Cache-Control',
            // See https://www.keycdn.com/blog/cache-control-immutable#what-is-cache-control-immutable
            // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#browser_compatibility
            value: `public, max-age=3600, immutable`,
          },
        ],
      },
      {
        source: '/(.*?)', // Match all paths, including "/" - See https://github.com/vercel/next.js/discussions/17991#discussioncomment-112028
        headers: [
          // This directive helps protect against some XSS attacks
          // See https://infosec.mozilla.org/guidelines/web_security#x-content-type-options
          {
            key: 'X-Content-Type-Options',
            value: `nosniff`,
          },
        ],
      },
      {
        source: '/(.*?)', // Match all paths, including "/" - See https://github.com/vercel/next.js/discussions/17991#discussioncomment-112028
        headers: [
          // This directive helps protect user's privacy and might avoid leaking sensitive data in urls to 3rd parties (e.g: when loading a 3rd party asset)
          // See https://infosec.mozilla.org/guidelines/web_security#referrer-policy
          // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
          // See https://scotthelme.co.uk/a-new-security-header-referrer-policy/
          {
            key: 'Referrer-Policy',
            // "no-referrer-when-downgrade" is the default behaviour
            // XXX You might want to restrict even more the referrer policy
            value: `no-referrer-when-downgrade`,
          },
        ],
      },
    ]

    console.info('Using headers:', JSON.stringify(headers, null, 2))

    return headers
  },
}

module.exports = withBundleAnalyzer(config)
