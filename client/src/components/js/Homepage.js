import React, { Component } from 'react';
import { Button, Table, Pagination } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import '../css/Homepage.css';

class Homepage extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="homepage">
        <div className="addArticle">
          <Link to='/editor/0'>
            <Button
              basic color='teal'
              onClick={() => {this.props.handleArticleEdit('new');}}
            >
              + ADD ARTiCLE
            </Button>
          </Link>
        </div>
        <div className="articleList">
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell
                  textAlign="center"
                  width="eight"
                >
                  TITLE
                </Table.HeaderCell>
                <Table.HeaderCell
                  textAlign="center"
                  width="three"
                >
                  UPDATE TIME
                </Table.HeaderCell>
                <Table.HeaderCell
                  textAlign="center"
                  width="three"
                >
                  DO SOMETHING
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.articleList.map((article) => {
                return (<Table.Row key={article.ID}>
                  <Table.Cell>
                  <Link to={`/reader/${article.ID}`} className="articleTitle">
                    {article.TITLE}
                  </Link>
                  </Table.Cell>
                  <Table.Cell textAlign="center">{article.UPDATE_TIME}</Table.Cell>
                  <Table.Cell textAlign="center">
                    <Button.Group widths='2'>
                      <Button
                        color='teal'
                        onClick={() => {this.props.handleArticleEdit('modify');}}
                      >
                        <Link to={`/editor/${article.ID}`} className='buttonLinkWhite'>
                          EDIT
                        </Link>
                      </Button>
                      <Button
                        color='grey'
                        onClick={() => {this.props.handleArticleDelete(article.ID);}}
                      >DELETE</Button>
                    </Button.Group>
                  </Table.Cell>
                </Table.Row>);
              })}
            </Table.Body>
          </Table>
        </div>
        <div className="homepageFooter">
          <Pagination
            activePage={this.props.activePage}
            onPageChange={this.props.handlePaginationChange}
            totalPages={this.props.totalPages}
          />
        </div>
      </div>
    );
  }
}

export default Homepage;