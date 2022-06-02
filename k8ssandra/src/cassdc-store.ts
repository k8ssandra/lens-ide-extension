import { Renderer } from '@k8slens/extensions';
import { CassandraDatacenter } from './cassdc';

export class CassandraDatacenterApi extends Renderer.K8sApi.KubeApi<CassandraDatacenter> {}

export class CassandraDatacenterStore extends Renderer.K8sApi.KubeObjectStore<CassandraDatacenter> {
  api = new CassandraDatacenterApi({
    objectConstructor: CassandraDatacenter,
  });
}

export const cassandraDatacenterStore = new CassandraDatacenterStore();
Renderer.K8sApi.apiManager.registerStore(cassandraDatacenterStore);
