import { useState } from "react";

const Search = ({ queryFunction }) => {
    const [query, setQuery] = useState('')
    function search() {
        queryFunction(query)
    }
    function enterSearch(e){
        if(e.key == 'Enter'){
            search()
        }
    }
    return (
        <div className='form-group'>
            <div className='d-flex'>
                <input onKeyDown={(e) => enterSearch(e)} className='form-control border' style={{backgroundColor: 'rgba(0, 0, 0, 0.05)'}} placeholder='Tìm kiếm' onChange={(e) => {if(e.target.value != ''){setQuery(e.target.value)} else queryFunction(e.target.value)}} />
                <button className='btn btn-primary rounded-pill' onClick={() => search()}><i className='fa fa-search'></i></button>
            </div>
        </div>
    )
}
export default Search;