# À faire · flora-david.fr

Mise à jour : 22 novembre 2026

## Mode d'emploi

Cette liste rassemble ce qui reste à faire sur le site. Les règles de travail sont dans `AGENTS.md`.

- Coche une tâche (`- [x]`) seulement quand Flora a validé le résultat en local et qu'il est en ligne.
- Ajoute une nouvelle tâche à la fin de la section qui la concerne.
- Les sections Contenu et Images attendent des textes ou des fichiers de Flora. Les autres peuvent être faites par l'agent.

## Contenu

Textes à fournir ou à valider par Flora.

- [x] **Coups de cœur** : trois coups de cœur, avec image et lien, remplacent les exemples « À compléter ».
- [ ] **Textes des projets et accroche** : relire et raccourcir pour le web.
- [ ] **Introductions des thèmes** : Art Direction, Communication et E-commerce n'en ont pas encore (`src/content/themes.yaml`).
- [ ] **Années** : à compléter dans 7 projets (ligne `# annee: à compléter`).
- [ ] **Mentions légales** : relire (`src/content/mentions-legales.md`).

## Images

Fichiers à fournir par Flora, de préférence les originaux en haute définition plutôt que des exports Canva.

- [ ] **Remplacer les 53 images provisoires** par les vraies, en gardant les mêmes noms de fichiers, puis lancer `npm run images`.
- [ ] **Réécrire les textes alternatifs** des images remplacées : pour l'instant, ils décrivent des images génériques.
- [ ] **Accueil** : choisir la photo principale et la sélection de l'effet image trail, de 3 à 20 photos (`src/content/accueil/`).
- [ ] **Supports & catalogues** : fournir des visuels, puis passer `brouillon` à `false`.
- [ ] **E-commerce Sacrécoeur & Tinsels** (+60 % de CA en ligne) : fournir des visuels du site, puis passer `brouillon` à `false`.
- [ ] **Portrait** pour la page À propos (facultatif).

## Technique

À faire avant de diffuser largement le lien.

- [x] **Favicon** : une tulipe remplace le logo d'Astro dans l'onglet du navigateur.
- [ ] **Contrôle qualité** : score Lighthouse mobile à 90 ou plus, navigation au clavier, contrastes. À refaire une fois les vraies images en place.
- [ ] **Image de partage** : vérifier l'aperçu du lien sur LinkedIn et WhatsApp, une fois la vraie photo d'accueil en place.

## Pistes pour plus tard

Idées déjà discutées, sans urgence. Celles qui touchent au design ou aux composants se décident avec Flora avant d'y toucher.

- [ ] **Direction artistique** : la faire évoluer.
