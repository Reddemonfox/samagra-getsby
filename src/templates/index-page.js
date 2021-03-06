import React from 'react'
import PropTypes from 'prop-types'
import {Link, graphql, StaticQuery} from 'gatsby'

import Layout from '../components/Layout'
import Features from '../components/Features'
import BlogRoll from '../components/BlogRoll'
import {HomeTopSlider} from "../components/HomeComponents/HomeTopSlider/HomeTopSlider";
import {HomeSecondSection} from "../components/HomeComponents/HomeSecondSection/HomeSecondSection";
import HomeThirdSection from "../components/HomeComponents/HomeThirdSection/HomeThirdSection";
import HomeNewsSection from "../components/HomeComponents/HomeNewsSection/HomeNewsSection";

export const IndexPageTemplate = ({
                                      title,
                                      mainContent,
                                      description
                                  }) => (
    <div>
        Hello
    </div>
);

const IndexPage = ({data}) => {
    const {frontmatter} = data.markdownRemark;
    return (
        <Layout>
            {
                frontmatter && frontmatter.subBanners ? <React.Fragment>
                    <HomeTopSlider baseBanner={frontmatter.baseBanner} subBanners={frontmatter.subBanners}/>
                    <HomeSecondSection homeContent={frontmatter}/>
                </React.Fragment> : <span/>
            }
            <HomeThirdSection/>
            <HomeNewsSection/>
        </Layout>
    )
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        description
        baseBanner {
            titleLines {
                text
            }
        }
        subBanners {
            projectName
            titleLines {
                text
            }
            slides {
                image {
                    childImageSharp {
                        fluid(maxWidth: 1024, quality: 60) {
                          ...GatsbyImageSharpFluid
                        }
                      }
                }
                title
            }   
        }
        secondSection {
         title
         ourApproach {
            title
             description {
                text
                subTitle
            }
             image {
              childImageSharp {
                fluid(maxWidth: 640, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
         }
         ourModel {
            image {
              childImageSharp {
                fluid(maxWidth: 640, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            title
            description {
                text
                subTitle
            }
         }
        }
      }
    }
  }
`

