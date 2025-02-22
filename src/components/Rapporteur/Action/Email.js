
import React, { useEffect, useState } from "react";
import Tabulator from "tabulator-tables";
import axios from 'axios';
import "../CasEmail.css"
import uuid from 'react-uuid';
import Moment from 'moment';
import GenerateTable from '../Rapport/layoutGen/layoutGenerator';
import { MDBContainer, MDBInputGroup, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink, MDBBtn, MDBIcon, MDBModal, MDBListGroup, MDBListGroupItem, MDBModalBody, MDBInput, MDBModalHeader, MDBRow, MDBCol, MDBModalFooter, MDBBreadcrumb, MDBBreadcrumbItem, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';
import Swal from 'sweetalert2';
const validateForm = (errors) => {
  let valid = true;
  console.log(errors)
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

class Email extends React.Component {

  el = React.createRef();

  mytable = "Tabulator"; //variable to hold your table
  tableData = [] //data for table to display
  resetvalueoffilter = () => {

    axios.post(window.apiUrl + "filter/",

      {
        tablename: "Reporting_V3",
        identifier: this.state.dateDMY + uuid(),
        fields: "*",
        content: "*",
        dataselect: "Report_Code;Report_Name;Selected_Global",
        dist: "*",
        orderby: "*",
      }
    )

      .then(
        (result) => {
          this.tableData = result.data;
          if (this.tableData !== null) {
            this.setState({ listRapportglobal: result.data })
            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            var array = []

            for (var i = 0; i < this.state.listRapportglobal.length; i++) {
              // console.log("Selected_GlobalSelected_GlobalSelected_Global---> ",listRapportglobal[0].Selected_Global)
              // console.log("Selected_Global edite------->",listRapportglobal[i].Selected_Global)
              var listeSelected = this.state.listRapportglobal[i].Selected_Global

              if (listeSelected != null) {
                // console.log("listeSelected------->",listeSelected)
                for (var j = 0; j < listeSelected.length; j++) {
                  //  console.log("Dim_type------->",listeSelected[j].Dim_type)
                  var code = ""
                  var name = ""
                  var select

                  //        console.log("-<<<<--",this.state.listRapportglobal[i].Report_Code)
                  //           console.log("-<<<<--",this.state.listRapportglobal[i].Report_Name)
                  //          console.log("-<<<<--",this.state.listRapportglobal[i].Selected_Global)

                  code = this.state.listRapportglobal[i].Report_Code
                  name = this.state.listRapportglobal[i].Report_Name
                  select = this.state.listRapportglobal[i].Selected_Global



                  if (listeSelected[j].Dim_type == "VAR") {
                    //  console.log("hhhhhhhhhhhhhhhhhhhhhhhhmmmmmmmmmmmmmmmmmmmmhhhhh",array) 
                    if (array.length == 0) {
                      array.push({ "Report_Code": code, "Report_Name": name, "Selected_Global": select })
                      console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj", array)
                    } else {
                      var validation = "0";
                      for (var k = 0; k < array.length; k++) {
                        //      console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",array[k])
                        if (code == array[k].Report_Code) {
                          validation = "1"
                          console.log("validation", code, array[k].Report_Code)
                        }
                        else {
                          validation = "2"
                        }
                      }

                      if (validation == "2") {
                        array.push({ "Report_Code": code, "Report_Name": name, "Selected_Global": select })
                      }


                    }

                  }




                }
              }





            }

            console.log("(-----------------------array------------------------>)", array)



            this.setState({ listRapportglobalEdite: array })
            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            console.log("data filter");
            console.log(this.state.listRapportglobal)
          } else {
            console.log('no data change')
          }



        }
      )
    this.state.Master = ""
    this.state.TAGS = ""
    this.state.Tableaux = ""
    this.state.listfieldfiltername = []
    this.state.listfieldfiltercontent = []
  }
  componentDidMount() {
    //getdate
    this.getDate();

    const supprimertemp = this.state.supprimertemp;
    const datamodifier = this.state.datamodifier;
    //////////

    ////////////filter Reporting

    axios.post(window.apiUrl + "filter/",

      {
        tablename: "Reporting_V3",
        identifier: this.state.dateDMY + uuid(),
        fields: "*",
        content: "*",
        dataselect: "Report_Code;Report_Name",
        dist: "*",
        orderby: "*",
      }


    )

      .then(
        (result) => {
          //result.data = result.data;
          if (result.data !== null) {
            this.setState({ listRapportglobal: result.data })
            //   console.log("data filter Reporting");
            console.log("Reporting", this.state.listRapportglobal)
          } else {
            console.log('no data change')
          }


        }
      )
    ////////
    /// api tabulator display EventEMail
    axios.defaults.withCredentials = true;
    axios.post(window.apiUrl + "display/",

      {
        tablename: "Email_V3",
        identifier: this.state.dateDMY + uuid(),
        fields: "*",
        content: "*"
      }


    )

      .then(
        (result) => {
          //this.tableData = result.data;
          if (result.data !== null) {
            const dataglobale = result.data
            console.log("dataglobale", dataglobale)



            for (var i = 0; i < dataglobale.length; i++) {
              console.log("dataglobale55555555555555", dataglobale[i])
              const Email_Code = dataglobale[i].Email_Code
              const Email_Nom = dataglobale[i].Email_Nom
              const Email_Subject = dataglobale[i].Email_Subject
              const Email_Body = dataglobale[i].Email_Body
              const Email_Description = dataglobale[i].Email_Description
          
              ////////Email_To
              if (dataglobale[i].Email_To.length == 0 || dataglobale[i].Email_Attachement.length == 0 ) {

                console.log("vide")
     

              } else {

                const To = [dataglobale[i].Email_To]
                console.log("dattttttttttttttttttttttttttttttaaaaaaaaaa too", To)
                To.forEach(element =>
                  this.state.Email_To_tab = element.Email_To)
              
                To.forEach(element =>
                  this.state.Email_To_tabCode = element.Code_To)
         

                ///// Attachement 

                const Attachement = [dataglobale[i].Email_Attachement]
                console.log("dattttttttttttttttttttttttttttttaaaaaaaaaa Attachement", Attachement)
                Attachement.forEach(element =>
                  this.state.Email_Attachement_tab = element.Email_Attachement)
             
                Attachement.forEach(element =>
                  this.state.Email_Attachement_tabCode = element.Code_Attachement)
               
                Attachement.forEach(element =>
                  this.state.Attachement_tab = element.Attachement)
         

                ///// email_cc 
              
                const CC = [dataglobale[i].Email_CC]
                console.log("dattttttttttttttttttttttttttttttaaaaaaaaaa", CC)
  if(dataglobale[i].Email_CC.length!=0 ){

                CC.forEach(element =>
                  this.state.Email_CC_tab = element.Email_CC
                )


                CC.forEach(element =>
                  this.state.Email_CC_tabCode = element.Code_CC
                )}
                const Email_To = this.state.Email_To_tab;
                const To_code = this.state.Email_To_tabCode;
                const Email_Attachement = this.state.Email_Attachement_tab;
                const Attachement_Code = this.state.Email_Attachement_tabCode;
                const Attachement2 = this.state.Attachement_tab;
                const Email_CC = this.state.Email_CC_tab;
                const cc_code = this.state.Email_CC_tabCode
                console.log("Email_CC", Email_CC)
                console.log("cc_code", cc_code)
                console.log("Attachement_Code", Attachement_Code)
                console.log("Email_Attachement", Email_Attachement)
                console.log("Attachement2", Attachement2)
                console.log("To_code", To_code)
                console.log("Email_To", Email_To)
                const dataEmail = { "Email_Code": Email_Code, "Email_Nom": Email_Nom, "Email_Subject": Email_Subject, "Email_Body": Email_Body, "Email_To": Email_To, "Email_Description": Email_Description, "Email_Attachement": Email_Attachement, "Email_CC": Email_CC, "Code_CC": cc_code, "Code_Attachement": Attachement_Code, "Code_To": To_code, "Attachement": Attachement2 }
  

                this.state.Email.push(dataEmail)
              }
              console.log("kkkkkkkk",this.state.Email)
            }
          }
          else {
            console.log("data Email est vide")
          }
          this.tableData = this.state.Email
          console.log("Email", this.tableData)


          //tabulator
          this.mytable = new Tabulator(this.el, {
            data: this.tableData,

            //link data to table
            reactiveData: true, //enable data reactivity
            addRowPos: "top",
            pagination: "local",
            paginationSize: 6,
            movableColumns: true,
            resizableRows: true,
            reactiveData: true,
            printRowRange: "selected",
            selectable: 1,
            selectablePersistence: this.state.position,

            paginationSizeSelector: [3, 6, 8, 10],
            columns: [
              {
                hozAlign: "center",
                headerSort: false,
                cellClick: function (e, cell, row) {
                  var position = cell.getRow().getPosition()
                  console.log(position);
                  datamodifier.splice(0, 2);
                  datamodifier.push(cell.getData(), cell.getRow().getPosition());
                  console.log("valider", datamodifier)


                }
              },
              {
                title: "Nom de l'Email",
                field: "Email_Nom",
                width: "13%",
                headerFilter: "input",
                cellClick: function (e, cell, row) {
                  var position = cell.getRow().getPosition()
                  console.log(position);
                  datamodifier.splice(0, 2);
                  datamodifier.push(cell.getData(), position);
                  var Attachement = cell.getData().Attachement;

                  console.log("Attachement", Attachement)

                  console.log("valider", datamodifier)


                }
              },

              {
                title: "Email To",
                field: "Email_To",

                width: "13%",
                cellClick: function (e, cell, row) {
                  var position = cell.getRow().getPosition()
                  console.log(position);
                  datamodifier.splice(0, 2);
                  datamodifier.push(cell.getData(), position);
                  console.log("valider", datamodifier)

                }
              },
              {
                title: "Email CC",
                field: "Email_CC",
                width: "13%",
                cellClick: function (e, cell, row) {
                  var position = cell.getRow().getPosition()
                  console.log(position);
                  datamodifier.splice(0, 2);
                  datamodifier.push(cell.getData(), position);
                  console.log("valider", datamodifier)


                }
              },
              {
                title: "Objet",
                field: "Email_Subject",
                width: "12%",
                cellClick: function (e, cell, row) {
                  var position = cell.getRow().getPosition()
                  console.log(position);
                  datamodifier.splice(0, 2);
                  datamodifier.push(cell.getData(), position);
                  console.log("valider", datamodifier)


                }

              },
              {
                title: "Corps de l'email",
                field: "Email_Body",
                width: "12%",
                cellClick: function (e, cell, row) {
                  var position = cell.getRow().getPosition()
                  console.log(position);
                  datamodifier.splice(0, 2);
                  datamodifier.push(cell.getData(), position);
                  console.log("valider", datamodifier)


                }

              },
              {
                title: "Attachement",
                field: "Email_Attachement",
                width: "14%",
                cellClick: function (e, cell, row) {
                  var position = cell.getRow().getPosition()
                  console.log(position);
                  datamodifier.splice(0, 2);
                  datamodifier.push(cell.getData(), position);
                  console.log("valider", datamodifier)



                }

              },
              {
                title: "Description de l'Email",
                field: "Email_Description",
                width: "13%",
                cellClick: function (e, cell, row) {
                  var position = cell.getRow().getPosition()
                  console.log(position);
                  datamodifier.splice(0, 2);
                  datamodifier.push(cell.getData(), position);
                  console.log("valider", datamodifier)


                }

              },

              {
                title: "Supprimer",
                field: "supprimer",
                width: "7%",
                hozAlign: "center",
                formatter: function () { //plain text value

                  return "<i class='fa fa-trash-alt icon'></i>";

                },
                cellClick: function (e, cell) {
                  cell.getData();
                  ///Email_CC
                  var CC = { "Email_CC": cell.getData().Email_CC, "Code_CC": cell.getData().Code_CC }
                  var Email_cc = []
                  Email_cc.push(CC)
                  var Email_CC = JSON.stringify(Email_cc)
                  ////
                  ///Email_To
                  var To = { "Email_To": cell.getData().Email_To, "Code_To": cell.getData().Code_To }
                  var Email_to = []
                  Email_to.push(To)
                  var Email_To = JSON.stringify(Email_to)
                  ////
                  ///Email_Attachement
                  var Attachement = { "Email_Attachement": cell.getData().Email_Attachement, "Code_Attachement": cell.getData().Code_Attachement }
                  var Email_attachement = []
                  Email_attachement.push(Attachement)
                  var Email_Attachement = JSON.stringify(Email_attachement)
                  ////
                  //supprimertemp.push(cell.getData().Email_Code + ";" + cell.getData().Email_Nom + ";" + cell.getData().Email_Subject + ";" + cell.getData().Email_Body + ";" + cell.getData().Email_Description + ";" + cell.getData().To_internal + ";" + cell.getData().CC_internl + ";" + cell.getData().Report_FactBook + ";" + Email_Attachement + ";" + Email_To + ";" + Email_CC + ";" + 3);
                  supprimertemp.push(
                    {
                      "Email_Code": cell.getData().Email_Code,
                      "Email_Nom": cell.getData().Email_Nom,
                      "Email_Subject": cell.getData().Email_Subject,
                      "Email_Body": cell.getData().Email_Body,
                      "Email_Description": cell.getData().Email_Description,
                      "To_internal": cell.getData().To_internal,
                      "CC_internl": cell.getData().CC_internl,
                      "Report_FactBook": cell.getData().Report_FactBook,
                      "Email_Attachement": Email_Attachement,
                      "Email_To": Email_To,
                      "Email_CC": Email_CC,
                      "DBAction": "3"
                    }
                  )

                  console.log(supprimertemp)
                  cell.getRow().delete();
                  Swal.fire({
                    toast: true,
                    position: 'top',
                    showConfirmButton: false,
                    timer: 4000,
                    width: 300,
                    icon: '',
                    title: 'Supprimer temporairement  ' + cell.getData().Email_Nom

                  })
                },
                hideInHtml: true,
              },
            ], //define table columns

          });

          console.log("Email base", result.data);


        }
      )

    /////////////////////////////////PowerBI
    // axios.defaults.withCredentials = true;
    // axios.post(window.apiUrl + "display/",

    //   {
    //     tablename: "PBI",
    //     identifier: this.state.dateDMY + uuid(),
    //     fields: "*",
    //     content: "*"
    //   }


    // )

    //   .then(
    //     (result) => {
    //       if (result.data !== null){
    //       this.state.PowerBI = result.data;
    //       console.log("PowerBI", this.state.PowerBI)
    //       }else{
    //         console.log("data PowerBI est vide")
    //       }
    //     })
    ////////////////////////////Mailing liste

    axios.defaults.withCredentials = true;
    axios.post(window.apiUrl + "display/",

      {
        tablename: "MailingList_V3",
        identifier: this.state.dateDMY + uuid(),
        fields: "*",
        content: "*"
      }


    )

      .then(
        (result) => {
          if (result.data !== null) {
            this.state.MailingList = result.data;

            console.log("MailingList", this.state.MailingList)
          }
          else {
            console.log("data MailingList est vide")
          }
        })

  }

  getDate() {

    var date = { currentTime: new Date().toLocaleString() };
    this.setState({
      date: date
    });
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
    this.state.errors = {
      Email_Nom: ' ',
      Email_To_Name: ' ',
      Email_Subject: ' ',
    }
    this.state.Email_Nom = "";
    this.state.Email_To_Name = "";
    this.state.Email_CC_Name = "";
    this.state.Email_Body = "";
    this.state.Email_Attachement = "";
    this.state.Attachement = "";
    this.state.Email_Description = "";
    this.state.Email_Subject = "";
  };
  toggle3 = () => {

    if (this.state.datamodifier.length != 0) {
      this.setState({
        modal3: !this.state.modal3
      });
      Swal.fire({
        toast: true,
        position: 'top',

        showConfirmButton: false,
        timer: 5000,
        icon: 'warning',
        width: 400,
        title: 'écraser Rapport existants'
      })
    
    } else {
      this.setState({
        modal3: !this.state.modal3
      });
    }
  }

  toggle6 = () => {
    this.setState({
      modal6: !this.state.modal6
    });
  };

  toggle1 = () => {
    if (this.state.datamodifier.length != []) {
      this.setState({
        modal1: !this.state.modal1
      })
      this.state.errors = {
        Email_Nom: ' ',
        Email_To_Name: ' ',
        Email_Subject: ' ',
      }
      this.state.datamodifier.push();
      //console.log(this.state.datamodifier)
      this.state.Email_Code = this.state.datamodifier[0].Email_Code;
      this.state.Email_Nom = this.state.datamodifier[0].Email_Nom;
      this.state.Email_To_Name = this.state.Email_To = this.state.datamodifier[0].Email_To;
      //console.log("Email_To", this.state.Email_To)
      this.state.Email_CC_Name = this.state.Email_CC = this.state.datamodifier[0].Email_CC;
      // console.log("Email_CC", this.state.Email_CC)
      this.state.Email_Subject = this.state.datamodifier[0].Email_Subject;
      this.state.Email_Body = this.state.datamodifier[0].Email_Body;
      this.state.Email_Attachement = this.state.datamodifier[0].Email_Attachement;

      this.state.Attachement = this.state.datamodifier[0].Attachement;
      // console.log("Attachement", this.state.Attachement)
      this.state.Email_Description = this.state.datamodifier[0].Email_Description;
      this.state.To_internal = this.state.datamodifier[0].To_internal;
      this.state.CC_internl = this.state.datamodifier[0].CC_internl;
      this.state.Report_FactBook = this.state.datamodifier[0].Report_FactBook;

      this.state.position = this.state.datamodifier[1];
      /*
         var $ = require("jquery");
      
         if (this.state.datamodifier[0].Attachement=="Rapport") {
      
           $('#Rapport').show();
          
           
         }
         if (this.state.datamodifier[0].Attachement =="PowerBI") {
           $('#PowerBI').show();
       
         }
         if (this.state.datamodifier[0].Attachement=="FactBook") {
             $('#FactBook').show();
            
       
           }
      */



    } else {
      Swal.fire({
        toast: true,
        position: 'top',

        showConfirmButton: false,
        timer: 4000,
        icon: 'warning',
        width: 400,
        title: 'Sélectionner pour le modifier'
      })
    }
  };

  ajouter() {

    self = this

    if (validateForm(this.state.errors) == true) {
      this.setState({
        modal: !this.state.modal
      });


      Swal.fire({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 4000,
        width: 300,
        icon: 'success',
        title: 'Ajouter'

      })


      axios.post(window.apiUrl + "sendid/",
        {
          tablename: "Email_V3",
          identifier: this.state.dateDMY + uuid(),
          nombermaxcode: '1',
          primaryfield: "Email_Code",
          fields: "*",
          content: "*",

        }
      )

        .then(
          (result) => {

            // this.state.Email_Code = result.data.substring(1, result.data.length-1);
            if (result.data !== null) {
              var code = result.data.split(", ")
              this.state.Email_Code = code
              console.log("Email_Code")
              console.log(this.state.Email_Code)
            } else {
              console.log('Email_Code est vide')


            }

            const Email_Code = this.state.Email_Code[0];
            const Email_Nom = this.state.Email_Nom;


            const Email_Subject = this.state.Email_Subject;
            const Email_Body = this.state.Email_Body;

            // const Email_Attachement = this.state.Email_Attachement;
            const Email_Description = this.state.Email_Description;
            const To_internal = this.state.To_internal;
            const CC_internl = this.state.CC_internl;
            const Report_FactBook = this.state.Report_FactBook;

            const DBAction = "2";


            ////////////////Email_To_Json
            this.state.Email_To_Json = [{ "Email_To": this.state.Email_To_Name, "Code_To": this.state.Email_To_Code }]

            console.log("Email_To_Json", this.state.Email_To_Json)
            // const Email_To_Json = JSON.stringify(this.state.Email_To_Json);
         
            const Email_To_Json_Base = { "Email_To": this.state.Email_To_Name, "Code_To": this.state.Email_To_Code };
            //////////////Email_CC_Json
            this.state.Email_CC_Json = [{ "Email_CC": this.state.Email_CC_Name, "Code_CC": this.state.Email_CC_Code }]
            console.log("Email_CC_Json", this.state.Email_CC_Json)
            // const Email_CC_Json = JSON.stringify(this.state.Email_CC_Json);
            var Email_CC_Json_Base = {}
            console.log("------------------------",this.state.Email_CC_Name!="" && this.state.Email_CC_Code!="")
            if(this.state.Email_CC_Name!="" && this.state.Email_CC_Code!=""){
             Email_CC_Json_Base = { "Email_CC": this.state.Email_CC_Name, "Code_CC": this.state.Email_CC_Code };
          }else {
             Email_CC_Json_Base = {}
          }
            /////////////Email_Attachement_Json
            this.state.Email_Attachement_Json = [{ "Attachement": this.state.Attachement, "Email_Attachement": this.state.Email_Attachement, "Code_Attachement": this.state.Code_Attachement }]
            console.log("Email_Attachement", this.state.Email_Attachement_Json)
            //const Email_Attachement_Json = JSON.stringify(this.state.Email_Attachement_Json);
            const Email_Attachement_Json_Base = { "Attachement": this.state.Attachement, "Email_Attachement": this.state.Email_Attachement, "Code_Attachement": this.state.Code_Attachement };

            //this.state.ajout = (Email_Code + ";" + Email_Nom + ";" + Email_Subject + ";" + Email_Body + ";" + Email_Description + ";" + To_internal + ";" + CC_internl + ";" + Report_FactBook + ";" + Email_Attachement_Json_Base + ";" + Email_To_Json_Base + ";" + Email_CC_Json_Base + ";" + DBAction)
            this.state.ajout = {
              "Email_Code": Email_Code,
              "Email_Nom": Email_Nom,
              "Email_Subject": Email_Subject,
              "Email_Body": Email_Body,
              "Email_Description": Email_Description,
              "To_internal": To_internal,
              "CC_internl": CC_internl,
              "Report_FactBook": Report_FactBook,
              "Email_Attachement": Email_Attachement_Json_Base,
              "Email_To": Email_To_Json_Base,
              "Email_CC": Email_CC_Json_Base,
              "DBAction": DBAction
            }
            this.state.ajoutertemp.push(this.state.ajout);
            ///////////////////////////
            ////////////////
            if (this.state.Report_Name_Enregistrer != 0) {
              const config = JSON.stringify(this.state.config)
              const config1 = config.replace(/'/g, "''")
              const config2 = JSON.parse(config1)
              this.state.ajoutertemprapport.push({
                "Report_Code": this.state.Code_Attachement,
                "Report_Name": this.state.Email_Attachement,
                "Report_TableauName": this.state.Report_TableauName,
                "Report_TableauCode": this.state.Report_TableauCode,
                "Report_Description": this.state.Report_Description,
                "Report_Master": "Non",
                "Report_EnergyCode": "",
                "Report_EnergyName": "",
                "Report_ViewCode": "",
                "Report_ViewName": "",
                "Report_PostCCode": "",
                "Report_PostCName": "",
                "Auteur": this.state.Auteur,
                "Body": config2,
                "Selected_Global": this.state.Selected_Global_Enregistrer,
                "Html": "",
                "TAGS": this.state.TAGS_New,
                "SHAH1_code": this.state.SHAH1_code,
                "Access_Groupe_User": this.state.Access_Groupe_User,
                "disposition": this.state.disposition,
                "DBAction": "2"
              })

            }
            /////////////////
            /////////////Email_To
            const Email_To = this.state.Email_To_Json[0].Email_To;
            console.log("Email_To", Email_To)
            /////////////Email_CC
            const Email_CC = this.state.Email_CC_Json[0].Email_CC;
            console.log("Email_CC", Email_CC)
            /////////////Attachement
            const Email_Attachement = this.state.Email_Attachement_Json[0].Email_Attachement;
            console.log("Email_Attachement", Email_Attachement)
            //////////// ajouter dans tabulator
            this.mytable.addRow({ Email_Code, Email_Nom, Email_To, Email_CC, Email_Subject, Email_Body, Email_Attachement, Email_Description }, true);
            console.log(this.mytable)
            console.log(this.state.ajout);
            console.log(this.state.ajoutertemp);

            ////////////           
            this.state.Email_Nom = "";
            this.state.Email_To = "";
            this.state.Email_CC = "";
            this.state.Email_Subject = "";
            this.state.Email_Body = "";
            this.state.Email_Attachement = "";
            this.state.Email_Description = "";


          })

    } else {
      Swal.fire({
        toast: true,
        position: 'top',

        showConfirmButton: false,
        timer: 4000,
        icon: 'warning',
        width: 400,
        title: 'S\il vous plait remplir tous les champs obligatoire'
      })
    }
  }
  modifier() {
    this.setState({
      modal1: !this.state.modal1
    });
    Swal.fire({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 4000,
      width: 300,
      icon: 'success',
      title: 'Modifier'

    })

    const Email_Code = this.state.Email_Code;
    const Email_Nom = this.state.Email_Nom;


    const Email_Subject = this.state.Email_Subject;
    const Email_Body = this.state.Email_Body;

    // const Email_Attachement = this.state.Email_Attachement;
    const Email_Description = this.state.Email_Description;
    const To_internal = this.state.To_internal;
    const CC_internl = this.state.CC_internl;
    const Report_FactBook = this.state.Report_FactBook;

    const DBAction = "1";


    ////////////////Email_To_Json
    this.state.Email_To_Json = [{ "Email_To": this.state.Email_To_Name, "Code_To": this.state.Email_To_Code }]
    console.log("Email_To_Json", this.state.Email_To_Json)
    //const Email_To_Json = JSON.stringify(this.state.Email_To_Json);
    const Email_To_Json_Base = { "Email_To": this.state.Email_To_Name, "Code_To": this.state.Email_To_Code };
    //////////////Email_CC_Json
    this.state.Email_CC_Json = [{ "Email_CC": this.state.Email_CC_Name, "Code_CC": this.state.Email_CC_Code }]
    console.log("Email_CC_Json", this.state.Email_CC_Json)
    // const Email_CC_Json = JSON.stringify(this.state.Email_CC_Json);
    const Email_CC_Json_Base = { "Email_CC": this.state.Email_CC_Name, "Code_CC": this.state.Email_CC_Code };
    /////////////Email_Attachement_Json
    this.state.Email_Attachement_Json = [{ "Attachement": this.state.Attachement, "Email_Attachement": this.state.Email_Attachement, "Code_Attachement": this.state.Code_Attachement }]
    const Email_Attachement_Json_Base = { "Attachement": this.state.Attachement, "Email_Attachement": this.state.Email_Attachement, "Code_Attachement": this.state.Code_Attachement };
    console.log("Email_Attachement", this.state.Email_Attachement_Json)
    //const Email_Attachement_Json = JSON.stringify(this.state.Email_Attachement_Json);

    // push with modificationtemp 
    this.state.modificationtemp.push(
      {
        "Email_Code": Email_Code,
        "Email_Nom": Email_Nom,
        "Email_Subject": Email_Subject,
        "Email_Body": Email_Body,
        "Email_Description": Email_Description,
        "To_internal": To_internal,
        "CC_internl": CC_internl,
        "Report_FactBook": Report_FactBook,
        "Email_Attachement": Email_Attachement_Json_Base,
        "Email_To": Email_To_Json_Base,
        "Email_CC": Email_CC_Json_Base,
        "DBAction": DBAction
      });
    console.log(this.state.modificationtemp);

    /////////////Email_To
    const Email_To = this.state.Email_To_Json[0].Email_To;
    console.log("Email_To", Email_To)
    /////////////Email_CC
    const Email_CC = this.state.Email_CC_Json[0].Email_CC;
    console.log("Email_CC", Email_CC)
    /////////////Attachement
    const Email_Attachement = this.state.Email_Attachement_Json[0].Email_Attachement;
    console.log("Email_Attachement", Email_Attachement)
    this.mytable.redraw(true);
    console.log("this.state.position", this.state.position)
    console.log("this.state.tableData", this.tableData)
    this.tableData[this.state.position].Email_Nom = Email_Nom;
    this.tableData[this.state.position].Email_To = Email_To;
    this.tableData[this.state.position].Email_CC = Email_CC;
    this.tableData[this.state.position].Email_Subject = Email_Subject;
    this.tableData[this.state.position].Email_Body = Email_Body;
    this.tableData[this.state.position].Email_Attachement = Email_Attachement;
    this.tableData[this.state.position].Email_Description = Email_Description;
    console.log("Email_Attachement---------------------",  this.tableData[this.state.position].Email_Attachement)
    console.log("testttttt  " + [Email_Code, Email_Nom, Email_To, Email_CC, Email_Subject, Email_Body, Email_Attachement, Email_Description])
    this.state.Email_Nom = "";
    this.state.Email_To = "";
    this.state.Email_CC = "";
    this.state.Email_Subject = "";
    this.state.Email_Body = "";
    this.state.Email_Attachement = "";
    this.state.Email_Description = "";

  }

  Enregistrer() {
    console.log("Email_Code", this.state.Email_Code,
      "supprimertemp", this.state.supprimertemp.length,
      "   ajoutertemp", this.state.ajoutertemp.length,
      "   modificationtemp", this.state.modificationtemp.length
    )
    if (this.state.ajoutertemp.length != 0 || this.state.modificationtemp.length != 0 || this.state.supprimertemp.length != 0) {


      axios.post(window.apiUrl + "updatedelete/", {
        tablename: "Email_V3",
        identifier: this.state.dateDMY + uuid(),
        datatomodified: [].concat(this.state.ajoutertemp).concat(this.state.modificationtemp).concat(this.state.supprimertemp),
      }
      )
        .then((response) => {
          console.log("Enregistrer");
          console.log(response.status);
          console.log(response.statusText);
          console.log(response);
          console.log(response.data);
          if (response.data != 0) {
            Swal.fire({
              toast: true,
              position: 'top',
              showConfirmButton: false,
              timer: 4000,
              width: 300,
              icon: 'success',
              title: 'Enregister avec succès'

            })
            if (this.state.ajoutertemprapport.length != 0) {
              axios.post(window.apiUrl + "updatedelete/", {
                tablename: "Reporting_V3",
                identifier: this.state.dateDMY + uuid(),
                datatomodified: [].concat(this.state.ajoutertemprapport),
              }
              )
                .then((response) => {
                  console.log("Enregistrer Rapport");
                  console.log(response.status);
                  console.log(response.statusText);
                  console.log(response);
                  console.log(response.data);


                })
            }
            // setTimeout(function () {
            //   window.location.reload(1);
            // }, 1000);

          }
        })
        .catch((err) => console.error(err));

    } else {
      Swal.fire({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 4000,
        width: 300,
        icon: 'warning',
        title: 'Créez ou Modifier'
      })
    }
  }
  logValue = value => {
    console.log(value);
  };
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    /////////////////////////////////////////////////////
    const { name, value } = e.target;
    let errors = this.state.errors;
    switch (name) {
      case 'Email_Nom':
        errors.Email_Nom =
          value.length < 5 /* && typeof value.length == "string" */
            ? 'Nom doit comporter au moins 5 caractères!'
            : '';
        break;
      case 'Email_To_Name':
        errors.Email_To_Name =
          value.length < 1
            ? 'Email To est vide!'
            : '';
        break;



      case 'Email_Subject':
        errors.Email_Subject =
          value.length < 5
            ? 'Objet doit comporter au moins 5 caractères!'
            : '';
        break;


      default:
        break;
    }

    this.setState({ errors, [name]: value });

    ////////////////////////////////////////////////////
    var $ = require("jquery");

    if (e.target.value == "Rapport") {

      $('#Rapport').show();
      //  $('#PowerBI').hide();
      $('#FactBook').hide();
      ;
    }
    // if (e.target.value == "PowerBI") {
    //   $('#PowerBI').show();
    //   $('#Rapport').hide();
    //   $('#FactBook').hide();
    // }
    if (e.target.value == "FactBook") {
      $('#FactBook').show();
      // $('#PowerBI').hide();
      $('#Rapport').hide();

    }

  }
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      modal1: false,
      modal2: false,
      modal3: false,
      modal4: false,
      modal5: false,
      modal6: false,
      modal7: false,
      Email_Nom: "",
      Email_To: "",
      Email_To_Json: [],
      Email_CC_Json: [],
      Email_Attachement_Json: [],
      Email_CC: "",
      Email_Code: "",
      Email_Description: "",
      Email_Subject: "",
      Email_Body: "",
      Email_Attachement: "",
      Email: [],
      To_internal: "",
      CC_internl: "",
      Report_FactBook: "",
      action: "",
      ajout: "",
      ajoutertemp: [],
      prefix: "",
      max: "",
      modifier: "",
      temp: "",
      supprimer: "",
      data: "",
      supprimertemp: [],
      modificationtemp: [],
      datamodifier: [],
      // PowerBI: [],
      FactBook: [],
      Email_To_Name: "",
      Email_To_Code: "",
      Email_CC_Name: "",
      Email_CC_tab: "",
      Email_To_tab: "",
      Email_CC_tabCode: "",
      Email_To_tabCode: "",
      Email_Attachement_tabCode: "",
      Attachement_tab: "",
      Email_Attachement_tab: "",
      Email_CC_Code: "",
      //   PowerBI_Code: "",
      MailingList: [],
      Attachement: "",
      MailingList_Code: "",
      Code_FactBook: "",
      dateDMY: Moment(this.getDate.date).format('DD-MM-YYYY-hh-mm-ss-SSSSSS-'),
      Code_Compteur: "",
      NameEnergy: '',
      EnergyMeasure: '',
      Tableaux: '',
      energie: '',
      view: '',
      unite: '',
      unite1: '',
      Sys_mesureid: '',

      listNameEnergy: [],
      LeCompteur: [],
      dataCompteur: [],
      dataEnergyMeasure: [],
      dataEnergy: [],
      listRapportglobal: [],

      listfieldfiltername: [],
      listfieldfiltercontent: [],
      listTableau: [],
      listenergie: [],
      listview: [],
      listunite: [],
      codeunite: [],
      U_Rapportselected: "",
      position: null,
      ////////////


      listTableau: [],
      listTAGS: [],
      listMaster: [],
      Listes_TL: [],
      Listes_Ml: [],
      Listes_Cl: [],
      Listes_Cl2: [],
      Tableaux: '',
      Master: '',
      TAGS: "",
      Code_Cl: "",
      Name_Cl: "",
      Code_Ml: "",
      Name_Ml: "",
      Name_Tl: "",
      Code_Tl: "",
      BtnMlDesibled: false,
      BtnClDesibled: false,
      BtnTlDesibled: false,
      BtnEnregistreDesibled: true,
      tl_members: [],
      tl_name: "",
      tl_id: "",
      BooleanVar_CL: false,
      BooleanVar_ML: false,
      BooleanVar_TL: false,
      cl_Membre_Select_fin: [],
      ml_Membre_Select_fin: [],
      Selected_Global: [],
      CL_Membre: [],
      ML_Membre: [],
      Le_Compteur_Liste: [],
      m_name_Liste: [],
      CompteurListI_Name: "",
      ML_Name: "",
      filterNameRapport: [],
      Report_Name: "",
      RapportAfficher: [],
      Report_TableauCode: "",
      Report_TableauName: "",
      Selected_Global: [],
      Access_Groupe_User: "",
      disposition: "",
      editRapport: null,
      Report_Name_Enregistrer: "",
      items: {
        default: "1",
      },
      /////////
      errors: {
        Email_Nom: '* Obligatoire',
        Email_To_Name: '* Obligatoire',
        Email_Subject: '* Obligatoire',
      },
      GenerateTableActive: false,
      AjouterRapport: false,
      config: null,
      layoutFormat: null,
      Report_Code_Enregistrer: "",
      /////
      ajoutertemprapport: [],
      Report_Description: "",
      Report_TableauCode: "",
      Report_TableauName: "",
      TAGS_New: "",
      SHAH1_code: "",
      disposition: "",
      Access_Groupe_User: "",
      ///////////////////
      listesFactbook: [],
      NomFactbbok: "",
      Factbook_Membre: [],
    }
    this.handleChange = this.handleChange.bind(this);
    this.ajouter = this.ajouter.bind(this);
    this.Enregistrer = this.Enregistrer.bind(this);
    this.modifier = this.modifier.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.Email_CC_Click = this.Email_CC_Click.bind(this);
    //  this.PowerBIClick = this.PowerBIClick.bind(this);
    this.FactBookClick = this.FactBookClick.bind(this);
    this.btndelete_Email_Attachement = this.btndelete_Email_Attachement.bind(this)
    this.copier = this.copier.bind(this);
    this.handleRapportselectedchange = this.handleRapportselectedchange.bind(this)
    this.handleListeCompteurClick = this.handleListeCompteurClick.bind(this)
    this.handleListeMLClick = this.handleListeMLClick.bind(this)
    this.modelCl = this.modelCl.bind(this)
    this.modelMl = this.modelMl.bind(this)
    this.CL_Tags_Function = this.CL_Tags_Function.bind(this)
    this.ML_Tags_Function = this.ML_Tags_Function.bind(this)
    this.handleListeTLClick = this.handleListeTLClick.bind(this)
    this.AjouterCl = this.AjouterCl.bind(this)
    this.AjouterMl = this.AjouterMl.bind(this)
    this.AjouterTl = this.AjouterTl.bind(this)
  }
  togglePills = (type, tab, name) => e => {
    e.preventDefault();

    let items = { ...this.state.items };
    if (tab === "2") {


      if (items[type] !== "2") {


        console.log('ggggg')

        items[type] = "2";
        this.setState({
          items
        });
        console.log("this.state.Body1", this.state.Body)
        if (this.state.cl_Membre_Select_fin.length != 0 || this.state.ml_Membre_Select_fin.length != 0 || this.state.tl_members.length != 0) {
          console.log("Selected_Global_Rapport_Array", this.state.Selected_Global_Rapport_Array)


          var data = []
          if (this.state.cl_Membre_Select_fin.length != 0 && this.state.ml_Membre_Select_fin.length == 0 && this.state.tl_members.length == 0) {
            /////CL
            data = [{
              "cl": {
                "tag": this.state.CompteurListI_Name,
                "members": this.state.cl_Membre_Select_fin
              }
            }]

          } else if (this.state.ml_Membre_Select_fin.length != 0 && this.state.tl_members.length == 0 && this.state.cl_Membre_Select_fin.length == 0) {
            /////ML
            data = [{
              "ml": {
                "tag": this.state.CompteurListI_Name,
                "members": this.state.ml_Membre_Select_fin
              }
            }]
          } else if (this.state.tl_members.length != 0 && this.state.cl_Membre_Select_fin.length == 0 && this.state.ml_Membre_Select_fin.length == 0) {
            /////TL
            data = [{
              "tl": {
                "tag": this.state.CompteurListI_Name,
                "members": this.state.tl_members
              }
            }]

          } else if (this.state.cl_Membre_Select_fin.length != 0 && this.state.ml_Membre_Select_fin.length != 0 && this.state.tl_members.length == 0) {
            ////// cl & ml
            data = [{
              "cl": {
                "tag": this.state.CompteurListI_Name,
                "members": this.state.cl_Membre_Select_fin
              },
              "ml": {
                "tag": this.state.CompteurListI_Name,
                "members": this.state.ml_Membre_Select_fin
              }
            }]
          } else if (this.state.cl_Membre_Select_fin.length != 0 && this.state.tl_members.length != 0 && this.state.ml_Membre_Select_fin.length == 0) {
            /////cl & tl          
            data = [{
              "cl": {
                "tag": this.state.CompteurListI_Name,
                "members": this.state.cl_Membre_Select_fin
              },
              "tl": {
                "tag": this.state.CompteurListI_Name,
                "members": this.state.tl_members
              }
            }]
          } else if (this.state.ml_Membre_Select_fin.length != 0 && this.state.tl_members.length != 0 && this.state.cl_Membre_Select_fin.length == 0) {
            //// ml & tl    


            data = [{
              "ml": {
                "tag": this.state.CompteurListI_Name,
                "members": this.state.ml_Membre_Select_fin
              },
              "tl": {
                "tag": this.state.CompteurListI_Name,
                "members": this.state.tl_members
              }
            }]

          } else if (this.state.cl_Membre_Select_fin.length != 0 && this.state.tl_members.length != 0 && this.state.ml_Membre_Select_fin.length != 0) {
            //      cl & tl & ml     


            data = [{
              "cl": {
                "tag": this.state.CompteurListI_Name,
                "members": this.state.cl_Membre_Select_fin
              },
              "ml": {
                "tag": this.state.CompteurListI_Name,
                "members": this.state.ml_Membre_Select_fin
              },
              "tl": {
                "tag": this.state.CompteurListI_Name,
                "members": this.state.tl_members
              }
            }]
          }
          console.log("datadatadatadatadata", data)
          axios.post(window.apiUrl + "cloneV2/",

            {
              "R_IDs": [this.state.Code_Attachement],
              "data": data

            }


          )

            .then(
              (result) => {
                //   this.tableData = result.data;
                if (result.data !== null) {

                  console.log("sssssssssssssssssssssssssssssssssssss", result.data)
                  this.setState({ config: result.data[0] })
                  this.setState({ GenerateTableActive: false })

                  setTimeout(() => this.setState({ GenerateTableActive: true }), 500)
                  // this.setState({AjouterRapport: true})
                  this.state.AjouterRapport = true
                  console.log("AjouterRapportAjouterRapportAjouterRapport", this.state.AjouterRapport)
                } else {
                  console.log('no data change')
                }



              }
            )

        }
        else {




          console.log("this.state.Body", this.state.Body)
          this.setState({ config: this.state.Body })
          this.setState({ GenerateTableActive: false })
          setTimeout(() => this.setState({ GenerateTableActive: true }), 500)


          this.state.AjouterRapport = false
          console.log("AjouterRapportAjouterRapportAjouterRapport2222222222", this.state.AjouterRapport)

        }
      }


    }
    else {
      console.log('ggsssssggg')
      items[type] = tab;
      this.setState({
        items
      });
    }
  };
  copier = () => {

    if (this.state.datamodifier.length != 0) {

      this.state.datamodifier.push();
      console.log(this.state.datamodifier)
      this.setState({ isDisabledbutton: true })

      axios.post(window.apiUrl + "sendid/",
        {
          tablename: "Email_V3",
          identifier: this.state.dateDMY + uuid(),
          nombermaxcode: '1',
          primaryfield: "Email_Code",
          fields: "*",
          content: "*",

        }
      )

        .then(
          (result) => {

            console.log('resultt data get max code ' + result.data)
            if (result.data == null) {
              alert("N'existe pas max code ");

            } else {
              var code = result.data.split(", ")
              this.setState({ Email_Code: code })
              console.log(this.state.Email_Code, "Email_Code")

              /////////////////////////////////////Email Select
              this.state.Email_Nom = 'copie ' + this.state.datamodifier[0].Email_Nom;
              this.state.Email_To_Name = this.state.Email_To = this.state.datamodifier[0].Email_To;
              this.state.Email_To_Code = this.state.datamodifier[0].Code_To;
              //  Code_CC
              //console.log("Email_To", this.state.Email_To)
              this.state.Email_CC_Name = this.state.Email_CC = this.state.datamodifier[0].Email_CC;
              this.state.Email_CC_Code = this.state.datamodifier[0].Code_CC;
              // console.log("Email_CC", this.state.Email_CC)
              this.state.Email_Subject = this.state.datamodifier[0].Email_Subject;
              this.state.Email_Body = this.state.datamodifier[0].Email_Body;
              this.state.Email_Attachement = this.state.datamodifier[0].Email_Attachement;

              this.state.Attachement = this.state.datamodifier[0].Attachement;
              this.state.Code_Attachement = this.state.datamodifier[0].Code_Attachement
              // console.log("Attachement", this.state.Attachement)
              this.state.Email_Description = this.state.datamodifier[0].Email_Description;
              this.state.To_internal = this.state.datamodifier[0].To_internal;
              this.state.CC_internl = this.state.datamodifier[0].CC_internl;
              this.state.Report_FactBook = this.state.datamodifier[0].Report_FactBook;

              this.state.position = this.state.datamodifier[1];
              ///////////////////////////////////////////////////////////////////





              const Email_Code = this.state.Email_Code[0];
              const Email_Nom = this.state.Email_Nom;


              const Email_Subject = this.state.Email_Subject;
              const Email_Body = this.state.Email_Body;

              // const Email_Attachement = this.state.Email_Attachement;
              const Email_Description = this.state.Email_Description;
              const To_internal = this.state.To_internal;
              const CC_internl = this.state.CC_internl;
              const Report_FactBook = this.state.Report_FactBook;

              const DBAction = "2";


              ////////////////Email_To_Json
              this.state.Email_To_Json = [{ "Email_To": this.state.Email_To_Name, "Code_To": this.state.Email_To_Code }]

              console.log("Email_To_Json", this.state.Email_To_Json)
              // const Email_To_Json = JSON.stringify(this.state.Email_To_Json);
              const Email_To_Json_Base = { "Email_To": this.state.Email_To_Name, "Code_To": this.state.Email_To_Code };
              //////////////Email_CC_Json
              this.state.Email_CC_Json = [{ "Email_CC": this.state.Email_CC_Name, "Code_CC": this.state.Email_CC_Code }]
              console.log("Email_CC_Json", this.state.Email_CC_Json)
              // const Email_CC_Json = JSON.stringify(this.state.Email_CC_Json);
              const Email_CC_Json_Base = { "Email_CC": this.state.Email_CC_Name, "Code_CC": this.state.Email_CC_Code };
              /////////////Email_Attachement_Json
              this.state.Email_Attachement_Json = [{ "Attachement": this.state.Attachement, "Email_Attachement": this.state.Email_Attachement, "Code_Attachement": this.state.Code_Attachement }]
              console.log("Email_Attachement", this.state.Email_Attachement_Json)
              //const Email_Attachement_Json = JSON.stringify(this.state.Email_Attachement_Json);
              const Email_Attachement_Json_Base = { "Attachement": this.state.Attachement, "Email_Attachement": this.state.Email_Attachement, "Code_Attachement": this.state.Code_Attachement };

              //this.state.ajout = (Email_Code + ";" + Email_Nom + ";" + Email_Subject + ";" + Email_Body + ";" + Email_Description + ";" + To_internal + ";" + CC_internl + ";" + Report_FactBook + ";" + Email_Attachement_Json_Base + ";" + Email_To_Json_Base + ";" + Email_CC_Json_Base + ";" + DBAction)
              this.state.ajout = {
                "Email_Code": Email_Code,
                "Email_Nom": Email_Nom,
                "Email_Subject": Email_Subject,
                "Email_Body": Email_Body,
                "Email_Description": Email_Description,
                "To_internal": To_internal,
                "CC_internl": CC_internl,
                "Report_FactBook": Report_FactBook,
                "Email_Attachement": Email_Attachement_Json_Base,
                "Email_To": Email_To_Json_Base,
                "Email_CC": Email_CC_Json_Base,
                "DBAction": DBAction
              }
              this.state.ajoutertemp.push(this.state.ajout);
              /////////////Email_To
              const Email_To = this.state.Email_To_Json[0].Email_To;
              console.log("Email_To", Email_To)
              /////////////Email_CC
              const Email_CC = this.state.Email_CC_Json[0].Email_CC;
              console.log("Email_CC", Email_CC)
              /////////////Attachement
              const Email_Attachement = this.state.Email_Attachement_Json[0].Email_Attachement;
              console.log("Email_Attachement", Email_Attachement)
              //////////// ajouter dans tabulator
              this.mytable.addRow({ Email_Code, Email_Nom, Email_To, Email_CC, Email_Subject, Email_Body, Email_Attachement, Email_Description }, true);
              console.log(this.mytable)
              console.log(this.state.ajout);
              console.log(this.state.ajoutertemp);

              ////////////           
              this.state.Email_Nom = "";
              this.state.Email_To = "";
              this.state.Email_CC = "";
              this.state.Email_Subject = "";
              this.state.Email_Body = "";
              this.state.Email_Attachement = "";
              this.state.Email_Description = "";
            }


          })
      /* if (Alarme_Code != '') {
      } */



    } else {
      Swal.fire({
        toast: true,
        position: 'top',

        showConfirmButton: false,
        timer: 4000,
        icon: 'warning',
        width: 400,
        title: 'Sélectionner pour le copier'
      })
    }


  }
  handleClick(id, event) {
    this.state.Email_To_Code = id;
    console.log("Email_To_Code", this.state.Email_To_Code)

  }
  Email_CC_Click(id, event) {
    this.state.Email_CC_Code = id;


    console.log("Email_CC_Code", this.state.Email_CC_Code)

  }
  // PowerBIClick(id, event) {
  //   this.state.Code_Attachement = id;
  //   console.log("PowerBI_Code", this.state.Code_Attachement)
  // }
  FactBookClick(id, name, Membre, event) {
    this.state.Code_Attachement = id;
    this.state.Email_Attachement = name;
    this.state.Factbook_Membre = Membre
    this.setState({ Factbook_Membre: Membre })
    console.log("Code_FactBook", this.state.Code_Attachement)
    console.log("Email_Attachement", this.state.Email_Attachement)
    console.log("Factbook_Membre", this.state.Factbook_Membre)
  }

  toggle5 = () => {
    this.setState({
      modal5: !this.state.modal5
    });
    /////////tL
    axios.post(window.apiUrl + "display/",
      {
        tablename: "tl",
        identifier: this.state.dateDMY + uuid(),
        fields: "*",
        content: "*"
      }
    )

      .then(
        (result) => {
          if (result.data !== null) {
            this.setState({ Listes_TL: result.data })
          } else {
            console.log('Listes_TL vide')
          }

        })
  }

  toggle7 = () => {

    axios.defaults.withCredentials = true;
    axios.post(window.apiUrl + "display/",

      {
        tablename: "FactBook_V3",
        identifier: this.state.dateDMY + uuid(),
        fields: "*",
        content: "*"
      }


    )

      .then(
        (result) => {
          if (result.data !== null) {
            //this.state.FactBook = result.data;
            this.setState({ FactBook: result.data })
            console.log("FactBook", this.state.FactBook)
            if (this.state.datamodifier.length != 0) {
              this.setState({
                modal7: !this.state.modal7
              });
              Swal.fire({
                toast: true,
                position: 'top',
        
                showConfirmButton: false,
                timer: 5000,
                icon: 'warning',
                width: 400,
                title: 'écraser FactBook existants'
              })
            
            } else {
              this.setState({
                modal7: !this.state.modal7
              });
            }
          }
          else {
            console.log("data FactBook est vide")
          }
        })
  }
  ///////////////Ml
  toggle2 = () => {
    this.setState({
      modal2: !this.state.modal2
    });

    /////////ML
    axios.post(window.apiUrl + "display/",
      {
        tablename: "ML_V3",
        identifier: this.state.dateDMY + uuid(),
        fields: "*",
        content: "*"
      }
    )

      .then(
        (result) => {
          if (result.data !== null) {


            this.setState({ Listes_Ml: result.data })
            console.log("Listes_Ml", this.state.Listes_Ml)
            //       console.log("Listes_Ml ML_Name",Listes_Ml[0].ML_Name)
          } else {
            console.log('Listes_Ml vide')
          }

        })
  }
  ///////////////ml
  toggle4 = () => {


    this.setState({
      modal4: !this.state.modal4
    });
    /////////CL
    axios.post(window.apiUrl + "display/",
      {
        tablename: "CL_V3",
        identifier: this.state.dateDMY + uuid(),
        fields: "*",
        content: "*"
      }
    )

      .then(
        (result) => {
          if (result.data !== null) {

            this.setState({ Listes_Cl: result.data })
            this.setState({ Listes_Cl2: result.data })
            console.log('different')


          } else {
            console.log('Listes_Cl vide')
          }

        })

    ///////////////


  }
  handleRapportselectedchange(event, id) {
    console.log("tesssst", id)
    this.state.Code_Attachement = id;
    this.setState({
      Email_Attachement: event,
    });
    this.setState({
      Report_Name: event,
    });

    console.log("Email_Attachement", this.state.Email_Attachement)
    /////////////////////////////////

    if (this.state.Code_Attachement != "") {


      axios.post(window.apiUrl + "filter/",

        {
          tablename: "Reporting_V3",
          identifier: this.state.dateDMY + uuid(),
          fields: "Report_Code",
          content: this.state.Code_Attachement,
          dataselect: "Report_Code;Report_Name;Report_TableauCode;Report_TableauName;Body;Selected_Global;Access_Groupe_User;disposition",
          dist: "*",
          orderby: "*",
        }
      )

        .then(
          (result) => {
            // this.tableData = result.data;
            if (result.data !== null) {
              //  this.setState({ listRapportglobal: result.data })
              console.log("data filter", result.data);
              this.setState({ RapportAfficher: result.data[0] })
              this.setState({ Report_TableauCode: result.data[0].Report_TableauCode })
              this.setState({ Report_TableauName: result.data[0].Report_TableauName })
              this.setState({ Selected_Global: result.data[0].Selected_Global })
              this.setState({ Access_Groupe_User: result.data[0].Access_Groupe_User })
              this.setState({ disposition: result.data[0].disposition })

              if (this.state.disposition == "Portrait") {

                this.setState({ layoutFormat: { height: "650px", width: "70%" } })
              }
              if (this.state.disposition == "Paysage") {

                this.setState({ layoutFormat: { height: "500px", width: "100%" } })

              }
              console.log("Selected_Global", this.state.Selected_Global, "disposition", this.state.disposition, "Report_TableauCode", this.state.Report_TableauCode, "Report_TableauName", this.state.Report_TableauName, "Access_Groupe_User", this.state.Access_Groupe_User, "Body", this.state.config)

              if (this.state.Selected_Global != null) {
                for (var i = 0; i < this.state.Selected_Global.length; i++) {
                  // this.setState({ editRapport: false })
                  if (this.state.Selected_Global[i].Dim_type == "VAR") {
                    if (this.state.Selected_Global[i].Dim == "CL") {
                      console.log("1 VAR", this.state.Selected_Global[i].Dim)
                      this.setState({ BtnClDesibled: false })

                    } else if (this.state.Selected_Global[i].Dim == "ML") {
                      console.log("2 VAR", this.state.Selected_Global[i].Dim)

                      this.setState({ BtnMlDesibled: false })

                    } else if (this.state.Selected_Global[i].Dim == "TL") {

                      console.log("3 VAR", this.state.Selected_Global[i].Dim)
                      this.setState({ BtnTlDesibled: false })

                    } else {

                      console.log("vide")

                    }
                    this.setState({ editRapport: false })

                  } else if (this.state.Selected_Global[i].Dim_type == "FIX") {

                    if (this.state.Selected_Global[i].Dim == "CL") {
                      console.log("1 Fix", this.state.Selected_Global[i].Dim)
                      this.setState({ BtnClDesibled: true })


                    } else if (this.state.Selected_Global[i].Dim == "ML") {
                      console.log("2 Fix", this.state.Selected_Global[i].Dim)
                      this.setState({ BtnMlDesibled: true })


                    } else if (this.state.Selected_Global[i].Dim == "TL") {

                      console.log("3 Fix", this.state.Selected_Global[i].Dim)
                      this.setState({ BtnTlDesibled: true })

                    }
                  }



                }
                if (this.state.BtnTlDesibled == true && this.state.BtnClDesibled == true && this.state.BtnMlDesibled == true) {
                  console.log("tout les Dim est fix")
                  this.setState({ editRapport: true })

                }


              } else {

                console.log("Selected_Global vide")
                this.setState({ BtnClDesibled: true })
                this.setState({ BtnMlDesibled: true })
                this.setState({ BtnTlDesibled: true })
                this.setState({ editRapport: true })
              }



            } else {
              console.log('no data change')
            }



          }
        )

    }
  }

  close = () => {
    this.setState({
      modal: !this.state.modal
    });
  }
  ////////////////////////////////////////
  //FILTER COMPONENT

  filterRapportglobal = (filterNameRapport) => {
    //console.log('appel data')
    console.log(this.state.listfieldfiltername)
    console.log(this.state.listfieldfiltercontent)
    this.state.filterNameRapport = filterNameRapport;
    console.log("filterrrrrrrrrrrrrrrrrrrrrrrrrrrrrr", filterNameRapport)

    if (this.state.listfieldfiltername.length == 0 && this.state.listfieldfiltercontent.length == 0) {
      if (this.state.filterNameRapport == undefined || this.state.filterNameRapport.length == 0) {
        axios.post(window.apiUrl + "filter/",

          {
            tablename: "Reporting_V3",
            identifier: this.state.dateDMY + uuid(),
            fields: "*",
            content: "*",
            dataselect: "Report_Code;Report_Name;Selected_Global",
            dist: "*",
            orderby: "*",
          }
        )

          .then(
            (result) => {
              this.tableData = result.data;

              //tabulator
              //this.setState({ dataCompteur: result.data })
              //console.log('result data global list compteur. ')
              //console.log('data' + this.tableData + 'data')
              if (this.tableData !== null) {
                this.setState({ listRapportglobal: result.data })
                ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                var array = []

                for (var i = 0; i < this.state.listRapportglobal.length; i++) {
                  // console.log("Selected_GlobalSelected_GlobalSelected_Global---> ",listRapportglobal[0].Selected_Global)
                  // console.log("Selected_Global edite------->",listRapportglobal[i].Selected_Global)
                  var listeSelected = this.state.listRapportglobal[i].Selected_Global

                  if (listeSelected != null) {
                    for (var j = 0; j < listeSelected.length; j++) {
                      var code = ""
                      var name = ""
                      var select
                      code = this.state.listRapportglobal[i].Report_Code
                      name = this.state.listRapportglobal[i].Report_Name
                      select = this.state.listRapportglobal[i].Selected_Global



                      if (listeSelected[j].Dim_type == "VAR") {
                        //console.log("hhhhhhhhhhhhhhhhhhhhhhhhmmmmmmmmmmmmmmmmmmmmhhhhh",array) 
                        if (array.length == 0) {
                          array.push({ "Report_Code": code, "Report_Name": name, "Selected_Global": select })
                          console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj", array)
                        } else {
                          var validation = "0";
                          for (var k = 0; k < array.length; k++) {
                            //   console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",array[k])
                            if (code == array[k].Report_Code) {
                              validation = "1"
                              console.log("validation", code, array[k].Report_Code)
                            }
                            else {
                              validation = "2"
                            }
                          }

                          if (validation == "2") {
                            array.push({ "Report_Code": code, "Report_Name": name, "Selected_Global": select })
                          }


                        }

                      }
                    }


                  }

                }

                console.log("(----------------------------------------------->)", array)
                this.setState({ listRapportglobalEdite: array })
                ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                console.log("data filter");
                console.log(this.state.listRapportglobal)
              } else {
                console.log('no data change')
              }



            }
          )

      }
      else {
        this.setState({ listRapportglobal: this.state.filterNameRapport })
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        var array = []

        for (var i = 0; i < this.state.listRapportglobal.length; i++) {
          // console.log("Selected_GlobalSelected_GlobalSelected_Global---> ",listRapportglobal[0].Selected_Global)
          // console.log("Selected_Global edite------->",listRapportglobal[i].Selected_Global)
          var listeSelected = this.state.listRapportglobal[i].Selected_Global

          if (listeSelected != null) {
            // console.log("listeSelected------->",listeSelected)
            for (var j = 0; j < listeSelected.length; j++) {
              //  console.log("Dim_type------->",listeSelected[j].Dim_type)
              var code = ""
              var name = ""
              var select

              //  console.log("-<<<<--",this.state.listRapportglobal[i].Report_Code)
              //     console.log("-<<<<--",this.state.listRapportglobal[i].Report_Name)
              //     console.log("-<<<<--",this.state.listRapportglobal[i].Selected_Global)

              code = this.state.listRapportglobal[i].Report_Code
              name = this.state.listRapportglobal[i].Report_Name
              select = this.state.listRapportglobal[i].Selected_Global



              if (listeSelected[j].Dim_type == "VAR") {
                // console.log("hhhhhhhhhhhhhhhhhhhhhhhhmmmmmmmmmmmmmmmmmmmmhhhhh",array) 
                if (array.length == 0) {
                  array.push({ "Report_Code": code, "Report_Name": name, "Selected_Global": select })
                  console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj", array)
                } else {
                  var validation = "0";
                  for (var k = 0; k < array.length; k++) {
                    //    console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",array[k])
                    if (code == array[k].Report_Code) {
                      validation = "1"
                      console.log("validation", code, array[k].Report_Code)
                    }
                    else {
                      validation = "2"
                    }
                  }

                  if (validation == "2") {
                    array.push({ "Report_Code": code, "Report_Name": name, "Selected_Global": select })
                  }


                }

              }

            }


          }

        }

        console.log("(----------------------------------------------->)", array)
        this.setState({ listRapportglobalEdite: array })
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      }
    }
    else if (this.state.listfieldfiltername.length != 0 && this.state.listfieldfiltercontent.length != 0) {

      if (this.state.filterNameRapport == undefined || this.state.filterNameRapport.length == 0) {
        axios.post(window.apiUrl + "filter/",

          {
            tablename: "Reporting_V3",
            identifier: this.state.dateDMY + uuid(),
            fields: this.state.listfieldfiltername.join(';'),
            content: this.state.listfieldfiltercontent.join(';'),
            dataselect: "Report_Code;Report_Name;Selected_Global",
            dist: "*",
            orderby: "*",
          }
        )

          .then(
            (result) => {
              //  this.tableData = result.data;

              //tabulator
              //this.setState({ dataCompteur: result.data })
              console.log('result data global list Rapport. ')
              console.log('data' + result.data + 'data')
              if (result.data !== null) {
                this.setState({ listRapportglobal: result.data })
                ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                var array = []

                for (var i = 0; i < this.state.listRapportglobal.length; i++) {
                  // console.log("Selected_GlobalSelected_GlobalSelected_Global---> ",listRapportglobal[0].Selected_Global)
                  // console.log("Selected_Global edite------->",listRapportglobal[i].Selected_Global)
                  var listeSelected = this.state.listRapportglobal[i].Selected_Global

                  if (listeSelected != null) {
                    // console.log("listeSelected------->",listeSelected)
                    for (var j = 0; j < listeSelected.length; j++) {
                      //  console.log("Dim_type------->",listeSelected[j].Dim_type)
                      var code = ""
                      var name = ""
                      var select

                      //  console.log("-<<<<--",this.state.listRapportglobal[i].Report_Code)
                      //     console.log("-<<<<--",this.state.listRapportglobal[i].Report_Name)
                      //     console.log("-<<<<--",this.state.listRapportglobal[i].Selected_Global)

                      code = this.state.listRapportglobal[i].Report_Code
                      name = this.state.listRapportglobal[i].Report_Name
                      select = this.state.listRapportglobal[i].Selected_Global



                      if (listeSelected[j].Dim_type == "VAR") {
                        //    console.log("hhhhhhhhhhhhhhhhhhhhhhhhmmmmmmmmmmmmmmmmmmmmhhhhh",array) 
                        if (array.length == 0) {
                          array.push({ "Report_Code": code, "Report_Name": name, "Selected_Global": select })
                          console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj", array)
                        } else {
                          var validation = "0";
                          for (var k = 0; k < array.length; k++) {
                            //           console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",array[k])
                            if (code == array[k].Report_Code) {
                              validation = "1"
                              console.log("validation", code, array[k].Report_Code)
                            }
                            else {
                              validation = "2"
                            }
                          }

                          if (validation == "2") {
                            array.push({ "Report_Code": code, "Report_Name": name, "Selected_Global": select })
                          }


                        }

                      }

                    }


                  }

                }

                console.log("(----------------------------------------------->)", array)
                this.setState({ listRapportglobalEdite: array })
                ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                console.log("data filter");
                console.log(this.state.listRapportglobal)
              } else {
                console.log('no data change')
              }



            }
          )
      }
      else {

        this.setState({ listRapportglobal: this.state.filterNameRapport })
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        var array = []

        for (var i = 0; i < this.state.listRapportglobal.length; i++) {
          // console.log("Selected_GlobalSelected_GlobalSelected_Global---> ",listRapportglobal[0].Selected_Global)
          // console.log("Selected_Global edite------->",listRapportglobal[i].Selected_Global)
          var listeSelected = this.state.listRapportglobal[i].Selected_Global

          if (listeSelected != null) {
            // console.log("listeSelected------->",listeSelected)
            for (var j = 0; j < listeSelected.length; j++) {
              //  console.log("Dim_type------->",listeSelected[j].Dim_type)
              var code = ""
              var name = ""
              var select

              //  console.log("-<<<<--",this.state.listRapportglobal[i].Report_Code)
              //     console.log("-<<<<--",this.state.listRapportglobal[i].Report_Name)
              //     console.log("-<<<<--",this.state.listRapportglobal[i].Selected_Global)

              code = this.state.listRapportglobal[i].Report_Code
              name = this.state.listRapportglobal[i].Report_Name
              select = this.state.listRapportglobal[i].Selected_Global



              if (listeSelected[j].Dim_type == "VAR") {
                // console.log("hhhhhhhhhhhhhhhhhhhhhhhhmmmmmmmmmmmmmmmmmmmmhhhhh",array) 
                if (array.length == 0) {
                  array.push({ "Report_Code": code, "Report_Name": name, "Selected_Global": select })
                  console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj", array)
                } else {
                  var validation = "0";
                  for (var k = 0; k < array.length; k++) {
                    //    console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",array[k])
                    if (code == array[k].Report_Code) {
                      validation = "1"
                      console.log("validation", code, array[k].Report_Code)
                    }
                    else {
                      validation = "2"
                    }
                  }

                  if (validation == "2") {
                    array.push({ "Report_Code": code, "Report_Name": name, "Selected_Global": select })
                  }


                }

              }

            }


          }

        }

        console.log("(----------------------------------------------->)", array)
        this.setState({ listRapportglobalEdite: array })
      }



    }

  }
  filterTableaux = () => {
    console.log('listeeeeeeeeeeeeeeeeeeee tableaux')
    console.log(this.state.listfieldfiltername)
    console.log(this.state.listfieldfiltercontent)
    console.log('filter with new data')
    if (this.state.Tableaux == '' & this.state.TAGS == '' & this.state.Master == '') {
      console.log('videeeeeeeeee')
      axios.post(window.apiUrl + "filter/",

        {
          tablename: "Reporting_V3",
          identifier: this.state.dateDMY + uuid(),
          fields: '*',
          content: '*',
          dataselect: "Report_TableauCode;Report_TableauName",
          dist: "*;dist",
          orderby: "*;desc",
        }
      )
        .then(
          (result) => {
            // this.tableData = result.data;
            console.log(result.data)
            if (result.data !== null) {
              var listTableaux = []
              result.data.forEach(function (arrayItem) {
                var x = arrayItem.Report_TableauName;
                listTableaux.push(x)
              });
              this.setState({ listTableau: listTableaux })
              console.log("data Tableaux");
              console.log(this.state.listTableau)
            } else {
              console.log('no data change')
            }
          }
        )
    } else {
      console.log(this.state.listfieldfiltername.join(';'))
      console.log(this.state.listfieldfiltercontent.join(';'))
      axios.post(window.apiUrl + "filter/",
        {
          tablename: "Reporting_V3",
          identifier: this.state.dateDMY + uuid(),
          fields: this.state.listfieldfiltername.join(';'),
          content: this.state.listfieldfiltercontent.join(';'),
          dataselect: "Report_TableauCode;Report_TableauName",
          dist: "*;dist",
          orderby: "*;asc",
        }
      )
        .then(
          (result) => {
            // this.tableData = result.data;
            console.log(result.data)
            var listTableaux = []
            console.log("lllll", result.data)
            if (result.data !== null) {

              result.data.forEach(function (arrayItem) {
                var x = arrayItem.Report_TableauName;
                listTableaux.push(x)
              });
              this.setState({ listTableau: listTableaux })
              console.log("data compteur parent");
              console.log(this.state.listTableau)

            } else {
              console.log('no data recieve by compteur parent')
            }

          }
        )


    }
  }
  filterTAGS = () => {
    console.log('listeeeeeeeeeeeeeeeeeeee TAGS')
    console.log(this.state.listfieldfiltername)
    console.log(this.state.listfieldfiltercontent)

    console.log('filter with new data')
    if (this.state.Tableaux == '' & this.state.TAGS == '' & this.state.Master == '') {
      console.log('videeeeeeeeee')
      axios.post(window.apiUrl + "filter/",

        {
          tablename: "Reporting_V3",
          identifier: this.state.dateDMY + uuid(),
          fields: '*',
          content: '*',
          dataselect: "Report_Code;TAGS",
          dist: "*;dist",
          orderby: "*;desc",
        }
      )
        .then(
          (result) => {
            // this.tableData = result.data;
            console.log(result.data)
            if (result.data !== null) {
              var listTAGSs = []
              result.data.forEach(function (arrayItem) {
                var x = arrayItem.TAGS;
                listTAGSs.push(x)
              });
              this.setState({ listTAGS: listTAGSs })
              console.log("data TAGS");
              console.log(this.state.listTAGS)
            } else {
              console.log('no data change')
            }
          }
        )
    } else {
      axios.post(window.apiUrl + "filter/",
        {
          tablename: "Reporting_V3",
          identifier: this.state.dateDMY + uuid(),
          fields: this.state.listfieldfiltername.join(';'),
          content: this.state.listfieldfiltercontent.join(';'),
          dataselect: "Report_Code;TAGS",
          dist: "*;dist",
          orderby: "*;desc",
        }
      )
        .then(
          (result) => {
            // this.tableData = result.data;
            console.log(result.data)
            if (result.data !== null) {
              var listTAGSs = []
              result.data.forEach(function (arrayItem) {
                var x = arrayItem.TAGS;
                listTAGSs.push(x)
              });
              this.setState({ listTAGS: listTAGSs })
              console.log("data TAGS");
              console.log(this.state.listTAGS)
            } else {
              console.log('no data change')
            }

          }
        )
    }


  }
  filterMaster = () => {
    console.log('listeeeeeeeeeeeeeeeeeeee Master')
    console.log(this.state.listfieldfiltername)
    console.log(this.state.listfieldfiltercontent)

    console.log('filter with new data')
    if (this.state.Tableaux == '' & this.state.TAGS == '' & this.state.Master == '') {
      console.log('videeeeeeeeee')
      axios.post(window.apiUrl + "filter/",

        {
          tablename: "Reporting_V3",
          identifier: this.state.dateDMY + uuid(),
          fields: '*',
          content: '*',
          dataselect: "Report_Code;Report_Master",
          dist: "*;dist",
          orderby: "*;desc",
        }
      )
        .then(
          (result) => {
            // this.tableData = result.data;
            console.log(result.data)
            if (result.data !== null) {
              var listMasters = []
              result.data.forEach(function (arrayItem) {
                var x = arrayItem.Report_Master;
                listMasters.push(x)
              });
              this.setState({ listMaster: listMasters })
              console.log("data Master");
              console.log(this.state.listMaster)
            } else {
              console.log('no data change')
            }
          }
        )

    } else {
      axios.post(window.apiUrl + "filter/",
        {
          tablename: "Reporting_V3",
          identifier: this.state.dateDMY + uuid(),
          fields: this.state.listfieldfiltername.join(';'),
          content: this.state.listfieldfiltercontent.join(';'),
          dataselect: "Report_Code;Report_Master",
          dist: "*;dist",
          orderby: "*;desc",
        }
      )
        .then(
          (result) => {
            //  this.tableData = result.data;
            console.log(result.data)
            if (result.data !== null) {
              var listMasters = []
              result.data.forEach(function (arrayItem) {
                var x = arrayItem.Report_Master;
                listMasters.push(x)
              });
              this.setState({ listMaster: listMasters })
              console.log("data Master");
              console.log(this.state.listMaster)
            } else {
              console.log('no data change')
            }

          }
        )

    }

  }

  getlistcompteurparent = () => {
    var listeTableau = []
    var listglobalcompteur = []


    var listparentcompteurduplicate = [...new Set(listeTableau)]

    this.setState({ listTableaux: listparentcompteurduplicate })
    this.setState({ listRapportglobal: listglobalcompteur })
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var array = []

    for (var i = 0; i < this.state.listRapportglobal.length; i++) {
      // console.log("Selected_GlobalSelected_GlobalSelected_Global---> ",listRapportglobal[0].Selected_Global)
      // console.log("Selected_Global edite------->",listRapportglobal[i].Selected_Global)
      var listeSelected = this.state.listRapportglobal[i].Selected_Global

      if (listeSelected != null) {
        // console.log("listeSelected------->",listeSelected)
        for (var j = 0; j < listeSelected.length; j++) {
          //  console.log("Dim_type------->",listeSelected[j].Dim_type)
          var code = ""
          var name = ""
          var select

          //  console.log("-<<<<--",this.state.listRapportglobal[i].Report_Code)
          //     console.log("-<<<<--",this.state.listRapportglobal[i].Report_Name)
          //     console.log("-<<<<--",this.state.listRapportglobal[i].Selected_Global)

          code = this.state.listRapportglobal[i].Report_Code
          name = this.state.listRapportglobal[i].Report_Name
          select = this.state.listRapportglobal[i].Selected_Global



          if (listeSelected[j].Dim_type == "VAR") {
            //     console.log("hhhhhhhhhhhhhhhhhhhhhhhhmmmmmmmmmmmmmmmmmmmmhhhhh",array) 
            if (array.length == 0) {
              array.push({ "Report_Code": code, "Report_Name": name, "Selected_Global": select })
              console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj", array)
            } else {
              var validation = "0";
              for (var k = 0; k < array.length; k++) {
                //          console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",array[k])
                if (code == array[k].Report_Code) {
                  validation = "1"
                  console.log("validation", code, array[k].Report_Code)
                }
                else {
                  validation = "2"
                }
              }

              if (validation == "2") {
                array.push({ "Report_Code": code, "Report_Name": name, "Selected_Global": select })
              }


            }

          }

        }


      }

    }

    console.log("(----------------------------------------------->)", array)
    this.setState({ listRapportglobalEdite: array })
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  }

  //////////////////////////////
  componentDidUpdate(prevProps, prevState) {

    if (prevState.Tableaux !== this.state.Tableaux) {

      console.log('different')
      console.log(this.state.listfieldfiltername)
      if (this.state.listfieldfiltername.includes('Report_TableauName') == true) {
        this.setState(state => {
          state.listfieldfiltername.map((item, j) => {

            if (item == 'Report_TableauName') {
              console.log('existeeeeeeeeeeeeeeee Report_TableauName')
              console.log(j)
              if (this.state.Tableaux != '') {
                this.state.listfieldfiltercontent[j] = this.state.Tableaux
              } else {
                this.state.listfieldfiltercontent.splice(j, 1);
                this.state.listfieldfiltername.splice(j, 1);
                'cant change'
              }
              this.filterRapportglobal();
            }
          }
          );
        });
      } else if (this.state.Tableaux != '') {
        this.setState({ listfieldfiltername: [...this.state.listfieldfiltername, 'Report_TableauName'] })
        this.setState({ listfieldfiltercontent: [...this.state.listfieldfiltercontent, this.state.Tableaux] })
        console.log('filter dataaaaaaaaaaaaaaaaaaaaaaaaaa')
        console.log([...this.state.listfieldfiltername, 'Report_TableauName'].join(';'))
        console.log([...this.state.listfieldfiltercontent, this.state.Tableaux].join(';'))
        axios.post(window.apiUrl + "filter/",
          {
            tablename: "Reporting_V3",
            identifier: this.state.dateDMY + uuid(),
            fields: [...this.state.listfieldfiltername, 'Report_TableauName'].join(';'),
            content: [...this.state.listfieldfiltercontent, this.state.Tableaux].join(';'),
            dataselect: "Report_Code;Report_Name;Selected_Global",
            dist: "*",
            orderby: "*",
          }
        )
          .then(
            (result) => {
              //  this.tableData = result.data;

              if (result.data !== null) {

                this.setState({ listRapportglobal: result.data })
                ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                var array = []

                for (var i = 0; i < this.state.listRapportglobal.length; i++) {
                  // console.log("Selected_GlobalSelected_GlobalSelected_Global---> ",listRapportglobal[0].Selected_Global)
                  // console.log("Selected_Global edite------->",listRapportglobal[i].Selected_Global)
                  var listeSelected = this.state.listRapportglobal[i].Selected_Global

                  if (listeSelected != null) {
                    // console.log("listeSelected------->",listeSelected)
                    for (var j = 0; j < listeSelected.length; j++) {
                      //  console.log("Dim_type------->",listeSelected[j].Dim_type)
                      var code = ""
                      var name = ""
                      var select

                      //  console.log("-<<<<--",this.state.listRapportglobal[i].Report_Code)
                      //     console.log("-<<<<--",this.state.listRapportglobal[i].Report_Name)
                      //     console.log("-<<<<--",this.state.listRapportglobal[i].Selected_Global)

                      code = this.state.listRapportglobal[i].Report_Code
                      name = this.state.listRapportglobal[i].Report_Name
                      select = this.state.listRapportglobal[i].Selected_Global



                      if (listeSelected[j].Dim_type == "VAR") {
                        //    console.log("hhhhhhhhhhhhhhhhhhhhhhhhmmmmmmmmmmmmmmmmmmmmhhhhh",array) 
                        if (array.length == 0) {
                          array.push({ "Report_Code": code, "Report_Name": name, "Selected_Global": select })
                          console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj", array)
                        } else {
                          var validation = "0";
                          for (var k = 0; k < array.length; k++) {
                            //                console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",array[k])
                            if (code == array[k].Report_Code) {
                              validation = "1"
                              console.log("validation", code, array[k].Report_Code)
                            }
                            else {
                              validation = "2"
                            }
                          }

                          if (validation == "2") {
                            array.push({ "Report_Code": code, "Report_Name": name, "Selected_Global": select })
                          }


                        }

                      }

                    }


                  }

                }

                console.log("(----------------------------------------------->)", array)
                this.setState({ listRapportglobalEdite: array })
                ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                console.log("data filter");
                console.log(this.state.listRapportglobal)
              } else {
                console.log('no data change')
              }
            }
          )
      }


    }
    /****************************** */


    ///console.log("uniti fini", this.state.unite)
    /*************************** */
    if (prevState.TAGS !== this.state.TAGS) {

      console.log('different')
      console.log(this.state.listfieldfiltername)
      if (this.state.listfieldfiltername.includes('TAGS') == true) {
        this.setState(state => {
          state.listfieldfiltername.map((item, j) => {
            //console.log(this.state.equation.length - 1)
            if (item == 'TAGS') {
              console.log('existeeeeeeeeeeeeeeee TAGS')
              console.log(j)
              if (this.state.TAGS != '') {
                this.state.listfieldfiltercontent[j] = this.state.TAGS
              } else {
                this.state.listfieldfiltercontent.splice(j, 1);
                this.state.listfieldfiltername.splice(j, 1);
                'cant change'
              }
              this.filterRapportglobal();
            }
          }
          );
        });
      } else if (this.state.TAGS != '') {
        this.setState({ listfieldfiltername: [...this.state.listfieldfiltername, 'TAGS'] })
        this.setState({ listfieldfiltercontent: [...this.state.listfieldfiltercontent, this.state.TAGS] })
        console.log('filter dataaaaaaaaaaaaaaaaaaaaaaaaaa')
        console.log([...this.state.listfieldfiltername, 'TAGS'].join(';'))
        console.log([...this.state.listfieldfiltercontent, this.state.TAGS].join(';'))
        axios.post(window.apiUrl + "filter/",
          {
            tablename: "Reporting_V3",
            identifier: this.state.dateDMY + uuid(),
            fields: [...this.state.listfieldfiltername, 'TAGS'].join(';'),
            content: [...this.state.listfieldfiltercontent, this.state.TAGS].join(';'),
            dataselect: "Report_Code;Report_Name;Selected_Global",
            dist: "*",
            orderby: "*",
          }
        )
          .then(
            (result) => {
              //     result.data = result.data;
              if (result.data !== null) {


                this.setState({ listRapportglobal: result.data })
                ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                var array = []

                for (var i = 0; i < this.state.listRapportglobal.length; i++) {
                  // console.log("Selected_GlobalSelected_GlobalSelected_Global---> ",listRapportglobal[0].Selected_Global)
                  // console.log("Selected_Global edite------->",listRapportglobal[i].Selected_Global)
                  var listeSelected = this.state.listRapportglobal[i].Selected_Global

                  if (listeSelected != null) {
                    // console.log("listeSelected------->",listeSelected)
                    for (var j = 0; j < listeSelected.length; j++) {
                      //  console.log("Dim_type------->",listeSelected[j].Dim_type)
                      var code = ""
                      var name = ""
                      var select

                      //  console.log("-<<<<--",this.state.listRapportglobal[i].Report_Code)
                      //     console.log("-<<<<--",this.state.listRapportglobal[i].Report_Name)
                      //     console.log("-<<<<--",this.state.listRapportglobal[i].Selected_Global)

                      code = this.state.listRapportglobal[i].Report_Code
                      name = this.state.listRapportglobal[i].Report_Name
                      select = this.state.listRapportglobal[i].Selected_Global



                      if (listeSelected[j].Dim_type == "VAR") {
                        //        console.log("hhhhhhhhhhhhhhhhhhhhhhhhmmmmmmmmmmmmmmmmmmmmhhhhh",array) 
                        if (array.length == 0) {
                          array.push({ "Report_Code": code, "Report_Name": name, "Selected_Global": select })
                          console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj", array)
                        } else {
                          var validation = "0";
                          for (var k = 0; k < array.length; k++) {
                            ///                    console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",array[k])
                            if (code == array[k].Report_Code) {
                              validation = "1"
                              console.log("validation", code, array[k].Report_Code)
                            }
                            else {
                              validation = "2"
                            }
                          }

                          if (validation == "2") {
                            array.push({ "Report_Code": code, "Report_Name": name, "Selected_Global": select })
                          }


                        }

                      }

                    }


                  }

                }

                console.log("(----------------------------------------------->)", array)
                this.setState({ listRapportglobalEdite: array })
                ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                console.log("data filter");
                console.log(this.state.listRapportglobal)
              } else { console.log('no data change') }
            }
          )
      }


    }

    /********************** */
    if (prevState.Master !== this.state.Master) {

      console.log('different')
      console.log(this.state.listfieldfiltername)
      if (this.state.listfieldfiltername.includes('Report_Master') == true) {
        this.setState(state => {
          state.listfieldfiltername.map((item, j) => {
            //console.log(this.state.equation.length - 1)
            if (item == 'Report_Master') {
              console.log('existeeeeeeeeeeeeeeee Report_Master')
              console.log(j)
              if (this.state.Master != '') {
                this.state.listfieldfiltercontent[j] = this.state.Master
              } else {
                this.state.listfieldfiltercontent.splice(j, 1);
                this.state.listfieldfiltername.splice(j, 1);
                'cant change'
              }
              this.filterRapportglobal();
            } /*else {
           console.log('not existttttttttttttttt')
           state.listfieldfiltername.concat('Report_TableauName')
           state.listfieldfiltercontent.concat(this.state.Tableaux)

         }*/
          }
          );
        });
      } else if (this.state.Master != '') {
        this.setState({ listfieldfiltername: [...this.state.listfieldfiltername, 'Report_Master'] })
        this.setState({ listfieldfiltercontent: [...this.state.listfieldfiltercontent, this.state.Master] })
        console.log('filter dataaaaaaaaaaaaaaaaaaaaaaaaaa')
        console.log([...this.state.listfieldfiltername, 'Report_Master'].join(';'))
        console.log([...this.state.listfieldfiltercontent, this.state.Master].join(';'))
        axios.post(window.apiUrl + "filter/",
          {
            tablename: "Reporting_V3",
            identifier: this.state.dateDMY + uuid(),
            fields: [...this.state.listfieldfiltername, 'Report_Master'].join(';'),
            content: [...this.state.listfieldfiltercontent, this.state.Master].join(';'),
            dataselect: "Report_Code;Report_Name;Selected_Global",
            dist: "*",
            orderby: "*",
          }
        )
          .then(
            (result) => {
              // = result.data;
              if (result.data !== null) {

                this.setState({ listRapportglobal: result.data })
                ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                var array = []

                for (var i = 0; i < this.state.listRapportglobal.length; i++) {
                  // console.log("Selected_GlobalSelected_GlobalSelected_Global---> ",listRapportglobal[0].Selected_Global)
                  // console.log("Selected_Global edite------->",listRapportglobal[i].Selected_Global)
                  var listeSelected = this.state.listRapportglobal[i].Selected_Global

                  if (listeSelected != null) {
                    // console.log("listeSelected------->",listeSelected)
                    for (var j = 0; j < listeSelected.length; j++) {
                      //  console.log("Dim_type------->",listeSelected[j].Dim_type)
                      var code = ""
                      var name = ""
                      var select

                      //  console.log("-<<<<--",this.state.listRapportglobal[i].Report_Code)
                      //     console.log("-<<<<--",this.state.listRapportglobal[i].Report_Name)
                      //     console.log("-<<<<--",this.state.listRapportglobal[i].Selected_Global)

                      code = this.state.listRapportglobal[i].Report_Code
                      name = this.state.listRapportglobal[i].Report_Name
                      select = this.state.listRapportglobal[i].Selected_Global



                      if (listeSelected[j].Dim_type == "VAR") {
                        //   console.log("hhhhhhhhhhhhhhhhhhhhhhhhmmmmmmmmmmmmmmmmmmmmhhhhh",array) 
                        if (array.length == 0) {
                          array.push({ "Report_Code": code, "Report_Name": name, "Selected_Global": select })
                          console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj", array)
                        } else {
                          var validation = "0";
                          for (var k = 0; k < array.length; k++) {
                            //           console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",array[k])
                            if (code == array[k].Report_Code) {
                              validation = "1"
                              console.log("validation", code, array[k].Report_Code)
                            }
                            else {
                              validation = "2"
                            }
                          }

                          if (validation == "2") {
                            array.push({ "Report_Code": code, "Report_Name": name, "Selected_Global": select })
                          }


                        }

                      }

                    }


                  }

                }

                console.log("(----------------------------------------------->)", array)
                this.setState({ listRapportglobalEdite: array })
                ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                console.log("data filter");
                console.log(this.state.listRapportglobal)

              } else {
                console.log('no data change')
              }
            }
          )

      }


    }
    /********************* */





  }

  btndelete_Email_Attachement() {

    if (this.state.Email_Attachement == "") {
      Swal.fire({
        toast: true,
        position: 'top',

        showConfirmButton: false,
        timer: 4000,
        icon: 'warning',
        width: 400,
        title: 'le champ est vide'
      })
    } else {
      const array = []

      this.setState({ editRapport: null })
      array.push(this.state.Email_Attachement)
      console.log(this.state.Email_Attachement);

      this.setState({ Email_Attachement: array.slice(0, -1) });
      this.state.Email_Attachement = "";
      console.log('deleteee')
      var $ = require("jquery");
      $('#formulaire')[0].reset();
      this.state.Tableaux = ""
      this.state.energie = ""
      this.state.view = ""
      this.state.unite1 = ""
      this.state.listfieldfiltername.slice(0, -1)
      this.state.listfieldfiltercontent.slice(0, -1)
      console.log("aaaaaaaaaaaaaaaaaaaaaaa", this.state.listfieldfiltername = [], this.state.listfieldfiltercontent = [])

      ////////////filter Reporting

      axios.post(window.apiUrl + "filter/",

        {
          tablename: "Reporting_V3",
          identifier: this.state.dateDMY + uuid(),
          fields: "*",
          content: "*",
          dataselect: "Report_Code;Report_Name",
          dist: "*",
          orderby: "*",
        }


      )

        .then(
          (result) => {
            // result.data = result.data;
            if (result.data !== null) {
              this.setState({ listRapportglobal: result.data })
              console.log("data filter Reporting");
              console.log(this.state.listRapportglobal)
            } else {
              console.log('no data change')
            }


          }
        )
    }
  }
  handleListeCompteurClick(id, name, membre) {
    console.log(id, name, membre)
    this.setState({ Code_Cl: id })
    this.setState({ Name_Cl: name })
    this.setState({ CL_Membre: membre })
  }
  CL_Tags_Function(name) {
    console.log("jjjjjjjjjjjj", name)
    if (name != "") {
      this.setState({ Code_Cl: "*" })
      this.setState({ Name_Cl: name })
    }
  }
  ML_Tags_Function(name) {
    console.log("jjjjjjjjjjjj", name)
    if (name != "") {
      this.setState({ Code_Ml: "*" })
      this.setState({ Name_Ml: name })
    }
  }
  handleListeMLClick(id, name, membre) {
    console.log(id, name, membre)
    this.setState({ Code_Ml: id })
    this.setState({ Name_Ml: name })
    this.setState({ ML_Membre: membre })
  }
  handleListeTLClick(id, name, membre) {
    console.log(id, name, membre[0].Tl_Sql)
    this.setState({ Code_Tl: id })
    this.setState({ Name_Tl: name })
    this.setState({ tl_members: membre[0].Tl_Sql })
  }
  AjouterCl() {
    if (this.state.Name_Cl != "" && this.state.cl_Membre_Select_fin.length != 0) {
      this.setState({
        modal4: !this.state.modal4
      });
      this.setState({ CompteurListI_Name: this.state.Name_Cl })
    }
  }
  modelCl(cl_Membre_Select) {
    this.setState({ cl_Membre_Select_fin: cl_Membre_Select })
    console.log("llllllllllllllllllllllllllllllllllllll", cl_Membre_Select)
  }

  modelMl(ml_Membre_Select) {
    this.setState({ ml_Membre_Select_fin: ml_Membre_Select })
    console.log("llllllllllllllllllllllllllllllllllllll", ml_Membre_Select)
  }

  AjouterMl() {
    if (this.state.Name_Ml != "" && this.state.ml_Membre_Select_fin.length != 0) {
      this.setState({
        modal2: !this.state.modal2
      });
      this.setState({ ML_Name: this.state.Name_Ml })
    }
  }
  AjouterTl() {
    if (this.state.Name_Tl != "" && this.state.Code_Tl != "") {
      this.setState({
        modal5: !this.state.modal5
      });
      this.setState({ tl_name: this.state.Name_Tl })
      this.setState({ tl_id: this.state.Code_Tl })
    }
  }
  ajouterNewRapport = () => {
    if (this.state.Report_Name_Enregistrer != "") {
      console.log("Report_Name_Affichage_Report_Name_Affichage_Report_Name_Affichage_Report_Name_Affichage", this.state.Report_Name_Enregistrer)
      axios.post(window.apiUrl + "filter/",

        {
          tablename: "Reporting_V3",
          identifier: this.state.dateDMY + uuid(),
          fields: "Report_Name",
          content: this.state.Report_Name_Enregistrer,
          dataselect: "Report_Name",
          dist: "dist",
          orderby: "*",
        }
      )

        .then(
          (result) => {
            // this.tableData = result.data;
            console.log('result.data', result.data)
            if (result.data.length !== 0) {


              Swal.fire({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 4000,
                width: 300,
                icon: 'warning',
                title: 'Nom de Rapport déjà utilisé'
              })

            } else {

              this.setState({
                modal6: !this.state.modal6
              });

            }
          })
    } else {
      Swal.fire({
        toast: true,
        position: 'top',

        showConfirmButton: false,
        timer: 4000,
        icon: 'warning',
        width: 400,
        title: "Nom de rapport est obligatoire"
      })
    }
  }
  ajouterRapportAttachement = () => {
    console.log("ajouterRapportAttachement")

    if (this.state.Email_Attachement != "" && this.state.Code_Attachement != "" && this.state.Report_Name_Enregistrer == "") {

      //this.state.Email_Attachement_Json = [{ "Attachement": "Rapport" , "Email_Attachement": this.state.Email_Attachement, "Code_Attachement": this.state.Code_Attachement }]
      //console.log('this.state.Email_Attachement_Json',this.state.Email_Attachement_Json)
      this.setState({
        modal3: !this.state.modal3
      });
      this.state.Attachement = "Rapport"


    } else if (this.state.Email_Attachement != "" && this.state.Code_Attachement != "" && this.state.Report_Name_Enregistrer != "") {

      axios.post(window.apiUrl + "sendid/",
        {
          tablename: "Reporting_V3",
          identifier: this.state.dateDMY + uuid(),
          nombermaxcode: '1',
          primaryfield: "Report_Code",
          fields: "*",
          content: "*",

        }
      )

        .then(
          (result) => {


            if (result.data !== null) {
              var code = result.data.split(", ")
              this.state.Report_Code_Enregistrer = code[0]
              console.log("Report_Code")
              console.log(this.state.Report_Code_Enregistrer)
              this.state.Email_Attachement = this.state.Report_Name_Enregistrer
              this.state.Code_Attachement = this.state.Report_Code_Enregistrer
              this.state.Attachement = "Rapport"
            }
          })



      // this.state.Email_Attachement_Json = [{ "Attachement": "Rapport" , "Email_Attachement": this.state.Email_Attachement, "Code_Attachement": this.state.Code_Attachement }]
      //console.log('this.state.Email_Attachement_Json',this.state.Email_Attachement_Json)

      this.setState({
        modal3: !this.state.modal3
      });

      ////////////////////////Changement////////////////
      if (this.state.Selected_Global.length != 0) {
        console.log("this.state.Selected_Global", this.state.Selected_Global)
        var CL_Selected = null
        var ML_Selected = null
        var TL_Selected = null
        for (var i = 0; i < this.state.Selected_Global.length; i++) {
          if (this.state.Selected_Global[i].Dim_type == "VAR") {
            if (this.state.Selected_Global[i].Dim == "CL") {
              console.log("1 VAR", this.state.Selected_Global[i].Dim)
              this.setState({ BooleanVar_CL: true })
              if (this.state.Code_Cl != "" && this.state.Name_Cl != "") {
                CL_Selected = {
                  "Dim": "CL",
                  "Dim_type": "VAR",
                  "Dim_code": this.state.Code_Cl,
                  "Dim_label": this.state.Name_Cl,
                  "Dim_Member": this.state.cl_Membre_Select_fin,
                  "Dim_Clone": this.state.Selected_Global[i].Dim_Clone,
                }
                console.log("CL_Selected1", CL_Selected)
              } else {

                CL_Selected = {
                  "Dim": "CL",
                  "Dim_type": "VAR",
                  "Dim_code": this.state.Selected_Global[i].Dim_code,
                  "Dim_label": this.state.Selected_Global[i].Dim_label,
                  "Dim_Member": this.state.Selected_Global[i].Dim_Member,
                  "Dim_Clone": this.state.Selected_Global[i].Dim_Clone,
                }
                console.log("CL_Selected2", CL_Selected)
                this.setState({ CompteurListI_Name: this.state.Selected_Global[i].Dim_label })
              }
            } else if (this.state.Selected_Global[i].Dim == "ML") {
              console.log("2 VAR", this.state.Selected_Global[i].Dim)
              this.setState({ BooleanVar_ML: true })
              if (this.state.Code_Ml != "" && this.state.Name_Ml != "") {
                ML_Selected = {
                  "Dim": "ML",
                  "Dim_type": "VAR",
                  "Dim_code": this.state.Code_Ml,
                  "Dim_label": this.state.Name_Ml,
                  "Dim_Member": this.state.ml_Membre_Select_fin,
                  "Dim_Clone": this.state.Selected_Global[i].Dim_Clone,
                }
                console.log("ML_Selected1", ML_Selected)
              } else {

                ML_Selected = {
                  "Dim": "ML",
                  "Dim_type": "VAR",
                  "Dim_code": this.state.Selected_Global[i].Dim_code,
                  "Dim_label": this.state.Selected_Global[i].Dim_label,
                  "Dim_Member": this.state.Selected_Global[i].Dim_Member,
                  "Dim_Clone": this.state.Selected_Global[i].Dim_Clone,
                }
                console.log("ML_Selected2", ML_Selected)
                this.setState({ ML_Name: this.state.Selected_Global[i].Dim_label })
              }

            } else if (this.state.Selected_Global[i].Dim == "TL") {

              console.log("3 VAR", this.state.Selected_Global[i].Dim)
              this.setState({ BooleanVar_TL: true })
              if (this.state.Code_Tl != "" && this.state.Name_Tl != "") {
                TL_Selected = {
                  "Dim": "TL",
                  "Dim_type": "VAR",
                  "Dim_code": this.state.Code_Tl,
                  "Dim_label": this.state.Name_Tl,
                  "Dim_Member": this.state.tl_members,
                  "Dim_Clone": this.state.Selected_Global[i].Dim_Clone,
                }
                console.log("TL_Selected1", TL_Selected)
              } else {

                TL_Selected = {
                  "Dim": "TL",
                  "Dim_type": "VAR",
                  "Dim_code": this.state.Selected_Global[i].Dim_code,
                  "Dim_label": this.state.Selected_Global[i].Dim_label,
                  "Dim_Member": this.state.Selected_Global[i].Dim_Member,
                  "Dim_Clone": this.state.Selected_Global[i].Dim_Clone,
                }
                console.log("TL_Selected2", TL_Selected)
                this.setState({ tl_name: this.state.Selected_Global[i].Dim_label })
              }


            } else {

              console.log("vide")

            }


          } else {

            if (this.state.Selected_Global[i].Dim == "CL") {
              console.log("1 Fix", this.state.Selected_Global[i].Dim)
              CL_Selected = {
                "Dim": "Cl",
                "Dim_type": "Fix",
                "Dim_code": this.state.Selected_Global[i].Dim_code,
                "Dim_label": this.state.Selected_Global[i].Dim_label,
                "Dim_Member": this.state.Selected_Global[i].Dim_Member,
                "Dim_Clone": this.state.Selected_Global[i].Dim_Clone,
              }
              console.log("CL_Selected3", CL_Selected)


            } else if (this.state.Selected_Global[i].Dim == "ML") {
              console.log("2 Fix", this.state.Selected_Global[i].Dim)
              ML_Selected = {
                "Dim": "ML",
                "Dim_type": "VAR",
                "Dim_code": this.state.Selected_Global[i].Dim_code,
                "Dim_label": this.state.Selected_Global[i].Dim_label,
                "Dim_Member": this.state.Selected_Global[i].Dim_Member,
                "Dim_Clone": this.state.Selected_Global[i].Dim_Clone,
              }
              console.log("ML_Selected3", ML_Selected)

            } else if (this.state.Selected_Global[i].Dim == "TL") {

              console.log("3 Fix", this.state.Selected_Global[i].Dim)

              TL_Selected = {
                "Dim": "TL",
                "Dim_type": "Fix",
                "Dim_code": this.state.Selected_Global[i].Dim_code,
                "Dim_label": this.state.Selected_Global[i].Dim_label,
                "Dim_Member": this.state.Selected_Global[i].Dim_Member,
                "Dim_Clone": this.state.Selected_Global[i].Dim_Clone,
              }
              console.log("TL_Selected3", TL_Selected)
            } else {

              console.log("vide")

            }
          }


        }
        this.state.Selected_Global_Enregistrer = [CL_Selected, ML_Selected, TL_Selected]
      } else {
        console.log("Selected_Global is vide")
      }
      console.log('Selected_Global------------------------------>', this.state.Selected_Global_Enregistrer)



    }
    else {
      Swal.fire({
        toast: true,
        position: 'top',

        showConfirmButton: false,
        timer: 4000,
        icon: 'warning',
        width: 400,
        title: 'Sélectionner un rapport'
      })
    }
  }
  FactbookList1 = () => {
    console.log("Factbbok click", this.state.Email_Attachement)
    if (this.state.Email_Attachement != "" || this.state.Attachement == "FactBook") {
      this.setState({ modal7: !this.state.modal7 })
      this.state.Attachement = "FactBook"
      console.log("attachement", this.state.Attachement)
    } else {
      Swal.fire({
        toast: true,
        position: 'top',

        showConfirmButton: false,
        timer: 4000,
        icon: 'warning',
        width: 400,
        title: "Sélectionner une liste"
      })
    }
  }
  FB = () => {
    window.open("/Rapporteur/FactBook")
  }
  render() {
    const scrollContainerStyle = { width: "100%", maxHeight: "250px" };
    const { errors } = this.state;
    return (
      <div>
        <MDBBreadcrumb style={{ backgroundColor: '#b1b5b438',color: "#000",fontFamily: 'GOTHAM MEDIUM' }}>
          <MDBBreadcrumbItem>  Rapporteur</MDBBreadcrumbItem>
          <MDBBreadcrumbItem > Email</MDBBreadcrumbItem>
        </MDBBreadcrumb>
        <div style={{ margin: 30 }}>


          <MDBBtn color="#e0e0e0 grey lighten-2" onClick={this.toggle}>Nouveau</MDBBtn>



          <MDBModal isOpen={this.state.modal} toggle={this.toggle} centered size="lg" >
            <MDBModalHeader toggle={this.toggle} >Nouveau Email</MDBModalHeader>
            <MDBModalBody>

              <MDBRow>
                <MDBCol size="6">
                  <label htmlFor="defaultFormLoginEmailEx" className="grey-text" >
                    Nom de l'Email<span className='text-danger' style={{ fontSize: '12px' }}>*</span>
                  </label>
                  <input type="text" id="1" id="defaultFormLoginEmailEx" name="Email_Nom" className="form-control" value={this.state.Email_Nom} onChange={this.handleChange} required />
                  {errors.Email_Nom.length > 0 &&
                    <span className='text-danger' style={{ fontSize: '12px' }}>{errors.Email_Nom}</span>}

                </MDBCol>
                <MDBCol size="6">
                  <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                    objet<span className='text-danger' style={{ fontSize: '12px' }}>*</span>
                  </label>

                  <input type="text" id="1" id="defaultFormLoginEmailEx" name="Email_Subject" className="form-control" value={this.state.Email_Subject} onChange={this.handleChange} required />

                  {errors.Email_Subject.length > 0 &&
                    <span className='text-danger' style={{ fontSize: '12px' }}>{errors.Email_Subject}</span>}
                </MDBCol>
                <MDBCol size="6">
                  <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                    Email To<span className='text-danger' style={{ fontSize: '12px' }}>*</span>
                  </label>
                  <select className="browser-default custom-select " name="Email_To_Name" className="form-control" value={this.state.Email_To_Name} onChange={this.handleChange} size="2" >
                    <option></option>
                    {this.state.MailingList.map(i => <option key={i.MailingList_Code} id={i.MailingList_Code} onClick={(e) => this.handleClick(i.MailingList_Code, e)}>{i.Nom_MailingList}</option>)}
                  </select>
                  {errors.Email_To_Name.length > 0 &&
                    <span className='text-danger' style={{ fontSize: '12px' }}>{errors.Email_To_Name}</span>}
                </MDBCol>
                <MDBCol size="6">
                  <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                    Email CC
                  </label>

                  <select className="browser-default custom-select " name="Email_CC_Name" className="form-control" value={this.state.Email_CC_Name} onChange={this.handleChange} size="2" >
                    <option></option>

                    {this.state.MailingList.map(i => <option key={i.MailingList_Code} id={i.MailingList_Code} onClick={(e) => this.Email_CC_Click(i.MailingList_Code, e)} > {i.Nom_MailingList} </option>)}

                  </select>

                </MDBCol>
                <MDBCol size="12">

                  <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                    Corps de l'email
                  </label>
                  <input type="textarea" id="1" id="defaultFormLoginEmailEx" name="Email_Body" className="form-control" value={this.state.Email_Body} onChange={this.handleChange} required />

                </MDBCol>

                <MDBCol size="12">
                  <label htmlFor="defaultFormLoginEmailEx" className="grey-text" >
                    Description de l'Email
                  </label>
                  <input type="text" id="defaultFormLoginEmailEx" className="form-control" name="Email_Description" value={this.state.Email_Description} onChange={this.handleChange} required />

                </MDBCol>



                <MDBCol size="12">
                  <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                    Attachement
                  </label>



                  <MDBRow >
                    <MDBCol size="6" style={{ marginLeft: "-1%" }}>
                      <MDBBtn color="#bdbdbd grey lighten-1" className="" onClick={this.toggle3} style={{ width: "100%" }}> Rapport  <MDBIcon icon="file-invoice" className="ml-1" /></MDBBtn>
                    </MDBCol>         <MDBCol size="6">   <MDBBtn color="#bdbdbd grey lighten-1" className="" onClick={this.toggle7} style={{ width: "100%" }}  > FactBook <MDBIcon icon="copy" className="ml-1" /></MDBBtn>
                    </MDBCol>         </MDBRow>
                </MDBCol>

                {this.state.Attachement != "" &&
                  <MDBCol size="12">
                    <label htmlFor="defaultFormLoginEmailEx" className="grey-text" >
                      {this.state.Attachement}
                    </label>
                    <input type="text" id="defaultFormLoginEmailEx" className="form-control" name="Email_Attachement" value={this.state.Email_Attachement} onChange={this.handleChange} disabled />
                  </MDBCol>
                }
              </MDBRow>
            </MDBModalBody>
            <MDBModalFooter>

              <MDBBtn color="#e0e0e0 grey lighten-2" style={{ marginRight: "40%" }} onClick={this.ajouter}> <MDBIcon icon="plus" className="ml-1" />    Ajouter</MDBBtn>
            </MDBModalFooter>
          </MDBModal>

          {/* ************************************************************************************************ */}
      


          {/* ************************************************************************************************ */}
          <MDBBtn color="#e0e0e0 grey lighten-2" onClick={this.toggle1} id="btnmod" className="" >Modifier</MDBBtn>


          <MDBModal isOpen={this.state.modal1} toggle={this.toggle1} size="lg">
            <MDBModalHeader toggle={this.toggle1} >Modifier Email</MDBModalHeader>
            <MDBModalBody>

              <MDBRow>
                <MDBCol size="6">
                  <label htmlFor="defaultFormLoginEmailEx" className="grey-text" >
                    Nom de l'Email<span className='text-danger' style={{ fontSize: '12px' }}>*</span>
                  </label>
                  <input type="text" id="1" id="defaultFormLoginEmailEx" name="Email_Nom" className="form-control" value={this.state.Email_Nom} onChange={this.handleChange} required />
                  {errors.Email_Nom.length > 0 &&
                    <span className='text-danger' style={{ fontSize: '12px' }}>{errors.Email_Nom}</span>}

                </MDBCol>
                <MDBCol size="6">
                  <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                    objet<span className='text-danger' style={{ fontSize: '12px' }}>*</span>
                  </label>

                  <input type="text" id="1" id="defaultFormLoginEmailEx" name="Email_Subject" className="form-control" value={this.state.Email_Subject} onChange={this.handleChange} required />

                  {errors.Email_Subject.length > 0 &&
                    <span className='text-danger' style={{ fontSize: '12px' }}>{errors.Email_Subject}</span>}
                </MDBCol>
                <MDBCol size="6">
                  <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                    Email To<span className='text-danger' style={{ fontSize: '12px' }}>*</span>
                  </label>
                  <select className="browser-default custom-select " name="Email_To_Name" className="form-control" value={this.state.Email_To_Name} onChange={this.handleChange} size="2" >
                    <option></option>
                    {this.state.MailingList.map(i => <option key={i.MailingList_Code} id={i.MailingList_Code} onClick={(e) => this.handleClick(i.MailingList_Code, e)}>{i.Nom_MailingList}</option>)}
                  </select>
                  {errors.Email_To_Name.length > 0 &&
                    <span className='text-danger' style={{ fontSize: '12px' }}>{errors.Email_To_Name}</span>}
                </MDBCol>
                <MDBCol size="6">
                  <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                    Email CC
                  </label>

                  <select className="browser-default custom-select " name="Email_CC_Name" className="form-control" value={this.state.Email_CC_Name} onChange={this.handleChange} size="2" >
                    <option></option>

                    {this.state.MailingList.map(i => <option key={i.MailingList_Code} id={i.MailingList_Code} onClick={(e) => this.Email_CC_Click(i.MailingList_Code, e)} > {i.Nom_MailingList} </option>)}

                  </select>

                </MDBCol>
                <MDBCol size="12">

                  <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                    Corps de l'email
                  </label>
                  <input type="textarea" id="1" id="defaultFormLoginEmailEx" name="Email_Body" className="form-control" value={this.state.Email_Body} onChange={this.handleChange} required />

                </MDBCol>

                <MDBCol size="12">
                  <label htmlFor="defaultFormLoginEmailEx" className="grey-text" >
                    Description de l'Email
                  </label>
                  <input type="text" id="defaultFormLoginEmailEx" className="form-control" name="Email_Description" value={this.state.Email_Description} onChange={this.handleChange} required />

                </MDBCol>



                <MDBCol size="12">
                  <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                    Attachement
                  </label>



                  <MDBRow >
                    <MDBCol size="6" style={{ marginLeft: "-1%" }}>
                      <MDBBtn color="#bdbdbd grey lighten-1" className="" onClick={this.toggle3} style={{ width: "100%" }}> Rapport  <MDBIcon icon="file-invoice" className="ml-1" /></MDBBtn>
                    </MDBCol>         <MDBCol size="6">   <MDBBtn color="#bdbdbd grey lighten-1" className="" onClick={this.toggle7} style={{ width: "100%" }}  > FactBook <MDBIcon icon="copy" className="ml-1" /></MDBBtn>
                    </MDBCol>         </MDBRow>
                </MDBCol>

                {this.state.Attachement != "" &&
                  <MDBCol size="12">
                    <label htmlFor="defaultFormLoginEmailEx" className="grey-text" >
                      {this.state.Attachement}
                    </label>
                    <input type="text" id="defaultFormLoginEmailEx" className="form-control" name="Email_Attachement" value={this.state.Email_Attachement} onChange={this.handleChange} disabled />
                  </MDBCol>
                }

              </MDBRow>
            </MDBModalBody>
            <MDBModalFooter>

              <MDBBtn color="#e0e0e0 grey lighten-2" style={{ marginRight: "40%" }} onClick={this.modifier}> <MDBIcon far icon="edit" />   Modifier</MDBBtn>
            </MDBModalFooter>
          </MDBModal>

          <MDBBtn color="#e0e0e0 grey lighten-2" onClick={this.copier} >Copier</MDBBtn>
          <MDBBtn color="#bdbdbd grey lighten-1" className="float-right" onClick={this.Enregistrer} > Enregistrer   <MDBIcon icon="save" className="ml-1" /></MDBBtn>

          <div>
            <div className="tabulator" ref={el => (this.el = el)} /></div>

        </div>

        <div>
          {/**    Mesures Listes Modale */}

          <MDBModal isOpen={this.state.modal2} toggle={this.toggle2} centered size="lg">

            <ModalML toggle2={this.toggle2} ML_Tags_Function={this.ML_Tags_Function} Code_Ml={this.state.Code_Ml} Name_Ml={this.state.Name_Ml} handleChange={this.handleChange} modelMl={this.modelMl} Listes_Ml={this.state.Listes_Ml} handleListeMLClick={this.handleListeMLClick} ML_Membre={this.state.ML_Membre} />


            <MDBNav tabs className="nav-justified" color='indigo' style={{ backgroundColor: "#e0e0e0" }} >

              <MDBNavItem>
                <MDBNavLink link onClick={() => this.MesuresListes()}>
                  liste d'éditeurs
                </MDBNavLink>
              </MDBNavItem>
            </MDBNav>


            <MDBModalFooter>

              <MDBBtn color="#e0e0e0 grey lighten-2" style={{ marginRight: "160px" }} onClick={this.AjouterMl}
              > <MDBIcon icon="plus" className="ml-1" /> Sélectionnez</MDBBtn>
            </MDBModalFooter>
          </MDBModal>
          {/**    Compteurs Listes Modale */}
          <MDBModal isOpen={this.state.modal4} toggle={this.toggle4} centered size="lg">

            <ModalCL toggle4={this.toggle4} CL_Tags_Function={this.CL_Tags_Function} handleChange={this.handleChange} modelCl={this.modelCl} Listes_Cl={this.state.Listes_Cl} handleListeCompteurClick={this.handleListeCompteurClick} CL_Membre={this.state.CL_Membre} />


            <MDBNav tabs className="nav-justified" color='indigo' style={{ backgroundColor: "#e0e0e0" }} >

              <MDBNavItem>
                <MDBNavLink link onClick={() => this.CL()}>
                  liste d'éditeurs
                </MDBNavLink>
              </MDBNavItem>
            </MDBNav>
            <MDBModalFooter>

              <MDBBtn color="#e0e0e0 grey lighten-2" style={{ marginRight: "40%" }} onClick={this.AjouterCl}> <MDBIcon icon="plus" className="ml-1" /> Sélectionnez</MDBBtn>
            </MDBModalFooter>
          </MDBModal>
          {/**    Time Intelligence Modale */}
          <MDBModal isOpen={this.state.modal5} toggle={this.toggle5} centered size="lg" >

            <ModalTL Listes_TL={this.state.Listes_TL} handleChange={this.handleChange} handleListeTLClick={this.handleListeTLClick} toggle5={this.toggle5} />


            <MDBNav tabs className="nav-justified" color='indigo' style={{ backgroundColor: "#e0e0e0" }} >

              <MDBNavItem>
                <MDBNavLink link to="/Rapporteur/TimeIntelligence" onClick={() => this.tl()} >
                  liste d'éditeurs
                </MDBNavLink>
              </MDBNavItem>
            </MDBNav>
            <MDBModalFooter>

              <MDBBtn color="#e0e0e0 grey lighten-2" style={{ marginRight: "160px" }} onClick={this.AjouterTl}
              > <MDBIcon icon="plus" className="ml-1" /> Sélectionnez</MDBBtn>
            </MDBModalFooter>
          </MDBModal>
          {/* ********************* */}
          <MDBModal isOpen={this.state.modal3} toggle={this.toggle3} centered size="lg" >

<Navigateur
  ajouterRapportAttachement={this.ajouterRapportAttachement}
  TAGS={this.state.TAGS}
  Master={this.state.Master}
  Tableaux={this.state.Tableaux}
  TAGS_New={this.state.TAGS_New}
  filterTAGS={this.filterTAGS}
  listTableau={this.state.listTableau}
  filterMaster={this.filterMaster}
  filterTableaux={this.filterTableaux}
  listRapportglobal={this.state.listRapportglobal}
  filterRapportglobal={this.filterRapportglobal}
  btndelete_Email_Attachement={this.btndelete_Email_Attachement}
  handleRapportselectedchange={this.handleRapportselectedchange}
  Report_Name_Enregistrer={this.state.Report_Name_Enregistrer}
  Report_Description={this.state.Report_Description}
  resetvalueoffilter={this.resetvalueoffilter}
  Email_Attachement={this.state.Email_Attachement}
  handleChange={this.handleChange}
  editRapport={this.state.editRapport}
  Report_Name={this.state.Report_Name}
  listMaster={this.state.listMaster}
  listTAGS={this.state.listTAGS}
  ajouter={this.ajouter}
  toggle3={this.toggle3}
  toggle6={this.toggle6}
/>
</MDBModal>
{/* ************************************** */}
<MDBModal isOpen={this.state.modal6} toggle={this.toggle6} centered size="lg" >

<MDBModalHeader toggle={this.toggle6} >Nouveau Rapport</MDBModalHeader>
<MDBModalBody>

  <MDBTabContent activeItem={this.state.items["default"]}>
    <MDBTabPane tabId="1">
      <MDBRow>
        <MDBCol size="12">
          <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
            Nom Rapport <span className='text-danger' style={{ fontSize: '12px' }}>*</span>
          </label>

          <input type="text" id="1" id="defaultFormLoginEmailEx" name="Report_Name_Enregistrer" value={this.state.Report_Name_Enregistrer} onChange={this.handleChange} className="form-control" required />

        </MDBCol>
        <MDBCol size="12">
          <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
            Mots clés
          </label>
          <input type="textarea" id="1" id="defaultFormLoginEmailEx" name="TAGS_New" value={this.state.TAGS_New} onChange={this.handleChange} className="form-control" required />
        </MDBCol>
        <MDBCol size="12">
          <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
            Description
          </label>

          <input type="textarea" id="1" id="defaultFormLoginEmailEx" name="Report_Description" value={this.state.Report_Description} onChange={this.handleChange} className="form-control" required />
        </MDBCol>
        <MDBCol size="12">
          <fieldset className="form-group " style={{ border: "2px groove", padding: "10px", borderColor: "#e0e0e0", borderStyle: "solid", borderRadius: '4px', width: "auto", height: "auto" }}>

            <legend style={{ width: "220px", color: "#51545791", fontSize: "20px" }}>Sélectionner les données </legend>

            <MDBRow>
              <MDBCol size="4" style={{ marginTop: "-10px" }}>
                <MDBBtn size="sm" color="#eeeeee grey lighten-3" disabled={this.state.BtnClDesibled}
                  style={{ fontSize: "13px", textAlign: "center", width: "90%" }} onClick={this.toggle4}>
                  Compteurs Listes
                </MDBBtn>
              </MDBCol >
              <MDBCol size="8" ><b style={{ fontSize: "16px", marginTop: "22%" }} >{this.state.CompteurListI_Name}</b></MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol size="4" >
                <MDBBtn size="sm" color="#eeeeee grey lighten-3" disabled={this.state.BtnMlDesibled} style={{ fontSize: "13px", textAlign: "center", width: "90%" }} onClick={this.toggle2}>
                  Mesures Listes
                </MDBBtn>

              </MDBCol>
              <MDBCol size="8" style={{ marginTop: "14px" }}><b style={{ fontSize: "16px" }} >{this.state.ML_Name}</b></MDBCol>
            </MDBRow>
            <MDBRow>

              <MDBCol size="4" >
                <MDBBtn size="sm" color="#eeeeee grey lighten-3" disabled={this.state.BtnTlDesibled} style={{ fontSize: "13px", textAlign: "center", width: "90%" }} onClick={this.toggle5}>
                  Time Intelligence
                </MDBBtn>

              </MDBCol>
              <MDBCol size="8" style={{ marginTop: "14px" }}><b style={{ fontSize: "16px" }} >{this.state.tl_name}</b></MDBCol>
            </MDBRow>

          </fieldset>
        </MDBCol>
      </MDBRow>

    </MDBTabPane>

    <MDBTabPane tabId="2">
      {this.state.GenerateTableActive &&
        <div>


          <GenerateTable dummy={false} editor={false} supervisor={true} config={this.state.config} style={{ width: this.state.layoutFormat.width, height: this.state.layoutFormat.height }}
          />  </div>}
    </MDBTabPane>

  </MDBTabContent>

</MDBModalBody>
<MDBNav tabs className="nav-justified" color='indigo' style={{ backgroundColor: "#e0e0e0" }} >
  <MDBNavItem>
    <MDBNavLink link to="#" active={this.state.items["default"] === "1"} onClick={this.togglePills("default", "1")} >
      Données
    </MDBNavLink>
  </MDBNavItem>
  <MDBNavItem>
    <MDBNavLink link to="#" active={this.state.items["default"] === "2"} onClick={this.togglePills("default", "2")} >
      Vue
    </MDBNavLink>
  </MDBNavItem>
</MDBNav>
<MDBModalFooter>
  <MDBBtn color="#e0e0e0 grey lighten-2" style={{ marginRight: "40%" }} onClick={this.ajouterNewRapport}> <MDBIcon icon="plus" className="ml-1" />    Ajouter</MDBBtn>
</MDBModalFooter>
</MDBModal>
      {/* ******************* */}
      
          <MDBModal isOpen={this.state.modal7} toggle={this.toggle7} centered size="lg">

            <ModalFactBook toggle4={this.toggle7} listes={this.state.FactBook} handleChange={this.handleChange} FactBookClick={this.FactBookClick} NomFactbbok={this.state.NomFactbbok} Factbook_Membre={this.state.Factbook_Membre} />

            <MDBNav tabs className="nav-justified" color='indigo' style={{ backgroundColor: "#e0e0e0" }} >

              <MDBNavItem>
                <MDBNavLink link onClick={() => this.FB()}>
                  liste d'éditeurs
                </MDBNavLink>
              </MDBNavItem>
            </MDBNav>
            <MDBModalFooter>

              <MDBBtn color="#e0e0e0 grey lighten-2" style={{ marginRight: "38%" }} onClick={this.FactbookList1}> <MDBIcon icon="plus" className="ml-1" /> Sélectionnez</MDBBtn>
            </MDBModalFooter>
          </MDBModal>
          {/* ********************* */}

         
        </div>

      </div>
    );
  }

}

