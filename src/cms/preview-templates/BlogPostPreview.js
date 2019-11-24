import { BlogPostTemplate } from "../../templates/blog-post";
import PropTypes from "prop-types";
import React from "react";

const BlogPostPreview = ({ entry, widgetFor }) => (
  <>
    <BlogPostTemplate
      htmlContent={widgetFor("body")}
      content={{
        title: entry.getIn(["data", "title"]),
        authorImage: entry.getIn(["data", "authorImage"]),
        author: entry.getIn(["data", "author"]),
        date: entry.getIn(["data", "date"])
      }}
      description={entry.getIn(["data", "description"])}
      tags={entry.getIn(["data", "tags"])}
      title={entry.getIn(["data", "title"])}
    />
  </>
);

BlogPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }),
  widgetFor: PropTypes.func
};

export default BlogPostPreview;
