import React from 'react';

import DashboardLayout from 'containers/layout/dashboard';

import Table from 'components/Table';
import Button from 'components/Button/Button';
import { clientHeaders, requests } from 'containers/mocks';


const Home = () => {
  return (
    <DashboardLayout>
      <section>
        <h1 className="pl">Client List</h1>
        <Table headers={clientHeaders} tableData={requests} type="">
          {(row) => (
            <><td>
              <span>{row.name}</span>
            </td>
              <td>
                <span>{row.phone}</span>

              </td>
              <td>
                <span>{row.email}</span>
              </td>
              <td>
                <span>{row.time}</span>

              </td>
              <td>
                <Button theme="primary" size="sm">View</Button>
              </td>
            </>
          )}
        </Table>
      </section>

    </DashboardLayout>
  )
}

export default Home
