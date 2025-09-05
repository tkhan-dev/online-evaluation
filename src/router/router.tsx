import { Navigate, Route, createHashRouter, createRoutesFromElements } from 'react-router-dom';
import Layout from '../app/views/layout/layout';
import UserManagement from '../app/views/pages/user';
import UserPersonalInfo from '../app/views/pages/userPersonalInfo';
import OCRUploader from '../app/views/pages/OCRUploader';

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Navigate to="/user-management" />} />
      <Route path="/user-management" element={<UserManagement />} />
      <Route path="/user-personal-info/:userId" element={<UserPersonalInfo />} />
      <Route path="/ocrupload" element={<OCRUploader/>} />

    </Route>
  )
);

export default router;
