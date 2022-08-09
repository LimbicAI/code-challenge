import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import DashboardLayout from 'containers/layout/dashboard';

import Table from 'components/Table';
import Button from 'components/Button/Button';
import { clientHeaders } from 'containers/mocks';
import { clientService } from 'services/clients';


const Home = () => {
  const [clients, setClients] = useState<any>()
  const [loading, setLoading] = useState(true)
  const navigate  = useNavigate()

  useEffect(() => {
    clientService.fetch().then((res) => {
      setClients(res)
      setLoading(false)
    })
  }, [])



  return (
    <DashboardLayout>
      <section>
        <h1 className="pl">Client List</h1>
        <Table headers={clientHeaders} tableData={clients} type="" loading={loading}>
          {(row) => (
            <><td>
              <span>{row.full_name}</span>
            </td>
              <td>
                <span>{row.phone}</span>

              </td>
              <td>
                <span>{row.gender}</span>
              </td>
              <td>
                <span>{row.email}</span>

              </td>
              <td>
                <span>{row.date}</span>

              </td>
              <td>
                <Button theme="primary" size="sm" onClick={() => navigate('/single-client/' + row.id)}>View</Button>
              </td>
            </>
          )}
        </Table>
      </section>

    </DashboardLayout>
  )
}

export default Home
