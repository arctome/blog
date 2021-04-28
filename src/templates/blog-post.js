import * as React from "react"
import { Link, graphql } from "gatsby"

// import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { Disqus } from 'gatsby-plugin-disqus';

import "../ccblock.css"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data
  const canonicalUrl = data.site.siteMetadata.siteUrl + location.pathname

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <p>{post.frontmatter.date}</p>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        
        <footer>
          <div class="license">
            <div class="license-title">{post.frontmatter.title}</div>
            <div class="license-link">
              <a href={canonicalUrl} rel="external nofollow noopenner" target="_blank">{canonicalUrl}</a>
            </div>
            <div class="license-meta">
              <div class="license-meta-item">
                <div class="license-meta-title">本文作者</div>
                <div class="license-meta-text">{data.site.siteMetadata.author.name || "匿名"}</div>
              </div>
              <div class="license-meta-item">
                <div class="license-meta-title">发布于</div>
                <div class="license-meta-text">{post.frontmatter.date}</div>
              </div>
              <div class="license-meta-item">
                <div class="license-meta-title">许可协议</div>
                <div class="license-meta-text">
                  <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh" rel="external nofollow noopener noopenner noreferrer" target="_blank">CC BY-NC-SA 4.0</a>
                </div>
              </div>
            </div>
            <div>转载或引用本文时请遵守许可协议，注明出处、不得用于商业用途！</div>
          </div>
        </footer>
        <hr />
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
      <Disqus
        config={
          {
            /* Replace PAGE_URL with your post's canonical URL variable */
            url: canonicalUrl,
            /* Replace PAGE_IDENTIFIER with your page's unique identifier variable */
            identifier: post.id,
            /* Replace PAGE_TITLE with the title of the page */
            title: post.frontmatter.title,
          }
        }
      />
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
        author {
          name
        }
        siteUrl
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
