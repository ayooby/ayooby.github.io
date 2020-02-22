import React, { useState } from "react"
import { graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PostsTab from "../components/postsTab"

import { Button } from "../utils/ui"

const BlogIndex = ({ data, location }) => {
  const [currentLang, setLang] = useState("Farsi")

  const siteTitle = data.site.siteMetadata.title
  const posts = {
    Farsi: data.allMarkdownRemark.edges.filter(
      ({ node }) => node.frontmatter.lang === "fa"
    ),
    English: data.allMarkdownRemark.edges.filter(
      ({ node }) => node.frontmatter.lang === "en"
    ),
  }

  const changeLang = lang => {
    if (lang === currentLang) return
    if (currentLang === "Farsi") return setLang("English")
    setLang("Farsi")
  }

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />
      <h1>Articles</h1>
      <div
        style={{
          borderBottom: "1px solid #dee2e6",
        }}
      >
        {Object.keys(posts).map((lang, key) => (
          <Button
            key={key}
            onClick={e => {
              e.preventDefault()
              changeLang(lang)
            }}
            active={lang === currentLang}
          >
            {lang}
          </Button>
        ))}
      </div>
      {Object.keys(posts).map((lang, key) => {
        return (
          <div
            key={`i_${key}`}
            style={{ direction: lang === "Farsi" ? "rtl" : "ltr" }}
          >
            {currentLang === lang && (
              <PostsTab key={lang} posts={posts[lang]} />
            )}
          </div>
        )
      })}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            lang
          }
        }
      }
    }
  }
`
