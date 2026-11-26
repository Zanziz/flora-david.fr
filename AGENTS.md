# Portfolio de Flora David : instructions pour l'agent

Ce fichier est lu automatiquement par Claude Code (via `CLAUDE.md`) et par Codex.
Il décrit le projet, les règles à respecter et la façon de travailler avec Flora.
Pour changer une règle, modifie ce fichier, pas `CLAUDE.md`.

## 1. Le projet

- Site portfolio de **Flora David**, marketing & communication, brand management, basée à Lyon. Adresse : https://flora-david.fr
- C'est un **showroom** : il montre son travail. Ce n'est pas un outil de prise de contact.
- En 10 secondes, le visiteur doit comprendre que Flora crée de l'image et de l'identité de marque, et qu'elle relie toujours la création à des résultats business.
- Site en français uniquement.
- **Flora n'est pas développeuse.** Elle fait évoluer le site en te parlant. Explique simplement et demande avant toute action risquée.
- **Ce qui reste à faire est listé dans `A-FAIRE.md`.** Consulte-le en début de session. Coche une tâche seulement quand Flora a validé le résultat et qu'il est en ligne.

## 2. Structure du site

- **Accueil** : une photo, une phrase d'accroche et un effet léger d'images qui apparaissent au passage de la souris (image trail), avec une sélection de photos choisie par Flora. Puis le sommaire des thèmes.
- **5 pages thèmes** : Direction artistique, Identité de marque & contenus, Marketing & Communication Digital, E-commerce, Photographie. Chaque page présente plusieurs projets, les uns sous les autres.
- **À propos** : présentation, parcours, outils, « Lyon », et l'encart « Mes derniers coups de cœur ».
- **Mentions légales**.

## 3. Direction artistique

- Esprit éditorial, premium, lifestyle : un magazine de mode ou de déco, pas un template de portfolio.
- Les images portent le site. Les textes restent courts.
- Les galeries alternent les rythmes : grande image seule, diptyque, triptyque, collage.
- Les résultats chiffrés (par exemple « CA en ligne ×2 ») sont mis en avant dès qu'ils existent.
- Interdits : effets gadgets, animations lourdes, look « template SaaS ».
- Le design est sobre et neutre :
  - un fond blanc cassé et un texte presque noir ;
  - une seule famille de polices, sans-serif, grasse pour les titres ;
  - des filets fins pour séparer les sections ;
  - de petites capitales espacées pour les métadonnées (marque, année, rubrique) ;
  - les chiffres clés en très grand.
- Les couleurs, polices et espacements sont définis une seule fois, dans `src/styles/tokens.css`.

## 4. Où se trouve quoi

```
src/
├── content/                ← TOUT le contenu : textes et images
│   ├── site.yaml           ← nom, titre, ville, description pour Google, image de partage
│   ├── partage/            ← l'image d'aperçu des liens partagés (1200 × 630)
│   ├── accueil/
│   │   ├── index.md        ← accroche, photo principale, photos de l'effet
│   │   └── *.jpg
│   ├── themes.yaml         ← les 5 thèmes : nom, ordre, texte d'intro
│   ├── projets/
│   │   ├── _modele/        ← modèle commenté pour créer un projet (non publié)
│   │   └── <nom-du-projet>/
│   │       ├── index.md    ← informations et texte du projet
│   │       └── *.jpg       ← images du projet
│   ├── a-propos/
│   │   └── index.md        ← présentation, parcours, formation, outils
│   ├── coups-de-coeur.yaml ← l'encart « Mes derniers coups de cœur »
│   ├── coups-de-coeur/     ← ses visuels (categorie-titre.jpg)
│   └── mentions-legales.md
├── content.config.ts       ← la liste des champs autorisés pour chaque contenu
├── components/             ← les briques de mise en page
├── layouts/                ← le cadre commun des pages
├── lib/                    ← fonctions de lecture du contenu
├── pages/                  ← une page = une adresse du site
└── styles/                 ← design system : tokens.css (couleurs, polices, espacements) et global.css
public/                     ← favicons, robots.txt (pas d'images de contenu ici)
scripts/                    ← outils (préparation des images)
_local/                     ← fichiers de travail de Flora, jamais publiés
```

