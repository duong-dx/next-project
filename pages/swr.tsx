import React from 'react';
import {AdminLayout} from "@/components/layout";
import { UserDetail } from "@/components/swr";

const SWR: React.FC  = (props) => {
  return (
    <AdminLayout>
      <h1>User</h1>
      <ul>
        <li><UserDetail userId={12} /></li>
        <li><UserDetail userId={13} /></li>
        <li><UserDetail userId={14} /></li>
      </ul>
    </AdminLayout>
  )
}

export default SWR