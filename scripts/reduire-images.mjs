/*
 * Prépare les images déposées dans src/content/ :
 * - réduit celles qui dépassent 2500 px sur le plus grand côté ;
 * - retire leurs métadonnées (appareil, date, lieu de prise de vue).
 * Les images déjà prêtes ne sont pas retouchées.
 *
 * Usage : npm run images
 */
import { readdir, rename } from 'node:fs/promises';
import { extname, join } from 'node:path';
import sharp from 'sharp';

const DOSSIER = 'src/content';
const TAILLE_MAX = 2500;
const EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

async function* images(dossier) {
	for (const element of await readdir(dossier, { withFileTypes: true })) {
		const chemin = join(dossier, element.name);
		if (element.isDirectory()) yield* images(chemin);
		else if (EXTENSIONS.has(extname(element.name).toLowerCase())) yield chemin;
	}
}

let traitees = 0;

for await (const chemin of images(DOSSIER)) {
	const { width = 0, height = 0, exif } = await sharp(chemin).metadata();
	const tropGrande = Math.max(width, height) > TAILLE_MAX;
	if (!tropGrande && !exif) continue;

	// .rotate() remet l'image dans le bon sens avant de retirer les métadonnées.
	let image = sharp(chemin).rotate();
	if (tropGrande) image = image.resize({ width: TAILLE_MAX, height: TAILLE_MAX, fit: 'inside' });

	const extension = extname(chemin).toLowerCase();
	if (extension === '.png') image = image.png();
	else if (extension === '.webp') image = image.webp({ quality: 90 });
	else image = image.jpeg({ quality: 90, mozjpeg: true });

	const temporaire = `${chemin}.tmp`;
	await image.toFile(temporaire);
	await rename(temporaire, chemin);

	console.log(`Préparée : ${chemin}${tropGrande ? ` (réduite depuis ${width} × ${height})` : ''}`);
	traitees++;
}

console.log(traitees > 0 ? `${traitees} image(s) préparée(s).` : 'Toutes les images sont déjà prêtes.');