Flora ne travaille que dans `src/content/`. Le reste, c'est la mécanique du site.

## 5. Procédures

### Modifier un texte

| Ce que Flora veut changer                  | Fichier                                  |
| ------------------------------------------ | ---------------------------------------- |
| La phrase d'accroche de l'accueil          | `src/content/accueil/index.md`           |
| Son titre, sa ville, la description Google | `src/content/site.yaml`                  |
| Le texte d'un projet                       | `src/content/projets/<projet>/index.md`  |
| Le nom ou l'introduction d'un thème        | `src/content/themes.yaml`                |
| La présentation, le parcours, les outils   | `src/content/a-propos/index.md`          |
| Les coups de cœur                          | `src/content/coups-de-coeur.yaml`        |
| Les mentions légales                       | `src/content/mentions-legales.md`        |

Modifie uniquement le texte. Ne change ni le nom des champs (ce qui est avant les `:`) ni les lignes `---`.

Ces fichiers sont au format YAML. Un texte qui contient « : » (deux-points suivis d'une espace) doit être écrit après `>-`, sur les lignes suivantes, en retrait :

```yaml
contexte: >-
  Une marque construite de A à Z : direction artistique, catalogues, salons.
```

Si un fichier est mal rempli, `npm run build` s'arrête et indique le fichier et le champ en cause. Corrige, puis relance.

### Ajouter un projet

1. Copie `src/content/projets/_modele/` et renomme le dossier : minuscules, tirets, sans accents (exemple : `gemme-campagne-2026`).
2. Mets les images du projet dans ce dossier, puis lance `npm run images`.
3. Remplis `index.md` en suivant les commentaires du modèle : titre, marque, année, thème, ordre d'affichage, résultat chiffré (facultatif), galerie, texte.
4. Donne à chaque image un texte alternatif : une description courte de ce qu'on voit. En cas de doute, demande à Flora.
5. Prévisualise et fais valider (voir section 8).

Un projet en préparation peut être gardé caché avec `brouillon: true`. Il reste dans le repo mais n'apparaît pas sur le site. Il sera publié en passant à `brouillon: false`.

Les projets s'affichent dans les 5 thèmes existants. Créer un nouveau thème change la structure du site : demande d'abord à Flora.

### Ajouter ou remplacer une image

- Une image se range **dans le dossier du contenu concerné**, à côté de son texte. Jamais dans `public/`.
- Pour remplacer une image, écrase le fichier en gardant le même nom. Vérifie ensuite que son texte alternatif décrit bien la nouvelle image.
- Noms de fichiers : minuscules, tirets, sans accents ni espaces (`sacrecoeur-campagne-01.jpg`).
- Formats acceptés : jpg, png, webp. Le site crée automatiquement des versions légères (WebP, plusieurs tailles) : rien à compresser à la main.
- **Après chaque ajout d'images, lance `npm run images`.** Il réduit les originaux à 2500 px maximum (pour ne pas alourdir le repo) et retire leurs métadonnées (appareil, date, lieu de prise de vue).

### Choisir et placer les images d'un projet

La mise en page d'un projet se règle dans le champ `galerie` de son `index.md` : une liste de blocs, affichés de haut en bas. Flora décrit ce qu'elle veut avec ses mots, et tu traduis en blocs :

| Flora dit…                                    | Format      | Images  |
| --------------------------------------------- | ----------- | ------- |
| « en grand », « seule », « pleine largeur »   | `plein`     | 1       |
| « côte à côte », « en paire »                 | `diptyque`  | 2       |
| « les trois côte à côte », « en série »       | `triptyque` | 3       |
| « en collage », « en mosaïque »               | `collage`   | 3 à 6   |

- L'ordre des blocs dans la liste donne l'ordre de haut en bas sur la page.
- Dans un bloc, l'ordre des images donne l'ordre de lecture, de gauche à droite.
- Une image se cite par son nom de fichier (`./nom-du-fichier.jpg`) et doit se trouver dans le dossier du projet. Chaque image a son texte alternatif.
- Si Flora parle d'un thème qui contient plusieurs projets (« dans Direction artistique… »), retrouve le projet grâce aux noms des images. En cas de doute, demande.
- Si la demande ne correspond à aucun format (par exemple « quatre images côte à côte »), propose la solution la plus proche (deux diptyques, ou un collage) et demande avant d'appliquer.
- Retirer une image de la galerie ne supprime pas son fichier. Pour supprimer le fichier, demande d'abord (règle 6).
- Montre ensuite le résultat en local et résume le changement en une phrase : « En tête de la page Direction artistique : campagne-03 en grand, puis 01 et 05 côte à côte. »

Exemple : « Dans Direction artistique, mets campagne-03 en grand en premier, puis 01 et 05 côte à côte » devient, dans `src/content/projets/sacrecoeur-campagne/index.md` :

```yaml
galerie:
  - format: plein
    images:
      - src: ./sacrecoeur-campagne-03.jpg
        alt: Description de la photo 3.
  - format: diptyque
    images:
      - src: ./sacrecoeur-campagne-01.jpg
        alt: Description de la photo 1.
      - src: ./sacrecoeur-campagne-05.jpg
        alt: Description de la photo 5.
  # … puis les autres blocs, s'il y en a
```

### Réorganiser les projets

- **Ordre dans une page thème** : le champ `ordre` de chaque projet (1 = en haut). Pas deux projets avec le même numéro dans un thème.
- **Changer un projet de thème** : le champ `theme`, avec l'un des identifiants de `src/content/themes.yaml`.
- **Masquer un projet sans le supprimer** : `brouillon: true`.
- **Ordre des thèmes** dans le sommaire et le menu : le champ `ordre` de `src/content/themes.yaml`.

### Mettre à jour les coups de cœur

Modifie `src/content/coups-de-coeur.yaml` : catégorie, titre, auteur, une phrase, et en option un lien et une image. Garde entre 3 et 6 éléments. Pas de date.

- **Lien** : l'adresse complète (`https://…`) de la bande-annonce, de l'expo ou du morceau. Le titre devient cliquable et s'ouvre dans un nouvel onglet.
- **Image** : range-la dans `src/content/coups-de-coeur/`, nomme-la `categorie-titre.jpg` (exemple : `film-club-kid.jpg`), lance `npm run images`, et donne-lui un texte alternatif. Toutes les images s'affichent à la même hauteur en gardant leurs proportions : une affiche est plus étroite qu'une photo en paysage.
- Supprime l'image d'un coup de cœur retiré de la liste, après accord de Flora (règle 6).

### Changer l'image de partage

C'est l'image qui s'affiche quand on partage le lien du site (LinkedIn, WhatsApp, Slack…). Elle est rangée dans `src/content/partage/` et déclarée dans le champ `imagePartage` de `src/content/site.yaml`, avec sa description (alt).

- Format : 1200 × 630 px, en JPG, moins de 300 Ko (au-delà, WhatsApp n'affiche pas l'aperçu).
- Garde le nom et l'essentiel loin des bords : certaines applications recadrent l'aperçu.
- Elle sert pour l'accueil, la page À propos et les mentions légales. Chaque page thème utilise la première image de son premier projet.

### Changer le favicon

Le favicon est l'icône du site dans l'onglet du navigateur : aujourd'hui, une tulipe. Il faut partir d'une image carrée en PNG, sur fond transparent, d'au moins 512 px. Elle sert à générer trois fichiers dans `public/` :

- `favicon.ico` : 16, 32 et 48 px ;
- `favicon-192.png` : 192 px, fond transparent ;
- `apple-touch-icon.png` : 180 px, sur le fond du site (iOS remplace la transparence par du noir).

### Changer les photos de l'accueil

Les photos sont dans `src/content/accueil/`. La photo principale se règle dans le champ `photo` de `index.md`, et la sélection de l'effet (de 3 à 20 photos, dans l'ordre d'apparition) dans le champ `trail`. Lance `npm run images` après en avoir ajouté.

## 6. Règles à respecter, toujours

1. **Images** : toujours affichées avec les composants du site (`astro:assets`), jamais avec une balise `<img>` directe.
2. **Texte alternatif** en français sur chaque image de contenu.
3. **Aucune donnée personnelle** : ni téléphone, ni email, ni adresse, ni CV, ni formulaire de contact. Seule la ville (« Lyon ») apparaît.
4. **Aucun secret** : ni clé d'API, ni mot de passe, ni fichier `.env`. Le repo est public.
5. **Ne modifie pas le design** (couleurs, polices, espacements, mise en page) **ni les composants** sans demande explicite de Flora. Si une demande de contenu semble exiger un changement de design, dis-le et demande avant d'agir.
6. **Demande avant de supprimer** un fichier, une image ou un projet.
7. **Pas de nouvelle dépendance** (package npm) sans l'accord de Flora.
8. **Rien n'est mis en ligne sans validation** : prévisualiser, faire valider, `npm run build` sans erreur. Si le build échoue, ne pousse rien.

## 7. Normes de code

- Astro et CSS simple. Pas de framework JS (React, Vue…), pas de Tailwind.
- Aucun texte de contenu écrit en dur dans les composants ou les pages : tout vient de `src/content/`.
- Tout nouveau champ de contenu se déclare dans `src/content.config.ts`.
- Styles : utilise les variables du design system (`var(--…)`), jamais de couleur, police ou taille en dur. Les styles d'un composant restent dans son bloc `<style>`.
- JavaScript : le strict minimum, sans librairie, uniquement pour les effets (image trail). Respecte toujours `prefers-reduced-motion`.
- Accessibilité : HTML sémantique (un seul `h1` par page, titres dans l'ordre), focus visible, navigation au clavier, contrastes suffisants (WCAG AA).
- Images : composants `<Image>` ou `<Picture>` d'`astro:assets`, avec un attribut `sizes` adapté. Seule la photo principale de l'accueil est chargée en priorité, les autres en différé.
- SEO : chaque page a un `title` et une `meta description`.
- Nommage : fichiers et dossiers en minuscules avec tirets ; composants en PascalCase (`ProjetSection.astro`).
- Commits en français, une phrase claire : « Ajoute le projet Gemme dans Direction artistique ».
- Serveur de développement : lance-le en arrière-plan avec `npx astro dev --background`, et gère-le avec `npx astro dev stop`, `npx astro dev status` et `npx astro dev logs`.
- Documentation Astro : https://docs.astro.build. Consulte le guide concerné avant de toucher aux [pages](https://docs.astro.build/en/guides/routing/), aux [composants](https://docs.astro.build/en/basics/astro-components/), au [contenu](https://docs.astro.build/en/guides/content-collections/), aux [images](https://docs.astro.build/en/guides/images/) ou aux [styles](https://docs.astro.build/en/guides/styling/).

## 8. Mettre en ligne

1. Lance le site en local et montre-le à Flora : http://localhost:4321
2. Flora valide.
3. Lance `npm run build`. Il doit se terminer sans erreur.
4. Commit, puis push sur `main`.
5. Netlify met le site en ligne en une minute environ.

- **Regroupe les modifications.** Chaque push sur `main` déclenche une mise en ligne, et le forfait gratuit de Netlify en limite le nombre. Pousse quand un ensemble de changements est validé, pas à chaque retouche.
- **Si le build échoue sur Netlify**, l'ancienne version reste en ligne : rien n'est cassé, mais la modification n'est pas publiée. Lis l'erreur, corrige, recommence.

## 9. Parler avec Flora

- Phrases simples, sans jargon. Si un mot technique est inévitable, explique-le en une phrase.
- Après chaque modification, dis ce qui a changé, dans quel fichier, et comment le voir.
- Si tu ne sais pas exactement ce qu'elle veut, pose la question avant d'agir.
- Pour les textes, propose une version et laisse-la choisir.
