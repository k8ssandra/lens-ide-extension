import { Renderer} from "@k8slens/extensions";

export class CassandraDatacenter extends Renderer.K8sApi.KubeObject {
  static kind = "CassandraDatacenter"
  static namespaced = true
  static apiBase = "/apis/cassandra.datastax.com/v1beta1/cassandradatacenters"

  kind: string
  apiVersion: string
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
  }
  spec: {
    clusterName: string;
    size: number;
    serverVersion: string;
    serverType: string;
    serverImage: string;
  }
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
    }
    lastRollingRestart: string;
    lastServerNodeStarted: string;
  }
}
