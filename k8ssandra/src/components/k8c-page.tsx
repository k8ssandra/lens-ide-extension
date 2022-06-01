import { Renderer } from "@k8slens/extensions";
import React from "react";
import { k8ssandraClusterStore } from "../k8c-store";
import { K8ssandraCluster } from "../k8c"

const {
  Component: {
      KubeObjectListLayout,
      Badge
  }
} = Renderer;

enum sortBy {
  name = "name",
  namespace = "namespace"
}

export class K8ssandraClusterPage extends React.Component<{ extension: Renderer.LensExtension }> {

  render() {
    return (
      <KubeObjectListLayout
                tableId="k8ssandraClustersTable"
                className="K8ssandraClusters" store={k8ssandraClusterStore}
                sortingCallbacks={{
                    [sortBy.name]: (k8c: K8ssandraCluster) => k8c.getName(),
                    [sortBy.namespace]: (k8c: K8ssandraCluster) => k8c.metadata.namespace,
                }}
                searchFilters={[
                    (k8c: K8ssandraCluster) => k8c.getSearchFields()
                ]}
                renderHeaderTitle="Cassandra Datacenters"
                renderTableHeader={[
                    {title: "Name", className: "name", sortBy: sortBy.name},
                    {title: "Namespace", className: "namespace", sortBy: sortBy.namespace},
                    {title: "Version", className: "Version"},
                    {title: "Datacenters", className: "Size"},
                    {title: "Progress", className: "progress"},
                    {title: "Reaper", className: "progress"},
                    {title: "Stargate", className: "progress"},
                ]}
                renderTableContents={(k8c: K8ssandraCluster) => [
                    k8c.getName(),
                    k8c.metadata.namespace,
                    k8c.spec.cassandra.serverVersion,
                    k8c.spec.cassandra.datacenters.length,
                    renderProgress(k8c.status),
                    renderReaperProgress(k8c.status),
                    renderStargateProgress(k8c.status),
                ]}
                />
    )
  }
}

function renderProgress(k8cStatus: K8ssandraCluster["status"]) {
  var dcStatuses = new Map<string, Map<string, string>>();
  if (k8cStatus.datacenters) {
    Object.entries(k8cStatus.datacenters).forEach((dcStatus, _) => {
      console.log("Reading dcStatus for " + dcStatus[0]);
      const progress = dcStatus[1].cassandra.cassandraOperatorProgress;
      var className = "info";
      switch (progress) {
        case "Ready":
          className = "success";
          break;
        case "Updating":
          className = "warning";
          break;
      }
      let dcState = new Map<string, string>([
        ["className", className],
        ["progress", progress]
      ]);
      dcStatuses.set(dcStatus[0], dcState);
    });
  };

  var badges = Array.from(dcStatuses.keys()).map(dc => {
    console.log("dcStatus for " + dc + " : " + dcStatuses.get(dc).get("progress") + "/" + dcStatuses.get(dc).get("className"));
    return (
      <Badge
        key={"progress" + dc} label={dc + ": " + dcStatuses.get(dc).get("progress")}
        className={dcStatuses.get(dc).get("className")} tooltip={dc}
      />
    );
  })
  
  return <div id="unique">{badges}</div>;
}

function renderReaperProgress(k8cStatus: K8ssandraCluster["status"]) {
  var reaperStatuses = new Map<string, Map<string, string>>();
  if (k8cStatus.datacenters) {
    Object.entries(k8cStatus.datacenters).forEach((dcStatus, _) => {
      if (dcStatus[1].reaper) {
        const progress = dcStatus[1].reaper.progress;
        var className = "info";
        switch (progress) {
          case "Running":
            className = "success";
            break;
        }
        let reaperState = new Map<string, string>([
          ["className", className],
          ["progress", progress]
        ]);
        reaperStatuses.set(dcStatus[0], reaperState);
      }
    });
  };

  var badges = Array.from(reaperStatuses.keys()).map(dc => {
    return (
      <Badge
        key={"reaperprogress" + dc} label={dc + ": " + reaperStatuses.get(dc).get("progress")}
        className={reaperStatuses.get(dc).get("className")} tooltip={dc}
      />
    );
  })
  
  return <div id="unique">{badges}</div>;
}

function renderStargateProgress(k8cStatus: K8ssandraCluster["status"]) {
  var stargateStatuses = new Map<string, Map<string, string>>();
  if (k8cStatus.datacenters) {
    Object.entries(k8cStatus.datacenters).forEach((dcStatus, _) => {
      if (dcStatus[1].stargate) {
        const progress = dcStatus[1].stargate.progress;
        var className = "info";
        switch (progress) {
          case "Running":
            className = "success";
            break;
        }
        let stargateState = new Map<string, string>([
          ["className", className],
          ["progress", progress],
          ["readyReplicasRatio", dcStatus[1].stargate.readyReplicasRatio]
        ]);
        stargateStatuses.set(dcStatus[0], stargateState);
      }
    });
  };

  var badges = Array.from(stargateStatuses.keys()).map(dc => {
    return (
      <Badge
        key={"stargateprogress" + dc} label={dc + ": " + stargateStatuses.get(dc).get("progress")}
        className={stargateStatuses.get(dc).get("className")} tooltip={"Replicas: " + stargateStatuses.get(dc).get("readyReplicasRatio")}
      />
    );
  })
  
  return <div id="unique">{badges}</div>;
}