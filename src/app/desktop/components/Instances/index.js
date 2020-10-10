import React, { useState, useEffect, memo } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import path from "path";
import { ipcRenderer } from "electron";
import { promises as fs } from "fs";
import { Button } from "antd";
import Instance from "./Instance";
import { _getInstances } from "../../../../common/utils/selectors";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const NoInstance = styled.div`
  width: 100%;
  text-align: center;
  font-size: 25px;
  margin-top: 100px;
`;

const SubNoInstance = styled.div`
  width: 100%;
  text-align: center;
  font-size: 15px;
  margin-top: 20px;
`;

const Instances = () => {
  const instances = useSelector(_getInstances);
  const [showOldGDHelp, setShowOldGDHelp] = useState(null);

  const checkOldInstances = async () => {
    const appData = await ipcRenderer.invoke("getAppdataPath");

    try {
      await fs.stat(
        path.resolve(
          appData,
          "../",
          "Local",
          "Programs",
          "gdlauncher",
          "GDLauncher.exe"
        )
      );
      setShowOldGDHelp(true);
    } catch {
      setShowOldGDHelp(false);
    }
  };

  useEffect(() => {
    checkOldInstances();
  }, []);

  return (
    <Container>
      {instances.length > 0 ? (
        instances.map((i) => <Instance key={i.name} instanceName={i.name} />)
      ) : (
        <NoInstance>
          {showOldGDHelp
            ? "Click here to learn how to migrate your GDLauncher Instaces."
            : "No Instances"}
          <SubNoInstance>
            {showOldGDHelp ? (
              <Button
                css={`
                  width: 200px;
                  height: 40px;
                  font-size: 20px;
                  padding: 4px !important;
                  margin-top: 20px;
                `}
                type="primary"
                href="https://www.koalalauncher.com/docs/upgrade-path-from-gdlauncher/"
              >
                Migrate
              </Button>
            ) : (
              <div>
                Click on the icon in the bottom left corner to add new instances
              </div>
            )}
          </SubNoInstance>
        </NoInstance>
      )}
    </Container>
  );
};

export default memo(Instances);
