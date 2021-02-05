/* eslint-disable react/no-unescaped-entities */
import React, { memo, useState, useEffect } from "react";
import styled from "styled-components";
import { Button } from "antd";
import { ipcRenderer } from "electron";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import Modal from "../components/Modal";

const Changelogs = () => {
  const [version, setVersion] = useState(null);

  useEffect(() => {
    ipcRenderer.invoke("getAppVersion").then(setVersion).catch(console.error);
  }, []);

  return (
    <Modal
      css={`
        height: 500px;
        width: 650px;
      `}
      title={`What's new in ${version}`}
    >
      <Container>
        <Section>
          <SectionTitle
            css={`
              color: ${(props) => props.theme.palette.colors.green};
            `}
          >
            <span>New Features</span>
          </SectionTitle>
          <div>
            <ul>
              <li>
                The Settings Menu has been redone to make it cleaner for the end
                user.
              </li>
              <li>
                We changed the default font due to licensing reasons. Hopefully
                it looks nice
              </li>
              <li>
                You can now import Modpack ZIPs by dragging them on top of the
                launcher.
              </li>
            </ul>
          </div>
        </Section>
        <Section>
          <SectionTitle
            css={`
              color: ${(props) => props.theme.palette.colors.red};
            `}
          >
            <span>Bug Fixes</span>
          </SectionTitle>
          <div>
            <ul>
              <li>
                Instances should now properly close when being exited. We know
                it was annoying
              </li>
            </ul>
            <ul>
              <li>
                Fixed duplicate news posts by using the official RSS Endpoint.
                Not like anyone reads the news anyways.
              </li>
            </ul>
            <ul>
              <li>
                Default memory is now set to 6GB. Most packs will not run with
                4GB anymore. Is this really how bad memory management has
                become.
              </li>
            </ul>
            <ul>
              <li>
                A lot of work has been done on the backend to clean up the
                codebase to improve stability. Thank you all for being patient
                with us.
              </li>
            </ul>
          </div>
        </Section>
        <Section>
          <SectionTitle
            css={`
              color: ${(props) => props.theme.palette.colors.lavander};
            `}
          >
            <span>Join Our Community</span>
          </SectionTitle>
          <p>
            We <b>really</b> love our users, that is why we have a Discord
            Server to talk to them!
          </p>
          <Button
            css={`
              width: 200px;
              height: 40px;
              font-size: 20px;
              padding: 4px !important;
              margin-top: 20px;
            `}
            type="primary"
            href="https://invite.gg/KoalaDevs"
          >
            <FontAwesomeIcon icon={faDiscord} />
            &nbsp; Discord
          </Button>
        </Section>
      </Container>
    </Modal>
  );
};

export default memo(Changelogs);

const Container = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  overflow-y: auto;
  color: ${(props) => props.theme.palette.text.primary};
`;

const SectionTitle = styled.h2`
  width: 100%;
  text-align: center;
  border-bottom: 1px solid;
  line-height: 0.1em;
  margin: 10px 0 20px;

  span {
    background: ${(props) => props.theme.palette.secondary.main};
    padding: 0 10px;
  }
`;

const Section = styled.div`
  width: 100%;
  text-align: center;
  font-size: 16px;
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    margin: 40px 0;
    border-radius: 5px;

    p {
      margin: 20px 0;
    }

    li {
      text-align: start;
    }
  }
`;
