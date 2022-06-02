import { Renderer } from '@k8slens/extensions';
import React from 'react';
import { cassandraDatacenterStore } from '../cassdc-store';
import { CassandraDatacenter } from '../cassdc';

const {
  Component: { KubeObjectListLayout, Badge },
} = Renderer;

enum sortBy {
  name = 'name',
  namespace = 'namespace',
  cluster = 'cluster',
}

export class CassandraDatacenterPage extends React.Component<{
  extension: Renderer.LensExtension;
}> {
  render() {
    return (
      <div className="cassdc-page">
        <KubeObjectListLayout
          tableId="cassandraDatacentersTable"
          className="CassandraDatacenters"
          store={cassandraDatacenterStore}
          sortingCallbacks={{
            [sortBy.name]: (cassdc: CassandraDatacenter) => cassdc.getName(),
            [sortBy.namespace]: (cassdc: CassandraDatacenter) => cassdc.metadata.namespace,
            [sortBy.cluster]: (cassdc: CassandraDatacenter) => cassdc.spec.clusterName,
          }}
          searchFilters={[(cassdc: CassandraDatacenter) => cassdc.getSearchFields()]}
          renderHeaderTitle="Cassandra Datacenters"
          renderTableHeader={[
            { title: 'Name', className: 'name', sortBy: sortBy.name },
            {
              title: 'Namespace',
              className: 'namespace',
              sortBy: sortBy.namespace,
            },
            { title: 'Cluster', className: 'cluster', sortBy: sortBy.cluster },
            { title: 'Progress', className: 'progress' },
            { title: 'Size', className: 'Size' },
            { title: 'Version', className: 'Version' },
          ]}
          renderTableContents={(cassdc: CassandraDatacenter) => [
            cassdc.getName(),
            cassdc.metadata.namespace,
            cassdc.spec.clusterName,
            renderProgress(cassdc.status.cassandraOperatorProgress),
            cassdc.spec.size,
            cassdc.spec.serverVersion,
          ]}
        />
      </div>
    );
  }
}

function renderProgress(progress: string) {
  let className = 'info';
  switch (progress) {
    case 'Ready':
      className = 'success';
      break;
    case 'Updating':
      className = 'warning';
      break;
  }
  return <Badge key={`progress${progress}`} label={progress} className={className} />;
}
