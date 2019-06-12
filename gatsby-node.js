const _ = require("lodash")
const _kebabCase = require("lodash/kebabCase")
const path = require("path")

const kebabCase = string => _kebabCase(string).substr(0, 100)

const gradientColors = require('./src/gradients');

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: `@babel/plugin-proposal-export-default-from`,
  })
}

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

 // You can delete this file if you're not using it

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage, createRedirect } = boundActionCreators;

  const themeTemplate = path.resolve(`src/templates/theme.js`)
  const subThemeTemplate = path.resolve(`src/templates/subtheme.js`)
  const articleTemplate = path.resolve(`src/templates/article.js`)
  const clipTemplate = path.resolve(`src/templates/clip.js`)
  const interviewTemplate = path.resolve(`src/templates/interview.js`)
  const expertTemplate = path.resolve(`src/templates/expert.js`)
  const qaTemplate = path.resolve(`src/templates/qa.js`)
  const lessonTemplate = path.resolve(`src/templates/lesson.js`)
  const episodeTemplate = path.resolve(`src/templates/episode.js`)
  const creditTemplate = path.resolve(`src/templates/credit.js`)
  const transcriptTemplate = path.resolve(`src/templates/transcript.js`)

  // custom pages for episodes
  const episodes = ['one', 'two', 'three']

  episodes.map( number => {
    const index = episodes.indexOf(number) + 1
    
    createPage({
      path: `/episodes/${kebabCase(number)}`, // required
      component: episodeTemplate,
      context: {
        number,
        index
      }
    })

    createPage({
      path: `/credits/${kebabCase(number)}`, // required
      component: creditTemplate,
      context: {
        number,
        index
      }
    })

    createPage({
      path: `/transcripts/${kebabCase(number)}`, // required
      component: transcriptTemplate,
      context: {
        number,
        index
      }
    })
  })

  return new Promise((resolve, reject) => {
    
    // Query for markdown nodes to use in creating pages.
    graphql(
      `
        {
          allTaxonomyTermThemes {
            edges {
              node {
                id
                name
                relationships {
                  field_theme_image {
                    localFile {
                      publicURL
                    }
                  }
                  subthemes: backref_field_belongs_to_theme {
                    id
                    name
                    path{
                      alias
                    }
                  }
                }
                path{
                  alias
                }
              }
            }
          }

          allTaxonomyTermSubthemes {
            edges {
              node {
                id
                name
                path{
                  alias
                }
              }
            }
          }

          allNodeArticle {
            edges {
              node {
                id
                title
                path{
                  alias
                }
              }
            }
          }

          allNodeExpert {
            edges {
              node {
                id
                title
                path{
                  alias
                }
              }
            }
          }

          allNodeInterview {
            edges {
              node {
                id
                title
                path{
                  alias
                }
              }
            }
          }
          allNodeFaq {
            edges {
              node {
                id
                title
                fields {
                  slug
                }
                path{
                  alias
                }
              }
            }
          }

          allNodeClip {
            edges {
              node {
                id
                title
                path{
                  alias
                }
              }
            }
          }

          allNodeLessonPlan {
            edges {
              node {
                id
                title
                path{
                  alias
                }
                field_activity{
                  processed
                }
                field_overview {
                  processed
                }
                field_subjects {
                  processed
                }
                field_objectives {
                  processed
                }
                field_copyright_a {
                  processed
                }
                field_description {
                  processed
                }
                field_lesson_plan {
                  processed
                }
                field_grade_levels {
                  processed
                }
                field_lesson_summary {
                  processed
                }
                field_time_allotment {
                  processed
                }
                field_lesson_plan_author {
                  processed
                }
                field_less_plan_author_bio {
                  processed
                }
                field_subjects {
                  processed
                }
              }
            }
          }

        }
      `
    ).then(result => {
      if (result.errors) {
        resolve()
        // reject(result.errors);
      }

      // debug for when build fails
      // console.log(result)

      // Create blog posts pages.
      _.each(result.data.allTaxonomyTermThemes.edges, (edge, index) => {
        const {field_theme_image, subthemes} = edge.node.relationships;
        const {name} = edge.node;
        const themeName = name;
        //const path = `/themes/${kebabCase(name)}`;
        const path = edge.node.path.alias;
        const color = gradientColors[index];

        subthemes.map( ({id, name, path}) => 
          createPage({
            //path: `/subthemes/${kebabCase(name)}`, // required
            path: path.alias,
            component: subThemeTemplate,
            context: {
              id,
              field_theme_image,
              color,
              theme: {
                path,
                name: themeName
              }
            },
          })
        )
        
        createPage({
          path,
          component: themeTemplate,
          context: {
            id: edge.node.id,
          },
        })
      })

      _.each(result.data.allNodeArticle.edges, edge => {
        createPage({
          //path: `/articles/${kebabCase(edge.node.title)}`, // required
          path: edge.node.path.alias,
          component: articleTemplate,
          context: {
            id: edge.node.id,
          },
        })
      })

      _.each(result.data.allNodeExpert.edges, edge => {
        createPage({
          //path: `/experts/${kebabCase(edge.node.title)}`, // required
          path: edge.node.path.alias,
          component: expertTemplate,
          context: {
            id: edge.node.id,
          },
        })
      })

      _.each(result.data.allNodeInterview.edges, edge => {
        createPage({
          //path: `/interviews/${kebabCase(edge.node.title)}`, // required
          path: edge.node.path.alias,
          component: interviewTemplate,
          context: {
            id: edge.node.id,
          },
        })
      })

      _.each(result.data.allNodeFaq.edges, edge => {
        createPage({
          //path: `/qa/${kebabCase(edge.node.title)}`, // required
          path: edge.node.path.alias,
          component: qaTemplate,
          context: {
            id: edge.node.id,
          },
        })
      })

      _.each(result.data.allNodeClip.edges, edge => {
        createPage({
          //path: `/clips/${kebabCase(edge.node.title)}`, // required
          path: edge.node.path.alias,
          component: clipTemplate,
          context: {
            id: edge.node.id,
          },
        })
      })

      _.each(result.data.allNodeLessonPlan.edges, edge => {
        createPage({
          //path: `/lessons/${kebabCase(edge.node.title)}`, // required
          path: edge.node.path.alias,
          component: lessonTemplate,
          context: {
            id: edge.node.id,
          },
        })
      })
      
      resolve()
    })
  })
}

const usedSlugs = {}
const createSlug = ({ text, type, maxWords = 10 }) => {
  let slug = kebabCase(text.split(' ').slice(0, maxWords).join(' '))
  
  // create map of used slugs for type if it doesn't yet exist
  if (!usedSlugs[type]) {
    usedSlugs[type] = {}
  }

  // check if we already used that slug
  if (usedSlugs[type][slug]) {
    // increment count and use it as postfix
    let count = usedSlugs[type][slug] = usedSlugs[type][slug] + 1
    return `${slug}-${count}`
  } else {
    usedSlugs[type][slug] = 1
    return slug
  }
}

exports.onCreateNode = ({node, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators
  if (node.internal.type === 'node__faq') {
    createNodeField({
      node,
      name: "slug",
      value: createSlug({
        text: node.title,
        type: "faq"
      })
    })
  }
}