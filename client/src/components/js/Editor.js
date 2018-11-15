import React, { Component } from 'react';
import { Container, Form, Button } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import '../css/Editor.css';

class Editor extends Component {
  constructor() {
    super();
    this.state = {
      articleEditNow: {
        TITLE: '',
        CONTENT: '',
      },
    }
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
  }

  componentWillMount() {
    // put the original data into input text field
    if (this.props.editMode === 'modify') {
      this.setState({
        articleEditNow: {
          TITLE: this.props.article.TITLE,
          CONTENT: this.props.article.CONTENT,
        }
      });
    }
  }

  handleTitleChange(e) {
    this.setState({
      articleEditNow: {
        TITLE: e.target.value,
        CONTENT: this.state.articleEditNow.CONTENT,
      }
    });
  }

  handleContentChange(e) {
    this.setState({
      articleEditNow: {
        TITLE: this.state.articleEditNow.TITLE,
        CONTENT: e.target.value,
      }
    });
  }
  
  render() {
    let timeDisplay = null;
    if(this.props.editMode === 'modify') {
      timeDisplay = (
        <Form.Group widths='equal'>
          <Form.Field>
            <label>Create Time</label>
            <p>{this.props.article.CREATE_TIME}</p>
          </Form.Field>
          <Form.Field>
            <label>Latest Update</label>
            <p>{this.props.article.UPDATE_TIME}</p>
          </Form.Field>
        </Form.Group>
      );
    }

    return (
      <div className="editor">
        <Container>
          <Form size='big'>
            <Form.Field>
              <label>Title</label>
              <input
                value={this.state.articleEditNow.TITLE}
                onChange={this.handleTitleChange}
                placeholder='Please enter the title of your article!'
              />
            </Form.Field>
            <Form.TextArea
              label='Content'
              value={this.state.articleEditNow.CONTENT}
              onChange={this.handleContentChange}
              placeholder='Please enter the content...'
              autoHeight
              style={{ minHeight: 300 }}
            />
            {timeDisplay}
          </Form>
          <div className="editorButton">
            <Button
              color='teal'
              onClick={(e) => { this.props.handleArticleSubmit(e, this.props.id, this.state.articleEditNow); }}
            >Submit</Button>
            <Button
              onClick={this.props.history.goBack}
            >Cancel</Button>
          </div>
        </Container>
        <div className="editorFooter" ></div>
      </div>
    );
  }
}

export default withRouter(Editor);