import { AxiosPromise, AxiosRequestConfig } from 'axios';
import {
  Cluster,
  ClusterCreateParams,
  Host,
  ClusterUpdateParams,
  ImageCreateParams,
  Credentials,
} from './types';
import { client } from './axiosClient';

export const getClusters = (): AxiosPromise<Cluster[]> => client.get('/clusters');

export const getCluster = (id: string): AxiosPromise<Cluster> => client.get(`/clusters/${id}`);

export const postCluster = (params: ClusterCreateParams): AxiosPromise<Cluster> =>
  client.post('/clusters', params);

export const patchCluster = (id: string, params: ClusterUpdateParams): AxiosPromise<Cluster> =>
  client.patch(`/clusters/${id}`, params);

export const deleteCluster = (id: string): AxiosPromise<void> => client.delete(`/clusters/${id}`);

export const getClusterHosts = (id: string): AxiosPromise<Host[]> =>
  client.get(`/clusters/${id}/hosts`);

export const enableClusterHost = (clusterId: string, hostId: string): AxiosPromise<void> =>
  client.post(`/clusters/${clusterId}/hosts/${hostId}/actions/enable`);

export const disableClusterHost = (clusterId: string, hostId: string): AxiosPromise<void> =>
  client.delete(`/clusters/${clusterId}/hosts/${hostId}/actions/enable`);

export const deleteClusterHost = (clusterId: string, hostId: string): AxiosPromise<void> =>
  client.delete(`/clusters/${clusterId}/hosts/${hostId}`);

export const postInstallCluster = (clusterId: string): AxiosPromise<Cluster> =>
  client.post(`/clusters/${clusterId}/actions/install`);

export const createClusterDownloadsImage = (
  id: string,
  params: ImageCreateParams,
  axiosOptions: AxiosRequestConfig,
): AxiosPromise<Cluster> => client.post(`/clusters/${id}/downloads/image`, params, axiosOptions);

// TODO(jtomasek): make the API_ROOT configurable so this can be used in cloud.redhat.com
const API_ROOT = process.env.REACT_APP_API_ROOT;

export const getClusterDownloadsImageUrl = (clusterId: string) =>
  `${API_ROOT}/clusters/${clusterId}/downloads/image`;

export const getClusterFileURL = (clusterID: string, fileName: string) =>
  `${API_ROOT}/clusters/${clusterID}/downloads/files?file_name=${fileName}`;

export const getClusterKubeconfigURL = (clusterID: string) =>
  `${API_ROOT}/clusters/${clusterID}/downloads/kubeconfig`;

export const getClusterCredentials = (clusterID: string): AxiosPromise<Credentials> =>
  client.get(`/clusters/${clusterID}/credentials`);
