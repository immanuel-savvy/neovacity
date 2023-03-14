import React from "react";
import { post_request } from "../../Assets/js/utils/services";
import Loadindicator from "../../Components/loadindicator";
import { emitter } from "../../Neovacity";
import Article from "../../Components/article";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

class Manage_articles extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page_size: 25,
      page: 1,
    };
  }

  componentDidMount = async () => {
    let { page_size, page } = this.state;

    let { articles } = await post_request("articles", {
      skip: page_size * (page - 1),
      limit: page_size,
      total_articles: true,
    });

    this.setState({ articles });
  };

  remove = async (article_id) => {
    let { articles } = this.state;
    articles = articles.filter((article) => article._id === article_id);

    this.setState({ articles });

    await post_request(`remove_article/${article_id}`);
  };

  edit = (article) => emitter.emit("edit_article", article);

  render() {
    let { articles } = this.state;

    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb crumb="manage articles" />
        <div class="row">
          {articles ? (
            articles.length ? (
              articles.map((article) => (
                <Article
                  article={article}
                  remove={() => this.remove(article._id)}
                  edit={() => this.edit(article)}
                />
              ))
            ) : (
              <div className="mt-5 d-flex justify-content-center">
                <p className="h4">No articles yet.</p>
              </div>
            )
          ) : (
            <Loadindicator contained />
          )}
        </div>
      </div>
    );
  }
}

export default Manage_articles;
