import React, { useState } from 'react';
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button
} from 'react-bootstrap';
import { useLocation } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap'
import { Transport } from '@coolwallet/core';
import Coins from './coins';

import './HeadBar.css';

const defaultPath = '/settings';

function HeadBar(input: {
  transport: Transport | null,
  connect: () => void,
  disconnect: () => void,
}): JSX.Element {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  return (
    <Navbar variant='dark' expand='lg'>
      <Container fluid>
        <Nav
          variant='tabs'
          activeKey={activeTab}
          onSelect={(key) => {
            if (typeof key === 'string') {
              setActiveTab(key);
            }
          }}
        >
          <LinkContainer to={defaultPath}>
            <Nav.Link className='NavItem'>
              Settings
            </Nav.Link>
          </LinkContainer>
          <NavDropdown
            active={activeTab !== defaultPath}
            menuVariant='dark'
            className='NavItem'
            title={activeTab === defaultPath
              ? 'Coins'
              : `Coin-${activeTab.slice(1)}`}
            id='nav-dropdown'
          >
            {Coins.map(({ path }, i) => (
              <LinkContainer key={i} to={path}>
                <NavDropdown.Item>{path}</NavDropdown.Item>
              </LinkContainer>
            ))}
          </NavDropdown>
        </Nav>
        <Form className='d-flex col-3'>
          <FormControl
            placeholder={input.transport?.device.name ?? 'Card Name'}
            className='me-2'
            aria-label='Card Name'
            disabled
          />
          {input.transport
            ? (
              <Button variant='outline-warning' onClick={input.disconnect}>
                Disconnect
              </Button>
            )
            : (
              <Button variant='light' onClick={input.connect}>
                Connect
              </Button>
            )}
        </Form>
      </Container>
    </Navbar>
  );
}

export default HeadBar;
