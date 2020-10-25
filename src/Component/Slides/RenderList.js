import React from 'react';
import { Grid } from 'semantic-ui-react';
import Movie from './Movie';

const RenderList = ({movies}) => {
    return (
        <Grid>
            {movies.map((movie) => {
                    return (
                        
                        <Movie movie={movie} key = {movie}/>
                        
                    )
                })
            }   
        </Grid>
    );
};

export default RenderList;