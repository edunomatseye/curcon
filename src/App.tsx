import axios from "axios";
import React, {useState} from "react";

function App(){
 
   const baseURL = "https://us-east1-serverless-306422.cloudfunctions.net/exchangerates";
  
  const initialState = {
    source: '',
    dest: '',
    date: '',
    formError: '',
    rate: 0
  }
  
  const [state, setState] = useState(initialState)
  
  const handleFindRate =async(e: React.FormEvent<HTMLButtonElement>)=>{
    if(handleError()){
    e.preventDefault()
    const url = `${baseURL}/historical?base=${state.source}&date=${state.date}&symbols=${state.dest}`;
      const result = document.getElementsByClassName("conversion-result")[0] as HTMLElement;
           
// Async / await way
//     try {
//           let response = await axios.get(url);    
//           document.getElementsByClassName("conversion-result")[0].innerText = response.data.rates[state.dest]
//         } catch (error) {
//           console.error(error);
//           document.getElementsByClassName("conversion-result")[0].innerText = error
//         }
      
      //promise way
      axios.get(url)
      .then(response => response.data.rates[state.dest])
      .then(data => result.innerText = data)
      //.then(data => setState({...state, rate: data}))
      .catch(e => result.innerText = e)
      }
  }
  
  const handleError=()=>{
    console.log('Error: please complete each field')
    let formError = '';
    
    if(!state.source){
      formError = "Please complete each field"
    }
    if(!state.dest){
      formError = "Please complete each field"
    }
    if(!state.date){
      formError = "Please complete each field"
    }
    
    if(formError){
      setState({...state, formError}) 
      return false
    }
    return true
  }
  
  const handleReset=(e: React.FormEvent)=>{
    console.log('Error: please complete each field')
    setState(initialState)
  }
  
  const handleInputChangeData =(e: React.FormEvent<HTMLInputElement>)=>{
    const target = e.currentTarget;
    const name = target.name;
    const value = target.value.toUpperCase();
    setState({...state, [name]: value})
  }
 
    return (
      <>
        <h2>Currency Converter</h2>
        
        <div>
          <label>
            Source symbol: 
            <input 
              name="source"
              value={state.source}
              className="currency-source" 
              maxLength={3}
              style={{textTransform:'uppercase'}} 
              size={9}
              onChange={handleInputChangeData}
              />
          </label>
        </div>
        
        <div>
          <label>
            Destination symbol: 
            <input 
              name="dest"
              value={state.dest}
              className="currency-destination" 
              maxLength={3}
              style={{textTransform:'uppercase'}} 
              size={9}
              onChange={handleInputChangeData}
              />
          </label>
        </div>
               
        <div>
          <label>
            Conversion Date: 
            <input 
              name="date"
              value={state.date} 
              className="currency-date" 
              type="date"
              size={10}
              maxLength={10}
              onChange={handleInputChangeData}
              />
          </label>
        </div>
        
       <br />
       <hr/>
        
        <button 
          className="find-rate" 
          onClick={handleFindRate} 
          type="submit">Find Rate
        </button>
        
        <button 
          className="reset-fields" 
          onClick={handleReset}>Reset
        </button>
        
         <hr />
        
        <div className="conversion-result">
          {
            state.formError  && state.formError
          }
        </div>
                              
      </>
    );
}


export default App