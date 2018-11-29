import React, { Component } from 'react';
import { Button, Table, Pagination, Icon, Grid, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
//import FacebookLogin from 'react-facebook-login';
import '../css/Homepage.css';

class Homepage extends Component {
  constructor() {
    super();

    //this.componentClicked = this.componentClicked.bind(this);
    //this.responseFacebook = this.responseFacebook.bind(this);
  }

  

  render() {
    console.log(this.props.user);
    let fbContent;
    if (this.props.user.isLoggedIn) {
      //fbContent = null;
      fbContent = (<Grid>
        <Grid.Row verticalAlign='middle' columns={2}>
          <Grid.Column width={2} textAlign='center'>
            <Image
              avatar
              src={this.props.user.picture}
            />
          </Grid.Column>
          <Grid.Column floated='left'>
            <h4>{`Hello! ${this.props.user.name}`}</h4>
          </Grid.Column>
        </Grid.Row>
      </Grid>);
    } else {
      fbContent = (
        //<Link to='/'>
        <div>
          <Button
            color='facebook'
            size='large'
            onClick={this.props.facebookLogin}
          >
            <Icon name='facebook' /> Facebook Login
          </Button>
          <Button
            color='google plus'
            size='large'
            onClick={this.props.googleLogin}
          >
            <Icon name='google plus' /> Google Login
          </Button>
        </div>);
        //</Link>);
    }
    
    return (
      <div className="homepage">
        <div className="login">
          {fbContent}
        </div>
        <div className="addArticle">
          <Link to='/editor/0'>
            <Button
              basic color='teal'
              size='large'
              onClick={() => {this.props.handleArticleEdit('new');}}
            >
              + ADD ARTICLE
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