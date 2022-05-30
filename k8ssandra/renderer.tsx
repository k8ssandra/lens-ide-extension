import { Renderer } from "@k8slens/extensions";
import React from "react";
import { CassandraDatacenterDetails, CassandraDatacenterDetailsProps } from "./src/components/cassdc-details";
import { CassandraDatacenterPage } from "./src/components/cassdc-page";
import { CassandraDatacenter } from "./src/cassdc"

export function CassandraDatacenterIcon(props: Renderer.Component.IconProps) {
  return <Renderer.Component.Icon {...props} material="security" tooltip="Cassandra Datacenters"/>
}

export default class CassandraDatacenterExtension extends Renderer.LensExtension {
  clusterPages = [{
    id: "cassandradatacenters",
    components: {
      Page: () => <CassandraDatacenterPage extension={this} />,
    }
  }]

  clusterPageMenus = [
    {
      id: "k8ssandra",
      title: "K8ssandra",
      components: {
        Icon: CassandraDatacenterIcon,
      }
    },
    {
      parentId: "k8ssandra",
      target: { pageId: "cassandradatacenters" },
      title: "Cassandra Datacenters",
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
  }]
}
