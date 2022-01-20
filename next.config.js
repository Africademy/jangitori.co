const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const { withSentryConfig } = require('@sentry/nextjs')

const config = withBundleAnalyzer({
  poweredByHeader: false,
  env: {
    NEXT_PUBLIC_APP_STAGE: process.env.NEXT_PUBLIC_APP_STAGE,
    NEXT_PUBLIC_SUPABASE_API_KEY: process.env.NEXT_PUBLIC_SUPABASE_API_KEY,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    SENTRY_DSN: process.env.SENTRY_DSN,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
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
  webpack: (config, { isServer }) => {
    // XXX See https://github.com/vercel/next.js/blob/canary/examples/with-sentry-simple/next.config.js
    // In `pages/_app.js`, Sentry is imported from @sentry/node. While
    // @sentry/browser will run in a Node.js environment, @sentry/node will use
    // Node.js-only APIs to catch even more unhandled exceptions.
    //
    // This works well when Next.js is SSRing your page on a server with
    // Node.js, but it is not what we want when your client-side bundle is being
    // executed by a browser.
    //
    // Luckily, Next.js will call this webpack function twice, once for the
    // server and once for the client. Read more:
    // https://nextjs.org/docs#customizing-webpack-config
    //
    // So ask Webpack to replace @sentry/node imports with @sentry/browser when
    // building the browser's bundle
    if (!isServer) {
      config.resolve.alias['@sentry/node'] = '@sentry/browser'
    }

    return config
  },
})

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
}

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(config, sentryWebpackPluginOptions)
