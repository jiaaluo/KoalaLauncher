// @flow
import axios from "axios";
import qs from "querystring";
import {
  YGGDRASIL,
  CURSEFORGE_API,
  MINECRAFT_MANIFEST,
  FABRIC_API,
  JAVA_MANIFEST_URL,
  IMGUR_CLIENT_ID,
  CURSEFORGE_CATEGORIES,
  MICROSOFT_LIVE_LOGIN_URL,
  MICROSOFT_XBOX_LOGIN_URL,
  MICROSOFT_XSTS_AUTH_URL,
  MINECRAFT_SERVICES_URL,
  MODPACKSCH_API,
  PASTEBIN_API_KEY,
} from "./utils/constants";
import { sortByDate } from "./utils";

// Microsoft Auth

export const msExchangeCodeForAccessToken = (
  clientId,
  redirectUrl,
  code,
  codeVerifier
) => {
  return axios.post(
    `${MICROSOFT_LIVE_LOGIN_URL}/oauth20_token.srf`,
    qs.stringify({
      grant_type: "authorization_code",
      client_id: clientId,
      scope: "offline_access xboxlive.signin xboxlive.offline_access",
      redirect_uri: redirectUrl,
      code,
      code_verifier: codeVerifier,
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Skip-Origin": "skip",
      },
    }
  );
};

export const msAuthenticateXBL = (accessToken) => {
  return axios.post(
    `${MICROSOFT_XBOX_LOGIN_URL}/user/authenticate`,
    {
      Properties: {
        AuthMethod: "RPS",
        SiteName: "user.auth.xboxlive.com",
        RpsTicket: `d=${accessToken}`, // your access token from step 2 here
      },
      RelyingParty: "http://auth.xboxlive.com",
      TokenType: "JWT",
    },
    {
      headers: {
        "x-xbl-contract-version": 1,
      },
    }
  );
};

export const msAuthenticateXSTS = (xblToken) => {
  return axios.post(`${MICROSOFT_XSTS_AUTH_URL}/xsts/authorize`, {
    Properties: {
      SandboxId: "RETAIL",
      UserTokens: [xblToken],
    },
    RelyingParty: "rp://api.minecraftservices.com/",
    TokenType: "JWT",
  });
};

export const msAuthenticateMinecraft = (uhsToken, xstsToken) => {
  return axios.post(
    `${MINECRAFT_SERVICES_URL}/authentication/login_with_xbox`,
    {
      identityToken: `XBL3.0 x=${uhsToken};${xstsToken}`,
    }
  );
};

export const msMinecraftProfile = (mcAccessToken) => {
  return axios.get(`${MINECRAFT_SERVICES_URL}/minecraft/profile`, {
    headers: {
      Authorization: `Bearer ${mcAccessToken}`,
    },
  });
};

export const msOAuthRefresh = (clientId, refreshToken) => {
  return axios.post(
    `${MICROSOFT_LIVE_LOGIN_URL}/oauth20_token.srf`,
    qs.stringify({
      grant_type: "refresh_token",
      scope: "offline_access xboxlive.signin xboxlive.offline_access",
      client_id: clientId,
      refresh_token: refreshToken,
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Skip-Origin": "skip",
      },
    }
  );
};

// Minecraft API

export const mcAuthenticate = (username, password, clientToken) => {
  return axios.post(
    `${YGGDRASIL}/authenticate`,
    {
      agent: {
        name: "Minecraft",
        version: 1,
      },
      username,
      password,
      clientToken,
      requestUser: true,
    },
    { headers: { "Content-Type": "application/json" } }
  );
};

export const mcValidate = (accessToken, clientToken) => {
  return axios.post(
    `${YGGDRASIL}/validate`,
    {
      accessToken,
      clientToken,
    },
    { headers: { "Content-Type": "application/json" } }
  );
};

export const mcRefresh = (accessToken, clientToken) => {
  return axios.post(
    `${YGGDRASIL}/refresh`,
    {
      accessToken,
      clientToken,
      requestUser: true,
    },
    { headers: { "Content-Type": "application/json" } }
  );
};

export const mcGetPlayerSkin = (uuid) => {
  return axios.get(
    `https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`
  );
};

export const pasteBinPost = (code) => {
  const bodyFormData = new FormData();
  bodyFormData.append("api_dev_key", PASTEBIN_API_KEY);
  bodyFormData.append("api_option", "paste");
  bodyFormData.append("api_paste_code", code);
  bodyFormData.append("api_paste_expire_date", "N");
  bodyFormData.append("api_results_limit", 1000);

  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };

  return axios.post(
    "https://pastebin.com/api/api_post.php",
    bodyFormData,
    config.headers
  );
};

