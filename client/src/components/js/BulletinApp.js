import React, { Component } from 'react';
import { Switch, BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import Homepage from './Homepage';
import Reader from './Reader';
import Editor from './Editor';
import { FacebookLogin, GoogleLogin } from './Login'
import '../css/BulletinApp.css';

class BulletinApp extends Component {
  constructor() {
    super();
    this.state = {
      activePage: 1,
      totalPages: 0,
      articleList: [],
      editMode: 'new',
      newId: 0,
      user: {
        isLoggedIn: false,
        userID: '',
        name: '',
        email: '',
        picture: ''
      },
    }
    this.facebookLogin = this.facebookLogin.bind(this);
    this.googleLogin = this.googleLogin.bind(this);
    this.facebookLoginCallback = this.facebookLoginCallback.bind(this);
    this.googleLoginCallback = this.googleLoginCallback.bind(this);
    this.loadArticleList = this.loadArticleList.bind(this);
    this.handlePaginationChange = this.handlePaginationChange.bind(this);
    this.handleArticleEdit = this.handleArticleEdit.bind(this);
    this.handleArticleSubmit = this.handleArticleSubmit.bind(this);
    this.handleArticleDelete = this.handleArticleDelete.bind(this);
    this.findIndex = this.findIndex.bind(this);
  }

  componentWillMount() {
    this.loadArticleList();
  }

  facebookLogin() {
    fetch('/facebook')
      .then((res) => (res.json()))
      .then((data) => {
        console.log(data);
        document.location.href=data.redirectUrl;
      });
  }

  googleLogin() {
    fetch('/google')
      .then((res) => (res.json()))
      .then((data) => {
        console.log(data.redirectUrl);
        document.location.href=data.redirectUrl;
      });
  }

  facebookLoginCallback(data) {
    //window.location.href = '/';
    console.log('in facebookLoginCallback');
    console.log(data);
    this.setState({
      user: {
        isLoggedIn: true,
        userID: data.id,
        name: data.name,
        //email: data.email,
        picture: data.picture.data.url,
      }
    });
  }

  googleLoginCallback(data) {
    //window.location.href = '/';
    console.log('in googleLoginCallback');
    console.log(data);
    /*
    this.setState({
      user: {
        isLoggedIn: true,
        userID: data.id,
        name: data.name,
        //email: data.email,
        picture: data.picture.data.url,
      }
    });
    */
  }

  loadArticleList() {
    // Reload datagrid
    fetch(`/api/articles/${this.state.activePage}`)
      .then((res) => (res.json()))
      .then((data) => {
        this.setState({
          articleList: data.articleList,
          totalPages: data.pageCnt,
        });
      });
  }

  handlePaginationChange(e, { activePage }) {
    // Flip page and reload the datagrid
    let setPage = new Promise((resolve, reject) => {
      this.setState({ activePage });
      resolve('Success');
      reject('Failed');
    });
    setPage.then((msg) => {
      if (msg === 'Success') {
        this.loadArticleList();
      }
    });
  };
  

  handleArticleEdit(mode) {
    // Add a new article => 'new'
    // Edit original article => 'modify'
    this.setState({
      editMode: mode,
    });
  }

  handleArticleDelete(id) {
    // Article Deletion from Datagrid
    fetch('/api/delete', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        page: this.state.activePage,
      }),
    })
      .then((res) => (res.json(res)))
      .then((data) => {
        this.setState({
          articleList: data.articleList,
          totalPages: data.pageCnt,
        });
      })
  }

  handleArticleSubmit(e, id, newArticle) {
    // Edit or New article Submission
    fetch('/api/editor', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        newArticle: newArticle,
        editMode: this.state.editMode,
        page: this.state.activePage,
      }),
    })
      .then((res) => (res.json(res)))
      .then((data) => {
        this.setState({
          articleList: data.articleList,
          totalPages: data.pageCnt,
        });
      })
      .then(this.props.history.goBack);
  }
  
  findIndex(id) {
    // Find index of Data grid(articleList) array to pass specific props to Reader or Editor component
    for (let i = 0; i < this.state.articleList.length; i = i + 1) {
      if (parseInt(this.state.articleList[i].ID) === parseInt(id)) {
        return i;
      }
    }
    return 0;
  }
  
  render() {
    console.log(this.state.user);
    
    return (
      <div className="bullitinApp">
        <div className="appTitle">Bulletin</div>
        <Router>
          <Switch>
            <Route exact path="/" render={(props) => (
              <Homepage 
                {...this.state} 
                totalPage={this.state.totalPages}
                googleLogin={this.googleLogin}
                facebookLogin={this.facebookLogin}
                loadArticleList={this.loadArticleList}
                handlePaginationChange={this.handlePaginationChange}
                handleArticleEdit={this.handleArticleEdit}
                handleArticleDelete={this.handleArticleDelete}
              />)} />
            <Route path="/reader/:id" component={({ match }) => {
              const index = this.findIndex(match.params.id);
              return (
                <Reader 
                  id={match.params.id}
                  article={this.state.articleList[index]}
                  handleArticleEdit={this.handleArticleEdit}
                  handleArticleDelete={this.handleArticleDelete}
                />
              );}} />
            <Route path="/editor/:id" component={({ match }) => {
              const index = this.findIndex(match.params.id);
              return (
                <Editor
                  id={match.params.id}
                  article={this.state.articleList[index]}
                  editMode={this.state.editMode}
                  handleArticleSubmit={this.handleArticleSubmit}
                />
              );}} />
            <Route path="/facebook/callback" render={() => (
              <FacebookLogin 
                facebookLoginCallback={this.facebookLoginCallback}
              />)} />
            <Route path="/google/callback" render={() => (
              <GoogleLogin 
                googleLoginCallback={this.googleLoginCallback}
              />)} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default withRouter(BulletinApp);