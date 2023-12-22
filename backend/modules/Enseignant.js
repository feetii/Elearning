class Enseignant{
   constructor( nom_ens, prenom_ens, email_ens, grade_ens){
       
       this._nom_ens = nom_ens;
       this._prenom_ens = prenom_ens;
       
       this._email_ens = email_ens;
       this._grade_ens = grade_ens;
   }
  
 //-- Getteurs  --//
  

   get nom_ens(){
    return this._nom_ens;
   }

   get prenom_ens(){
    return this._prenom_ens;
   }

   
   get email_ens(){
    return this._email_ens;
   }

   get grade_ens(){
    return this._grade_ens;
   }
   
//-- Setteurs--//
   set nom_ens(nomActu){
      this._nom_ens = nomActu;
   }

   set prenom_ens(prenomActu){
    this._prenom_ens = prenomActu;
  }

  
   set email_ens(emailActu){
     this._email_ens = emailActu;
   }

   set grade_ens(gradeActu){
     this._grade_ens = gradeActu;
   }
}
export { Enseignant };