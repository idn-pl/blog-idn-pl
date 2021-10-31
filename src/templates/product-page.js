import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import Layout from "../components/Layout";
import FullWidthImage from "../components/FullWidthImage";
import Content, { HTMLContent } from "../components/Content";

// eslint-disable-next-line
export const ProductPageTemplate = ({
  image,
  title,
  content,  // contains html content in index.md (text in markdown)
  contentComponent,  // media in index.md (images, links)
}) => {
  const heroImage = getImage(image) || image;
  const PageContent = contentComponent || Content;

  return (
    <div className="content">
      <FullWidthImage img={heroImage} title={title} />
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="section">
              <PageContent className="content" content={content} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),  // either image object or a string (image path)
  title: PropTypes.string,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
};

const ProductPage = ({ data }) => {
  const { markdownRemark: post } = data;  // assigns data.markdownRemark as "post" var?


  return (
    <Layout>
      <ProductPageTemplate
        image={post.frontmatter.image}
        title={post.frontmatter.title}
        content={post.html}
        contentComponent={HTMLContent}
      />
    </Layout>
  );
};

ProductPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default ProductPage;

export const productPageQuery = graphql`
  query ProductPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        image {
          childImageSharp {
            gatsbyImageData(quality: 100, layout: FULL_WIDTH)
          }
        }
      }
    }
  }
`;