export const imgurPost = (image, onProgress) => {
  const bodyFormData = new FormData();
  bodyFormData.append("image", image);

  return axios.post("https://api.imgur.com/3/image", bodyFormData, {
    headers: {
      Authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
    },
    ...(onProgress && { onUploadProgress: onProgress }),
  });
};

export const mcInvalidate = (accessToken, clientToken) => {
  return axios.post(
    `${YGGDRASIL}/invalidate`,
    {
      accessToken,
      clientToken,
    },
    { headers: { "Content-Type": "application/json" } }
  );
};

export const getMcManifest = () => {
  const url = `${MINECRAFT_MANIFEST}?timestamp=${new Date().getTime()}`;
  return axios.get(url);
};

export const getForgeManifest = () => {
  const url = `https://files.minecraftforge.net/maven/net/minecraftforge/forge/maven-metadata.json?timestamp=${new Date().getTime()}`;
  return axios.get(url);
};

export const getFabricManifest = () => {
  const url = `${FABRIC_API}/versions`;
  return axios.get(url);
};

export const getJavaManifest = () => {
  const url = JAVA_MANIFEST_URL;
  return axios.get(url);
};

export const getFabricJson = ([, version, loader]) => {
  return axios.get(
    `${FABRIC_API}/versions/loader/${encodeURIComponent(
      version
    )}/${encodeURIComponent(loader)}/profile/json`
  );
};

// FORGE ADDONS

export const getAddon = (addonID) => {
  const url = `${CURSEFORGE_API}/addon/${addonID}`;
  return axios.get(url);
};

export const getMultipleAddons = async (addons) => {
  const url = `${CURSEFORGE_API}/addon`;
  return axios.post(url, addons);
};

export const getAddonFiles = (addonID) => {
  const url = `${CURSEFORGE_API}/addon/${addonID}/files`;
  return axios.get(url).then((res) => ({
    ...res,
    data: res.data.sort(sortByDate),
  }));
};

export const getAddonDescription = (addonID) => {
  const url = `${CURSEFORGE_API}/addon/${addonID}/description`;
  return axios.get(url);
};

export const getAddonFile = (addonID, fileID) => {
  const url = `${CURSEFORGE_API}/addon/${addonID}/file/${fileID}`;
  return axios.get(url);
};

export const getAddonsByFingerprint = (fingerprints) => {
  const url = `${CURSEFORGE_API}/fingerprint`;
  return axios.post(url, fingerprints);
};

export const getAddonFileChangelog = (addonID, fileID) => {
  const url = `${CURSEFORGE_API}/addon/${addonID}/file/${fileID}/changelog`;
  return axios.get(url);
};

export const getAddonCategories = () => {
  return axios.get(CURSEFORGE_CATEGORIES);
};

export const getSearch = (
  type,
  searchFilter,
  pageSize,
  index,
  sort,
  isSortDescending,
  gameVersion,
  categoryId
) => {
  const url = `${CURSEFORGE_API}/addon/search`;
  const params = {
    gameId: 432,
    sectionId: type === "mods" ? 6 : 4471,
    categoryId: categoryId || 0,
    pageSize,
    sort,
    isSortDescending,
    index,
    searchFilter,
    gameVersion: gameVersion || "",
  };
  return axios.get(url, { params });
};

export const getFTBModpackData = async (modpackId) => {
  try {
    const url = `${MODPACKSCH_API}/modpack/${modpackId}`;
    const { data } = await axios.get(url);
    return data;
  } catch {
    return { status: "error" };
  }
};

export const getFTBModpackVersionData = async (modpackId, versionId) => {
  try {
    const url = `${MODPACKSCH_API}/modpack/${modpackId}/${versionId}`;
    const { data } = await axios.get(url);
    return data;
  } catch {
    return { status: "error" };
  }
};

export const getFTBChangelog = (modpackId, versionId) => {
  const url = `https://api.modpacks.ch/public/modpack/${modpackId}/${versionId}/changelog`;
  return axios.get(url);
};

export const getFTBMostPlayed = async () => {
  const url = `${MODPACKSCH_API}/modpack/popular/plays/1000`;
  return axios.get(url);
};

export const getFTBSearch = async (searchText) => {
  const url = `${MODPACKSCH_API}/modpack/search/1000?term=${searchText}`;
  return axios.get(url);
};
