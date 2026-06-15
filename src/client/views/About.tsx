import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import colors from 'client/styles/colors';
import Heading from 'client/components/Form/Heading';
import Footer from 'client/components/misc/Footer';
import Nav from 'client/components/Form/Nav';
import Button from 'client/components/Form/Button';
import AdditionalResources from 'client/components/misc/AdditionalResources';
import { StyledCard } from 'client/components/Form/Card';
import docs, { about, featureIntro, license, fairUse, supportUs } from 'client/utils/docs';

const AboutContainer = styled.div`
width: 95vw;
max-width: 1000px;
margin: 2rem auto;
padding-bottom: 1rem;
header {
  margin 1rem 0;
  width: auto;
}
section {
  width: auto;
  .inner-heading { display: none; }
}
`;

const HeaderLinkContainer = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  a {
    text-decoration: none;
  }
`;

const Section = styled(StyledCard)`
  margin-bottom: 2rem;
  overflow: clip;
  max-height: 100%;
  section {
    clear: both;
  }
  h3 {
    font-size: 1.5rem;
  }
  hr {
    border: none;
    border-top: 1px dashed ${colors.primary};
    margin: 1.5rem auto;
  }
  ul {
    padding: 0 0 0 1rem;
    list-style: circle;
  }
  a {
    color: ${colors.primary};
    &:visited {
      opacity: 0.8;
    }
  }
  pre {
    background: ${colors.background};
    border-radius: 4px;
    padding: 0.5rem;
    width: fit-content;
  }
  small {
    opacity: 0.7;
  }
  .contents {
    ul {
      list-style: none;
      li {
        a {
          // color: ${colors.textColor};
          &:visited {
            opacity: 0.8;
          }
        }
        b {
          opacity: 0.75;
          display: inline-block;
          width: 1.5rem;
        }
      }
    }
  }
  .example-screenshot {
    float: right;
    display: inline-flex;
    flex-direction: column;
    clear: both;
    max-width: 300px;
    img {
      float: right;
      break-inside: avoid;
      max-width: 300px;
      // max-height: 30rem;
      border-radius: 6px;
      clear: both;
    }
    figcaption {
      font-size: 0.8rem;
      text-align: center;
      opacity: 0.7;
    }
  }
