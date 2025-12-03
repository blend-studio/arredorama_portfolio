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
            // --- CUCINE ---
            [
                'title' => 'Residenza Lago',
                'category' => 'Cucine',
                'image_url' => 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2070&auto=format&fit=crop',
                'description' => 'Cucina con isola centrale in finitura materica scura.'
            ],
            [
                'title' => 'Penthouse Milano',
                'category' => 'Cucine',
                'image_url' => 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop',
                'description' => 'Cucina bianca minimalista con dettagli in legno rovere.'
            ],
            [
                'title' => 'Villa Luce',
                'category' => 'Cucine',
                'image_url' => 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
                'description' => 'Ampia cucina open space affacciata sul giardino.'
            ],
            [
                'title' => 'Cucina Monolite', 
                'category' => 'Cucine', 
                'image_url' => 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2070&auto=format&fit=crop',
                'description' => 'Blocco unico in pietra naturale con tecnologia integrata a scomparsa.'
            ],
            [
                'title' => 'Isola White', 
                'category' => 'Cucine', 
                'image_url' => 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop',
                'description' => 'Isola centrale in laccato bianco puro con piano snack in rovere.'
            ],
            [
                'title' => 'Material Dark', 
                'category' => 'Cucine', 
                'image_url' => 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
                'description' => 'Finiture scure opache e metallo brunito per un ambiente sofisticato.'
            ],

            // --- LIVING ---
            [
                'title' => 'Loft Industriale',
                'category' => 'Living',
                'image_url' => 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974&auto=format&fit=crop',
                'description' => 'Zona giorno con divano modulare in tessuto grigio.'
            ],
            [
                'title' => 'Casa Armonia',
                'category' => 'Living',
                'image_url' => 'https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?q=80&w=2070&auto=format&fit=crop',
                'description' => 'Libreria a parete e poltrone di design iconico.'
            ],
            [
                'title' => 'Attico Centro',
                'category' => 'Living',
                'image_url' => 'https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?q=80&w=1974&auto=format&fit=crop',
                'description' => 'Ambiente living dai toni caldi e accoglienti.'
            ],
            [
                'title' => 'Living Sospeso', 
                'category' => 'Living', 
                'image_url' => 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974&auto=format&fit=crop',
                'description' => 'Composizione a parete con moduli sospesi e retroilluminazione LED.'
            ],
            [
                'title' => 'Libreria Infinity', 
                'category' => 'Living', 
                'image_url' => 'https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?q=80&w=2070&auto=format&fit=crop',
                'description' => 'Sistema modulare a tutta altezza con divisori in metallo sottile.'
            ],
            [
                'title' => 'Open Space Wood', 
                'category' => 'Living', 
                'image_url' => 'https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?q=80&w=1974&auto=format&fit=crop',
                'description' => 'Continuità fluida tra cucina e soggiorno con boiserie in noce.'
            ],

            // --- ZONA NOTTE ---
            [
                'title' => 'Suite Padronale',
                'category' => 'Notte',
                'image_url' => 'https://images.unsplash.com/photo-1616594039964-40891a909d72?q=80&w=2066&auto=format&fit=crop',
                'description' => 'Camera da letto con cabina armadio a vista.'
            ],
            [
                'title' => 'Camera Zen',
                'category' => 'Notte',
                'image_url' => 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=2070&auto=format&fit=crop',
                'description' => 'Letto matrimoniale sospeso e palette colori neutra.'
            ],
            [
                'title' => 'Suite Hotel Style', 
                'category' => 'Notte', 
                'image_url' => 'https://images.unsplash.com/photo-1616594039964-40891a909d72?q=80&w=2066&auto=format&fit=crop',
                'description' => 'Arredi su misura e tessuti pregiati per un comfort assoluto.'
            ],
            [
                'title' => 'Cabina Armadio Glass', 
                'category' => 'Notte', 
                'image_url' => 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=2070&auto=format&fit=crop',
                'description' => 'Armadiature con ante in vetro fumé e profili bronzo.'
            ],

            // --- BAGNI ---
            [
                'title' => 'Spa Privata',
                'category' => 'Bagni',
                'image_url' => 'https://images.unsplash.com/photo-1600566752355-35792bedcfe1?q=80&w=2070&auto=format&fit=crop',
                'description' => 'Bagno moderno con rivestimenti in marmo e vasca free-standing.'
            ],
            [
                'title' => 'Bagno Stone',
                'category' => 'Bagni',
                'image_url' => 'https://images.unsplash.com/photo-1552321988-30f0ef336215?q=80&w=2070&auto=format&fit=crop',
                'description' => 'Ambiente bagno con texture pietra e illuminazione led.'
            ],
            [
                'title' => 'Bagno Marmo', 
                'category' => 'Bagni', 
                'image_url' => 'https://images.unsplash.com/photo-1600566752355-35792bedcfe1?q=80&w=2070&auto=format&fit=crop',
                'description' => 'Eleganza senza tempo con marmi pregiati e rubinetteria nera.'
            ],
            [
                'title' => 'Doccia Walk-in', 
                'category' => 'Bagni', 
                'image_url' => 'https://images.unsplash.com/photo-1552321988-30f0ef336215?q=80&w=2070&auto=format&fit=crop',
                'description' => 'Ampia zona doccia con cristallo trasparente e soffione a pioggia.'
            ],

            // --- UFFICIO / CONTRACT ---
            [
                'title' => 'Sala Riunioni Executive', 
                'category' => 'Contract', 
                'image_url' => 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop',
                'description' => 'Tavolo riunioni direzionale con cablaggio integrato e sedute ergonomiche.'
            ],
            [
                'title' => 'Lobby Minimal', 
                'category' => 'Contract', 
                'image_url' => 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069&auto=format&fit=crop',
                'description' => 'Area accoglienza con bancone scultoreo e sedute d\'attesa di design.'
            ],
        ];

        foreach ($projects as $project) {
            Project::create($project);
        }
    }
}