import React from 'react'
import PropTypes from 'prop-types'
import {graphql} from 'gatsby'
import Layout from '../components/Layout'
import Content, {HTMLContent} from '../components/Content'

import linkedInSvg from "../img/social/LinkedIn.svg";
import linkedInSvgSelected from "../img/social/LinkedIn-selected.svg";
const TeamPage = ({data}) => {
    const {markdownRemark: post} = data;
    const team = post.frontmatter.team || [];
    const [hoveredMember, setHoveredMember] = React.useState(-1);
    const [socialHovered, setSocialHovered] = React.useState(false);
    const [showPopup, setShowPopup] = React.useState(-1);
    return (
        <Layout>
            <div>
                <div className={'home-top-slider-wrapper  team-banner'}
                     style={{height: '600px',  backgroundImage: `url(${
                             !!post.frontmatter.bannerImage.childImageSharp ? post.frontmatter.bannerImage.childImageSharp.fluid.src : ''
                         })`, backgroundPosition: 'center'}}>
                    <div className="translucent-dark-overlay" style={{height: 'auto'}}>
                    </div>
                    <div className="content-section">
                        <div className="logo">

                        </div>
                        <div className="title">
                            {post.frontmatter.title}
                        </div>
                    </div>
                </div>


                <div className="team-section container">
                    {
                        team[showPopup] ? <div className="popup" id={'team-popup'}>
                                <div className="overlay" onClick={() => setShowPopup(-1)}/>
                                <div className="popup-content-section">
                                    <div className="cross-button" onClick={() => setShowPopup(-1)}>
                                        X
                                    </div>
                                    <div className="detail-section">
                                        <div className="image-section"
                                             style={{backgroundImage: `url(${
                                                     !!team[showPopup].frontmatter.bannerImage.childImageSharp ? team[showPopup].frontmatter.bannerImage.childImageSharp.fluid.src : ''
                                                 })`}}>

                                        </div>
                                        <div className="details">
                                            <div className="title">
                                                {team[showPopup].name}
                                            </div>
                                            <div className="designation">
                                                {team[showPopup].project}
                                            </div>
                                            {
                                                team[showPopup].linkedInProfile ?
                                                    <div className="social">
                                                        <a onMouseLeave={() => setSocialHovered(false)}
                                                           onMouseEnter={() => setSocialHovered(true)}
                                                           href={team[showPopup].linkedInProfile ? team[showPopup].linkedInProfile : '#'}>
                                                            <img src={socialHovered ? linkedInSvgSelected : linkedInSvg}/>
                                                        </a>
                                                    </div>
                                                    :
                                                    <span/>
                                            }
                                        </div>
                                    </div>
                                    <div className="text-content-section">

                                        <div className="description">
                                            <p>
                                                {team[showPopup].bio}
                                            </p>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            : null
                    }
                    <div className="text-description mt-4 py-5 text-center f-23 color-text-primary container">
                        {post.frontmatter.subTitle}
                    </div>
                    <div className="row">
                        {
                            team.map((member, index) => {
                                return <div className="col-md-4 col-sm-6 col-xs-12">
                                    <div
                                        onClick={() => setShowPopup(index)}
                                        onMouseLeave={() => setHoveredMember(-1)}
                                        onMouseEnter={() => setHoveredMember(index)}
                                        className={`team-card-wrapper ${((index + 2) % 3 === 0) ? 'with-margin' : ''}`}>
                                        <div className="image-section" style={{
                                            backgroundImage: `url(${
                                                !!member.image.childImageSharp ? member.image.childImageSharp.fluid.src : ''
                                            })`
                                        }}>

                                        </div>
                                        <div className="content-section">
                                            <div className="name">
                                                {member.name}
                                            </div>
                                            <div className="designation">
                                                {member.project}
                                            </div>
                                            {
                                                member.linkedInProfile ?
                                                    <div className="social" onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        window.location.href = member.linkedInProfile;
                                                    }}>
                                                        <a href={member.linkedInProfile ? member.linkedInProfile : '#'}>
                                                            <img
                                                                src={hoveredMember === index ? linkedInSvgSelected : linkedInSvg}/>
                                                        </a>
                                                    </div> : <span/>
                                            }
                                        </div>
                                    </div>
                                </div>;
                            })
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
};

TeamPage.propTypes = {
    data: PropTypes.object.isRequired,
};

export default TeamPage

export const aboutPageQuery = graphql`
  query TeamPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
       bannerImage {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        title
        subTitle
        team {
         image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            name
            bio
            project
            linkedInProfile
        }
      }
    }
  }
`
