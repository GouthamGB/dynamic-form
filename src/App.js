import { useState, useEffect } from 'react';
import './App.scss';
import axios from 'axios';
import Field from './components/Field';
import Navbar from './components/Navbar';
import Modal from './components/Modal';



function App() {
  const [currentDrug, setCurrentDrug] = useState(null)
  const [drug1, setDrug1] = useState(null)
  const [drug2, setDrug2] = useState(null)
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false)


  useEffect(() => {
    const fetchData = async () => {
      const data1 = await axios.get('https://drab-pink-eel-garb.cyclic.app/drug1');
      setDrug1(data1.data);
      setCurrentDrug(data1.data)
      const data2 = await axios.get('https://drab-pink-eel-garb.cyclic.app/drug2');
      setDrug2(data2.data);
      
    };

    fetchData();
    
  }, []);

  const handlePage = (e)=>{
    if(e.target.id==="drug1"){
      setCurrentDrug(drug1)
      setFormData({})
    }
    else if(e.target.id==="drug2"){
      setCurrentDrug(drug2)
      setFormData({})
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClose = () => {
    setSubmitted(false)
    setFormData({})
  }

  const handleSubmit = (event) => {
    event.preventDefault();
   
    setSubmitted(true);
  };

  return (
    <div className="App">
      <Navbar/>
      <div className='app-container'>
      <div className='main'>
      <div className='tab-menu'>
      <button onClick={handlePage} id='drug1' className={`${currentDrug===drug1?"selected":"unselected"}`}>Drug 1</button>
      <button onClick={handlePage} id='drug2' className={`${currentDrug===drug2?"selected":"unselected"}`}>Drug 2</button>
      </div>

      <div className='form-container'>
        {currentDrug?
        (<form onSubmit={handleSubmit}>
          {currentDrug?.fields.map((field,index ) =>(
            <div key={field.key} className='row'>
              <label>{field.label}</label>
              <div className='input-container'>
              <Field field={field} handleInputChange={handleInputChange} formData={formData} /><span className='unit'>{field.unit}</span>
              </div>
              
            </div>
            )
            )}
            <div className='submit-row'>
            <button type='sumbit' id='submit'>submit</button>
            </div>
        </form>): null
        }
      </div>
      </div>
      </div>
      {submitted?<Modal formData={formData} handleClose={handleClose}/>:null}
    </div>
  );
}

export default App;
