import axios from "../utils/axiosConfig";
import {
  IMainGet,
  IMainPost,
  ISendMessages,
  ICreateRole,
  IDeletedRole,
} from "./types";
import { API_BASE_URL } from "./appConfig";

const apiURL = API_BASE_URL;
const normalizeBase = (base: string) => (base.endsWith("/") ? base : `${base}/`);

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
  getAllRoles,
  sendMessages,
  createRole,
  uploadFile,
  deletedRole,
  getFiles,
  deleteFile,
};
