<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\Admin;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Controlla se l'utente esiste già per evitare duplicati
        if (!Admin::where('email', 'lorenzo@blendstudio.it')->exists()) {
            Admin::create([
                'name' => 'Lorenzo',
                'email' => 'lorenzo@blendstudio.it',
                'password' => Hash::make('Lorenzo2003!'),
            ]);
        }
    }
}