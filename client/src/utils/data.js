import countries from './countries'

const userRoles = [
  { value: 'lead_generator', label: 'Lead Generator' },
  { value: 'client_care_specialist', label: 'Client Care Specialist' },
  { value: 'call_center_agent', label: 'Call Center Agent' },
  { value: 'customer_service_agent', label: 'Customer Service Agent' },
  { value: 'sales_representative', label: 'Sales Representative' },
  { value: 'sales_manager', label: 'Sales Manager' },
  { value: 'Call_agent_supervisor', label: 'Call Agent Supervisor' }
];
const getCountries=()=>{
  let result=[];
  countries.map(el=>{
    result.push(el.country)
  })
  return result;
}
const getStates=selectedCountry=>{
  let result=[];
  if(selectedCountry){
    countries.map(el=>{
      if(el.country===selectedCountry){
        result=[...el.states]
      }
    })
  }
  else{
    countries.map(el=>{
      if(el.country==='Canada'){
        result=[...el.states]
      }
    })
  }
  return result;
}

export {userRoles,getStates,getCountries}
