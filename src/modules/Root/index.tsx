import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import { SubmitKudosForm } from 'modules/SubmitKudosForm';
import { AppBar } from './components/AppBar';

import { AppCfgContext } from '../../contexts';

export const Root = () => {
  const appCfgCtxInitialState = {
    name: window.app.package.name,
  };

  return (
    <AppCfgContext.Provider value={appCfgCtxInitialState}>
      <AppBar />
      <Container>
        <Row>
          <Col>
            <SubmitKudosForm/>
          </Col>
        </Row>
      </Container>
    </AppCfgContext.Provider>
  );
};
