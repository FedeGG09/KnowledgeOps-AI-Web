import axios from "../utils/axiosConfig";
import {
  IMainGet,
  IMainPost,
  ISendMessages,
  ICreateRole,
  IDeletedRole,
  ISignUp,
  IVerifyUser,
  IPWDRecoveryCode,
  IPWDRecoveryChange,
} from "./types";
import { API_BASE_URL } from "./appConfig";

const apiURL = API_BASE_URL;

const normalizeBase = (base: string) => (base.endsWith("/") ? base : `${base}/`);

async function login(data: any) {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  try {
    const urlComplete = `${normalizeBase(apiURL)}login`;
    const response = await axios.post(urlComplete, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function demoLogin(data: any) {
  return login(data);
}

async function mainGet(props: IMainGet) {
  const { apiURL: urlBase, method } = props;

  try {
    const urlComplete = `${normalizeBase(urlBase)}${method}`;

    const response = await axios.get(urlComplete);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function mainPost(props: IMainPost) {
  const { apiURL: urlBase, method, data } = props;

  try {
    const urlComplete = `${normalizeBase(urlBase)}${method}`;

    const response = await axios.post(urlComplete, data);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
    throw new Error(`Request failed with status code ${response.status}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
    return { message: error };
  }
}

function signUp(props: ISignUp) {
  const { name, lastName, email, password } = props;
  return mainPost({
    apiURL,
    method: "sign_up",
    data: {
      name,
      lastname: lastName,
      email,
      password,
    },
  });
}

function verifyUser(props: IVerifyUser) {
  const { email, verification_code } = props;
  return mainPost({
    apiURL,
    method: "sign_up/verify_user",
    data: {
      email,
      verification_code,
    },
  });
}

function getMessagesByRol(rol: number) {
  return mainPost({
    apiURL,
    method: "chat/getByUsuarioByRol",
    data: { rol },
  });
}

function getAllRoles() {
  return mainGet({ apiURL, method: "roles/getAllRoles" });
}

function sendMessages({ query, rol }: ISendMessages) {
  return mainPost({
    apiURL,
    method: "chat",
    data: {
      query,
      rol,
    },
  });
}

function passwordRecovery({ email }: IPWDRecoveryCode) {
  return mainPost({
    apiURL,
    method: "pwdrecovery/get_code",
    data: {
      email,
    },
  });
}

function passwordRecoveryChange({
  email,
  recovery_code,
  password,
}: IPWDRecoveryChange) {
  return mainPost({
    apiURL,
    method: "pwdrecovery/change",
    data: {
      email,
      recovery_code,
      password,
    },
  });
}

function createRole({ name, description }: ICreateRole) {
  return mainPost({
    apiURL,
    method: "roles/update",
    data: {
      id: 0,
      name,
      description,
    },
  });
}

function uploadFile(data: any) {
  return mainPost({
    apiURL,
    method: "files/upload",
    data,
  });
}

function deletedRole({ idRole }: IDeletedRole) {
  return mainPost({
    apiURL,
    method: "roles/delete",
    data: {
      id: idRole,
    },
  });
}

function getFiles() {
  return mainGet({ apiURL, method: "files/view" });
}

function deleteFile(fileName: string) {
  return mainPost({
    apiURL,
    method: "files/delete",
    data: {
      filename: fileName,
    },
  });
}

export default {
  getMessagesByRol,
  login,
  demoLogin,
  getAllRoles,
  sendMessages,
  createRole,
  uploadFile,
  deletedRole,
  getFiles,
  deleteFile,
  signUp,
  verifyUser,
  passwordRecovery,
  passwordRecoveryChange,
};
