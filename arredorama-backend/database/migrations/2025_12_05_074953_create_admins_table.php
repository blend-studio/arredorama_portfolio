<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Hash;
use App\Models\Admin;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('admins', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });

        // Crea un admin di default
        Admin::create([
            'name' => 'Amministratore',
            'email' => 'admin@arredorama.it',
            'password' => Hash::make('admin123'),
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('admins');
    }
};