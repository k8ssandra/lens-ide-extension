import { Renderer } from '@k8slens/extensions';

export class CassandraDatacenter extends Renderer.K8sApi.KubeObject {
  static kind = 'CassandraDatacenter';

  static namespaced = true;

  static apiBase = '/apis/cassandra.datastax.com/v1beta1/cassandradatacenters';

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
    clusterName: string;
    size: number;
    serverVersion: string;
    serverType: string;
    serverImage: string;
    config: {
      'cassandra-yaml': {
        [key: string]: any;
      };
      'jvm-options': {
        [key: string]: string;
      };
      'jvm-server-options': CassandraDatacenter['spec']['config']['jvm-options'];
      'jvm11-server-options': {
        'additional-jvm-opts': string[];
      };
      'cassandra-env-sh': {
        'additional-jvm-opts': string[];
      };
    };
  };

  status: {
    conditions: {
      lastTransitionTime: string;
      message: string;
      reason: string;
      status: string;
      type?: string;
    }[];
    cassandraOperatorProgress: string;
    nodeReplacements: string[];
    nodeStatuses: {
      [key: string]: {
        hostId: string;
      };
    };
    lastRollingRestart: string;
    lastServerNodeStarted: string;
  };
}
