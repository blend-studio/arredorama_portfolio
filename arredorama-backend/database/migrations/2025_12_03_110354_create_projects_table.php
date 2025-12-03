<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
       Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');       // Es: Cucina Lube
            $table->string('category');    // Es: Cucine, Living
            $table->string('image_url');   // URL dell'immagine
            $table->text('description')->nullable(); // Aggiungi questa riga se vuoi le descrizioni
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
