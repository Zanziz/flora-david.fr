---
# ─────────────────────────────────────────────────────────────
# MODÈLE DE PROJET (ce dossier n'est jamais publié)
# Pour créer un projet : copie ce dossier, renomme la copie
# (minuscules, tirets, sans accents), puis remplis les champs.
# Astuce : un texte qui contient « : » se met après « >- »,
# sur la ligne suivante, comme le champ « role » ci-dessous.
# ─────────────────────────────────────────────────────────────

# Titre du projet, affiché en grand.
titre: Nom du projet

# La ou les marques concernées.
marque: Nom de la marque

# Année ou période (facultatif). Exemples : 2025 ou 2024–2026.
annee: 2026

# Thème où le projet apparaît. Un de ces identifiants :
# direction-artistique, identite-de-marque, communication, e-commerce, photographie
theme: direction-artistique

# Position du projet dans la page du thème (1 = en premier).
ordre: 10

# Le rôle de Flora sur ce projet, en une ligne (facultatif).
role: >-
  Direction artistique : moodboard, shooting et retouche.

# Résultat chiffré (facultatif). Supprime ces 3 lignes s'il n'y en a pas.
resultat:
  valeur: "+30 %"
  libelle: de ventes en ligne en un an

# true = projet caché (en préparation). false = projet publié.
brouillon: false

# La galerie : une suite de blocs, affichés dans l'ordre.
# Formats possibles :
#   plein     → 1 image en grand
#   diptyque  → 2 images côte à côte
#   triptyque → 3 images côte à côte
#   collage   → de 3 à 6 images en composition libre
# Chaque image a un fichier (src) et une description de ce qu'on voit (alt).
# La légende d'un bloc est facultative.
galerie:
  - format: plein
    images:
      - src: ./image-01.jpg
        alt: Description courte de ce qu'on voit sur l'image.
    legende: Légende facultative.
---

Le texte du projet : le contexte et ce qui a été fait, en quelques phrases.
Pour mettre un mot en **gras**, entoure-le de deux astérisques de chaque côté.
