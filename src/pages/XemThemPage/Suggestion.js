import React from 'react'
const Suggestions = ({ result, selectedSuggest }) => {
    const options = result.map((word) =>
        <li key={word.id} className="suggest p-2" onClick={(e) => selectedSuggest(e.target.innerHTML)}>{word.eng}</li>
    );
    return <ul>{options}</ul>
}
export default Suggestions