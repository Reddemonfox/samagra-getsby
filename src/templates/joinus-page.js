import React from 'react'
import PropTypes from 'prop-types'
import {kebabCase} from 'lodash'
import Helmet from 'react-helmet'
import {graphql, Link} from 'gatsby'
import Layout from '../components/Layout'
import Content, {HTMLContent} from '../components/Content'
import {MediaRoll} from "../components/MediaRoll";
import JoinUsBannerImage from "../components/JoinUsPageComponents/JoinUsBannerImage/JoinUsBannerImage";
import JoinUsFormSection from "../components/JoinUsPageComponents/JoinUsFormSection/JoinUsFormSection";

const JoinUsPage = ({data}) => {
    const {markdownRemark: joinUsPageContent} = data;
    return (
        <Layout>
            <JoinUsBannerImage/>
            <JoinUsFormSection verticleImage={joinUsPageContent.frontmatter.verticalImage} horizontalImage={joinUsPageContent.frontmatter.horizontalImage}/>
        </Layout>
    )
}

export default JoinUsPage
export const JoinUsPageQuery = graphql`
  query JoinUsPageQuery {
    markdownRemark(frontmatter: { templateKey: { eq: "joinus-page" } }) {
      html
      frontmatter {
        title
        verticalImage {
             childImageSharp {
                fluid(maxWidth: 640, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
        }
        horizontalImage {
             childImageSharp {
                fluid(maxWidth: 640, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
        }
      }
    }
  }
`
