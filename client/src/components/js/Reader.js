import React, { Component } from 'react';
import { Table, Grid, Button, Container, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import '../css/Reader.css';

class Reader extends Component {
  constructor() {
      super();
  }

  render() {
    return (
      <div className="reader">
        <Container>
          <Grid verticalAlign='middle'>
            <Grid.Column floated='right' width={4}>
              <Button.Group >
                <Button color='grey'>
                  <Link to='/' className='buttonLinkWhite'>BACK</Link>
                </Button>
                <Button
                  color='teal'
                  onClick={() => {this.props.handleArticleEdit('modify');}}
                >
                  <Link to={`/editor/${this.props.id}`} className="buttonLinkWhite">EDIT</Link>
                </Button>
              </Button.Group>
            </Grid.Column>
          </Grid>
          <Header as='h1'>{this.props.article.TITLE}</Header>
          <p className="readerContent">
            {this.props.article.CONTENT}
          </p>
          <Grid verticalAlign='middle'>
            <Grid.Column floated='left' width={10}>
            <Table >
              <Table.Body>
                <Table.Row>
                    <Table.Cell>CREATE TIME</Table.Cell>
                    <Table.HeaderCell>{this.props.article.CREATE_TIME}</Table.HeaderCell>
                    <Table.Cell>UPDATE TIME</Table.Cell>
                    <Table.HeaderCell>{this.props.article.UPDATE_TIME}</Table.HeaderCell>
                </Table.Row>
              </Table.Body>
            </Table>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default Reader;