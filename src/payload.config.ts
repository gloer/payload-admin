import { nb } from "@payloadcms/translations/languages/nb";
import { es } from "@payloadcms/translations/languages/es";
import { zh } from "@payloadcms/translations/languages/zh";
import { en } from "@payloadcms/translations/languages/en";

import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { Block, buildConfig, CollectionConfig } from 'payload';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { migrations } from "./migrations";

import { Users } from './collections/Users';
import { Media } from './collections/Media';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);



/**
 * Collections
 * Legg innholdssamlinger inn i dette arrayet for å inkludere dem.
 */

const collections: CollectionConfig[] = [
  Users,
  Media
];

/**
 * Blokker
 * Legg blokker inn i dette arrayet for å inkludere dem.
 */
const blocks: Block[] = [];



/**
 * Payload-konfigurasjon
 * Endre her for å legge til plugins, justere på databaseinnstillinger
 * eller andre ting du trenger. Vær varsom - endringer du gjør her kan
 * gjøre at prosjektet ditt ikke kjører!
 */
export default buildConfig({
  // Hvilke språk skal brukeren kunne velge fra profilen sin
  // a11y accessibility
  i18n: {
    supportedLanguages: { nb, es, zh, en },
    fallbackLanguage: "en",
  },

  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  blocks,
  collections,
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    prodMigrations: migrations
  }),
  sharp,
  plugins: [],
});
