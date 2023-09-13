import SuperadminPanel from './SuperAdmin/Super_Admin';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Supdash from './SuperAdmin/Supdash';
import StudentList from './SuperAdmin/doubts/studentList';
import Dailydoubt from './SuperAdmin/doubts/dailydoubt';
import SuperLogin from './SuperAdmin/Superlogin';
import Createplan from './SuperAdmin/doubts/createplan';
import Availableplan from './SuperAdmin/doubts/availableplan';
import Errorpage from './Errorpage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SuperLogin />}></Route>
        <Route path="/superadmin" element={<SuperadminPanel />}>
          <Route path="supdash" index element={<Supdash />} />
          <Route path="student-list" element={<StudentList />} />
          <Route path="dailydoubt" element={<Dailydoubt />} />
          <Route path="createplan" element={<Createplan />} />
          <Route path="availableplan" element={<Availableplan />} />
        </Route>
        <Route path="*" element={<Errorpage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
