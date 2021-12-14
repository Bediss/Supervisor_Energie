
import { MDBContainer, MDBBtn, MDBRow, MDBCol, MDBInput, MDBListGroup, MDBListGroupItem, MDBIcon, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBBreadcrumb, MDBBreadcrumbItem, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';
import React, { useState, useEffect, useRef } from "react"

const FilterV1 = ({btnEdit,style={},className="", filterName = "", filter = [],styleScroll,display = { separator: " ", elems: [] }, data = [], outAllFiltred = () => { }, outSelected = () => { } } ) => {
    const scrollContainerStyle = styleScroll//{ width: "350px", maxHeight: "180px" };

    const [_filter, _setFilter] = useState(null)
    const [ids, setIds] = useState(null)
    const [filterConds, setFilterConds] = useState({})
    const [filtredData, setFiltredData] = useState(data)
    const [filtredSearchedData, setFiltredSearchedData] = useState(filtredData)
    const [inputs, setInputs] = useState({})
    const [searchStr, setSearchStr] = useState("")
    const searchInputRef = useRef(null)
    const [mDBListGroupItemSelected, setMDBListGroupItemSelected] = useState(null)
    const [ready, setReady] = useState(false)
    useEffect(() => {
        try {
         
            const filterPrep = !filter.length ? Object.keys(data[0]).map((el) => ({ [el]: el })) : filter
            _setFilter(filterPrep)
            const ids = filterPrep.map((fp, i) => `${makeid(10)}_${i}`)
            ids.unshift(makeid(10))
            setIds(ids)
            outAllFiltred(data)
            setFiltredData(data)
            setReady(true)

        }
        catch (err) {
            console.log(err)
            setReady(false)
        }

    }, [])

    const resetvalueoffilter = () => {
        setInputs((prev) => {
            const p = { ...prev }
            Object.keys(p).map((key) => {
                p[key] = ""
            })
            return p
        })
        setFilterConds({})
        setSearchStr("")
    }
    const filterBy = (e, key, id) => {
        const value = e.target.value
        setInputs((prev) => {
            const p = { ...prev }
            p[id] = value
            return p
        })
        setSearchStr("")

        setFilterConds((prevState) => {
            const s = { ...prevState }
            s[key] = value
            return s
        })
    }
   

    useEffect(() => {
        setMDBListGroupItemSelected(null)

        const _filtredData = data.filter((v, i, a) => {
            let result = true
            Object.keys(filterConds).map((key, ii, aa) => {
                const value = filterConds[key].toLowerCase()
                if (v && v[key] && v[key].toLowerCase().indexOf(value) == -1) result = false
            })
            return result
        })
        const filtredData = _filtredData

        const filtredSearchedData = filtredData.filter((v, i, a) => {
            let result = false
            display.elems.map((d) => v[d].toLowerCase().indexOf(searchStr.toLowerCase()) != -1).map((d) => {
                if (d == true)
                    result = true
            })
            return result
        })

        outAllFiltred(filtredSearchedData)
        setFiltredData(filtredData)
        setFiltredSearchedData(filtredSearchedData)
    }, [filterConds, searchStr])

    function makeid(length) {
        var result = 'x';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }

    const handleMDBListGroupItemClick = (e, d, i) => {
        e.preventDefault();
        outSelected(d);
        console.log("-------------handleMDBListGroupItemClick----------------------",d)
        setMDBListGroupItemSelected(i)
    }

    return (ready && _filter && ids ?
        <MDBRow style={style} className={className}>

            <MDBCol style={{ padding: 0 + 'em' }} style={{ marginLeft: "1%" }}>
                <label htmlFor="defaultFormLoginEmailEx7" >{`Filter ${filterName}:`}</label>
                <MDBBtn className=' button_round btn-floating' style={{ width: '28px', height: '28px', marginLeft: '20px' }} onClick={() => resetvalueoffilter()}>
                    <MDBIcon size='lg' icon="sync-alt" />
                </MDBBtn>
                <MDBCol className='p-0' style={{ marginRight: 0 + 'em', marginTop: 0 + 'px', paddingLeft: 1 + 'em' }}>
                    {
                        _filter.map((f, i) => {
                            // const key = Object.keys(f)[0]
                            const key = typeof f == "object" ? Object.keys(f)[0] : f
                            const label = typeof f == "object" ? f[key] : f
                            const id = ids[i + 1]
                            return <React.Fragment key={i} >
                                <MDBInput
                                    id={`${id}__input`}
                                    label={label}
                                    autoComplete="off"
                                    list={`${id}`} style={{ marginBottom: 0.8 + 'em', marginTop: 0 + 'em' }}
                                    value={inputs[`${id}__input`]}
                                    onChange={(e) => filterBy(e, key, `${id}__input`)}
                                />
                                {/* {[...new Map(filtredData.map(item => [item[key], item])).values()].map((e, i) => <option  key={i} value={e[key]}></option>)} */}
                                <datalist id={`${id}`} >
                                    {Array.from(new Set(filtredData.map((e) => e[key]))).map((e, i) => <option key={i} value={e}></option>)}
                                </datalist>
                            </React.Fragment>
                        })
                    }
                </MDBCol>

            </MDBCol>
            <MDBCol className='p-0' >
                <MDBCol style={{ marginLeft: "1%" }}>

                    <div className="d-flex justify-content-between " style={{ marginLeft: "10%" }} >
                        <p className=" m-0 p-0">{`Liste ${filterName} :`}</p>
                        <input ref={searchInputRef}
                            value={searchStr}
                            onChange={(e) => setSearchStr(e.target.value)}
                            type="text" id={`${ids[0]}__input`} autoComplete="off" placeholder="Recherche..." className="form-control float-right " style={{ width: "60%" }} />
                    </div>
                    <MDBContainer style={{ padding: 0 + 'em',marginTop:"-25px" }} >
                        <MDBListGroup style={{ width: '100%' }} className="scrollbar scrollbar-primary  mt-5 mx-auto" style={scrollContainerStyle}>
                            {

                                filtredSearchedData.map((d, i) => {
                                    const displayName = (display.elems || []).map((dd) => d[dd]).join(display.separator || " ")
                                    return <MDBListGroupItem active={mDBListGroupItemSelected == i ? true : false} className={`pointer`} hover key={i} name={displayName} value={displayName} style={{ padding: 0.5 + 'em' }} id={displayName} hover
                                        onClick={(e) => handleMDBListGroupItemClick(e, d, i)}
                                    > <MDBRow> <MDBCol size="10">{displayName} </MDBCol> <MDBCol size="1">
                                    
                                    {/* {btnEdit==true?(

                          <MDBBtn className="button_round btn-floating"><MDBIcon icon="edit" /></MDBBtn>



                                    ):null
                                    
                                    
                                    
                                    } */}
                                    </MDBCol> 
                                    
                                    </MDBRow>
                                    
                                    </MDBListGroupItem>
                                })
                            }
                        </MDBListGroup>
                    </MDBContainer>
                </MDBCol>
            </MDBCol>
        </MDBRow>
        : null)
}

export default FilterV1