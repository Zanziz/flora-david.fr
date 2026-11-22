# flora-david.fr

Portfolio de Flora David. Site statique fait avec [Astro](https://astro.build), hébergé sur Netlify.

## Récupérer le projet (une seule fois)

Il faut un compte GitHub avec accès à ce repo, [Git](https://git-scm.com) et [Node.js](https://nodejs.org) version 24 (prendre la version « LTS »). Puis, dans un terminal :

```bash
git clone https://github.com/Zanziz/flora-david.fr.git
```

Le projet est copié dans un dossier `flora-david.fr`. C'est ce dossier qu'on ouvre ensuite dans Claude Code ou Codex.

## Lancer le site sur son ordinateur

Dans le dossier du projet :

```bash
npm install
```

```bash
npm run dev
```

Le site s'ouvre sur http://localhost:4321 et se met à jour à chaque modification.

## Où déposer les images

Les images se rangent à côté de leur texte, dans `src/content/` :

- un projet : `src/content/projets/<nom-du-projet>/`
- l'accueil : `src/content/accueil/`
- la page À propos : `src/content/a-propos/`

Formats jpg, png ou webp, en haute définition. Le site crée lui-même les versions légères pour le web.
Pour remplacer une image, il suffit d'écraser le fichier en gardant le même nom.
Ne rien mettre dans `public/`.

Après avoir ajouté des images, lancer :

```bash
npm run images
```

Ce script réduit les originaux à 2500 px maximum et retire leurs métadonnées (appareil, date, lieu de prise de vue).

Les fichiers de travail (exports Canva, essais…) vont dans `_local/`, qui n'est jamais publié.

## Publier

1. Vérifier que le site se construit sans erreur :

   ```bash
   npm run build
   ```

2. Enregistrer et envoyer les modifications sur la branche `main` (commit, puis push).
3. Netlify met le site en ligne en une minute environ. Si le build échoue, l'ancienne version reste en ligne.

Chaque push sur `main` déclenche une mise en ligne, et le forfait gratuit de Netlify en limite le nombre : mieux vaut regrouper les modifications.

## Règles du projet

Les règles complètes et les procédures (ajouter un projet, modifier un texte…) sont dans [AGENTS.md](AGENTS.md).
