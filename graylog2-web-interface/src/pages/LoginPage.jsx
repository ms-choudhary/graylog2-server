import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Row, Button, FormGroup, Alert } from 'react-bootstrap';
import { DocumentTitle } from 'components/common';

import { login } from 'ducks/sessions/sessions';

import { Input } from 'components/bootstrap';
import LoadingPage from './LoadingPage';

import disconnectedStyle from '!style/useable!css!less!stylesheets/disconnected.less';
import authStyle from '!style/useable!css!less!stylesheets/auth.less';

const LoginPage = React.createClass({
  propTypes: {
    isLoading: PropTypes.bool,
    error: PropTypes.string,
    login: PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      loading: false,
    };
  },

  componentDidMount() {
    disconnectedStyle.use();
    authStyle.use();
    // SessionActions.validate();
  },
  componentWillUnmount() {
    disconnectedStyle.unuse();
    authStyle.unuse();
  },

  onSignInClicked(event) {
    event.preventDefault();
    this.resetLastError();
    this.setState({ loading: true });
    const username = this.refs.username.getValue();
    const password = this.refs.password.getValue();
    const location = document.location.host;
    this.props.login(username, password, location);
  },
  formatLastError(error) {
    if (error) {
      return (
        <div className="form-group">
          <Alert bsStyle="danger">
            <a className="close" onClick={this.resetLastError}>×</a>{error}
          </Alert>
        </div>
      );
    }
    return null;
  },
  resetLastError() {
    // this.setState({ lastError: undefined });
  },
  render() {
    // if (this.state.validatingSession) {
    //   return (
    //     <LoadingPage />
    //   );
    // }

    return (
      <DocumentTitle title="Sign in">
        <div>
          <div className="container" id="login-box">
            <Row>
              <form className="col-md-4 col-md-offset-4 well" id="login-box-content" onSubmit={this.onSignInClicked}>
                <legend><i className="fa fa-group" /> Welcome to Graylog</legend>

                {this.props.error && this.formatLastError(this.props.error)}

                <Input ref="username" id="username" type="text" placeholder="Username" autoFocus />

                <Input ref="password" id="password" type="password" placeholder="Password" />

                <FormGroup>
                  <Button type="submit" bsStyle="info" disabled={this.props.isLoading}>
                    {this.props.isLoading ? 'Signing in...' : 'Sign in'}
                  </Button>
                </FormGroup>

              </form>
            </Row>
          </div>
        </div>
      </DocumentTitle>
    );
  },
});

const mapStateToProps = state => ({
  isLoading: state.sessions.frontend.isLoading,
  error: state.sessions.frontend.error,
});

const mapDispatchToProps = dispatch => ({
  login: (username, password, location) => dispatch(login(username, password, location)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

