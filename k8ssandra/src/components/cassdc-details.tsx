import { Renderer } from '@k8slens/extensions';
import React from 'react';
import { CassandraDatacenter } from '../cassdc';

const {
  Component: { Badge, DrawerItem, Table, TableHead, TableCell, TableRow },
} = Renderer;
export type CassandraDatacenterDetailsProps = Renderer.Component.KubeObjectDetailsProps<CassandraDatacenter>;

export class CassandraDatacenterDetails extends React.Component<CassandraDatacenterDetailsProps> {
  render() {
    const { object: cassdc } = this.props;
    if (!cassdc) return null;

    let jvmOptions = <div />;

    let nodeReplacements = <DrawerItem name="Node Replacements" />;
    if (cassdc.status.nodeReplacements) {
      nodeReplacements = (
        <DrawerItem name="Node Replacements">
          {cassdc.status.nodeReplacements.map((replacement, index) => (
            <div key={`replacement${index}`}>{replacement}</div>
          ))}
        </DrawerItem>
      );
    }
    const cassandraYamlHeader = (
      <div className="drawer-title-module__DrawerTitle--mJBGT drawer-title-module__title--hFfE2">Cassandra Yaml</div>
    );
    let cassandraYaml = <div>{cassandraYamlHeader}</div>;
    if (cassdc.spec.config) {
      if ('cassandra-yaml' in cassdc.spec.config) {
        cassandraYaml = (
          <div>
            {cassandraYamlHeader}
            <div>
              <Table>
                <TableHead>
                  <TableCell>Setting</TableCell>
                  <TableCell>Value</TableCell>
                </TableHead>
                {Object.keys(cassdc.spec.config['cassandra-yaml']).map((key, index) => (
                  <TableRow key={`cassandraYaml${index}`}>
                    <TableCell>{key}</TableCell>
                    <TableCell>{JSON.stringify(cassdc.spec.config['cassandra-yaml'][key])}</TableCell>
                  </TableRow>
                ))}
              </Table>
            </div>
          </div>
        );
      }
    }

    const jvmOptionsHeader = (
      <div className="drawer-title-module__DrawerTitle--mJBGT drawer-title-module__title--hFfE2">JVM Options</div>
    );
    jvmOptions = <div>{jvmOptionsHeader}</div>;
    if (cassdc.spec.config) {
      if ('jvm-options' in cassdc.spec.config) {
        jvmOptions = (
          <div>
            {jvmOptionsHeader}
            {displayJvmOptions(cassdc.spec.config['jvm-options'])}
          </div>
        );
      }
    }

    const jvmServerOptionsHeader = (
      <div className="drawer-title-module__DrawerTitle--mJBGT drawer-title-module__title--hFfE2">
        JVM Server Options
      </div>
    );
    jvmOptions = <div>{jvmOptionsHeader}</div>;
    if (cassdc.spec.config) {
      if ('jvm-server-options' in cassdc.spec.config) {
        jvmOptions = (
          <div>
            {jvmServerOptionsHeader}
            {displayJvmOptions(cassdc.spec.config['jvm-server-options'])}
          </div>
        );
      }
    }

    const jvm11OptionsHeader = (
      <div className="drawer-title-module__DrawerTitle--mJBGT drawer-title-module__title--hFfE2">
        JVM11 Server Options
      </div>
    );
    let jvm11Options = <div>{jvm11OptionsHeader}</div>;
    if (cassdc.spec.config) {
      if (
        'jvm11-server-options' in cassdc.spec.config &&
        'additional-jvm-opts' in cassdc.spec.config['jvm11-server-options']
      ) {
        jvm11Options = (
          <div>
            {jvm11OptionsHeader}
            <div>
              <Table>
                <TableHead>
                  <TableCell>Setting</TableCell>
                </TableHead>
                {cassdc.spec.config['jvm11-server-options']['additional-jvm-opts'].map((setting, index) => (
                  <TableRow key={`jvm11ServerOptions${index}`}>
                    <TableCell>{setting}</TableCell>
                  </TableRow>
                ))}
              </Table>
            </div>
          </div>
        );
      }
    }

    const cassandraEnvHeader = (
      <div className="drawer-title-module__DrawerTitle--mJBGT drawer-title-module__title--hFfE2">cassandra-env.sh</div>
    );
    let cassandraEnvOptions = <div>{cassandraEnvHeader}</div>;
    if (cassdc.spec.config) {
      if ('cassandra-env-sh' in cassdc.spec.config && 'additional-jvm-opts' in cassdc.spec.config['cassandra-env-sh']) {
        cassandraEnvOptions = (
          <div>
            {cassandraEnvHeader}
            <div>
              <Table>
                <TableHead>
                  <TableCell>Setting</TableCell>
                </TableHead>
                {cassdc.spec.config['cassandra-env-sh']['additional-jvm-opts'].map((setting, index) => (
                  <TableRow key={`cassandra-env-sh${index}`}>
                    <TableCell>{setting}</TableCell>
                  </TableRow>
                ))}
              </Table>
            </div>
          </div>
        );
      }
    }

    return (
      <div className="CassandraDatacenter">
        <DrawerItem name="Created">
          {cassdc.getAge(true, false)} ago ({cassdc.metadata.creationTimestamp})
        </DrawerItem>
        <DrawerItem name="Cluster">{cassdc.spec.clusterName}</DrawerItem>
        <DrawerItem name="Size">{cassdc.spec.size}</DrawerItem>
        <DrawerItem name="Server Type">{cassdc.spec.serverType}</DrawerItem>
        <DrawerItem name="Server Version">{cassdc.spec.serverVersion}</DrawerItem>
        <DrawerItem name="Server Image">{cassdc.spec.serverImage}</DrawerItem>
        <DrawerItem name="Cassandra Operator Progress">
          <Badge
            key={`progress${cassdc.spec.clusterName}${cassdc.getName()}`}
            label={cassdc.status.cassandraOperatorProgress}
            className={`success ${cassdc.status.cassandraOperatorProgress.toLowerCase()}`}
          />
        </DrawerItem>
        <DrawerItem name="Status" className="status" labelsOnly>
          {cassdc.status.conditions.map((condition, index) => {
            const { type, reason, message, status } = condition;
            const kind = type || reason;
            if (!kind) return null;
            if (status === 'False') return null;
            return (
              <Badge key={kind + index} label={kind} className={`success ${kind.toLowerCase()}`} tooltip={message} />
            );
          })}
        </DrawerItem>
        {nodeReplacements}
        {cassandraYaml}
        {jvmOptions}
        {jvm11Options}
        {cassandraEnvOptions}
      </div>
    );
  }
}

function displayJvmOptions(jvmOptions: CassandraDatacenter['spec']['config']['jvm-options']) {
  return (
    <div>
      <Table>
        <TableHead>
          <TableCell>Setting</TableCell>
          <TableCell>Value</TableCell>
        </TableHead>
        {Object.keys(jvmOptions).map((key, index) => (
          <TableRow key={`jvmServerOptions${index}`}>
            <TableCell>{key}</TableCell>
            <TableCell>{jvmOptions[key]}</TableCell>
          </TableRow>
        ))}
      </Table>
    </div>
  );
}
