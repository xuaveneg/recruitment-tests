import React from 'react';
import PropTypes from 'prop-types';

function Synopsis({synopsis, onClick}) {
    return (
       <div className='synopsis' onClick={onClick}>
           <div title='Fermer la fenêtre de détails'/>
           <div title='Fermer la fenêtre de détails'>
               {(synopsis || [])
                   .map((synopsisParagraph, index) => (
                       <p key={index}>{synopsisParagraph}</p>
               ))}
           </div>
       </div>
    );
}

Synopsis.propTypes = {
    synopsis: PropTypes.arrayOf(
        PropTypes.string
    ).isRequired,
    onClick: PropTypes.func.isRequired
};

export default Synopsis;
