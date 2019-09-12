import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import { SubmitKudosForm } from 'src/pages/SubmitKudosForm';
import { AppBar } from './components/AppBar';

import { AppConfigProvider } from 'src/contexts';

export const Root = () => {

  return (
    <AppConfigProvider value={window.app}>
      <AppBar />
      <Container>
        <Row>
          <Col>
            <SubmitKudosForm/>
          </Col>
        </Row>
      </Container>
    </AppConfigProvider>
  );
};
