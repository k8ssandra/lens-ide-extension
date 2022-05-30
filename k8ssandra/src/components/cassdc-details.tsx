import { Renderer } from "@k8slens/extensions";
import React from "react";
import { CassandraDatacenter } from "../cassdc";

const {
  Component: {
    Badge,
    DrawerItem
  },
} = Renderer; 
export interface CassandraDatacenterDetailsProps extends Renderer.Component.KubeObjectDetailsProps<CassandraDatacenter>{
}

export class CassandraDatacenterDetails extends React.Component<CassandraDatacenterDetailsProps> {

  render() {
    const { object: cassdc } = this.props;
    if (!cassdc) return null;
    
    var nodeReplacements = <DrawerItem name="Node Replacements"></DrawerItem>;
    if (cassdc.status.nodeReplacements) {
      nodeReplacements = <DrawerItem name="Node Replacements">
            {cassdc.status.nodeReplacements.map((replacement, index) => {
              return (<div key={"replacement" + index}>{replacement}</div>);
            })}
      </DrawerItem>
    }

    return (
      <div className="CassandraDatacenter">
        <DrawerItem name="Created">
          {cassdc.getAge(true, false)} ago ({cassdc.metadata.creationTimestamp })
        </DrawerItem>
        <DrawerItem name="Cluster">
          {cassdc.spec.clusterName}
        </DrawerItem>
        <DrawerItem name="Size">
          {cassdc.spec.size}
        </DrawerItem>
        <DrawerItem name="Server Type">
          {cassdc.spec.serverType}
        </DrawerItem>
        <DrawerItem name="Server Version">
          {cassdc.spec.serverVersion}
        </DrawerItem>
        <DrawerItem name="Server Image">
          {cassdc.spec.serverImage}
        </DrawerItem>
        <DrawerItem name="Cassandra Operator Progress">
          {<Badge
                key={"progress" + cassdc.spec.clusterName + cassdc.getName()} label={cassdc.status.cassandraOperatorProgress}
                className={"success "+cassdc.status.cassandraOperatorProgress.toLowerCase()}
              />
          }
        </DrawerItem>
        <DrawerItem name="Status" className="status" labelsOnly>
          {cassdc.status.conditions.map((condition, index) => {
            const { type, reason, message, status } = condition;
            const kind = type || reason;
            if (!kind) return null;
            if (status === "False") return null;
            return (
              <Badge
                key={kind + index} label={kind}
                className={"success "+kind.toLowerCase()}
                tooltip={message}
              />
            );
          })}
        </DrawerItem>
        {nodeReplacements}
      </div>
    )
  }
}
