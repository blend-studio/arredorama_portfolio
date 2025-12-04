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
            // --- LOGIBIOTECH CONTRACT ---
            [
                'title' => 'Logibiotech - Reception',
                'category' => 'Contract',
                'image_url' => '/images/ARREDORAMA_072.jpg',
                'description' => 'Area reception con bancone personalizzato e illuminazione integrata.'
            ],
            [
                'title' => 'Logibiotech - Open Space',
                'category' => 'Contract',
                'image_url' => '/images/ARREDORAMA_074.jpg',
                'description' => 'Spazio operativo open space con postazioni ergonomiche.'
            ],
            [
                'title' => 'Logibiotech - Sala Riunioni',
                'category' => 'Contract',
                'image_url' => '/images/ARREDORAMA_078.jpg',
                'description' => 'Sala meeting con tavolo direzionale e sedute executive.'
            ],
            [
                'title' => 'Logibiotech - Ufficio Direzionale',
                'category' => 'Contract',
                'image_url' => '/images/ARREDORAMA_080.jpg',
                'description' => 'Ufficio direzionale con arredi su misura e finiture premium.'
            ],
            [
                'title' => 'Logibiotech - Area Break',
                'category' => 'Contract',
                'image_url' => '/images/ARREDORAMA_084.jpg',
                'description' => 'Zona relax e break con cucina attrezzata.'
            ],
            [
                'title' => 'Logibiotech - Corridoio',
                'category' => 'Contract',
                'image_url' => '/images/ARREDORAMA_088.jpg',
                'description' => 'Corridoi con illuminazione LED e dettagli architettonici.'
            ],

            // --- ONESTI GROUP CONTRACT ---
            [
                'title' => 'Onesti Group - Hall',
                'category' => 'Contract',
                'image_url' => '/images/ARREDORAMA_093.jpg',
                'description' => 'Hall d\'ingresso con design contemporaneo e materiali pregiati.'
            ],
            [
                'title' => 'Onesti Group - Uffici Operativi',
                'category' => 'Contract',
                'image_url' => '/images/ARREDORAMA_095.jpg',
                'description' => 'Postazioni operative con arredi modulari e storage integrato.'
            ],
            [
                'title' => 'Onesti Group - Meeting Room',
                'category' => 'Contract',
                'image_url' => '/images/ARREDORAMA_098.jpg',
                'description' => 'Sala riunioni con tecnologia AV integrata.'
            ],
            [
                'title' => 'Onesti Group - Executive',
                'category' => 'Contract',
                'image_url' => '/images/ARREDORAMA_100.jpg',
                'description' => 'Ufficio executive con finiture eleganti e vista panoramica.'
            ],
            [
                'title' => 'Onesti Group - Lounge',
                'category' => 'Contract',
                'image_url' => '/images/ARREDORAMA_102.jpg',
                'description' => 'Area lounge per accoglienza clienti e momenti di relax.'
            ],
            [
                'title' => 'Onesti Group - Dettagli',
                'category' => 'Contract',
                'image_url' => '/images/ARREDORAMA_103.jpg',
                'description' => 'Dettagli architettonici e finiture di pregio.'
            ],

            // --- CUCINE (da Piano Editoriale) ---
            [
                'title' => 'Cucina Design Moderno',
                'category' => 'Cucine',
                'image_url' => '/images/Settimana-21---Post-1.jpg',
                'description' => 'Cucina con isola centrale e finiture contemporanee.'
            ],
            [
                'title' => 'Cucina Minimal White',
                'category' => 'Cucine',
                'image_url' => '/images/Settimana-22---Post-1-.jpg',
                'description' => 'Cucina bianca minimalista con dettagli in legno.'
            ],
            [
                'title' => 'Cucina Industrial',
                'category' => 'Cucine',
                'image_url' => '/images/Settimana-23---Post-1-.jpg',
                'description' => 'Cucina con elementi industrial e acciaio a vista.'
            ],
            [
                'title' => 'Cucina Open Space',
                'category' => 'Cucine',
                'image_url' => '/images/Settimana-24---Post-1.jpg',
                'description' => 'Cucina aperta sul living con penisola conviviale.'
            ],

            // --- LIVING (da Piano Editoriale) ---
            [
                'title' => 'Living Contemporaneo',
                'category' => 'Living',
                'image_url' => '/images/Settimana-25---Post-1.jpg',
                'description' => 'Zona giorno con divano modulare e libreria a parete.'
            ],
            [
                'title' => 'Soggiorno Elegante',
                'category' => 'Living',
                'image_url' => '/images/Settimana-26---Post-1.jpg',
                'description' => 'Soggiorno con arredi di design e illuminazione scenografica.'
            ],
            [
                'title' => 'Living Minimal',
                'category' => 'Living',
                'image_url' => '/images/Settimana-27---Post-1.jpg',
                'description' => 'Ambiente living essenziale con linee pulite.'
            ],
            [
                'title' => 'Open Space Living',
                'category' => 'Living',
                'image_url' => '/images/Settimana-28---Post-1.jpg',
                'description' => 'Spazio aperto con zona conversazione e area TV.'
            ],

            // --- ZONA NOTTE (da Piano Editoriale) ---
            [
                'title' => 'Camera Padronale',
                'category' => 'Notte',
                'image_url' => '/images/Settimana-29---Post-1.jpg',
                'description' => 'Camera da letto con testiera imbottita e armadio a muro.'
            ],
            [
                'title' => 'Suite Moderna',
                'category' => 'Notte',
                'image_url' => '/images/Settimana-30---Post-1.jpg',
                'description' => 'Suite con cabina armadio integrata e zona relax.'
            ],
            [
                'title' => 'Camera Zen',
                'category' => 'Notte',
                'image_url' => '/images/Settimana-32---Post-1.jpg',
                'description' => 'Camera dallo stile orientale con palette neutra.'
            ],
            [
                'title' => 'Notte Elegante',
                'category' => 'Notte',
                'image_url' => '/images/Settimana-33---Post-1.jpg',
                'description' => 'Camera con finiture pregiate e illuminazione soffusa.'
            ],

            // --- BAGNI (da Piano Editoriale) ---
            [
                'title' => 'Bagno Spa',
                'category' => 'Bagni',
                'image_url' => '/images/Settimana-34---Post-1.jpg',
                'description' => 'Bagno con vasca freestanding e rivestimenti in marmo.'
            ],
            [
                'title' => 'Bagno Moderno',
                'category' => 'Bagni',
                'image_url' => '/images/Settimana-35---Post-2.jpg',
                'description' => 'Bagno con doccia walk-in e mobile sospeso.'
            ],
            [
                'title' => 'Bagno Stone',
                'category' => 'Bagni',
                'image_url' => '/images/Settimana-36---Post-1.jpg',
                'description' => 'Bagno con rivestimenti effetto pietra naturale.'
            ],
            [
                'title' => 'Bagno Luxury',
                'category' => 'Bagni',
                'image_url' => '/images/Settimana-41---Post-1.jpg',
                'description' => 'Bagno di lusso con doppio lavabo e specchiera retroilluminata.'
            ],
        ];

        foreach ($projects as $project) {
            Project::create($project);
        }
    }
}