`;

const makeAnchor = (title: string): string =>
  title
    .toLowerCase()
    .replace(/[^\w\s]|_/g, '')
    .replace(/\s+/g, '-');

const About = (): JSX.Element => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to hash fragment if present
    if (location.hash) {
      // Add a small delay to ensure the page has fully rendered
      setTimeout(() => {
        const element = document.getElementById(location.hash.slice(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location]);

  return (
    <div>
      <AboutContainer>
        <Nav>
          <HeaderLinkContainer>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.skool.com/rocketlauncher-university"
            >
              <Button>Join our free community</Button>
            </a>
          </HeaderLinkContainer>
        </Nav>

        <Heading as="h2" size="medium" color={colors.primary}>
          Intro
        </Heading>
        <Section>
          {about.map((para, index: number) => (
            <p key={index}>{para}</p>
          ))}
          <hr />
          <p>
            RocketScanner is free to use. If you're looking to grow your business, try{' '}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.gohighlevel.com/affiliate-30trial?fp_ref=30dayfreetrialrl"
            >
              GoHighLevel free for 30 days
            </a>
            . You can also{' '}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.skool.com/rocketlauncher-university"
            >
              join our free community
            </a>{' '}
            to connect with others.
          </p>
        </Section>

        <Heading as="h2" size="medium" color={colors.primary}>
          Features
        </Heading>
        <Section>
          {featureIntro.map((fi: string, i: number) => (
            <p key={i}>{fi}</p>
          ))}
          <div className="contents">
            <Heading as="h3" size="small" id="#feature-contents" color={colors.primary}>
              Contents
            </Heading>
            <ul>
              {docs.map((section, index: number) => (
                <li key={index}>
                  <b>{index + 1}</b>
                  <a href={`#${makeAnchor(section.title)}`}>{section.title}</a>
                </li>
              ))}
            </ul>
            <hr />
          </div>
          {docs.map((section, sectionIndex: number) => (
            <section key={section.title}>
              {sectionIndex > 0 && <hr />}
              <Heading as="h3" size="small" id={makeAnchor(section.title)} color={colors.primary}>
                {section.title}
              </Heading>
              {section.screenshot && (
                <figure className="example-screenshot">
                  <img
                    className="screenshot"
                    src={section.screenshot}
                    alt={`Example Screenshot ${section.title}`}
                  />
                  <figcaption>
                    Fig.{sectionIndex + 1} - Example of {section.title}
                  </figcaption>
                </figure>
              )}
              {section.description && (
                <>
                  <Heading as="h4" size="small">
                    Description
                  </Heading>
                  <p>{section.description}</p>
                </>
              )}
              {section.use && (
                <>
                  <Heading as="h4" size="small">
                    Use Cases
                  </Heading>
                  <p>{section.use}</p>
                </>
              )}
              {section.resources && section.resources.length > 0 && (
                <>
                  <Heading as="h4" size="small">
                    Useful Links
                  </Heading>
                  <ul>
                    {section.resources.map(
                      (link: string | { title: string; link: string }, linkIndx: number) =>
                        typeof link === 'string' ? (
                          <li key={`link-${linkIndx}`} id={`link-${linkIndx}`}>
                            <a target="_blank" rel="noreferrer" href={link}>
                              {link}
                            </a>
                          </li>
                        ) : (
                          <li key={`link-${linkIndx}`} id={`link-${linkIndx}`}>
                            <a target="_blank" rel="noreferrer" href={link.link}>
                              {link.title}
                            </a>
                          </li>
                        ),
                    )}
                  </ul>
                </>
              )}
            </section>
          ))}
        </Section>

        <Heading as="h2" size="medium" color={colors.primary}>
          Configuring
        </Heading>
        <Section>
          <p>
            There are some optional environmental variables you can specify to give you access to
            some additional checks.
          </p>

          <ul>
            <li>
              <code>GOOGLE_CLOUD_API_KEY</code>:{' '}
              <a
                target="_blank"
                rel="noreferrer"
                href="https://cloud.google.com/api-gateway/docs/authenticate-api-keys"
              >
                A Google API key
              </a>
              <i> Used to return quality metrics for a site</i>
            </li>
            <li>
              <code>REACT_APP_SHODAN_API_KEY</code>:{' '}
              <a target="_blank" rel="noreferrer" href="https://account.shodan.io/">
                A Shodan API key
              </a>
              <i> To show associated hosts for a domain</i>
            </li>
            <li>
              <code>REACT_APP_WHO_API_KEY</code>:{' '}
              <a target="_blank" rel="noreferrer" href="https://whoapi.com/">
                A WhoAPI key
              </a>
              <i> Allows for more comprehensive WhoIs records</i>
            </li>
          </ul>
        </Section>

        <Heading as="h2" size="medium" color={colors.primary}>
          API Documentation
        </Heading>
        <Section>
          <p>// Coming soon...</p>
        </Section>

        <Heading as="h2" size="medium" color={colors.primary}>
          Additional Resources
        </Heading>
        <AdditionalResources />

        <Heading as="h2" size="medium" color={colors.primary}>
          Support Us
        </Heading>
        <Section>
          {supportUs.map((para) => (
            <p dangerouslySetInnerHTML={{ __html: para }} />
          ))}
        </Section>

        <Heading as="h2" size="medium" color={colors.primary}>
          Terms & Info
        </Heading>
        <Section>
          <Heading as="h3" size="small" color={colors.primary}>
            License
          </Heading>
          <b>© RocketScanner {new Date().getFullYear()}</b>
          <pre>{license}</pre>
          <hr />
          <Heading as="h3" size="small" color={colors.primary}>
            Fair Use
          </Heading>
          <ul>
            {fairUse.map((para) => (
              <li>{para}</li>
            ))}
          </ul>
          <hr />
          <Heading as="h3" size="small" color={colors.primary}>
            Privacy
          </Heading>
          <p>
            Analytics are used on the demo instance (via a self-hosted Plausible instance), this
            only records the URL you visited but no personal data. There's also some basic error
            logging (via a self-hosted GlitchTip instance), this is only used to help me fix bugs.
            <br />
            <br />
            Neither your IP address, browser/OS/hardware info, nor any other data will ever be
            collected or logged. (You may verify this yourself, either by inspecting the source code
            or the using developer tools)
          </p>
        </Section>
      </AboutContainer>
      <Footer />
    </div>
  );
};

export default About;
