/* Ce document permet l'activation/désactivation du champ de modification de mot de passe
dans modifier_cmpt.php */

// Récupération des éléments du formulaire
const checkbox = document.getElementById('mdp_change');
const inputText = document.getElementById('mdp');

// Écouteur d'événement pour la case à cocher
checkbox.addEventListener('click', function() {
  // Vérification de l'état de la case à cocher
  if (checkbox.checked) 
  {
    // Désactiver le champ de saisie
    inputText.disabled = false;
  }
  else
  {
    inputText.disabled = true;
  }
});