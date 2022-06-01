import { Renderer } from "@k8slens/extensions";
import React from "react";
import { CassandraDatacenterDetails, CassandraDatacenterDetailsProps } from "./src/components/cassdc-details";
import { CassandraDatacenterPage } from "./src/components/cassdc-page";
import { CassandraDatacenter } from "./src/cassdc"
import { K8ssandraClusterDetails, K8ssandraClusterDetailsProps } from "./src/components/k8c-details";
import { K8ssandraClusterPage } from "./src/components/k8c-page";
import { K8ssandraCluster } from "./src/k8c"

export function K8ssandraClusterIcon(props: Renderer.Component.IconProps) {
  return <Renderer.Component.Icon {...props} material="lan" tooltip="K8ssandra Clusters"/>
}
export function CassandraDatacenterIcon(props: Renderer.Component.IconProps) {
  return <Renderer.Component.Icon {...props} material="hive" tooltip="Cassandra Datacenters"/>
}
export function K8ssandraIcon(props: Renderer.Component.IconProps) {
  return <Renderer.Component.Icon {...props} material="wb_cloudy" tooltip="K8ssandra"/>
}

export default class CassandraDatacenterExtension extends Renderer.LensExtension {
  clusterPages = [{
    id: "cassandradatacenters",
    components: {
      Page: () => <CassandraDatacenterPage extension={this} />,
    }
  },
  {
    id: "k8ssandraclusters",
    components: {
      Page: () => <K8ssandraClusterPage extension={this} />,
    }
  }]

  clusterPageMenus = [
    {
      id: "k8ssandra",
      title: "K8ssandra",
      components: {
        Icon: K8ssandraIcon,
      }
    },
    {
      parentId: "k8ssandra",
      target: { pageId: "k8ssandraclusters" },
      title: "Clusters",
      components: {
        Icon: K8ssandraClusterIcon,
      }
    },
    {
      parentId: "k8ssandra",
      target: { pageId: "cassandradatacenters" },
      title: "Datacenters",
      components: {
        Icon: CassandraDatacenterIcon,
      }
    },
  ];

  kubeObjectDetailItems = [{
    kind: CassandraDatacenter.kind,
    apiVersions: ["cassandra.datastax.com/v1beta1"],
    components: {
      Details: (props: CassandraDatacenterDetailsProps) => <CassandraDatacenterDetails {...props} />
    }
  },
  {
    kind: K8ssandraCluster.kind,
    apiVersions: ["k8ssandra.io/v1alpha1"],
    components: {
      Details: (props: K8ssandraClusterDetailsProps) => <K8ssandraClusterDetails {...props} />
    }
  }]
}
