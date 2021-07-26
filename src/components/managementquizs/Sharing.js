import React, { useState,useEffect } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import ReactDOM from 'react-dom';

import 'react-bootstrap-typeahead/css/Typeahead.css';

const Sharing = ({ share, options, shared, placeholder }) => {
    const [selected, setSelected] = useState([]);
    useEffect(() => {
        setSelected(shared)
        return () => {
            setSelected([])
        }
    }, [shared])
    function shareQuiz(e){
        share(e)
    }
    console.log(shared);
    return (
        <Typeahead
            id="basic-example"
            labelKey='username'
            multiple
            onChange={(e) => {
                setSelected(e);
                shareQuiz(e)
            }}
            options={options}
            placeholder={placeholder}
            selected={selected}
        />
    );
};
export default Sharing;