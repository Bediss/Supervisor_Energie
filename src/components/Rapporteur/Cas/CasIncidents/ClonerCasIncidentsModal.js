import React, { useEffect, useState } from 'react';

import {
    MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter,
    MDBBreadcrumb, MDBBreadcrumbItem, MDBInput, MDBIcon, MDBRow, MDBCol,
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem,
    MDBListGroupItem, MDBListGroup
  } from 'mdbreact';
import FilterV1 from '../../../filterV1';
import Swal from 'sweetalert2';




const ClonerCasIncidentsModale = ({toggleClone,listcompteurglobal,NameEnergy,getcodecompteur,functionListePourCloner}) => {

const [arrayCompteur,setArrayCompteur]=useState([])
const [addoneCompteur,setaddoneCompteur]=useState(null)
const [addAllCompteurs,setaddAllCompteurs]=useState([])
const [btnDelete, setBtnDelete] = useState(true)
const [BtnAjouteroneCompteur, setBtnAjouteroneCompteur] = useState(false)
const [BtnAjouterAllCompteur, setBtnAjouterAllCompteur] = useState(false)
useEffect(() => {
  console.log("---------",listcompteurglobal)
}, [listcompteurglobal])
useEffect(() => {
    console.log("---------",NameEnergy)
  }, [NameEnergy])

    
 function outSelectedCompteur(json){
    console.log(json)
    setaddoneCompteur({"Code_Compteur":json.Code_Compteur,"Le_Compteur":json.Le_Compteur})
      }
    function outAllFiltredCompteur(jsonAll){
        console.log("outAllFiltredCompteur",jsonAll)
        var array=[]
        for(var i=0;i<jsonAll.length;i++){
            array.push({"Code_Compteur":jsonAll[i].Code_Compteur,"Le_Compteur":jsonAll[i].Le_Compteur})
        }
        setaddAllCompteurs(array)
    }

function selectOne(){
    if(addoneCompteur!=null){
    var array =[]
  //  if (!Object.keys(addoneCompteur).length) return
    console.log(arrayCompteur,"++",arrayCompteur.length,"++",addoneCompteur,"--",)
    if(arrayCompteur.length==0){
        array.push(addoneCompteur)
        setArrayCompteur(array)


        setBtnDelete(false)
        setBtnAjouterAllCompteur(true)
    }else{
        if (!arrayCompteur) return
        if (!arrayCompteur.find((el) => JSON.stringify(el) == JSON.stringify(addoneCompteur))) {
            array.push(addoneCompteur)
            console.log(array)
 
            setArrayCompteur(array.concat(arrayCompteur))




    }else {
        Swal.fire({
            toast: true,
            position: 'top',

            showConfirmButton: false,
            timer: 4000,
            icon: 'warning',
            width: 400,
            title: 'Déja Ajouter dans la liste'
        })
    }
}

}
}
function selectAll(){
    if(addAllCompteurs.length!=0){
    setArrayCompteur(addAllCompteurs)
    setBtnDelete(false)
    setBtnAjouteroneCompteur(true)
}
}

    function deleteAll(){
        setArrayCompteur([])
        setBtnAjouteroneCompteur(false)
        setBtnAjouterAllCompteur(false)
        setBtnDelete(true)
    }

    useEffect(() => {
    console.log("--------addAllCompteurs",addAllCompteurs)
    }, [addAllCompteurs])

    useEffect(() => {
        console.log("--------addoneCompteur",addoneCompteur)
        }, [addoneCompteur])

        useEffect(() => {
            console.log("--------arrayCompteur",arrayCompteur)
            functionListePourCloner(arrayCompteur)
    }, [arrayCompteur])
    

    const scrollContainerStyle = {width: "120%", maxHeight: "400px" };
return(

    <>
            <MDBModalHeader toggle={toggleClone}>Clone Cas-Incident</MDBModalHeader>
                  <MDBModalBody>

                <MDBRow>
                    <MDBCol size="7">
                  <div style={{width:'99%'}}>
                         {listcompteurglobal.length != 0 ? (  <FilterV1 filterName={"Compteur"}
                          outSelected={outSelectedCompteur}
                          outAllFiltred ={outAllFiltredCompteur}
                          filter={[
                            {Energie : {name:"Energie",fixed:true,value:NameEnergy} },
                            { Le_Compteur_Parent: "Compteur Parent" },
                            { type: "Secteur" },
                            { Point_de_Production: "Point de Production" },
                            { Point_de_Distribution: "Point de Distribution" },
                            { Point_de_Consommation: "Point de Consommation" },
                          ]}
                          display={{ separator: "", elems: ["Le_Compteur"] }}
                          data={listcompteurglobal}
                          styleScroll={{ width: "100%", maxHeight: "400px" }}
                         />):null}               
                         
                         </div> 
                         </MDBCol>
                          <MDBCol size="2">
                          <MDBRow style={{marginTop:"80%",marginLeft:"-29px"}}>
                              <MDBCol size="12">
                            
                <MDBBtn size="sm"  onClick={selectOne} disabled={BtnAjouteroneCompteur} style={{width:"70%"}}  ><MDBIcon size="2x" icon="angle-right" className="ml-1" /></MDBBtn>

                              </MDBCol>
                              <MDBCol size="12">
                <MDBBtn size="sm" onClick={selectAll} disabled={BtnAjouterAllCompteur}  style={{width:"70%"}}   ><MDBIcon  size="2x" icon="angle-double-right" className="ml-1" /></MDBBtn>

                              </MDBCol>
                              <MDBCol size="12">
                <MDBBtn size="sm" onClick={deleteAll} disabled={btnDelete}  style={{width:"70%"}}  ><MDBIcon size="2x" icon="trash-alt" className="ml-1" /></MDBBtn>

                              </MDBCol>
                              </MDBRow>
                          </MDBCol>

                          <MDBCol size="3" >
                          <div style={{marginTop:"36px"}}>
                          <div className="d-flex justify-content-between " style={{ marginLeft: "-20%" }} >
                        <p className=" m-0 p-0">Liste des compteurs sélectionnés :</p>
                            </div>
                          <MDBContainer style={{ padding: 0 + 'em' ,marginLeft:"-20%"}}>
                          <MDBListGroup style={{ width: '100%' }} className="scrollbar scrollbar-primary  mx-auto" style={scrollContainerStyle}>
                            {arrayCompteur.map((arrayCompteur, i) =>
                              <div className="d-flex d-flex bd-highlight example-parent" style={{
                                borderLeft: '0.5px solid #d6d4d4',
                                borderBottom: 'none'
                              }} >
                                <MDBListGroupItem hover key={i} value={arrayCompteur.Le_Compteur}
                                  style={{ padding: 0.5 + 'em' }} hover
                                >
                                  {arrayCompteur.Le_Compteur}</MDBListGroupItem>
                              </div>
                            )}
                     
                          </MDBListGroup>
                        </MDBContainer>
                        </div>
                          </MDBCol>

                         </MDBRow>
                  </MDBModalBody>
                  <MDBModalFooter>
                    <MDBBtn color="default" onClick={getcodecompteur}>Cloner</MDBBtn>
                    <MDBBtn color="primary" onClick={toggleClone}>Annuler</MDBBtn>
                  </MDBModalFooter>
    </>
);


}

export default ClonerCasIncidentsModale;

