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
                'description' => 'Ampia zona giorno con divano angolare e pareti attrezzate su misura.'
            ],
            [
                'title' => 'Casa Renzi - Dettagli',
                'category' => 'Living',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_0191_RENZI.jpg',
                'description' => 'Dettagli di design e finiture di pregio per un ambiente sofisticato.'
            ],
            [
                'title' => 'Casa Renzi - Cucina',
                'category' => 'Cucine',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_0195_RENZI.jpg',
                'description' => 'Cucina moderna con isola centrale e piano in materiali tecnici.'
            ],
            [
                'title' => 'Casa Renzi - Zona Pranzo',
                'category' => 'Living',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_0201_RENZI.jpg',
                'description' => 'Area pranzo luminosa con tavolo di design e sedute coordinate.'
            ],

            // --- PROGETTO CAVALIERE (Notte / Bagni) ---
            [
                'title' => 'Residenza Cavaliere - Master',
                'category' => 'Notte',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_0210-1-1_CAVALIERE.jpg',
                'description' => 'Camera padronale con testiera imbottita e illuminazione d\'atmosfera.'
            ],
            [
                'title' => 'Residenza Cavaliere - Armadi',
                'category' => 'Notte',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_0212-1_CAVALIERE.jpg',
                'description' => 'Armadiature su misura con ante scorrevoli e interni attrezzati.'
            ],
            [
                'title' => 'Residenza Cavaliere - Bagno',
                'category' => 'Bagni',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_0215-1_CAVALIERE.jpg',
                'description' => 'Bagno moderno con rivestimenti in gres e sanitari sospesi.'
            ],
            [
                'title' => 'Residenza Cavaliere - Dettagli Bagno',
                'category' => 'Bagni',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_0217-1_CAVALIERE.jpg',
                'description' => 'Rubinetteria di design e specchiera retroilluminata.'
            ],

            // --- PROGETTO CERONI (Living) ---
            [
                'title' => 'Appartamento Ceroni',
                'category' => 'Living',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_CERONI_1.jpg',
                'description' => 'Living contemporaneo con libreria a tutta altezza.'
            ],
            [
                'title' => 'Ceroni - Zona Relax',
                'category' => 'Living',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_CERONI_3.jpg',
                'description' => 'Angolo relax con poltrona di design e lampada da terra.'
            ],

            // --- PROGETTO GHILARDOTTI (Cucine / Living) ---
            [
                'title' => 'Villa Ghilardotti - Cucina',
                'category' => 'Cucine',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_GHILARDOTTI_1.jpg',
                'description' => 'Cucina bianca e legno con penisola snack.'
            ],
            [
                'title' => 'Villa Ghilardotti - Living',
                'category' => 'Living',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_GHILARDOTTI_3.jpg',
                'description' => 'Open space luminoso con continuità tra cucina e soggiorno.'
            ],

            // --- PROGETTO MACCHETTI (Notte) ---
            [
                'title' => 'Casa Macchetti - Notte',
                'category' => 'Notte',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_MACCHETTI_1.jpg',
                'description' => 'Camera da letto con colori neutri e tessuti naturali.'
            ],
            [
                'title' => 'Casa Macchetti - Armadio',
                'category' => 'Notte',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_MACCHETTI_3-1.jpg',
                'description' => 'Cabina armadio passante con illuminazione integrata.'
            ],

            // --- PROGETTO PIETRA (Bagni / Living) ---
            [
                'title' => 'Residenza Pietra - Living',
                'category' => 'Living',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_PIETRA_1.jpg',
                'description' => 'Soggiorno con parete in pietra e camino.'
            ],
            [
                'title' => 'Residenza Pietra - Bagno',
                'category' => 'Bagni',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_PIETRA_4.jpg',
                'description' => 'Bagno con rivestimenti materici e vasca.'
            ],

            // --- LOGIBIOTECH CONTRACT (Mantenuti) ---
            [
                'title' => 'Logibiotech - Reception',
                'category' => 'Contract',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_072.jpg',
                'description' => 'Area reception con bancone personalizzato e illuminazione integrata.'
            ],
            [
                'title' => 'Logibiotech - Open Space',
                'category' => 'Contract',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_074.jpg',
                'description' => 'Spazio operativo open space con postazioni ergonomiche.'
            ],
            [
                'title' => 'Logibiotech - Sala Riunioni',
                'category' => 'Contract',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_078.jpg',
                'description' => 'Sala meeting con tavolo direzionale e sedute executive.'
            ],
            [
                'title' => 'Logibiotech - Ufficio Direzionale',
                'category' => 'Contract',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_080.jpg',
                'description' => 'Ufficio direzionale con arredi su misura e finiture premium.'
            ],

            // --- ONESTI GROUP CONTRACT (Mantenuti) ---
            [
                'title' => 'Onesti Group - Hall',
                'category' => 'Contract',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_093.jpg',
                'description' => 'Hall d\'ingresso con design contemporaneo e materiali pregiati.'
            ],
            [
                'title' => 'Onesti Group - Meeting Room',
                'category' => 'Contract',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_098.jpg',
                'description' => 'Sala riunioni con tecnologia AV integrata.'
            ],
            [
                'title' => 'Onesti Group - Executive',
                'category' => 'Contract',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_100.jpg',
                'description' => 'Ufficio executive con finiture eleganti e vista panoramica.'
            ],
            [
                'title' => 'Onesti Group - Lounge',
                'category' => 'Contract',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_102.jpg',
                'description' => 'Area lounge per accoglienza clienti e momenti di relax.'
            ],

            // --- ALTRI PROGETTI (Mix) ---
            [
                'title' => 'Attico City Life',
                'category' => 'Living',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_0104.jpg',
                'description' => 'Attico con vista sulla città e arredi di design.'
            ],
            [
                'title' => 'Villa nel Parco',
                'category' => 'Cucine',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_0108.jpg',
                'description' => 'Cucina affacciata sul parco privato.'
            ],
            [
                'title' => 'Loft Centro Storico',
                'category' => 'Living',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_0120.jpg',
                'description' => 'Recupero di un edificio storico con interni moderni.'
            ],
            [
                'title' => 'Residenza Lago',
                'category' => 'Notte',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_0138.jpg',
                'description' => 'Camera da letto con vista lago.'
            ],

            // --- CUCINE (da Piano Editoriale) ---
            [
                'title' => 'Cucina Design Moderno',
                'category' => 'Cucine',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_0105.jpg',
                'description' => 'Cucina con isola centrale e finiture contemporanee.'
            ],
            [
                'title' => 'Cucina Minimal White',
                'category' => 'Cucine',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_0106.jpg',
                'description' => 'Cucina bianca minimalista con dettagli in legno.'
            ],
            [
                'title' => 'Cucina Industrial',
                'category' => 'Cucine',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_0109.jpg',
                'description' => 'Cucina con elementi industrial e acciaio a vista.'
            ],
            [
                'title' => 'Cucina Open Space',
                'category' => 'Cucine',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_0110.jpg',
                'description' => 'Cucina aperta sul living con penisola conviviale.'
            ],

            // --- LIVING (da Piano Editoriale) ---
            [
                'title' => 'Living Contemporaneo',
                'category' => 'Living',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_0112.jpg',
                'description' => 'Zona giorno con divano modulare e libreria a parete.'
            ],
            [
                'title' => 'Soggiorno Elegante',
                'category' => 'Living',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_0113.jpg',
                'description' => 'Soggiorno con arredi di design e illuminazione scenografica.'
            ],
            [
                'title' => 'Living Minimal',
                'category' => 'Living',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_0117-2.jpg',
                'description' => 'Ambiente living essenziale con linee pulite.'
            ],
            [
                'title' => 'Open Space Living',
                'category' => 'Living',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_0121.jpg',
                'description' => 'Spazio aperto con zona conversazione e area TV.'
            ],

            // --- ZONA NOTTE (da Piano Editoriale) ---
            [
                'title' => 'Camera Padronale',
                'category' => 'Notte',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_0136-1.jpg',
                'description' => 'Camera da letto con testiera imbottita e armadio a muro.'
            ],
            [
                'title' => 'Suite Moderna',
                'category' => 'Notte',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_0136-2.jpg',
                'description' => 'Suite con cabina armadio integrata e zona relax.'
            ],
            [
                'title' => 'Camera Zen',
                'category' => 'Notte',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_0136-3.jpg',
                'description' => 'Camera dallo stile orientale con palette neutra.'
            ],
            [
                'title' => 'Notte Elegante',
                'category' => 'Notte',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_0137.jpg',
                'description' => 'Camera con finiture pregiate e illuminazione soffusa.'
            ],

            // --- BAGNI (da Piano Editoriale) ---
            [
                'title' => 'Bagno Spa',
                'category' => 'Bagni',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_0139.jpg',
                'description' => 'Bagno con vasca freestanding e rivestimenti in marmo.'
            ],
            [
                'title' => 'Bagno Moderno',
                'category' => 'Bagni',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_0140.jpg',
                'description' => 'Bagno con doccia walk-in e mobile sospeso.'
            ],
            [
                'title' => 'Bagno Stone',
                'category' => 'Bagni',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_0141.jpg',
                'description' => 'Bagno con rivestimenti effetto pietra naturale.'
            ],
            [
                'title' => 'Bagno Luxury',
                'category' => 'Bagni',
                'image_url' => '/images/ARREDORAMA-SMALL/ARREDORAMA_0142.jpg',
                'description' => 'Bagno di lusso con doppio lavabo e specchiera retroilluminata.'
            ],
        ];

        foreach ($projects as $project) {
            Project::create($project);
        }
    }
}