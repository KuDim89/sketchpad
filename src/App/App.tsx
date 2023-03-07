/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { useState } from 'react';
import { fetchPhotos } from "../api/fetchPhotos";
import { IPhotosResponse } from "../api/IPhotosResponse";
import { useStyles } from "./styles";
import {TextField} from "@mui/material";

const App = ():JSX.Element => {
  const styles = useStyles();
  const [query, setQuery] = useState<string>('');
  const [photosData, setPhotosData] = useState<IPhotosResponse | null>();

  const search = async (e: React.KeyboardEvent<HTMLInputElement>): Promise<void> => {
    if(e.key === 'Enter') {
      const data = await fetchPhotos(query);
      setPhotosData(data);
      setQuery('');
    }
  }

  return (
    <div css={styles.container} data-testid="app">
      <h1>Sketch</h1>
      <TextField
        placeholder='Search...'
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={search}
      />
      {photosData?.photos.map((photo) => (
        <div key={photo.id}>
          <img src={photo.src.portrait} alt={photo.alt}/>
        </div>)
      )}
    </div>
  );
}

export default App;
