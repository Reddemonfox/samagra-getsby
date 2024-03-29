import React, {useState} from "react";
import {graphql, StaticQuery} from "gatsby";

const service = {};
export const OurPublicationsSection = ({data, projectId}) => {

    const [hoveredIndex, setHoveredIndex] = useState(
        -1
    );
    // const publicationsObject = media;
    const {allMarkdownRemark: mediaPageContent} = data;
    const allPublications = mediaPageContent.edges;
    const filteredPublications = allPublications.filter(function (item) {
        return item.node.frontmatter.projectId === projectId;
    }).splice(0,3);
    return (
        <div className={'home-news-section-wrapper our-publication-section-wrapper container'}
             style={{paddingTop: '50px'}}>
            <div className={'title'}>
                Read More
            </div>
            <div className={'cards-section row'}>
                {

                    filteredPublications.map((publication, index) => {
                        if (!publication.node.frontmatter.featuredimage)
                            return <a href={publication.node.frontmatter.link} target="_blank" className={'col-md-4 col-sm-6 col-xs-12'}>
                                <div
                                    className={`card-wrapper  ${hoveredIndex === index ? 'hovered' : ''}`}
                                    onMouseLeave={() => setHoveredIndex(-1)}
                                    style={{width: '100%'}}
                                    onMouseEnter={() => setHoveredIndex(index)}>
                                    <div className={'image-section'}
                                         style={
                                             {
                                                 backgroundImage: `url(${
                                                     !!publication.node.frontmatter.image.childImageSharp ? publication.node.frontmatter.image.childImageSharp.fluid.src : ''
                                                 })`,
                                                 backgroundSize: 'cover',
                                                 backgroundPosition: 'center'
                                             }}/>
                                    <div className={'content-section'}>
                                        <div className={'heading'}>
                                            {
                                                publication.node.frontmatter.title
                                            }
                                        </div>
                                        <div className={'timestamp'}>
                                            {
                                                publication.node.frontmatter.mediaHouse
                                            }&nbsp;|&nbsp;
                                            {
                                                publication.node.frontmatter.date
                                            }&nbsp;|&nbsp;Media
                                        </div>
                                    </div>
                                </div>
                            </a>;
                        return <a href={publication.node.fields ? publication.node.fields.slug : ''}
                                  className={'col-md-4 col-sm-6 col-xs-12'}>
                            <div
                                className={`card-wrapper  ${hoveredIndex === index ? 'hovered' : ''}`}
                                style={{width: '100%'}}
                                onMouseLeave={() => setHoveredIndex(-1)}
                                onMouseEnter={() => setHoveredIndex(index)}>
                                <div className={'image-section'}
                                     style={
                                         {

                                             backgroundImage: `url(${
                                                 !!(publication.node.frontmatter.featuredimage && publication.node.frontmatter.featuredimage.childImageSharp) ? publication.node.frontmatter.featuredimage.childImageSharp.fluid.src : ''
                                             })`,
                                             backgroundSize: 'cover',
                                             backgroundPosition: 'center'
                                         }}/>
                                <div className={'content-section'}>
                                    <div className={'heading'}>
                                        {
                                            publication.node.frontmatter.title
                                        }
                                    </div>
                                    <div className={'timestamp'}>
                                        {
                                            publication.node.frontmatter.author
                                        } &nbsp;|&nbsp;{
                                            publication.node.frontmatter.date
                                        }&nbsp;|&nbsp;Blog
                                    </div>
                                </div>
                            </div>
                        </a>;
                    })
                }
            </div>
        </div>
    )
};

function getSlug(str) {
    let result = '';
    str = str.replace(/ /g, '-').toLowerCase();
    for (let i = 0; i < str.length; i++) {
        if ('abcdefghijklmnopqrstuvwxyz0123456789-'.indexOf(str[i]) > -1) {
            result += str[i];
        }
    }
    return result;
}

export default ({projectId}) => (
    <StaticQuery
        query={graphql`
      query OurPublicationRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: {projectId: {ne : "0"}, templateKey: { in: ["media-post", "blog-post"] } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                    title
                    projectId
                    mediaHouse
                    link
                    author
                    image {
                        childImageSharp {
                            fluid(maxWidth: 640, quality: 64) {
                            ...GatsbyImageSharpFluid
                            }
                        }
                    }
                    featuredimage {
                        childImageSharp {
                            fluid(maxWidth: 640, quality: 64) {
                            ...GatsbyImageSharpFluid
                            }
                        }
                    }
                    date(formatString: "MMMM DD, YYYY")
                }
            }
          }
        }
      }
    `}
        render={(data, count) => <OurPublicationsSection data={data} projectId={projectId}/>}
    />
)
