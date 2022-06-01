import './App.css';
import { Row } from 'antd';
import AddProductForm from './components/AddProductForm';
import NavigationBar from './components/NavigationBar';

function App() {
  return (
    <Row className='app'>
      <NavigationBar/>
      <AddProductForm/>
    </Row>
  );
}

export default App;
