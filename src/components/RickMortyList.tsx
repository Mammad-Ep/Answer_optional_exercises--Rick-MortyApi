import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGetRickMortyQuery } from '../apps/services/RickMortyApi'
import { IRickMorty } from '../dataTypes/interfaces/rickMorty'
import styled4 from '../css/style4.module.css'
// ___________________________________________________________

type filterCharacter = {
    statusList: string[],
    speciesList: string[]
}
const RickMortyList = () => {
    const { data: characterList, isError, isLoading, error } = useGetRickMortyQuery(1)
    const [dataList, setDataList] = useState<IRickMorty[]>()
    const [filterCharacter, setFilterCharacter] = useState<filterCharacter>({ statusList: [], speciesList: [] })

    useEffect(() => {
        setDataList(characterList?.results);

    }, [characterList?.results])

    // Get Status and Species Characters
    {
        (function fillFilterCharacter() {
            characterList?.results.map((ch: IRickMorty) => {
                if (filterCharacter?.statusList.indexOf(ch.status.trim()) === -1) {
                    const temp_statusList = filterCharacter.statusList.concat([ch.status.trim()])
                    setFilterCharacter({ ...filterCharacter, statusList: temp_statusList })
                }
                if (filterCharacter?.speciesList.indexOf(ch.species.trim()) === -1) {
                    const temp_speciesList = filterCharacter.speciesList.concat([ch.species.trim()])
                    setFilterCharacter({ ...filterCharacter, speciesList: temp_speciesList })
                }
            })
        }())
    }

    const searchChangeHandler = (event: any) => {
        const q: string = event.target.value

        setTimeout(() => {
            setDataList(characterList?.results.filter((ch: IRickMorty) => ch.name.toLowerCase().includes(q.toLowerCase())))
        }, 2000)
    }

    const changeStatusHandler = (event: any) => {
        if (event.target.value === "") {
            setDataList(characterList?.results);
        } else {
            setDataList(characterList?.results.filter((ch) => ch.status.toLowerCase().trim() == event.target.value.toLowerCase()))
        }
    }

    const changeSpeciesHandler = (event: any) => {
        if (event.target.value === "") {
            setDataList(characterList?.results);
        } else {
            setDataList(characterList?.results.filter((ch) => ch.species.toLowerCase().trim() == event.target.value.toLowerCase()))

        }
    }

    // -----------------------------------------------------------

    if (isError || error) {
        return <h2 className='error-message'>خطا در برقراری سرور</h2>
    }

    if (isLoading) {
        return <h2>Loading ...</h2>
    }

    return (
        <div>
            <div className={styled4['rickmorty-banner']}></div>
            <div className={styled4['filter-container']}>
                <div className={styled4['search-area']}>
                    <img src="/images/rickmorty/search-svgrepo-com.svg" alt="icon-search" />
                    <input type="text" className={styled4['search-input']} name='q' id='q' placeholder='Search Character ...'
                        minLength={3} onChange={searchChangeHandler} />
                </div>
                <div className={styled4['filter-content']}>
                    <span>
                        Filter:
                    </span>
                    <select name="select-status" id="select-status" onChange={changeStatusHandler}>
                        <option value="">select status...</option>
                        {filterCharacter.statusList.map(status => (
                            <option value={status}>{status}</option>

                        ))}
                    </select>

                    <select name="select-species" id="select-species" onChange={changeSpeciesHandler}>
                        <option value="">select species...</option>
                        {filterCharacter.speciesList.map(species => (
                            <option value={species}>{species}</option>

                        ))}
                    </select>
                </div>
            </div>

            <div className={styled4['character-container']}>
                {dataList?.map(ch => (
                    <div key={ch.id} className={styled4['character-box']}>
                        <Link to={`/rick&morty-list/${ch.id}/`}><img src={ch.image} alt={ch.name} /></Link>
                        <div className={styled4['character-content']}>
                            <div>
                                <Link to={`/rick&morty-list/${ch.id}/`}><h3>{ch.name}</h3></Link>
                                <div>
                                    {(() => {
                                        if (ch.status == "Alive") {
                                            return (
                                                <i className="fa-solid fa-circle fa-2xs" style={{ color: "green" }}></i>
                                            )
                                        } else if (ch.status == "Dead") {
                                            return (
                                                <i className="fa-solid fa-circle fa-2xs" style={{ color: "red" }}></i>
                                            )
                                        } else {
                                            return (
                                                <i className="fa-solid fa-circle fa-2xs" style={{ color: "gray" }}></i>
                                            )
                                        }
                                    })()}

                                    <span>{ch.status} - {ch.species}</span>
                                </div>
                            </div>
                            <div>
                                <span>Last known location:</span>
                                <p>{ch.location?.name}</p>
                            </div>
                            <div>
                                <span>Origin name:</span>
                                <p>{ch.origin?.name}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RickMortyList