import {useEffect, useState } from "react";
import styles from './Xsearchcountry.module.css';
const Xsearchcountry = () => {
    const [country, setCountry] = useState([]);
    const [countrySearch, setCountrySearch] = useState('');
     const [debounceSearch, setDebounceSearch] = useState('');
   
    
      // getting All country data in mounting phase
  const handleSearchBarApi = async() =>{  
        try{
            const response = await fetch(`https://restcountries.com/v3.1/all`);
            const responseData = await response.json();
              // console.log('getting datat', responseData)
             setCountry(responseData);
        }
        catch(error){
          
              console.error('something went wrong', error.message)
             }
    }
    useEffect(()=>{
      handleSearchBarApi();
    },[])
    
    
    useEffect(() => {
         
        const DebounceApi = setTimeout(() => {
          console.log('debouncing search', DebounceApi)
          
            setDebounceSearch(countrySearch);
           
        }, 500);
          return () => clearTimeout(DebounceApi)
        }, [countrySearch]);


   
   const filtersearchquery = country.filter(searchName =>
    searchName.name.common.toLowerCase().includes(debounceSearch.toLowerCase())
  ) 
 return (
    <div className={styles.searchContainer}>
     <input 
     type="text" 
      className={styles.searchBox}  
      value = {countrySearch} 
      placeholder="Search for countries..."
      onChange={(e) => setCountrySearch(e.target.value)}
      />
      <div className={styles.container}>
      {console.log('country', styles.countryCard)}
        {filtersearchquery.map(data =>(
          <div className= "countryCard" key={data.cca3}>
            <img 
                className={styles.imgSrc} 
                src={data.flags.png} 
                alt={data.cca3}
                />
                <h2><span>{data.name.common}</span></h2> 
                </div>
                ))}
         </div>
     </div>
  );
}

export default Xsearchcountry