import { useMutation, useQuery } from "@tanstack/react-query";
import https from "./https";
import { IUploadFile } from "./types";

export function useMessagesByRol(rol: number) {
  const { data, isLoading } = useQuery({
    queryKey: ["messages", rol],
    queryFn: () => https.getMessagesByRol(rol).then((res) => res),
  });

  return { data, isLoading };
}

export function useAllRoles() {
  const { data, isLoading, refetch: refetchAllRoles } = useQuery({
    queryKey: ["allRoles"],
    queryFn: () => https.getAllRoles().then((res) => res),
  });

  return { data, isLoading, refetchAllRoles };
}

export function useViewFiles() {
  const { data, isLoading, refetch: refetchFiles } = useQuery({
    queryKey: ["viewFiles"],
    queryFn: () => https.getFiles().then((res) => res),
  });

  return { data, isLoading, refetchFiles };
}

export function useSendMessage({ query, rol }: { query: string; rol: number }) {
  const { data, isLoading } = useQuery({
    queryKey: ["sendMessage", query, rol],
    queryFn: () =>
      https.sendMessages({ query, rol }).then((res) => {
        console.log(`useSendMessage: ${JSON.stringify(res)}`);
        return res;
      }),
  });

  return { data, isLoading };
}

export function useMutationCreateRole() {
  const { refetchAllRoles } = useAllRoles();

  return useMutation({
    mutationFn: (data: any) => https.createRole(data),
    onSuccess: () => {
      refetchAllRoles();
    },
    onError: (error) => {
      console.log(error);
    },
  });
}

export function useMutationUploadFile({ setLoading, setFiles }: IUploadFile) {
  const { refetchFiles } = useViewFiles();

  return useMutation({
    mutationKey: ["uploadFile"],
    mutationFn: (data: any) => https.uploadFile(data),
    onSuccess: () => {
      setLoading(false);
      setFiles([]);
      refetchFiles();
    },
  });
}

export function useMutationDeleteFile({
  handleFinishDeleteFile,
}: {
  handleFinishDeleteFile: any;
}) {
  const { refetchFiles } = useViewFiles();

  return useMutation({
    mutationKey: ["deleteFile"],
    mutationFn: (data: any) => https.deleteFile(data),
    onSuccess: () => {
      handleFinishDeleteFile();
      refetchFiles();
    },
  });
}

export function useMutationDeleteRole() {
  const { refetchAllRoles } = useAllRoles();

  return useMutation({
    mutationKey: ["deleteRole"],
    mutationFn: (data: any) => https.deletedRole(data),
    onSuccess: () => {
      refetchAllRoles();
    },
  });
}
