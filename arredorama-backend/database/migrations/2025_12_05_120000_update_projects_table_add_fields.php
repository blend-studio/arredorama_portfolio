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
        Schema::table('projects', function (Blueprint $table) {
            if (!Schema::hasColumn('projects', 'client')) {
                $table->string('client')->nullable()->after('description');
            }
            if (!Schema::hasColumn('projects', 'location')) {
                $table->string('location')->nullable()->after('client');
            }
            if (!Schema::hasColumn('projects', 'year')) {
                $table->string('year', 10)->nullable()->after('location');
            }
            if (!Schema::hasColumn('projects', 'image')) {
                $table->string('image')->nullable()->after('year');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            if (Schema::hasColumn('projects', 'image')) {
                $table->dropColumn('image');
            }
            if (Schema::hasColumn('projects', 'year')) {
                $table->dropColumn('year');
            }
            if (Schema::hasColumn('projects', 'location')) {
                $table->dropColumn('location');
            }
            if (Schema::hasColumn('projects', 'client')) {
                $table->dropColumn('client');
            }
        });
    }
};
