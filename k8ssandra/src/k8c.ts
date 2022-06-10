import { Renderer } from '@k8slens/extensions';

export class K8ssandraCluster extends Renderer.K8sApi.KubeObject {
  static kind = 'K8ssandraCluster';

  static namespaced = true;

  static apiBase = '/apis/k8ssandra.io/v1alpha1/k8ssandraclusters';

  kind: string;

  apiVersion: string;

  metadata: {
    name: string;
    namespace: string;
    selfLink: string;
    uid: string;
    resourceVersion: string;
    creationTimestamp: string;
    labels: {
      [key: string]: string;
    };
    annotations: {
      [key: string]: string;
    };
  };

  spec: {
    cassandra: {
      config: {
        cassandraYaml: {
          [key: string]: any;
        };
        jvmOptions: {
          [key: string]: string;
        };
      };
      datacenters: {
        config: K8ssandraCluster['spec']['cassandra']['config'];
        size: number;
        metadata: {
          name: string;
        };
        stopped: boolean;
        storageConfig: K8ssandraCluster['spec']['cassandra']['storageConfig'];
      }[];
      serverVersion: string;
      storageConfig: {
        cassandraDataVolumeClaimSpec: {
          accessModes: string[];
          resources: {
            requests: {
              storage: string;
            };
          };
          storageClassName: string;
        };
      };
    };
  };

  status: {
    datacenters: {
      [key: string]: {
        cassandra: {
          conditions: {
            lastTransitionTime: string;
            message: string;
            reason: string;
            status: string;
            type?: string;
          }[];
          cassandraOperatorProgress: string;
        };
        reaper: {
          progress: string;
        };
        stargate: {
          progress: string;
          readyReplicasRatio: string;
        };
      };
    };
  };
}
