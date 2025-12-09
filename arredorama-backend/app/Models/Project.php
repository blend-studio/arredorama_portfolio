<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title',
        'category',
        'description',
        'client',
        'location',
        'year',
        'image',
        'image_url',
        'gallery',
    ];

    protected $casts = [
        'gallery' => 'array',
    ];
}
