class Etudiant{
  
    constructor( matricule, nom_etu, prenom_etu, annee, email_etu){
     
      this._matricule = matricule;
      this._nom_etu = nom_etu;
      this._prenom_etu = prenom_etu;
      this._annee = annee;
      this._email_etu = email_etu;
  }
 
  //-- Getteurs  --//
   
    
    get matricule(){
        return this._matricule;
    }
    
    get nom_etu(){
     return this._nom_etu;
    }
 
    get prenom_etu(){
     return this._prenom_etu;
    }
 
    get annee(){
     return this._annee;
    }
 
    get email_etu(){
     return this._email_etu;
    }
    
 //-- Setteurs--//
    set nom_etu(nomActu){
       this._nom_etu = nomActu;
    }
 
    set prenom_etu(prenomActu){
     this._prenom_etu = prenomActu;
   }
 
    set annee(anneeActu){
       this._annee = anneeActu;
    }
 
    set email_etu(emailActu){
      this._email_etu = emailActu;
    }

 }
 export { Etudiant };