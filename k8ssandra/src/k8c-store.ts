import { Renderer } from '@k8slens/extensions';
import { K8ssandraCluster } from './k8c';

export class K8ssandraClusterApi extends Renderer.K8sApi.KubeApi<K8ssandraCluster> {}

export class K8ssandraClusterStore extends Renderer.K8sApi.KubeObjectStore<K8ssandraCluster> {
  api = new K8ssandraClusterApi({
    objectConstructor: K8ssandraCluster,
  });
}

export const k8ssandraClusterStore = new K8ssandraClusterStore();
Renderer.K8sApi.apiManager.registerStore(k8ssandraClusterStore);
