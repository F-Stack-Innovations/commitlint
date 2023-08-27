/**
 * Configuration de CommitLint
 * @type {import('@commitlint/types').Configuration}
 */
module.exports = {
  // Utilise la configuration conventionnelle par défaut
  extends: ["@commitlint/config-conventional"],

  rules: {
    /**
     * Règle pour les types de commit autorisés
     * Niveau 2 : Erreur si la règle n'est pas respectée
     * Toujours vérifiée
     */
    "type-enum": [
      2,
      "always",
      [
        "feat", // Nouvelle fonctionnalité
        "fix", // Correction de bug
        "docs", // Documentation
        "style", // Mise en forme / Style
        "refactor", // Refactorisation
        "test", // Tests
        "chore", // Tâches de maintenance
      ],
    ],

    /**
     * Règle pour les portées autorisées
     * Niveau 2 : Erreur si la règle n'est pas respectée
     * Toujours vérifiée
     */
    "scope-enum": [2, "always", ["core", "ui", "backend", "frontend"]],

    /**
     * Règle pour la casse de la description du commit
     * Niveau 2 : Erreur si la règle n'est pas respectée
     * Toujours vérifiée
     */
    "subject-case": [2, "always", "sentence-case"],

    /**
     * Règle pour la longueur maximale des lignes du corps
     * Niveau 2 : Erreur si la règle n'est pas respectée
     * Toujours vérifiée
     * Longueur maximale : 100 caractères
     */
    "body-max-line-length": [2, "always", 100],

    // Ajoutez une ligne vide après le type de commit
    "body-leading-blank": [2, "always"],

    // Règles personnalisées pour répondre à vos exigences
    "scope-empty": [2, "never"], // Interdit le scope vide
    "scope-case": [2, "always", "lower-case"], // Scope en minuscules
    "header-max-length": [2, "always", 50], // Limite la longueur du titre à 50 caractères
    "header-full-stop": [2, "never", "."], // Interdit le point final dans le titre
    "body-case": [2, "always", "sentence-case"], // Corps en sentence-case
  },
};
