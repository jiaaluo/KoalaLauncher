import React, { useState, memo } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import fsa from "fs-extra";
import { faHdd } from "@fortawesome/free-solid-svg-icons";
import { Button, Switch } from "antd";
import { _getModCachePath } from "../../../utils/selectors";
import {
  updateCacheModsInstances,
  updateCacheMods,
} from "../../../reducers/settings/actions";
import { openModal } from "../../../reducers/modals/actions";

const CacheView = styled.div`
  width: 100%;
  height: 100%;
`;

const CacheClass = styled.div`
  margin-top: 38px;
  width: 100%;
`;

const MainTitle = styled.h1`
  color: ${(props) => props.theme.palette.text.primary};
  margin: 0 500px 20px 0;
  margin-bottom: 20px;
`;

const Title = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: ${(props) => props.theme.palette.text.primary};
  z-index: 1;
  text-align: left;
`;

const Hr = styled.div`
  height: 25px;
`;

const ListBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  p {
    text-align: left;
    color: ${(props) => props.theme.palette.text.third};
  }
`;

const Caching = () => {
  const isPlaying = useSelector((state) => state.startedInstances);
  const queuedInstances = useSelector((state) => state.downloadQueue);
  const [deletingInstances, setDeletingInstances] = useState(false);
  const cacheMods = useSelector((state) => state.settings.cacheMods);
  const cacheModsInstances = useSelector(
    (state) => state.settings.cacheModsInstances
  );
  const modCachedPath = useSelector(_getModCachePath);

  const dispatch = useDispatch();

  const disableInstancesActions =
    Object.keys(queuedInstances).length > 0 ||
    Object.keys(isPlaying).length > 0;

  const clearCacheMods = async () => {
    setDeletingInstances(true);
    try {
      await fsa.emptyDir(modCachedPath);
    } catch (e) {
      console.error(e);
    }
    setDeletingInstances(false);
  };

  return (
    <CacheView>
      <CacheClass>
        <MainTitle>Caching</MainTitle>
        <div>
          <Title
            css={`
              margin-top: 0px;
            `}
          >
            Use Instances As Mod Cache &nbsp; <FontAwesomeIcon icon={faHdd} />
          </Title>
          <ListBox>
            <p
              css={`
                width: 450px;
              `}
            >
              Enable retreiving mods from other installed instances.
            </p>
            <Switch
              onChange={(e) => {
                dispatch(updateCacheModsInstances(e));
              }}
              checked={cacheModsInstances}
            />
          </ListBox>
        </div>
        <div>
          <Title
            css={`
              margin-top: 0px;
            `}
          >
            Cache Mods &nbsp; <FontAwesomeIcon icon={faHdd} />
          </Title>
          <ListBox>
            <p
              css={`
                width: 450px;
              `}
            >
              Enable / Disable caching mods to a dedicated folder.
            </p>
            <Switch
              onChange={(e) => {
                dispatch(updateCacheMods(e));
              }}
              checked={cacheMods}
            />
          </ListBox>
        </div>
        <div>
          <Title
            css={`
              width: 450px;
              float: left;
            `}
          >
            Clear Mod Cache &nbsp; <FontAwesomeIcon icon={faHdd} />
          </Title>
          <div
            css={`
              display: flex;
              justify-content: space-between;
              text-align: left;
              width: 100%;
              margin-bottom: 15px;
              p {
                text-align: left;
                color: ${(props) => props.theme.palette.text.third};
              }
            `}
          >
            <p
              css={`
                margin: 0;
                width: 500px;
              `}
            >
              Deletes all the cached mods.
            </p>
            <Button
              type="primary"
              onClick={() => {
                dispatch(
                  openModal("ActionConfirmation", {
                    message: "Are you sure you want to delete the mod cache?",
                    confirmCallback: clearCacheMods,
                    title: "Confirm",
                  })
                );
              }}
              disabled={disableInstancesActions}
              loading={deletingInstances}
            >
              Clear
            </Button>
          </div>
        </div>
        <Hr />
      </CacheClass>
    </CacheView>
  );
};

export default memo(Caching);
