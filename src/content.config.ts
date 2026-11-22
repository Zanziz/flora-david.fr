/*
 * Liste des champs autorisés pour chaque contenu du site.
 * Si un champ manque ou est mal rempli, `npm run build` s'arrête et indique
 * le fichier et le champ en cause.
 */
import { defineCollection, reference } from 'astro:content';
import type { SchemaContext } from 'astro/content/config';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { parse } from 'yaml';

type ImageFn = SchemaContext['image'];

/** Une image de contenu, toujours accompagnée de son texte alternatif. */
const imageAvecAlt = (image: ImageFn) =>
	z.object({
		src: image(),
		alt: z
			.string({ error: 'Chaque image doit avoir un texte alternatif (alt).' })
			.min(1, 'Le texte alternatif (alt) ne peut pas être vide.'),
	});

/** Nombre d'images attendu pour chaque format de bloc de galerie. */
const FORMATS = {
	plein: { min: 1, max: 1 },
	diptyque: { min: 2, max: 2 },
	triptyque: { min: 3, max: 3 },
	collage: { min: 3, max: 6 },
} as const;

const blocGalerie = (image: ImageFn) =>
	z
		.object({
			format: z.enum(['plein', 'diptyque', 'triptyque', 'collage']),
			images: z.array(imageAvecAlt(image)),
			legende: z.string().optional(),
		})
		.refine(
			(bloc) => {
				const { min, max } = FORMATS[bloc.format];
				return bloc.images.length >= min && bloc.images.length <= max;
			},
			{
				error:
					"Nombre d'images incorrect pour ce format : plein = 1, diptyque = 2, triptyque = 3, collage = 3 à 6.",
			},
		);

/** Une année ou une période : 2025, "2024–2026"… */
const periode = z.union([z.string(), z.number()]).transform(String);

/** Informations générales : src/content/site.yaml */
const site = defineCollection({
	loader: file('src/content/site.yaml', {
		parser: (texte) => [{ id: 'site', ...parse(texte) }],
	}),
	schema: z.object({
		nom: z.string(),
		titre: z.string(),
		ville: z.string(),
		description: z.string(),
	}),
});

/** Les thèmes du site : src/content/themes.yaml */
const themes = defineCollection({
	loader: file('src/content/themes.yaml'),
	schema: z.object({
		titre: z.string(),
		ordre: z.number(),
		intro: z.string().optional(),
	}),
});

/** Les projets : un dossier par projet dans src/content/projets/ */
const projets = defineCollection({
	loader: glob({
		pattern: ['*/index.md', '!_modele/**'],
		base: './src/content/projets',
		generateId: ({ entry }) => entry.split('/')[0],
	}),
	schema: ({ image }) =>
		z.object({
			titre: z.string(),
			marque: z.string(),
			annee: periode.optional(),
			theme: reference('themes'),
			ordre: z.number(),
			role: z.string().optional(),
			resultat: z
				.object({
					valeur: z.string(),
					libelle: z.string(),
				})
				.optional(),
			brouillon: z.boolean().default(false),
			galerie: z.array(blocGalerie(image)).min(1, 'Un projet doit avoir au moins un bloc de galerie.'),
		}),
});

/** La page d'accueil : src/content/accueil/index.md */
const accueil = defineCollection({
	loader: glob({ pattern: 'index.md', base: './src/content/accueil', generateId: () => 'accueil' }),
	schema: ({ image }) =>
		z.object({
			accroche: z.string(),
			photo: imageAvecAlt(image),
			trail: z
				.array(image())
				.min(3, "L'effet d'accueil a besoin d'au moins 3 photos.")
				.max(20, "L'effet d'accueil accepte 20 photos au maximum."),
		}),
});

/** La page À propos : src/content/a-propos/index.md */
const aPropos = defineCollection({
	loader: glob({ pattern: 'index.md', base: './src/content/a-propos', generateId: () => 'a-propos' }),
	schema: ({ image }) =>
		z.object({
			description: z.string(),
			portrait: imageAvecAlt(image).optional(),
			parcours: z.array(
				z.object({
					poste: z.string(),
					entreprise: z.string(),
					periode: periode,
					contexte: z.string().optional(),
					resultat: z.string().optional(),
				}),
			),
			formation: z.array(
				z.object({
					diplome: z.string(),
					ecole: z.string(),
					annee: periode,
				}),
			),
			outils: z.array(z.string()),
		}),
});

/** L'encart « Mes derniers coups de cœur » : src/content/coups-de-coeur.yaml */
const coupsDeCoeur = defineCollection({
	loader: file('src/content/coups-de-coeur.yaml', {
		parser: (texte) =>
			((parse(texte) ?? []) as Record<string, unknown>[]).map((element, index) => ({
				id: String(index + 1).padStart(2, '0'),
				...element,
			})),
	}),
	schema: z.object({
		categorie: z.string(),
		titre: z.string(),
		auteur: z.string().optional(),
		phrase: z.string().optional(),
	}),
});

/** Les mentions légales : src/content/mentions-legales.md */
const mentionsLegales = defineCollection({
	loader: glob({
		pattern: 'mentions-legales.md',
		base: './src/content',
		generateId: () => 'mentions-legales',
	}),
	schema: z.object({
		titre: z.string(),
		description: z.string(),
	}),
});

export const collections = { site, themes, projets, accueil, aPropos, coupsDeCoeur, mentionsLegales };
