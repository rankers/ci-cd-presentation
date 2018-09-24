// Import React
import React from 'react';

// Import Spectacle Core tags
import {
  BlockQuote,
  Cite,
  Deck,
  Heading,
  ListItem,
  List,
  Quote,
  Slide,
  Text,
} from 'spectacle';

// Import theme
import createTheme from 'spectacle/lib/themes/default';

// Require CSS
require('normalize.css');

const theme = createTheme(
  {
    primary: 'white',
    secondary: '#1F2022',
    tertiary: '#03A9FC',
    quartenary: '#CECECE',
  },
  {
    primary: 'Montserrat',
    secondary: 'Helvetica',
  }
);

const sources = {
  cd: 'Continuous Delivery: Reliable ...'
}

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck
        transition={['zoom', 'slide']}
        transitionDuration={500}
        theme={theme}
      >
        <Slide transition={['zoom']} bgColor="primary">
          <Heading size={1} fit caps lineHeight={1} textColor="secondary">
            Continuous Delivery
          </Heading>
          <List>
            <ListItem>Configuration Management</ListItem>
            <ListItem>Commit Stage</ListItem>
            <ListItem>Continuous Integration</ListItem>
            <ListItem>Deployment Pipeline</ListItem>
            <ListItem>Version Control</ListItem>
          </List>
        </Slide>
        <Slide transition={['zoom']} bgColor="primary">
          <Heading size={1} fit caps lineHeight={1} textColor="secondary">
              Configuration Management
          </Heading>
          <Quote>
            Configuration management refers to the process by which all artifacts relevant to your project and the relationships between them, are stored, retrieved, uniquely identified and modified.
          </Quote>
          <Cite>{sources.cd}</Cite>
        </Slide>
        <Slide transition={['zoom']} bgColor="primary">
          <Heading size={1} fit caps lineHeight={1} textColor="secondary">
              Configuration Management
          </Heading>
          <Text>
            Can you say yes to the following?
          </Text>
          <Text>
            <List>
              <ListItem>
                Can I exactly reproduce any of my       environments, including the version of the OS, network configuration, software stack, applications deployed into it and their configuration
              </ListItem>
              <ListItem>
                Can I easily make an incremental change to any of these individual items and deploy the change to any and all of my environments
              </ListItem>
              <ListItem>
                Can I easily see each change that occurred to a particular environment and trace it back to see exactly what the change was, who made it, and when they made it?
              </ListItem>
              <ListItem>
                Can I satisfy all the compliance regulations I am subject to?
              </ListItem>
            </List>
          </Text>
        </Slide>
        <Slide transition={['zoom']} bgColor="primary">
          <Heading size={1} fit caps lineHeight={1} textColor="secondary">
              Testing Strategy
          </Heading>
        </Slide>
        <Slide transition={['zoom']} bgColor="primary">
          <Heading size={1} fit caps lineHeight={1} textColor="secondary">
              Continuous Integration
          </Heading>
        </Slide>
        <Slide transition={['zoom']} bgColor="primary">
          <Heading size={1} fit caps lineHeight={1} textColor="secondary">
              Deployment Pipeline
          </Heading>
        </Slide>
        <Slide transition={['zoom']} bgColor="primary">
          <Heading size={1} fit caps lineHeight={1} textColor="secondary">
              Commit Stage
          </Heading>
        </Slide>
        <Slide transition={['zoom']} bgColor="primary">
          <Heading size={1} fit caps lineHeight={1} textColor="secondary">
              Version Control
          </Heading>
        </Slide>
      </Deck>
    );
  }
}
