import React, { useEffect, useState } from 'react'
import { useGetRickMortyQuery } from '../apps/services/RickMortyApi'
import { IRickMorty } from '../dataTypes/interfaces/rickMorty';
import { useNavigate, useParams } from 'react-router-dom';
import styled4 from '../css/style4.module.css'
// ___________________________________________________________

const RickMortyDetails = () => {
    const { data: characterList, isError, isLoading, isFetching } = useGetRickMortyQuery(null);
    const [characterDetails, setCharacterDetails] = useState<IRickMorty>()
    const params = useParams()
    const redirect=useNavigate()

    useEffect(() => {
        setCharacterDetails(characterList?.results.find(ch => String(ch.id) == params.id))

    }, [characterList?.results])


    return (

        <div className={styled4['container-details']}>
            <div className={styled4['characterDetails-content']}>
                <img src={characterDetails?.image} alt="" />
                <div className={styled4['characterDetails-text']}>
                    <h3>{characterDetails?.name}</h3>
                    <div>
                        <span>Status/Speices: </span>
                        <strong>{characterDetails?.status} / {characterDetails?.species}</strong>
                    </div>
                    <div>
                        <span>Last known location: </span>
                        <strong>{characterDetails?.location.name}</strong>
                    </div>
                    <div>
                        <span>Origin Name: </span>
                        <strong>{characterDetails?.origin.name}</strong>
                    </div>
                    <div>
                        <span>Number Of Episodes: </span>
                        <strong>{characterDetails?.episode?.length}</strong>
                    </div>
                    <div>
                        <span>Date Of Created: </span>
                        <strong>{characterDetails?.created}</strong>
                    </div>
                    <div>
                        <span>Url Api: </span>
                        <strong><a href={characterDetails?.url}>{characterDetails?.url}</a></strong>
                    </div>
                </div>
            </div>
            
            <button type="button" className={styled4['btn-return-list']} onClick={()=>redirect('/rick&morty-list/')}>Retun List</button>
        </div>

    )
}

export default RickMortyDetails