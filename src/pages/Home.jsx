import React, { useEffect, useState } from 'react';
import PokemonCard from "../components/PokemonCard"
import Navbar from "../components/Navbar"
import { Container, Grid } from '@mui/material';
import axios from 'axios';
import { Skeletons } from '../components/Skeletons';

export default function Home() {

    const [pokemons, setPokemons] = useState([])

    useEffect(()=> {
        getPokemons()
    },[])

    const getPokemons = () => {
        var endpoints = []
        for(var i=1;i<50; i++){
            endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
        }
        var response= axios.all(endpoints.map( (endpoint) => axios.get(endpoint))).then((res)=> setPokemons(res)).catch((err)=> console.log(err))
        
        
        // axios.get("https://pokeapi.co/api/v2/pokemon?limit=50&offset=0")
        // .then((res)=>setPokemons(res.data.results))
        // .catch((err)=> console.log(err))
    }

    const pokemonFilter = (name) => {
        var nameLowerCase = name.toLowerCase()
        var filteredPokemons = []
        if(nameLowerCase ===""){
            getPokemons()
        }
        for( var i in pokemons){
            if(pokemons[i].data.name.includes(nameLowerCase)){
                filteredPokemons.push(pokemons[i])
            }
        }
        setPokemons(filteredPokemons)
    }

  return (
    <div>
        <Navbar pokemonFilter={pokemonFilter}/>
        <Container maxWidth="false">
            <Grid container spacing={3}>
                {pokemons.length === 0 ? <Skeletons/> : 
                pokemons.map((pokemon, key) => (
                    <Grid item xs={12} sm={6} md={4} lg={2} key={key}>
                        <PokemonCard name={pokemon.data.name} image={pokemon.data.sprites.front_default} types={pokemon.data.types}/>
                    </Grid>
                ))}
                
            </Grid>
        </Container>
    </div>
  );
}
