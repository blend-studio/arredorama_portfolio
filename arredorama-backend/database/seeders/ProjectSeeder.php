<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Project;
use Illuminate\Support\Facades\DB;

class ProjectSeeder extends Seeder
{
    public function run()
    {
        // Pulisce la tabella prima di inserire nuovi dati per evitare duplicati
        DB::table('projects')->truncate();

        $projects = [
            // --- PROGETTO RENZI (Living / Cucine) ---
            [
                'title' => 'Casa Renzi - Living',
                'category' => 'Living',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_0190_RENZI.jpg',
                'description' => 'Ampia zona giorno con divano angolare e pareti attrezzate su misura.',
                'gallery' => [
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0190_RENZI.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0191_RENZI.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0195_RENZI.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0201_RENZI.jpg'
                ]
            ],
            [
                'title' => 'Casa Renzi - Dettagli',
                'category' => 'Living',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_0191_RENZI.jpg',
                'description' => 'Dettagli di design e finiture di pregio per un ambiente sofisticato.',
                'gallery' => [
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0190_RENZI.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0191_RENZI.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0195_RENZI.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0201_RENZI.jpg'
                ]
            ],
            [
                'title' => 'Casa Renzi - Cucina',
                'category' => 'Cucine',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_0195_RENZI.jpg',
                'description' => 'Cucina moderna con isola centrale e piano in materiali tecnici.',
                'gallery' => [
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0190_RENZI.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0191_RENZI.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0195_RENZI.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0201_RENZI.jpg'
                ]
            ],
            [
                'title' => 'Casa Renzi - Zona Pranzo',
                'category' => 'Living',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_0201_RENZI.jpg',
                'description' => 'Area pranzo luminosa con tavolo di design e sedute coordinate.',
                'gallery' => [
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0190_RENZI.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0191_RENZI.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0195_RENZI.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0201_RENZI.jpg'
                ]
            ],

            // --- PROGETTO CAVALIERE (Notte / Bagni) ---
            [
                'title' => 'Residenza Cavaliere - Master',
                'category' => 'Notte',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_0210-1-1_CAVALIERE.jpg',
                'description' => 'Camera padronale con testiera imbottita e illuminazione d\'atmosfera.',
                'gallery' => [
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0210-1-1_CAVALIERE.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0212-1_CAVALIERE.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0215-1_CAVALIERE.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0217-1_CAVALIERE.jpg'
                ]
            ],
            [
                'title' => 'Residenza Cavaliere - Armadi',
                'category' => 'Notte',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_0212-1_CAVALIERE.jpg',
                'description' => 'Armadiature su misura con ante scorrevoli e interni attrezzati.',
                'gallery' => [
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0210-1-1_CAVALIERE.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0212-1_CAVALIERE.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0215-1_CAVALIERE.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0217-1_CAVALIERE.jpg'
                ]
            ],
            [
                'title' => 'Residenza Cavaliere - Bagno',
                'category' => 'Bagni',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_0215-1_CAVALIERE.jpg',
                'description' => 'Bagno moderno con rivestimenti in gres e sanitari sospesi.',
                'gallery' => [
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0210-1-1_CAVALIERE.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0212-1_CAVALIERE.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0215-1_CAVALIERE.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0217-1_CAVALIERE.jpg'
                ]
            ],
            [
                'title' => 'Residenza Cavaliere - Dettagli Bagno',
                'category' => 'Bagni',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_0217-1_CAVALIERE.jpg',
                'description' => 'Rubinetteria di design e specchiera retroilluminata.',
                'gallery' => [
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0210-1-1_CAVALIERE.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0212-1_CAVALIERE.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0215-1_CAVALIERE.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0217-1_CAVALIERE.jpg'
                ]
            ],

            // --- PROGETTO CERONI (Living) ---
            [
                'title' => 'Appartamento Ceroni',
                'category' => 'Living',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_CERONI_1.jpg',
                'description' => 'Living contemporaneo con libreria a tutta altezza.',
                'gallery' => [
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_CERONI_1.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_CERONI_3.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0112.jpg'
                ]
            ],
            [
                'title' => 'Ceroni - Zona Relax',
                'category' => 'Living',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_CERONI_3.jpg',
                'description' => 'Angolo relax con poltrona di design e lampada da terra.',
                'gallery' => [
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_CERONI_1.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_CERONI_3.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0113.jpg'
                ]
            ],

            // --- PROGETTO GHILARDOTTI (Cucine / Living) ---
            [
                'title' => 'Villa Ghilardotti - Cucina',
                'category' => 'Cucine',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_GHILARDOTTI_1.jpg',
                'description' => 'Cucina bianca e legno con penisola snack.',
                'gallery' => [
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_GHILARDOTTI_1.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_GHILARDOTTI_3.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0106.jpg'
                ]
            ],
            [
                'title' => 'Villa Ghilardotti - Living',
                'category' => 'Living',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_GHILARDOTTI_3.jpg',
                'description' => 'Open space luminoso con continuità tra cucina e soggiorno.',
                'gallery' => [
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_GHILARDOTTI_1.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_GHILARDOTTI_3.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0121.jpg'
                ]
            ],

            // --- PROGETTO MACCHETTI (Notte) ---
            [
                'title' => 'Casa Macchetti - Notte',
                'category' => 'Notte',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_MACCHETTI_1.jpg',
                'description' => 'Camera da letto con colori neutri e tessuti naturali.',
                'gallery' => [
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_MACCHETTI_1.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_MACCHETTI_3-1.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0136-3.jpg'
                ]
            ],
            [
                'title' => 'Casa Macchetti - Armadio',
                'category' => 'Notte',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_MACCHETTI_3-1.jpg',
                'description' => 'Cabina armadio passante con illuminazione integrata.',
                'gallery' => [
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_MACCHETTI_1.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_MACCHETTI_3-1.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0137.jpg'
                ]
            ],

            // --- PROGETTO PIETRA (Bagni / Living) ---
            [
                'title' => 'Residenza Pietra - Living',
                'category' => 'Living',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_PIETRA_1.jpg',
                'description' => 'Soggiorno con parete in pietra e camino.',
                'gallery' => [
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_PIETRA_1.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_PIETRA_4.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0117-2.jpg'
                ]
            ],
            [
                'title' => 'Residenza Pietra - Bagno',
                'category' => 'Bagni',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_PIETRA_4.jpg',
                'description' => 'Bagno con rivestimenti materici e vasca.',
                'gallery' => [
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_PIETRA_1.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_PIETRA_4.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0141.jpg'
                ]
            ],

            // --- LOGIBIOTECH CONTRACT (Mantenuti) ---
            [
                'title' => 'Logibiotech - Reception',
                'category' => 'Contract',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_072.jpg',
                'description' => 'Area reception con bancone personalizzato e illuminazione integrata.',
                'gallery' => [
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_072.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_074.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_078.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_080.jpg'
                ]
            ],
            [
                'title' => 'Logibiotech - Open Space',
                'category' => 'Contract',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_074.jpg',
                'description' => 'Spazio operativo open space con postazioni ergonomiche.',
                'gallery' => [
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_072.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_074.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_078.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_080.jpg'
                ]
            ],
            [
                'title' => 'Logibiotech - Sala Riunioni',
                'category' => 'Contract',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_078.jpg',
                'description' => 'Sala meeting con tavolo direzionale e sedute executive.',
                'gallery' => [
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_072.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_074.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_078.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_080.jpg'
                ]
            ],
            [
                'title' => 'Logibiotech - Ufficio Direzionale',
                'category' => 'Contract',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_080.jpg',
                'description' => 'Ufficio direzionale con arredi su misura e finiture premium.',
                'gallery' => [
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_072.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_074.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_078.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_080.jpg'
                ]
            ],

            // --- ONESTI GROUP CONTRACT (Mantenuti) ---
            [
                'title' => 'Onesti Group - Hall',
                'category' => 'Contract',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_093.jpg',
                'description' => 'Hall d\'ingresso con design contemporaneo e materiali pregiati.',
                'gallery' => [
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_093.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_098.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_100.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_102.jpg'
                ]
            ],
            [
                'title' => 'Onesti Group - Meeting Room',
                'category' => 'Contract',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_098.jpg',
                'description' => 'Sala riunioni con tecnologia AV integrata.',
                'gallery' => [
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_093.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_098.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_100.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_102.jpg'
                ]
            ],
            [
                'title' => 'Onesti Group - Executive',
                'category' => 'Contract',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_100.jpg',
                'description' => 'Ufficio executive con finiture eleganti e vista panoramica.',
                'gallery' => [
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_093.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_098.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_100.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_102.jpg'
                ]
            ],
            [
                'title' => 'Onesti Group - Lounge',
                'category' => 'Contract',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_102.jpg',
                'description' => 'Area lounge per accoglienza clienti e momenti di relax.',
                'gallery' => [
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_093.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_098.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_100.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_102.jpg'
                ]
            ],

            // --- ALTRI PROGETTI (Mix) ---
            [
                'title' => 'Attico City Life',
                'category' => 'Living',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_0104.jpg',
                'description' => 'Attico con vista sulla città e arredi di design.',
                'gallery' => [
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0104.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0112.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0113.jpg'
                ]
            ],
            [
                'title' => 'Villa nel Parco',
                'category' => 'Cucine',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_0108.jpg',
                'description' => 'Cucina affacciata sul parco privato.',
                'gallery' => [
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0108.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0105.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0106.jpg'
                ]
            ],
            [
                'title' => 'Loft Centro Storico',
                'category' => 'Living',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_0120.jpg',
                'description' => 'Recupero di un edificio storico con interni moderni.',
                'gallery' => [
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0120.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0121.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0117-2.jpg'
                ]
            ],
            [
                'title' => 'Residenza Lago',
                'category' => 'Notte',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_0138.jpg',
                'description' => 'Camera da letto con vista lago.',
                'gallery' => [
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0138.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0136-1.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0136-2.jpg'
                ]
            ],

            // --- CUCINE (da Piano Editoriale) ---
            [
                'title' => 'Cucina Design Moderno',
                'category' => 'Cucine',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_0105.jpg',
                'description' => 'Cucina con isola centrale e finiture contemporanee.',
                'gallery' => [
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0105.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0106.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0109.jpg'
                ]
            ],
            [
                'title' => 'Cucina Minimal White',
                'category' => 'Cucine',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_0106.jpg',
                'description' => 'Cucina bianca minimalista con dettagli in legno.',
                'gallery' => [
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0106.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0105.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0110.jpg'
                ]
            ],
            [
                'title' => 'Cucina Industrial',
                'category' => 'Cucine',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_0109.jpg',
                'description' => 'Cucina con elementi industrial e acciaio a vista.',
                'gallery' => [
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0109.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0110.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0105.jpg'
                ]
            ],
            [
                'title' => 'Cucina Open Space',
                'category' => 'Cucine',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_0110.jpg',
                'description' => 'Cucina aperta sul living con penisola conviviale.',
                'gallery' => [
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0110.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0109.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0106.jpg'
                ]
            ],

            // --- LIVING (da Piano Editoriale) ---
            [
                'title' => 'Living Contemporaneo',
                'category' => 'Living',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_0112.jpg',
                'description' => 'Zona giorno con divano modulare e libreria a parete.',
                'gallery' => [
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0112.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0113.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0117-2.jpg'
                ]
            ],
            [
                'title' => 'Soggiorno Elegante',
                'category' => 'Living',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_0113.jpg',
                'description' => 'Soggiorno con arredi di design e illuminazione scenografica.',
                'gallery' => [
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0113.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0112.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0121.jpg'
                ]
            ],
            [
                'title' => 'Living Minimal',
                'category' => 'Living',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_0117-2.jpg',
                'description' => 'Ambiente living essenziale con linee pulite.',
                'gallery' => [
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0117-2.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0121.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0112.jpg'
                ]
            ],
            [
                'title' => 'Open Space Living',
                'category' => 'Living',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_0121.jpg',
                'description' => 'Spazio aperto con zona conversazione e area TV.',
                'gallery' => [
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0121.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0117-2.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0113.jpg'
                ]
            ],

            // --- ZONA NOTTE (da Piano Editoriale) ---
            [
                'title' => 'Camera Padronale',
                'category' => 'Notte',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_0136-1.jpg',
                'description' => 'Camera da letto con testiera imbottita e armadio a muro.',
                'gallery' => [
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0136-1.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0136-2.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0136-3.jpg'
                ]
            ],
            [
                'title' => 'Suite Moderna',
                'category' => 'Notte',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_0136-2.jpg',
                'description' => 'Suite con cabina armadio integrata e zona relax.',
                'gallery' => [
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0136-2.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0136-1.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0137.jpg'
                ]
            ],
            [
                'title' => 'Camera Zen',
                'category' => 'Notte',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_0136-3.jpg',
                'description' => 'Camera dallo stile orientale con palette neutra.',
                'gallery' => [
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0136-3.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0137.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0136-1.jpg'
                ]
            ],
            [
                'title' => 'Notte Elegante',
                'category' => 'Notte',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_0137.jpg',
                'description' => 'Camera con finiture pregiate e illuminazione soffusa.',
                'gallery' => [
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0137.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0136-3.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0136-2.jpg'
                ]
            ],

            // --- BAGNI (da Piano Editoriale) ---
            [
                'title' => 'Bagno Spa',
                'category' => 'Bagni',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_0139.jpg',
                'description' => 'Bagno con vasca freestanding e rivestimenti in marmo.',
                'gallery' => [
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0139.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0140.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0141.jpg'
                ]
            ],
            [
                'title' => 'Bagno Moderno',
                'category' => 'Bagni',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_0140.jpg',
                'description' => 'Bagno con doccia walk-in e mobile sospeso.',
                'gallery' => [
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0140.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0139.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0142.jpg'
                ]
            ],
            [
                'title' => 'Bagno Stone',
                'category' => 'Bagni',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_0141.jpg',
                'description' => 'Bagno con rivestimenti effetto pietra naturale.',
                'gallery' => [
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0141.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0142.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0139.jpg'
                ]
            ],
            [
                'title' => 'Bagno Luxury',
                'category' => 'Bagni',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_0142.jpg',
                'description' => 'Bagno di lusso con doppio lavabo e specchiera retroilluminata.',
                'gallery' => [
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0142.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0141.jpg',
                    '/images/ARREDORAMA-SMALL/ARREDORAMA_0140.jpg'
                ]
            ],
        ];

        foreach ($projects as $project) {
            if (!isset($project['gallery'])) {
                $project['gallery'] = [$project['image_url']];
            }
            Project::create($project);
        }
    }
}