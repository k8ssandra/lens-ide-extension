import { Renderer } from '@k8slens/extensions';
import React from 'react';
import { K8ssandraCluster } from '../k8c';

const {
  Component: {
    Badge,
    DrawerItem,
    Table,
    TableHead,
    TableCell,
    TableRow,
    SubTitle,
  },
} = Renderer;
export interface K8ssandraClusterDetailsProps
  extends Renderer.Component.KubeObjectDetailsProps<K8ssandraCluster> {}

export class K8ssandraClusterDetails extends React.Component<K8ssandraClusterDetailsProps> {
  render() {
    const { object: k8c } = this.props;
    if (!k8c) return null;

    var datacentersStatus = Object.keys(k8c.status.datacenters).map((dc) => {
      if (k8c.status.datacenters[dc].cassandra.conditions) {
        return (
          <DrawerItem name={dc} className="status" labelsOnly>
            {k8c.status.datacenters[dc].cassandra.conditions.map(
              (condition, index) => {
                const { type, reason, message, status } = condition;
                const kind = type || reason;
                if (!kind) return null;
                if (status === 'False') return null;
                return (
                  <Badge
                    key={kind + index}
                    label={kind}
                    className={'success ' + kind.toLowerCase()}
                    tooltip={message}
                  />
                );
              },
            )}
          </DrawerItem>
        );
      } else {
        return null;
      }
    });

    const cassandraYamlHeader = <SubTitle title="Cassandra Yaml"></SubTitle>;
    const jvmOptionsHeader = <SubTitle title="JVM Options"></SubTitle>;

    var clusterCassandraYaml = <div></div>;
    var clusterJvmOptions = <div></div>;

    if (k8c.spec.cassandra.config) {
      if (k8c.spec.cassandra.config.cassandraYaml) {
        clusterCassandraYaml = (
          <div>
            <br />
            <br />
            {cassandraYamlHeader}
            {displayCassandraYaml(k8c.spec.cassandra.config.cassandraYaml)}
          </div>
        );
      }
      if (k8c.spec.cassandra.config.jvmOptions) {
        clusterJvmOptions = (
          <div>
            <br />
            <br />
            {jvmOptionsHeader}
            {displayJvmOptions(k8c.spec.cassandra.config.jvmOptions)}
          </div>
        );
      }
    }

    var storageConfig = <div></div>;
    if (k8c.spec.cassandra.storageConfig) {
      storageConfig = displayStorageConfig(k8c.spec.cassandra.storageConfig);
    }

    var datacentersDetails = k8c.spec.cassandra.datacenters.map((dc) => {
      const dcHeader = (
        <div className="drawer-title-module__DrawerTitle--mJBGT drawer-title-module__title--hFfE2">
          {dc.metadata.name}
        </div>
      );
      if (dc.config) {
        var cassandraYaml = <div></div>;
        if (dc.config.cassandraYaml) {
          cassandraYaml = (
            <div>
              {cassandraYamlHeader}
              {displayCassandraYaml(k8c.spec.cassandra.config.cassandraYaml)}
            </div>
          );
        }

        var jvmOptions = <div></div>;
        if (dc.config.jvmOptions) {
          jvmOptions = (
            <div>
              {jvmOptionsHeader}
              {displayJvmOptions(dc.config.jvmOptions)}
            </div>
          );
        }
      }

      var dcStorageConfig = <div></div>;
      if (dc.storageConfig) {
        dcStorageConfig = displayStorageConfig(dc.storageConfig);
      }

      return (
        <div id={dc.metadata.name}>
          {dcHeader}
          <DrawerItem name="Size" labelsOnly>
            {dc.size}
          </DrawerItem>
          <DrawerItem name="Stopped" labelsOnly>
            {dc.stopped}
          </DrawerItem>
          {dcStorageConfig}
          <br />
          <br />
          {cassandraYaml}
          {jvmOptions}
        </div>
      );
    });

    return (
      <div className="K8ssandraCluster">
        <DrawerItem name="Created">
          {k8c.getAge(true, false)} ago ({k8c.metadata.creationTimestamp})
        </DrawerItem>
        <DrawerItem name="Datacenters">
          {k8c.spec.cassandra.datacenters.length}
        </DrawerItem>
        <DrawerItem name="Server Version">
          {k8c.spec.cassandra.serverVersion}
        </DrawerItem>
        {storageConfig}
        <div>{datacentersStatus}</div>
        <div>{clusterCassandraYaml}</div>
        <div>{clusterJvmOptions}</div>
        <div>{datacentersDetails}</div>
      </div>
    );
  }
}

function displayCassandraYaml(
  cassandraYaml: K8ssandraCluster['spec']['cassandra']['config']['cassandraYaml'],
) {
  return (
    <div>
      <Table>
        <TableHead>
          <TableCell>Setting</TableCell>
          <TableCell>Value</TableCell>
        </TableHead>
        {Object.keys(cassandraYaml).map((key, index) => {
          return (
            <TableRow key={'cassandraYaml' + index}>
              <TableCell>{key}</TableCell>
              <TableCell>{JSON.stringify(cassandraYaml[key])}</TableCell>
            </TableRow>
          );
        })}
      </Table>
    </div>
  );
}

function displayJvmOptions(
  jvmOptions: K8ssandraCluster['spec']['cassandra']['config']['jvmOptions'],
) {
  return (
    <div>
      <Table>
        <TableHead>
          <TableCell>Setting</TableCell>
          <TableCell>Value</TableCell>
        </TableHead>
        {Object.keys(jvmOptions).map((key, index) => {
          return (
            <TableRow key={'jvmOptions' + index}>
              <TableCell>{key}</TableCell>
              <TableCell>{jvmOptions[key]}</TableCell>
            </TableRow>
          );
        })}
      </Table>
    </div>
  );
}

function displayStorageConfig(
  storageConfig: K8ssandraCluster['spec']['cassandra']['storageConfig'],
) {
  return (
    <div>
      <DrawerItem name="Storage Class Name" labelsOnly>
        {storageConfig.cassandraDataVolumeClaimSpec.storageClassName}
      </DrawerItem>
      <DrawerItem name="Size" labelsOnly>
        {storageConfig.cassandraDataVolumeClaimSpec.resources.requests.storage}
      </DrawerItem>
      <DrawerItem name="Access Modes" labelsOnly>
        {storageConfig.cassandraDataVolumeClaimSpec.accessModes.join(' - ')}
      </DrawerItem>
    </div>
  );
}