const Navigateur = ({
  toggle3,
  toggle6,
  ajouterRapportAttachement,
  handleRapportselectedchange,
  Tableaux,
  TAGS_New,
  Report_Name,
  Report_Name_Enregistrer,
  filterRapportglobal,
  Report_Description,
  listTableau,
  TAGS,
  resetvalueoffilter,
  listRapportglobal,
  listTAGS,
  Master,
  filterMaster,
  handleChange,
  filterTAGS,
  listMaster,
  filterTableaux,
  Email_Attachement,
  btndelete_Email_Attachement,
  editRapport,
}) => {

  const [filterNameRapport, setFilterNameRapport] = useState([])
  useEffect(() => {

    const matna7inich = (e) => {
      //console.log("listRapportglobal", listRapportglobal)
      const text = e.target.value
      //console.log(listRapportglobal.filter((el) => el.Report_Name.indexOf(text) >= 0))
      //listRapportglobal.filter((el)=>el.Report_Name.indexOf(text)>=0)
      setFilterNameRapport(listRapportglobal.filter((el) => el.Report_Name.indexOf(text) >= 0))


    }

    const input = document.querySelector("#myInput")

    //console.log("this.state.modal", input)
    if (input) {
      input.addEventListener("keyup", matna7inich)
    }

    return function cleanup() {
      input.removeEventListener("keyup", matna7inich)
    }



  }, [])

  useEffect(() => {

    //console.log('---Report_Name--->', Report_Name)


  }, [Report_Name])


  useEffect(() => {

    //console.log('---Report_Name--->', Report_Name)
    //console.log('---Report_Description--->', Report_Description)
    //console.log('---TAGS_New--->', TAGS_New)


  }, [Report_Name, Report_Description, TAGS_New, Report_Name_Enregistrer])
  useEffect(() => {
    if (!filterNameRapport) return
    filterRapportglobal(filterNameRapport)
  }, [filterNameRapport])
  return (<>
    <MDBModalHeader toggle={toggle3}>Rapport</MDBModalHeader>

    <MDBModalBody>

      <Rapport Tableaux={Tableaux} TAGS={TAGS} Master={Master} filterMaster={filterMaster} filterTAGS={filterTAGS} listMaster={listMaster} filterTableaux={filterTableaux} listRapportglobal={listRapportglobal} resetvalueoffilter={resetvalueoffilter} listTAGS={listTAGS} listTableau={listTableau} handleChange={handleChange} filterRapportglobal={filterRapportglobal} handleRapportselectedchange={handleRapportselectedchange} />

      <MDBRow style={{ margin: "1%" }} >
        <MDBCol size="11" >
          <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
            Rapport Sélectionnez
          </label>
          <input type="text" id="defaultFormLoginEmailEx" className="form-control" name="Email_Attachement" value={Email_Attachement} onChange={handleChange} disabled />
        </MDBCol>
        <MDBCol size="1">
          <MDBBtn style={{ height: '37px', marginLeft: "-20px", marginTop: "30px" }} color="#e0e0e0 grey lighten-2" size="sm" onClick={btndelete_Email_Attachement}> <MDBIcon style={{ marginLeft: '-4px' }} title="Supprimer" icon="trash-alt" size="lg" /></MDBBtn>
        </MDBCol>
      </MDBRow  >
      {editRapport == false && Report_Name ? (<MDBRow style={{ margin: "1%" }}>
        <MDBCol size="12">
          <MDBBtn color="#bdbdbd grey lighten-1" style={{ width: "100%" }} onClick={toggle6} > On peut copier le même rapport avec changement les données  <MDBIcon icon="file-invoice" className="ml-2" /> </MDBBtn></MDBCol></MDBRow>) : null}




    </MDBModalBody>
    <MDBModalFooter>

      <MDBBtn color="#e0e0e0 grey lighten-2" style={{ marginRight: "40%" }} onClick={ajouterRapportAttachement}> <MDBIcon icon="plus" className="ml-1" /> Ajouter</MDBBtn>
    </MDBModalFooter>
  </>);
}
const Rapport = ({ Tableaux, TAGS, Master, filterMaster, filterTAGS, listMaster, filterTableaux, listRapportglobal, resetvalueoffilter, listTAGS, listTableau, handleChange, filterRapportglobal, handleRapportselectedchange }) => {
  const scrollContainerStyle = { width: "100%", maxHeight: "230px" };
  const [filterNameRapport, setFilterNameRapport] = useState([])


  useEffect(() => {


    const matna7inich = (e) => {
      //console.log("listRapportglobal", listRapportglobal)
      const text = e.target.value
      setFilterNameRapport(listRapportglobal.filter((el) => el.Report_Name.indexOf(text) >= 0))


    }

    const input = document.querySelector("#myInput")

    console.log("this.state.modal", input)
    if (input) {
      input.addEventListener("keyup", matna7inich)
    }

    return function cleanup() {
      input.removeEventListener("keyup", matna7inich)
    }

  }, [listRapportglobal])


  useEffect(() => {
    if (!filterNameRapport) return
    filterRapportglobal(filterNameRapport)
    console.log("filterNameRapport", filterNameRapport)

  }, [filterNameRapport])

  return (<>

    <MDBRow >
      <MDBCol style={{ padding: 0 + 'em' }} style={{ marginLeft: "1%" }}>
        <label htmlFor="defaultFormLoginEmailEx7" >
          Filter rapport :
        </label>
        <MDBBtn className=' button_round btn-floating' style={{ width: '28px', height: '28px', marginLeft: '20px' }} onClick={() => { resetvalueoffilter(); }}>
          <MDBIcon size='lg' icon="sync-alt" />
        </MDBBtn>

        <MDBCol className='p-0' style={{ marginRight: 0 + 'em', marginTop: 0 + 'px', paddingLeft: 1 + 'em' }}>


          <MDBInput label="Tableaux :"
            list="listTableau" style={{ marginBottom: 0.8 + 'em', marginTop: 0 + 'em' }}
            onClick={filterTableaux}
            autoComplete="off"
            name="Tableaux" value={Tableaux}
            onChange={handleChange}
          />
          <datalist id="listTableau">
            {listTableau.map((listTableau, i) => <option key={i} value={listTableau}></option>)}

          </datalist>


          <MDBInput label="Mots clés:"
            list="listTAGS" style={{ marginBottom: 0.8 + 'em' }}
            onClick={filterTAGS}
            name="TAGS" value={TAGS}
            onChange={handleChange}
            autoComplete="off"
          />
          <datalist id="listTAGS">
            {listTAGS.map((listTAGS, i) => <option key={i} value={listTAGS}></option>)}
          </datalist>

          <MDBInput label="Master :"
            list="listMaster" style={{ marginBottom: 0.8 + 'em' }}
            autoComplete="off"
            onClick={filterMaster}
            name="Master" value={Master}
            onChange={handleChange}
          />
          <datalist id="listMaster">
            {listMaster.map((listMaster, i) => <option key={i} value={listMaster}></option>)}
          </datalist>
        </MDBCol>

      </MDBCol>
      {/**********   This is where the magic happens     ***********/}
      <MDBCol className='p-0'>
        <MDBCol style={{ marginLeft: "1%" }}>

          <div className="d-flex justify-content-between " >
            <p className=" m-0 p-0">Liste des rapports : </p>

            {/* <input type="textarea" id="1" id="defaultFormLoginEmailEx" style={{width:"60%",marginTop:"-7px"}}   name="Report_Name_Search" value={this.state.Report_Name_Search} onChange={this.handleChange} className="form-control" required /> */}
            <input type="text" id="myInput" autoComplete="off" placeholder="Rechrech..." className="form-control float-right " style={{ width: "60%", marginTop: "-2%" }} />

          </div>
          <MDBContainer style={{ padding: 0 + 'em', marginTop: "-10%" }} >
            <MDBListGroup style={{ width: '100%' }} className="scrollbar scrollbar-primary  mt-5 mx-auto" style={scrollContainerStyle} id="myFilter">
              {listRapportglobal.map((listRapportglobal, i) => <MDBListGroupItem hover key={i} name="Report_Name" value={listRapportglobal.Report_Name} style={{ padding: 0.5 + 'em' }} id={listRapportglobal.Report_Code} hover onClick={() => handleRapportselectedchange(listRapportglobal.Report_Name, listRapportglobal.Report_Code)}>{listRapportglobal.Report_Name}</MDBListGroupItem>)}
            </MDBListGroup>
          </MDBContainer>
        </MDBCol>
      </MDBCol>
    </MDBRow>


  </>)
}
const ModalCL = ({ toggle4, modelCl, CL_Tags_Function, Listes_Cl, handleListeCompteurClick, handleChange, CL_Membre }) => {
  //console.log("Listes_Cl", Listes_Cl)

  const [filterCL_Liste, setfilterCL_Liste] = useState([])
  const [filterCL_Membre, setfilterCL_Membre] = useState([])
  const [CL_Membre_Select, setCL_Membre_Select] = useState([])
  const [Member_select, setMember_select] = useState({})
  const [btnDelete, setBtnDelete] = useState(true)
  const [Le_Compteur, setLe_Compteur] = useState("")
  const [Code_Compteur, setCode_Compteur] = useState("")
  const [showTAGS_CL, setShowTAGS_CL] = useState(false)
  const [CL_Tags_var, setCL_Tags_var] = useState("")
  const [showBtnAjouterParMembre, setShowBtnAjouterParMembre] = useState(false)
  const [showBtnAjouterAll, setShowBtnAjouterAll] = useState(false)
  useEffect(() => {

    //console.log("--------------->",Listes_Cl)
  }, [Listes_Cl])

  //////////////////
  useEffect(() => {

    console.log("---------CL_Membre------>", CL_Membre)

    if (filterCL_Membre != CL_Membre) {
      setfilterCL_Membre(CL_Membre)
    }
  }, [CL_Membre])
  ////////////
  useEffect(() => {

    //console.log("jjjj",CL_Membre.length!=0)
    if (filterCL_Membre.length == 0) {
      setfilterCL_Membre(CL_Membre)
    }
    if (CL_Membre.length != 0) {

      const filterCLMembre = (e) => {

        //console.log("CL_Membre", CL_Membre)
        const text = e.target.value
        //console.log("text", text)

        console.log("filter", CL_Membre.filter(
          (el, i) => {
            // console.log(i,el)
            return el.Le_Compteur.indexOf(text) >= 0
          }
        )
        )

        setfilterCL_Membre(CL_Membre.filter((el) => el.Le_Compteur.toLowerCase().indexOf(text.toLowerCase()) >= 0))


      }

      const input = document.querySelector("#myInputCl_Membre")

      //console.log("input", input)
      if (input) {

        input.addEventListener("keyup", (e) => filterCLMembre(e))
      }

      return function cleanup() {

        input.removeEventListener("keyup", filterCLMembre)
      }

    }

  }, [CL_Membre])
  ////////////////////
  useEffect(() => {

    //console.log("jjjj",Listes_Cl.length!=0)
    if (filterCL_Liste.length == 0) {
      setfilterCL_Liste(Listes_Cl)
    }
    if (Listes_Cl.length != 0) {
      const FilterClListe = (e) => {

        //console.log("Listes_Cl", Listes_Cl)
        const text = e.target.value
        //console.log("text", text)

        console.log("filter", Listes_Cl.filter(
          (el, i) => {
            // console.log(i,el)
            return el.CompteurListI_Name.indexOf(text) >= 0
          }
        )
        )

        setfilterCL_Liste(Listes_Cl.filter((el) => el.CompteurListI_Name.toLowerCase().indexOf(text.toLowerCase()) >= 0))


      }

      const input = document.querySelector("#myInputCl")

      //console.log("input", input)
      if (input) {

        input.addEventListener("keyup", (e) => FilterClListe(e))
      }

      return function cleanup() {

        input.removeEventListener("keyup", FilterClListe)
      }

    }

  }, [Listes_Cl])
  //////////////////////
  useEffect(() => {
    //if(!filterCL_Liste)return
    console.log('---filterCL_Liste--->', filterCL_Liste)



  }, [filterCL_Liste])

  useEffect(() => {
    //if(!filterCL_Liste)return
    console.log('---filterCL_Liste--->', filterCL_Membre)



  }, [filterCL_Membre])
  useEffect(() => {
    //if(!filterCL_Liste)return
    console.log('---CL_Membre_Select--->', CL_Membre_Select)
    modelCl(CL_Membre_Select)
    if (CL_Membre_Select.length == 0) {
      setBtnDelete(true)
    }

  }, [CL_Membre_Select])
  function Ajouter_All() {
    setCL_Membre_Select(CL_Membre)
    setBtnDelete(false)
    setShowTAGS_CL(false)
    setShowBtnAjouterParMembre(true)
    setCL_Tags_var("")
  }
  function Ajouter_Par_Member() {
    const elem = document.querySelector(`#selectWestania`)
    if (elem) {
      //console.log("/////////////////////////",elem.value)
      elem.selectedIndex = -1
    }
    //console.log("ajouter y2")
    const array = []
    //console.log("CL_Membre_Select",CL_Membre_Select)
    //console.log("Member_select",Member_select)

    if (!Object.keys(Member_select).length) return
    //console.log("CL_Membre_Select.length",CL_Membre_Select.length)
    if (CL_Membre_Select.length == 0) {
      array.push(Member_select)
      setCL_Membre_Select(array)
      setBtnDelete(false)
      setShowTAGS_CL(true)
      setShowBtnAjouterAll(true)
      //console.log("arrayarrayarrayarrayarrayarray",array)

    }
    else {
      if (!CL_Membre_Select) return
      if (!CL_Membre_Select.find((el) => JSON.stringify(el) == JSON.stringify(Member_select))) {
        array.push(Member_select)
        setCL_Membre_Select(array.concat(CL_Membre_Select))
      } else {
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


    //   for (var i = 0; i < filterCL_Membre.length; i++) {

    //     if (filterCL_Membre[i].Le_Compteur === array[0].Le_Compteur) {

    //         filterCL_Membre.splice(i, 1);
    //     }

    //   }
    console.log('filterCL_MembrefilterCL_MembrefilterCL_Membre', filterCL_Membre)
    console.log('KKKKK', CL_Membre)
    setMember_select({})
  }
  function Delete_Member() {
    setCL_Membre_Select([])
    setMember_select({})
    setShowTAGS_CL(false)
    setShowBtnAjouterAll(false)
    setShowBtnAjouterParMembre(false)
    setCL_Tags_var("")
  }

  useEffect(() => {
    console.log("------Member_select---->", Member_select)
  }, [Member_select])


  function handleClClick(id, name, e) {
    setCode_Compteur(id);
    setLe_Compteur(name);
  }
  useEffect(() => {
    if (Le_Compteur != "" && Code_Compteur != "") {
      setMember_select({ "Le_Compteur": Le_Compteur, "Code_Compteur": Code_Compteur })
    }
  }, [Le_Compteur, Code_Compteur])

  useEffect(() => {
    // if (!CL_Tags_var)return
    CL_Tags_Function(CL_Tags_var)
    console.log("CL_Tags_var", CL_Tags_var)

  }, [CL_Tags_var])



  const onChange = (e) => {
    setCL_Tags_var(e.currentTarget.value);

  }
  return (
    <>
      <MDBModalHeader toggle={toggle4} >Sélectionnez Compteurs Listes:</MDBModalHeader>
      <MDBModalBody>

        <MDBRow>
          <MDBCol size="12">
            <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
              Liste des compteurs
            </label>
            <br />
            <input type="text" id="myInputCl" autoComplete="off" placeholder="Rechrech..." className="form-control float-right " style={{ width: "100%" }} />

            <select className="browser-default custom-select" name="CompteurListI_Name" size="8" >
              {filterCL_Liste.map(liste => <option key={liste.CompteurList_Code} id={liste.CompteurList_Code} onClick={() => handleListeCompteurClick(liste.CompteurList_Code, liste.CompteurListI_Name, liste.CL_Membre)}>  {liste.CompteurListI_Name} </option>)}

            </select>
          </MDBCol>
          {CL_Membre.length ? (<MDBCol size="5">
            <br />
            <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
              Liste des membres
            </label>
            <input type="text" id="myInputCl_Membre" autoComplete="off" placeholder="Rechrech..." className="form-control float-right " style={{ width: "100%", marginTop: "-2%" }} />
            <select id="selectWestania" className="browser-default custom-select" name="le_Compteur" size="8"/* onChange={handleChangeSelect_Membre}*/ >
              <option style={{ display: "none" }} selected value> -- select an option -- </option>
              {filterCL_Membre.map(liste => <option onClick={(e) => handleClClick(liste.Code_Compteur, liste.Le_Compteur, e)} >  {liste.Le_Compteur} </option>)}

            </select>
          </MDBCol>) : null}

          {CL_Membre.length ? (<MDBCol size="2" >

            <MDBBtn style={{ marginTop: "100%", width: "80%" }} size="sm" onClick={Ajouter_All} disabled={showBtnAjouterAll}><MDBIcon icon="angle-double-right" size="2x" /></MDBBtn>
            <MDBBtn style={{ width: "80%" }} size="sm" onClick={Ajouter_Par_Member} disabled={showBtnAjouterParMembre} ><MDBIcon icon="angle-right" size="2x" /></MDBBtn>
            <MDBBtn style={{ width: "80%" }} size="sm" onClick={Delete_Member} disabled={btnDelete}><MDBIcon title="Supprimer" far icon="trash-alt" size="2x" /></MDBBtn>

          </MDBCol>) : null}


          {CL_Membre.length ? (

            <MDBCol size="5">
              <br />
              <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                Liste des membres sélectionnez
              </label>

              <select style={{ marginTop: "10%" }} className="browser-default custom-select" name="le_Compteur" size="8" >
                {CL_Membre_Select.map(liste => <option >  {liste.Le_Compteur} </option>)}

              </select>
            </MDBCol>) : null}
          {showTAGS_CL == true ? (<MDBCol size="12">

            <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
              Mot clé d'une nouvelle liste compteur
            </label>
            <input type="text" id="1" id="defaultFormLoginEmailEx" name="CL_Tags_var" value={CL_Tags_var} onChange={onChange} className="form-control" required />



          </MDBCol>) : null}
        </MDBRow>
      </MDBModalBody>
    </>
  )


}

const ModalML = ({ toggle2, ML_Tags_Function, modelMl, Listes_Ml, handleListeMLClick, handleChange, ML_Membre }) => {
  //console.log("Listes_Ml", Listes_Ml)

  const [filterML_Liste, setfilterML_Liste] = useState([])
  const [filterML_Membre, setfilterML_Membre] = useState([])
  const [ML_Membre_Select, setML_Membre_Select] = useState([])
  const [Member_select, setMember_select] = useState({})
  const [btnDelete, setBtnDelete] = useState(true)
  const [m_name, setM_name] = useState("")
  const [m_code, setM_code] = useState("")
  const [ML_Tags_var, setML_Tags_var] = useState("")
  const [showTAGS_ML, setShowTAGS_ML] = useState(false)
  const [showBtnAjouterParMembre, setShowBtnAjouterParMembre] = useState(false)
  const [showBtnAjouterAll, setShowBtnAjouterAll] = useState(false)
  useEffect(() => {

    console.log("--------Listes_Ml------->", Listes_Ml)
  }, [Listes_Ml])

  //////////////////
  useEffect(() => {

    console.log("---------ML_Membre------>", ML_Membre)

    if (filterML_Membre != ML_Membre) {
      setfilterML_Membre(ML_Membre)
    }
  }, [ML_Membre])
  ////////////
  useEffect(() => {

    //console.log("jjjj",ML_Membre.length!=0)
    if (filterML_Membre.length == 0) {
      setfilterML_Membre(ML_Membre)
    }
    if (ML_Membre.length != 0) {

      const filterMLMembre = (e) => {

        //console.log("ML_Membre", ML_Membre)
        const text = e.target.value
        //console.log("text", text)

        console.log("filter", ML_Membre.filter(
          (el, i) => {
            // console.log(i,el)
            return el.m_name.indexOf(text) >= 0
          }
        )
        )

        setfilterML_Membre(ML_Membre.filter((el) => el.m_name.toLowerCase().indexOf(text.toLowerCase()) >= 0))


      }

      const input = document.querySelector("#myInputCl_Membre")

      //console.log("input", input)
      if (input) {

        input.addEventListener("keyup", (e) => filterMLMembre(e))
      }

      return function cleanup() {

        input.removeEventListener("keyup", filterMLMembre)
      }

    }

  }, [ML_Membre])
  ////////////////////
  useEffect(() => {

    //console.log("jjjj",Listes_Ml.length!=0)
    if (filterML_Liste.length == 0) {
      setfilterML_Liste(Listes_Ml)
    }
    if (Listes_Ml.length != 0) {
      const FilterClListe = (e) => {

        //console.log("Listes_Ml", Listes_Ml)
        const text = e.target.value
        //console.log("text", text)

        console.log("filter", Listes_Ml.filter(
          (el, i) => {
            // console.log(i,el)
            return el.ML_Name.indexOf(text) >= 0
          }
        )
        )

        setfilterML_Liste(Listes_Ml.filter((el) => el.ML_Name.toLowerCase().indexOf(text.toLowerCase()) >= 0))


      }

      const input = document.querySelector("#myInputCl")

      //console.log("input", input)
      if (input) {

        input.addEventListener("keyup", (e) => FilterClListe(e))
      }

      return function cleanup() {

        input.removeEventListener("keyup", FilterClListe)
      }

    }

  }, [Listes_Ml])
  //////////////////////
  useEffect(() => {
    //if(!filterML_Liste)return
    console.log('---filterML_Liste--->', filterML_Liste)



  }, [filterML_Liste])

  useEffect(() => {
    //if(!filterML_Liste)return
    console.log('---filterML_Liste--->', filterML_Membre)



  }, [filterML_Membre])
  useEffect(() => {
    //if(!filterML_Liste)return
    console.log('---ML_Membre_Select--->', ML_Membre_Select)
    modelMl(ML_Membre_Select)
    if (ML_Membre_Select.length == 0) {
      setBtnDelete(true)
    }

  }, [ML_Membre_Select])
  function Ajouter_All() {
    setML_Membre_Select(ML_Membre)
    setBtnDelete(false)
    setShowTAGS_ML(false)
    setShowBtnAjouterParMembre(true)
    setML_Tags_var("")
  }
  function Ajouter_Par_Member() {
    const elem = document.querySelector(`#selectWestania`)
    if (elem) {
      //console.log("/////////////////////////",elem.value)
      elem.selectedIndex = -1
    }
    //console.log("ajouter y2")
    const array = []
    //console.log("ML_Membre_Select",ML_Membre_Select)
    //console.log("Member_select",Member_select)

    if (!Object.keys(Member_select).length) return
    //console.log("ML_Membre_Select.length",ML_Membre_Select.length)
    if (ML_Membre_Select.length == 0) {
      array.push(Member_select)
      setML_Membre_Select(array)
      setBtnDelete(false)
      setShowTAGS_ML(true)
      setShowBtnAjouterAll(true)
      //console.log("arrayarrayarrayarrayarrayarray",array)

    }
    else {
      if (!ML_Membre_Select) return
      if (!ML_Membre_Select.find((el) => JSON.stringify(el) == JSON.stringify(Member_select))) {
        array.push(Member_select)
        setML_Membre_Select(array.concat(ML_Membre_Select))
      } else {
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


    console.log('filterCL_MembrefilterCL_MembrefilterCL_Membre', filterML_Membre)
    console.log('KKKKK', ML_Membre)
    setMember_select({})
  }
  function Delete_Member() {
    setML_Membre_Select([])
    setMember_select({})
    setShowTAGS_ML(false)
    setShowBtnAjouterAll(false)
    setShowBtnAjouterParMembre(false)
    setML_Tags_var("")

  }

  useEffect(() => {
    console.log("------Member_select---->", Member_select)
  }, [Member_select])


  function handleMlClick(id, name, e) {
    setM_code(id);
    setM_name(name);
  }
  useEffect(() => {
    if (m_name != "" && m_code != "") {
      setMember_select({ "m_name": m_name, "m_code": m_code })
    }
  }, [m_name, m_code])

  useEffect(() => {
    // if (!CL_Tags_var)return
    ML_Tags_Function(ML_Tags_var)
    console.log("ML_Tags_var", ML_Tags_var)

  }, [ML_Tags_var])



  const onChange = (e) => {
    setML_Tags_var(e.currentTarget.value);

  }
  return (
    <>
      <MDBModalHeader toggle={toggle2} >Sélectionnez measure Listes:</MDBModalHeader>
      <MDBModalBody>

        <MDBRow>
          <MDBCol size="12">
            <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
              Liste des compteurs
            </label>
            <br />
            <input type="text" id="myInputCl" autoComplete="off" placeholder="Rechrech..." className="form-control float-right " style={{ width: "100%" }} />

            <select className="browser-default custom-select" name="CompteurListI_Name" size="8" >
              {filterML_Liste.map(liste => <option key={liste.ML_Code} id={liste.ML_Code} onClick={() => handleListeMLClick(liste.ML_Code, liste.ML_Name, liste.ML_Membre)}>  {liste.ML_Name} </option>)}

            </select>
          </MDBCol>
          {ML_Membre.length ? (<MDBCol size="5">
            <br />
            <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
              Liste des membres
            </label>
            <input type="text" id="myInputCl_Membre" autoComplete="off" placeholder="Rechrech..." className="form-control float-right " style={{ width: "100%", marginTop: "-2%" }} />
            <select id="selectWestania" className="browser-default custom-select" name="le_Compteur" size="8"/* onChange={handleChangeSelect_Membre}*/ >
              <option style={{ display: "none" }} selected value> -- select an option -- </option>
              {filterML_Membre.map(liste => <option onClick={(e) => handleMlClick(liste.m_code, liste.m_name, e)} >  {liste.m_name} </option>)}

            </select>
          </MDBCol>) : null}

          {ML_Membre.length ? (<MDBCol size="2" >

            <MDBBtn style={{ marginTop: "100%", width: "80%" }} size="sm" onClick={Ajouter_All} disabled={showBtnAjouterAll}><MDBIcon icon="angle-double-right" size="2x" /></MDBBtn>
            <MDBBtn style={{ width: "80%" }} size="sm" onClick={Ajouter_Par_Member} disabled={showBtnAjouterParMembre} ><MDBIcon icon="angle-right" size="2x" /></MDBBtn>
            <MDBBtn style={{ width: "80%" }} size="sm" onClick={Delete_Member} disabled={btnDelete}><MDBIcon title="Supprimer" far icon="trash-alt" size="2x" /></MDBBtn>

          </MDBCol>) : null}


          {ML_Membre.length ? (

            <MDBCol size="5">
              <br />
              <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                Liste des membres sélectionnez
              </label>

              <select style={{ marginTop: "10%" }} className="browser-default custom-select" name="le_Compteur" size="8" >
                {ML_Membre_Select.map(liste => <option >  {liste.m_name} </option>)}

              </select>
            </MDBCol>) : null}
          {showTAGS_ML == true ? (<MDBCol size="12">

            <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
              Mot clé d'une nouvelle liste compteur
            </label>
            <input type="text" id="1" id="defaultFormLoginEmailEx" name="ML_Tags_var" value={ML_Tags_var} onChange={onChange} className="form-control" required />



          </MDBCol>) : null}
        </MDBRow>
      </MDBModalBody>
    </>
  )


}


const ModalTL = ({ toggle5, Listes_TL, handleListeTLClick }) => {
  //console.log("Listes_Ml", Listes_Ml)

  const [filterTL_Liste, setfilterTL_Liste] = useState([])

  useEffect(() => {

    console.log("--------Listes_TL------->", Listes_TL)
  }, [Listes_TL])

  ////////////////////
  useEffect(() => {

    //console.log("jjjj",Listes_Ml.length!=0)
    if (filterTL_Liste.length == 0) {
      setfilterTL_Liste(Listes_TL)
    }
    if (Listes_TL.length != 0) {
      const FilterTlListe = (e) => {

        //console.log("Listes_Ml", Listes_Ml)
        const text = e.target.value
        //console.log("text", text)

        console.log("filter", Listes_TL.filter(
          (el, i) => {
            // console.log(i,el)
            return el.tl_name.indexOf(text) >= 0
          }
        )
        )

        setfilterTL_Liste(Listes_TL.filter((el) => el.tl_name.toLowerCase().indexOf(text.toLowerCase()) >= 0))


      }

      const input = document.querySelector("#myInputCl")

      //console.log("input", input)
      if (input) {

        input.addEventListener("keyup", (e) => FilterTlListe(e))
      }

      return function cleanup() {

        input.removeEventListener("keyup", FilterTlListe)
      }

    }

  }, [Listes_TL])
  //////////////////////
  useEffect(() => {
    //if(!filterML_Liste)return
    console.log('---filterTL_Liste--->', filterTL_Liste)



  }, [filterTL_Liste])




  return (
    <>
      <MDBModalHeader toggle={toggle5} >Sélectionnez Time Intelligence:</MDBModalHeader>
      <MDBModalBody>

        <MDBRow>
          <MDBCol size="12">
            <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
              Liste des compteurs
            </label>
            <br />
            <input type="text" id="myInputCl" autoComplete="off" placeholder="Rechrech..." className="form-control float-right " style={{ width: "100%" }} />

            <select className="browser-default custom-select" name="CompteurListI_Name" size="8" >
              {filterTL_Liste.map(liste => <option key={liste.tl_id} id={liste.tl_id} onClick={() => handleListeTLClick(liste.tl_id, liste.tl_name, liste.tl_members)}>  {liste.tl_name} </option>)}

            </select>
          </MDBCol>





        </MDBRow>
      </MDBModalBody>
    </>
  )


}
const ModalFactBook = ({ toggle7, listes, handleChange, FactBookClick, NomFactbbok, Factbook_Membre }) => {
  //console.log("Listes_Ml", Listes_Ml)

  const [filterFactbook_Liste, setfilterFactbook_Liste] = useState([])
  const scrollContainerStyle2 = { width: "100%", maxHeight: "230px" };
  useEffect(() => {

    console.log("--------Listes_Ml------->", listes)
  }, [listes])

  useEffect(() => {

    //console.log("jjjj",Listes_Ml.length!=0)
    if (filterFactbook_Liste.length == 0) {
      setfilterFactbook_Liste(listes)
    }
    if (listes.length != 0) {
      const FilterFactbookListe = (e) => {

        //console.log("Listes_Ml", Listes_Ml)
        const text = e.target.value
        //console.log("text", text)

        console.log("filter", listes.filter(
          (el, i) => {
            // console.log(i,el)
            return el.Nom_FactBook.indexOf(text) >= 0
          }
        )
        )

        setfilterFactbook_Liste(listes.filter((el) => el.Nom_FactBook.toLowerCase().indexOf(text.toLowerCase()) >= 0))


      }

      const input = document.querySelector("#myInputCl")

      //console.log("input", input)
      if (input) {

        input.addEventListener("keyup", (e) => FilterFactbookListe(e))
      }

      return function cleanup() {

        input.removeEventListener("keyup", FilterFactbookListe)
      }

    }

  }, [listes])
  //////////////////////
  useEffect(() => {
    //if(!filterFactbook_Liste)return
    console.log('---filterFactbook_Liste--->', filterFactbook_Liste)



  }, [filterFactbook_Liste])

  return (
    <>
      <MDBModalHeader toggle={toggle7} >Sélectionnez une liste:</MDBModalHeader>
      <MDBModalBody>

        <MDBRow>
          <MDBCol size="12" style={{ height: "240px" }}>
            <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
              Liste des FactBook
            </label>
            <br />
            <input type="text" id="myInputCl" autoComplete="off" placeholder="Rechrech..." className="form-control float-right " style={{ width: "100%" }} />

            <select className="browser-default custom-select" name="NomFactbbok" value={NomFactbbok} onChange={handleChange} size="8" >
              <option></option>
              {filterFactbook_Liste.map(liste => <option key={liste.Code_FactBook} id={liste.Code_FactBook} onClick={(e) => FactBookClick(liste.Code_FactBook, liste.Nom_FactBook, liste.Factbook_Membre, e)}>  {liste.Nom_FactBook} </option>)}

            </select>
          </MDBCol>

          {Factbook_Membre.length != 0 ? (<MDBCol className='p-0'>
            <MDBCol style={{ marginLeft: "1%" }}>
              <br />
              <div className="d-flex justify-content-between " className="grey-text">
                <p className=" m-0 p-0">Liste des rapports d'un FactBook : </p>
              </div>
              <br />

              <MDBContainer style={{ padding: 0 + 'em', marginTop: "-10%" }} >
                <br />
                <MDBListGroup style={{ width: '100%' }} className="scrollbar scrollbar-primary  mt-5 mx-auto" style={scrollContainerStyle2} id="myFilter">
                  {Factbook_Membre.map((Factbook_Membre, i) => <MDBListGroupItem hover key={i} name="Report_Name" value={Factbook_Membre.Report_Name} style={{ padding: 0.5 + 'em' }} id={Factbook_Membre.Report_Code} hover >{Factbook_Membre.Report_Name}</MDBListGroupItem>)}
                </MDBListGroup>
              </MDBContainer>
            </MDBCol>
          </MDBCol>) : null}
        </MDBRow>
      </MDBModalBody>
    </>
  )


}

export default Email;





//Les modifications que vous avez apportées ne seront peut-être pas enregistrées.