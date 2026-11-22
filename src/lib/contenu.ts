/*
 * Fonctions de lecture du contenu, partagées par les pages et les composants.
 */
import { getCollection, getEntry } from 'astro:content';

export async function getSite() {
	const entree = await getEntry('site', 'site');
	if (!entree) throw new Error('Fichier src/content/site.yaml introuvable.');
	return entree.data;
}

/** Les thèmes, dans l'ordre du sommaire. */
export async function getThemes() {
	const themes = await getCollection('themes');
	return themes.sort((a, b) => a.data.ordre - b.data.ordre);
}

/** Les projets publiés d'un thème, dans leur ordre d'affichage. */
export async function getProjetsDuTheme(themeId: string) {
	const projets = await getCollection(
		'projets',
		(projet) => projet.data.theme.id === themeId && !projet.data.brouillon,
	);
	return projets.sort((a, b) => a.data.ordre - b.data.ordre);
}

/**
 * Adresse « propre » d'une page : /e-commerce plutôt que /e-commerce.html,
 * / plutôt que /index.html (les pages sont générées en fichiers .html).
 */
export function cheminPropre(url: URL) {
	return url.pathname.replace(/(index)?\.html$/, '').replace(/\/$/, '') || '/';
}

/** Numéro sur deux chiffres : 1 → « 01 ». */
export const numero = (n: number) => String(n).padStart(2, '0');

/** Raccourcit un texte pour une meta description, sans couper un mot. */
export function resume(texte: string, longueur = 155) {
	const propre = texte.replace(/\s+/g, ' ').trim();
	if (propre.length <= longueur) return propre;
	return `${propre.slice(0, propre.lastIndexOf(' ', longueur - 1))}…`;
}
