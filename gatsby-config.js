module.exports = {
  siteMetadata: {
    title: 'Race: The Power of an Illusion',
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `@ehp/gatsby-source-drupal`,
      options: {
        baseUrl: `http://dev-distributeddesign.pantheon.berkeley.edu/`
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `placeholder`,
        path: `${__dirname}/gatsby-config.js`,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // replace "UA-XXXXXXXXX-X" with your own Tracking ID
        trackingId: "UA-136620314-1",
      },
    },
  ],
}
