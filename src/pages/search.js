import React, { useState } from "react"
import { graphql } from "gatsby"
import SearchResult from "../components/search/search-result"
import SearchBox from "../components/search/search-box"
import { InstantSearch } from "react-instantsearch-dom"
import algoliasearch from "algoliasearch/lite"

// import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

import "../search.css"

const indices = [{ name: `Pages`, title: `Pages` }]

const SearchList = ({ data, location }) => {
    const siteTitle = data.site.siteMetadata?.title || `Title`
    const [query, setQuery] = useState()
    const [hasFocus, setFocus] = useState(false)
    const algoliaClient = algoliasearch(
        process.env.GATSBY_ALGOLIA_APP_ID,
        process.env.GATSBY_ALGOLIA_SEARCH_KEY
    )
    const searchClient = {
        ...algoliaClient,
        search(requests) {
            if(requests[0].params.query) {
                return algoliaClient.search(requests);
            }
        }
    }

    return (
        <Layout location={location} title={siteTitle}>
            <Seo title="All posts" />
            <InstantSearch
                searchClient={searchClient}
                indexName={indices[0].name}
                onSearchStateChange={({ query }) => {
                    query && setQuery(query)
                }}
            >
                <SearchBox onFocus={() => setFocus(true)} hasFocus={hasFocus} />
                <SearchResult
                    show={query && query.length > 0 && hasFocus}
                    indices={indices}
                />
            </InstantSearch>
        </Layout>
    )
}

export default SearchList;

export const pageQuery = graphql`
  query blogMetaQuery {
    site {
        siteMetadata {
            title
        }
    }
  }
`
