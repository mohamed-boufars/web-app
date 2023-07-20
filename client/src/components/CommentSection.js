import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CommentSection = () => {
  const [name, setName] = useState('');
  const [avis, setAvis] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = window.location.pathname;
    const path = url.split('/').pop();
    const formData = {
      name: name,
      avis: avis,
      produit:path,
      // ... other form fields
    };
    
    axios.post('http://localhost:5000/insert', formData)
      .then((response) => {
        console.log(response.data.message);
        // Handle the response as needed
        setName('');
        setAvis('');
      })
      .catch((error) => {
        console.error(error);
        // Handle errors
      });
  };
  return (
    <div className="comment-section">
      <h2>Commentaires</h2>
      <form  className='comment-form'onSubmit={handleSubmit}>
        <input
          type="text"
          id='name'
          name="name"
          onChange={(e) => setName(e.target.value)}
          placeholder="Nom"
          value={name}
          required
        />
        <textarea 
        id='comment'
          name="comment"
          placeholder="Commentaire"
          onChange={(e) => setAvis(e.target.value)}
          value={avis}
          required
        ></textarea>
        <button type="submit">Poster</button>
      </form>
    </div>
  );
};

export default CommentSection;
